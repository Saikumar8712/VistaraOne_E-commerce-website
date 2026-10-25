import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import Category from '../models/Category.js'

// 1. GET /api/admin/stats — Marketplace Analytics
export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalOrders, revenueStats, totalCustomers, totalProducts, lowStockProducts, recentOrders] =
      await Promise.all([
        Order.countDocuments(),
        Order.aggregate([
          { $match: { orderStatus: { $ne: 'Cancelled' } } },
          { $group: { _id: null, totalRevenue: { $sum: '$pricing.totalPrice' } } },
        ]),
        User.countDocuments({ role: 'customer' }),
        Product.countDocuments(),
        Product.countDocuments({ stock: { $lte: 5 } }),
        Order.find()
          .populate('user', 'name email phone')
          .sort('-createdAt')
          .limit(5)
          .lean(),
      ])

    const totalRevenue = revenueStats[0]?.totalRevenue || 0

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        lowStockProducts,
        recentOrders,
      },
    })
  } catch (err) {
    next(err)
  }
}

// 2. GET /api/admin/products — All products for management
export const getAdminProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10))
    const limit = Math.min(100, parseInt(req.query.limit || '20', 10))
    const q = req.query.q

    const filter = {}
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
      ]
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    next(err)
  }
}

// 3. POST /api/admin/products — Create new product
export const createAdminProduct = async (req, res, next) => {
  try {
    const { name, brand, category, price, originalPrice, stock, images, description, highlights, warranty } = req.body

    if (!name || !brand || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, brand, category, and price are required.',
      })
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const product = await Product.create({
      name: name.trim(),
      slug: `${slug}-${Date.now().toString(36)}`,
      brand: brand.trim(),
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      stock: stock !== undefined ? Number(stock) : 10,
      images: Array.isArray(images) && images.length ? images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
      description: description?.trim() || '',
      highlights: Array.isArray(highlights) ? highlights : [],
      warranty: warranty || '1 Year Brand Warranty',
      isActive: true,
    })

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

// 4. PUT /api/admin/products/:id — Update product details, price, or inventory
export const updateAdminProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

// 5. DELETE /api/admin/products/:id — Delete or deactivate product
export const deleteAdminProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    // Toggle or remove
    product.isActive = false
    await product.save()

    res.json({
      success: true,
      message: 'Product deactivated successfully',
    })
  } catch (err) {
    next(err)
  }
}

// 6. GET /api/admin/orders — List all orders for fulfillment
export const getAdminOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10))
    const limit = Math.min(100, parseInt(req.query.limit || '20', 10))
    const status = req.query.status

    const filter = {}
    if (status) filter.orderStatus = status

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email phone')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    next(err)
  }
}

// 7. PUT /api/admin/orders/:id/status — Update fulfillment status & timeline
export const updateAdminOrderStatus = async (req, res, next) => {
  try {
    const { status, comment = '' } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.orderStatus = status
    if (status === 'Delivered') {
      order.isPaid = true
      if (!order.paidAt) order.paidAt = new Date()
    }

    order.timeline.push({
      status,
      timestamp: new Date(),
      comment: comment || `Status updated to ${status} by Administrator`,
    })

    await order.save()

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order,
    })
  } catch (err) {
    next(err)
  }
}
