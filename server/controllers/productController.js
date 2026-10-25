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
    // Mobiles & Electronics
    mobiles: 'electronics',
    mobile: 'electronics',
    smartphones: 'electronics',
    smartphone: 'electronics',
    phone: 'electronics',
    phones: 'electronics',
    laptops: 'electronics',
    laptop: 'electronics',
    computers: 'electronics',
    computer: 'electronics',
    'electronics-accessories': 'electronics',
    electronic: 'electronics',
    electronics: 'electronics',
    audio: 'electronics',
    headphones: 'electronics',
    earbuds: 'electronics',

    // Fashion & Lifestyle
    'fashion-clothing': 'fashion',
    clothing: 'fashion',
    clothes: 'fashion',
    fashion: 'fashion',
    shoes: 'fashion',
    shoe: 'fashion',
    footwear: 'fashion',
    sneakers: 'fashion',
    watches: 'fashion',
    watch: 'fashion',

    // Appliances
    'home-appliances': 'appliances',
    appliances: 'appliances',
    appliance: 'appliances',
    tv: 'appliances',
    tvs: 'appliances',
    refrigerator: 'appliances',
    fridge: 'appliances',
    'washing-machine': 'appliances',

    // Home & Kitchen
    'home-kitchen': 'home-kitchen',
    kitchen: 'home-kitchen',
    cookware: 'home-kitchen',

    // Groceries
    'grocery-essentials': 'groceries',
    grocery: 'groceries',
    groceries: 'groceries',
    staples: 'groceries',

    // Fresh Market
    fruits: 'fresh-market',
    fruit: 'fresh-market',
    fresh: 'fresh-market',
    vegetables: 'fresh-market',
    vegetable: 'fresh-market',
    veggies: 'fresh-market',

    // Beauty & Personal Care
    'beauty-personal-care': 'beauty-pets',
    'beauty-pets': 'beauty-pets',
    beauty: 'beauty-pets',
    skincare: 'beauty-pets',
    cosmetics: 'beauty-pets',

    // Sports & Fitness
    sports: 'sports',
    sport: 'sports',
    fitness: 'sports',
    gym: 'sports',
    yoga: 'sports',

    // Toys & Baby Care
    toys: 'toys',
    toy: 'toys',
    baby: 'toys',
    kids: 'toys',
    games: 'toys',

    // Books & Stationery
    books: 'books',
    book: 'books',
    stationery: 'books',
    novels: 'books',
  }
  const targetSlug = aliases[clean] || clean
  return await Category.findOne({
    $or: [
      { slug: clean },
      { slug: targetSlug },
      { name: new RegExp(`^${clean.replace(/-/g, ' ')}$`, 'i') },
      { name: new RegExp(`${clean.replace(/-/g, ' ')}`, 'i') },
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

    // Search query: Enhanced regex search across name, brand, tags, description + matching categories
    if (q && q.trim()) {
      const queryStr = q.trim()
      const singular = queryStr.length > 3 ? queryStr.replace(/s$/i, '') : queryStr
      const regexPattern = queryStr.length > 3 ? `${queryStr}|${singular}` : queryStr
      const searchRegex = new RegExp(regexPattern, 'i')

      // Also check if the search term matches any category (e.g. "fruits", "mobile", "laptops")
      const resolvedCat = await resolveCategory(queryStr)
      const matchingCats = await Category.find({
        $or: [
          { name: searchRegex },
          { slug: searchRegex },
          { description: searchRegex },
        ],
      }).select('_id').lean()

      const catIds = []
      if (resolvedCat) catIds.push(resolvedCat._id)
      matchingCats.forEach((c) => {
        if (!catIds.some((id) => String(id) === String(c._id))) {
          catIds.push(c._id)
        }
      })

      const orConditions = [
        { name: searchRegex },
        { brand: searchRegex },
        { tags: searchRegex },
        { description: searchRegex },
      ]

      if (catIds.length > 0) {
        orConditions.push({ category: { $in: catIds } })
      }

      filter.$or = orConditions
    }

    // Sorting map
    const isDefaultSort = !req.query.sort
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

    // When searching with a text query and without explicit price/rating sort, rank candidates by relevance
    if (q && q.trim() && isDefaultSort) {
      const qLower = q.trim().toLowerCase()
      const resolvedCatId = filter.category ? String(filter.category) : null

      const calculateRelevance = (p) => {
        let score = 0
        const nameLower = (p.name || '').toLowerCase()
        const tags = Array.isArray(p.tags) ? p.tags.map((t) => String(t).toLowerCase()) : []
        const brandLower = (p.brand || '').toLowerCase()

        if (nameLower.startsWith(qLower)) score += 120
        else if (nameLower.includes(qLower)) score += 80

        if (['mobile', 'mobiles', 'smartphone', 'smartphones', 'phone', 'phones'].includes(qLower)) {
          if (['galaxy', 'iphone', 'oneplus', 'pixel', 'redmi', 'vivo', 'realme', 'motorola', 'poco', 'smartphone', '5g'].some((m) => nameLower.includes(m))) {
            score += 90
          }
          if (tags.includes('smartphone') || tags.includes('mobile')) score += 60
        }

        if (['fruit', 'fruits'].includes(qLower)) {
          if (['mango', 'apple', 'banana', 'orange', 'grape', 'berry', 'strawberry', 'kiwi', 'pomegranate', 'avocado', 'papaya', 'watermelon', 'melon', 'pineapple', 'guava', 'fig'].some((f) => nameLower.includes(f))) {
            score += 90
          }
          if (tags.includes('fruits') || tags.includes('fruit')) score += 60
        }

        if (tags.some((t) => t.includes(qLower))) score += 40
        if (brandLower.includes(qLower)) score += 30
        if (resolvedCatId && String(p.category?._id || p.category) === String(resolvedCatId)) score += 35

        return score
      }

      const candidates = await Product.find(filter)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .limit(300)
        .lean()

      candidates.sort((a, b) => calculateRelevance(b) - calculateRelevance(a))
      const total = candidates.length
      const paginated = candidates.slice((page - 1) * limit, page * limit)
      const totalPages = Math.ceil(total / limit)
      const formatted = paginated.map(formatProduct)

      return res.json({
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
