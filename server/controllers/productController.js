import mongoose from 'mongoose'
import Product from '../models/Product.js'
import Category from '../models/Category.js'

// Helper: check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id

// Helper to resolve category by ID, slug, or popular aliases
export const resolveCategory = async (catStr) => {
  if (!catStr) return null
  if (isValidObjectId(catStr)) {
    const cat = await Category.findById(catStr).lean()
    if (cat) return cat
  }
  const clean = catStr.toLowerCase().trim()
  const aliases = {
    mobiles: 'mobiles-smartphones',
    smartphones: 'mobiles-smartphones',
    laptops: 'laptops-computers',
    computers: 'laptops-computers',
    'electronics-accessories': 'electronics',
    'fashion-clothing': 'fashion',
    clothing: 'fashion',
    shoes: 'footwear',
    'home-appliances': 'appliances',
    'grocery-essentials': 'groceries',
    grocery: 'groceries',
    'beauty-pets': 'beauty-personal-care',
    beauty: 'beauty-personal-care',
    watches: 'watches-accessories',
  }
  const targetSlug = aliases[clean] || clean
  return await Category.findOne({
    $or: [
      { slug: clean },
      { slug: targetSlug },
      { name: new RegExp(`^${clean.replace(/-/g, ' ')}$`, 'i') },
    ],
  }).lean()
}

// Format product for consistent frontend consumption
export const formatProduct = (p) => {
  const obj = p.toObject ? p.toObject({ virtuals: true }) : { ...p }
  const categoryName = typeof obj.category === 'object' && obj.category !== null ? obj.category.name : obj.category
  const categorySlug = typeof obj.category === 'object' && obj.category !== null ? obj.category.slug : undefined

  const discountPercent =
    obj.discountPercent ||
    (obj.originalPrice && obj.originalPrice > obj.price
      ? Math.round(((obj.originalPrice - obj.price) / obj.originalPrice) * 100)
      : 0)

  return {
    ...obj,
    category: categoryName,
    categorySlug,
    image: obj.images?.[0] || '',
    demo: Boolean(obj.isDemo),
    discountPercent,
    inStock: obj.stock > 0,
  }
}

// 1. GET /api/products — Search, Filter, Sort, Paginate
export const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      brand,
      min,
      max,
      rating,
      inStock,
      featured,
      bestseller,
      deal,
      sort = '-createdAt',
    } = req.query

    const page = Math.max(+req.query.page || 1, 1)
    const limit = Math.min(Math.max(+req.query.limit || 12, 1), 100)
    const filter = { isActive: true }

    // Category filter: handle either ObjectId, slug, or alias
    if (category) {
      const foundCat = await resolveCategory(category)
      if (foundCat) {
        filter.category = foundCat._id
      } else {
        // No such category exists, return empty result safely
        return res.json({
          success: true,
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
        })
      }
    }

    // Brand filter (supports comma-separated multiple brands)
    if (brand) {
      const brands = brand
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean)
      if (brands.length === 1) {
        filter.brand = new RegExp(`^${brands[0]}$`, 'i')
      } else if (brands.length > 1) {
        filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) }
      }
    }

    // Price range filter
    if (min !== undefined || max !== undefined) {
      filter.price = {}
      if (min !== undefined && min !== '') filter.price.$gte = Number(min)
      if (max !== undefined && max !== '') filter.price.$lte = Number(max)
    }

    // Minimum rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) }
    }

    // In stock filter
    if (inStock === 'true' || inStock === true) {
      filter.stock = { $gt: 0 }
    }

    // Featured / Bestseller / Deal filters
    if (featured === 'true' || featured === true) filter.isFeatured = true
    if (bestseller === 'true' || bestseller === true) filter.isBestseller = true
    if (deal === 'true' || deal === true) {
      filter.$expr = { $gt: ['$originalPrice', '$price'] }
    }

    // Search query: Text search with fallback to Regex for partial match
    if (q && q.trim()) {
      const queryStr = q.trim()
      filter.$or = [
        { name: { $regex: queryStr, $options: 'i' } },
        { brand: { $regex: queryStr, $options: 'i' } },
        { tags: { $regex: queryStr, $options: 'i' } },
        { description: { $regex: queryStr, $options: 'i' } },
      ]
    }

    // Sorting map
    let sortOption = { createdAt: -1 }
    switch (sort) {
      case 'price-asc':
      case 'price':
        sortOption = { price: 1 }
        break
      case 'price-desc':
      case '-price':
        sortOption = { price: -1 }
        break
      case 'rating':
      case '-rating':
        sortOption = { rating: -1, reviewCount: -1 }
        break
      case 'popularity':
      case '-reviewCount':
        sortOption = { reviewCount: -1, rating: -1 }
        break
      case 'newest':
      case '-createdAt':
      default:
        sortOption = { createdAt: -1 }
        break
    }

    const [rawProducts, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ])

    const totalPages = Math.ceil(total / limit)
    const formatted = rawProducts.map(formatProduct)

    res.json({
      success: true,
      data: formatted,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (err) {
    next(err)
  }
}

// 2. GET /api/products/:id — Single product by ID or Slug
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = null

    if (isValidObjectId(id)) {
      product = await Product.findById(id)
        .populate('category', 'name slug description icon')
        .populate('subcategory', 'name slug')
        .lean()
    }

    // Fallback lookup by slug if not found or not an ObjectId
    if (!product) {
      product = await Product.findOne({ slug: id.toLowerCase() })
        .populate('category', 'name slug description icon')
        .populate('subcategory', 'name slug')
        .lean()
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.json({
      success: true,
      data: formatProduct(product),
    })
  } catch (err) {
    next(err)
  }
}

