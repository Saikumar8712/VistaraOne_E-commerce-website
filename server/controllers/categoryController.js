import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { formatProduct } from './productController.js'

// 1. GET /api/categories — List all active categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort('order')
      .lean()

    // Enrich categories with product count
    const counts = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const countMap = counts.reduce((acc, c) => {
      acc[String(c._id)] = c.count
      return acc
    }, {})

    const enriched = categories.map((cat) => ({
      ...cat,
      productCount: countMap[String(cat._id)] || 0,
    }))

    res.json({
      success: true,
      data: enriched,
    })
  } catch (err) {
    next(err)
  }
}

// 2. GET /api/categories/:slug — Single category by slug with child subcategories
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const category = await Category.findOne({
      slug: slug.toLowerCase().trim(),
      isActive: true,
    })
      .populate('parent', 'name slug')
      .lean()

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      })
    }

    // Find any subcategories
    const subcategories = await Category.find({
      parent: category._id,
      isActive: true,
    })
      .sort('order')
      .lean()

    res.json({
      success: true,
      data: {
        ...category,
        subcategories,
      },
    })
  } catch (err) {
    next(err)
  }
}

// 3. GET /api/categories/:slug/products — Products in a specific category
export const getCategoryProducts = async (req, res, next) => {
  try {
    const { slug } = req.params
    const page = Math.max(+req.query.page || 1, 1)
    const limit = Math.min(Math.max(+req.query.limit || 12, 1), 100)
    const sort = req.query.sort || '-createdAt'

    const category = await Category.findOne({
      slug: slug.toLowerCase().trim(),
      isActive: true,
    }).lean()

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      })
    }

    // Include parent category or subcategory products
    const childCategories = await Category.find({ parent: category._id }).select('_id').lean()
    const categoryIds = [category._id, ...childCategories.map((c) => c._id)]

    const filter = {
      isActive: true,
      category: { $in: categoryIds },
    }

    if (req.query.min || req.query.max) {
      filter.price = {}
      if (req.query.min) filter.price.$gte = Number(req.query.min)
      if (req.query.max) filter.price.$lte = Number(req.query.max)
    }

    if (req.query.brand) {
      const brands = req.query.brand.split(',').map((b) => b.trim())
      filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) }
    }

    if (req.query.rating) {
      filter.rating = { $gte: Number(req.query.rating) }
    }

    let sortOption = { createdAt: -1 }
    if (sort === 'price-asc' || sort === 'price') sortOption = { price: 1 }
    else if (sort === 'price-desc' || sort === '-price') sortOption = { price: -1 }
    else if (sort === 'rating') sortOption = { rating: -1 }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ])

    const totalPages = Math.ceil(total / limit)

    res.json({
      success: true,
      category,
      data: products.map(formatProduct),
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
