import Review from '../models/Review.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

// 1. GET /api/reviews/product/:productId — Get all reviews for a product
export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params
    const page = Math.max(1, parseInt(req.query.page || '1', 10))
    const limit = Math.min(50, parseInt(req.query.limit || '10', 10))

    const [reviews, total, breakdown] = await Promise.all([
      Review.find({ product: productId })
        .populate('user', 'name avatar')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Review.countDocuments({ product: productId }),
      Review.aggregate([
        { $match: { product: new Review().schema.paths.product.cast(productId) } },
        {
          $group: {
            _id: '$rating',
            count: { $sum: 1 },
          },
        },
      ]).catch(() => []),
    ])

    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    breakdown.forEach((b) => {
      if (starCounts[b._id] !== undefined) {
        starCounts[b._id] = b.count
      }
    })

    res.json({
      success: true,
      data: reviews,
      breakdown: starCounts,
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

// 2. POST /api/reviews — Add review (customer)
export const addReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Product, rating (1-5), and review comment are required',
      })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    // Check if user already reviewed
    const existing = await Review.findOne({ product: productId, user: req.user._id })
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this product',
      })
    }

    // Check verified purchase
    const orderWithProduct = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      orderStatus: { $in: ['Delivered', 'Shipped', 'Confirmed', 'Processing'] },
    })

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      title: title?.trim() || '',
      comment: comment.trim(),
      isVerifiedPurchase: Boolean(orderWithProduct),
    })

    const populated = await Review.findById(review._id).populate('user', 'name avatar')

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: populated,
    })
  } catch (err) {
    next(err)
  }
}

// 3. DELETE /api/reviews/:id — Delete review
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' })
    }

    // Allow user who wrote it or admin
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' })
    }

    await Review.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Review deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}