// 3. GET /api/products/slug/:slug — Single product by Slug
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug: slug.toLowerCase() })
      .populate('category', 'name slug description icon')
      .populate('subcategory', 'name slug')
      .lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found with this slug',
      })
    }

    res.json({
      success: true,
      data: formatProduct(product),
    })
  } catch (err) {
    next(err)
  }
}

// 4. GET /api/products/:id/similar — Related / Similar products
export const getSimilarProducts = async (req, res, next) => {
  try {
    const { id } = req.params
    const limit = Math.min(Math.max(+req.query.limit || 12, 1), 50)

    let currentProduct = null
    if (isValidObjectId(id)) {
      currentProduct = await Product.findById(id).lean()
    }
    if (!currentProduct) {
      currentProduct = await Product.findOne({ slug: id }).lean()
    }

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    const minPrice = currentProduct.price * 0.5
    const maxPrice = currentProduct.price * 1.5

    // Find similar items by same category or brand, in similar price band
    let similar = await Product.find({
      _id: { $ne: currentProduct._id },
      isActive: true,
      $or: [
        { category: currentProduct.category },
        { brand: currentProduct.brand },
        { price: { $gte: minPrice, $lte: maxPrice } },
      ],
    })
      .populate('category', 'name slug')
      .limit(limit)
      .lean()

    // If still less than desired limit, grab other top-rated items
    if (similar.length < limit) {
      const existingIds = [currentProduct._id, ...similar.map((s) => s._id)]
      const fallback = await Product.find({
        _id: { $nin: existingIds },
        isActive: true,
      })
        .populate('category', 'name slug')
        .sort('-rating')
        .limit(limit - similar.length)
        .lean()

      similar = [...similar, ...fallback]
    }

    res.json({
      success: true,
      data: similar.map(formatProduct),
    })
  } catch (err) {
    next(err)
  }
}

// 5. GET /api/products/filters/meta — Dynamic Filter Metadata (available brands, price min/max)
export const getFilterMeta = async (req, res, next) => {
  try {
    const { category } = req.query
    const match = { isActive: true }

    if (category) {
      const cat = await resolveCategory(category)
      if (cat) match.category = cat._id
    }

    const [brands, priceStats] = await Promise.all([
      Product.distinct('brand', match),
      Product.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
            count: { $sum: 1 },
          },
        },
      ]),
    ])

    res.json({
      success: true,
      data: {
        brands: brands.filter(Boolean).sort(),
        minPrice: priceStats[0]?.minPrice || 0,
        maxPrice: priceStats[0]?.maxPrice || 100000,
        totalProducts: priceStats[0]?.count || 0,
      },
    })
  } catch (err) {
    next(err)
  }
}
