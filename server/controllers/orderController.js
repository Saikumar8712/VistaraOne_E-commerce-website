import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import Campaign from '../models/Campaign.js'

// 1. POST /api/orders — Create order with inventory deduction and server verification
export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod = 'COD', paymentDetails, couponCode } = req.body
    const userId = req.user._id

    if (!shippingAddress || !shippingAddress.addressLine || !shippingAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: 'A complete delivery shipping address is required.',
      })
    }

    // Retrieve user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty. Cannot checkout an empty cart.',
      })
    }

    const orderItems = []
    let itemsPrice = 0
    let originalTotal = 0

    // Server-side inventory & price verification
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id || item.product)
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product "${item.name || 'Unknown'}" is no longer available.`,
        })
      }

      // Check variant and live stock
      let livePrice = product.price
      let liveMRP = product.originalPrice || product.price
      let availableStock = product.stock
      let variantName = item.variantName || ''

      if (item.variantId && product.variants?.length > 0) {
        const v = product.variants.find((v) => String(v._id) === String(item.variantId))
        if (v) {
          livePrice = v.price || product.price
          liveMRP = v.originalPrice || liveMRP
          availableStock = v.stock !== undefined ? v.stock : product.stock
          variantName = v.name
        }
      }

      if (item.quantity > availableStock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${availableStock} units available.`,
        })
      }

      // Deduct inventory from Product collection
      product.stock -= item.quantity
      if (item.variantId && product.variants?.length > 0) {
        const vIdx = product.variants.findIndex((v) => String(v._id) === String(item.variantId))
        if (vIdx > -1 && product.variants[vIdx].stock !== undefined) {
          product.variants[vIdx].stock -= item.quantity
        }
      }
      await product.save()

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0] || '',
        price: livePrice,
        quantity: item.quantity,
        variantName,
        variantId: item.variantId || null,
      })

      itemsPrice += livePrice * item.quantity
      originalTotal += liveMRP * item.quantity
    }

    const deliveryFee = itemsPrice >= 499 ? 0 : 49
    const discount = Math.max(0, originalTotal - itemsPrice)
    let couponDiscount = 0
    let appliedCouponCode = ''

    if (couponCode) {
      const cleanCode = couponCode.toUpperCase().trim()
      const now = new Date()
      const campaign = await Campaign.findOne({
        code: cleanCode,
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
      })

      if (campaign && itemsPrice >= campaign.minCartValue) {
        if (campaign.discountType === 'percentage') {
          couponDiscount = Math.round((itemsPrice * campaign.discountValue) / 100)
          if (campaign.maxDiscount && couponDiscount > campaign.maxDiscount) {
            couponDiscount = campaign.maxDiscount
          }
        } else {
          couponDiscount = campaign.discountValue
        }
        couponDiscount = Math.min(couponDiscount, itemsPrice)
        appliedCouponCode = campaign.code

        campaign.usageCount = (campaign.usageCount || 0) + 1
        await campaign.save()
      }
    }

    const totalPrice = Math.max(0, itemsPrice + deliveryFee - couponDiscount)

    // Generate unique order number: VO-YYYY-XXXXXX
    const orderNumber = `VO-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

    // Determine payment completion status
    const isPaid = paymentMethod === 'TestSandbox'
    const paidAt = isPaid ? new Date() : null
    const paymentResult = {
      id: isPaid ? `sandbox_tx_${Date.now()}` : paymentDetails?.id || '',
      status: isPaid ? 'Completed' : 'Pending',
      updateTime: isPaid ? new Date() : null,
      emailAddress: req.user.email,
    }

    const timeline = [
      {
        status: 'Placed',
        timestamp: new Date(),
        comment: `Order placed via ${paymentMethod}${appliedCouponCode ? ` (Coupon ${appliedCouponCode} applied)` : ''}`,
      },
    ]

    if (isPaid) {
      timeline.push({
        status: 'Confirmed',
        timestamp: new Date(),
        comment: 'Payment verified via Test Sandbox mode',
      })
    }

    const order = await Order.create({
      orderNumber,
      user: userId,
      orderItems,
      shippingAddress: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        addressLine: shippingAddress.addressLine,
        locality: shippingAddress.locality || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        addressType: shippingAddress.addressType || 'home',
      },
      paymentMethod,
      paymentResult,
      pricing: {
        itemsPrice,
        deliveryFee,
        discount,
        couponDiscount,
        couponCode: appliedCouponCode,
        totalPrice,
      },
      isPaid,
      paidAt,
      orderStatus: isPaid ? 'Confirmed' : 'Placed',
      timeline,
    })

    // Clear cart upon successful order placement
    cart.items = []
    await cart.save()

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    })
  } catch (err) {
    next(err)
  }
}

// 2. GET /api/orders/myorders — List user's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .lean()

    res.json({
      success: true,
      data: orders,
      count: orders.length,
    })
  } catch (err) {
    next(err)
  }
}

// 3. GET /api/orders/:id — Single order details
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const isObjectId = id.match(/^[0-9a-fA-F]{24}$/)
    const query = isObjectId ? { _id: id } : { orderNumber: id }

    const order = await Order.findOne(query).populate('user', 'name email phone').lean()

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Authorization: User must own the order or be an Admin
    const isOwner = String(order.user._id || order.user) === String(req.user._id)
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' })
    }

    res.json({
      success: true,
      data: order,
    })
  } catch (err) {
    next(err)
  }
}

// 4. PUT /api/orders/:id/cancel — Cancel order & restore inventory
export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const { reason = 'Customer requested cancellation' } = req.body

    const isObjectId = id.match(/^[0-9a-fA-F]{24}$/)
    const query = isObjectId ? { _id: id } : { orderNumber: id }

    const order = await Order.findOne(query)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Verify ownership
    const isOwner = String(order.user) === String(req.user._id)
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this order' })
    }

    // Check permitted status
    if (['Shipped', 'OutForDelivery', 'Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled because it is already ${order.orderStatus}.`,
      })
    }

    // Restore inventory
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product)
      if (product) {
        product.stock += item.quantity
        if (item.variantId && product.variants?.length > 0) {
          const vIdx = product.variants.findIndex((v) => String(v._id) === String(item.variantId))
          if (vIdx > -1 && product.variants[vIdx].stock !== undefined) {
            product.variants[vIdx].stock += item.quantity
          }
        }
        await product.save()
      }
    }

    order.orderStatus = 'Cancelled'
    order.cancelledAt = new Date()
    order.cancellationReason = reason
    order.timeline.push({
      status: 'Cancelled',
      timestamp: new Date(),
      comment: reason,
    })

    await order.save()

    res.json({
      success: true,
      message: 'Order cancelled successfully and inventory restored',
      data: order,
    })
  } catch (err) {
    next(err)
  }
}
