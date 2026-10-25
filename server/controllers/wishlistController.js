import Wishlist from '../models/Wishlist.js'
import Product from '../models/Product.js'
import { formatProduct } from './productController.js'

// Helper: resolve wishlist for user or guest
const resolveWishlist = async (req) => {
  const userId = req.user?._id || req.user?.id || null
  const guestId = req.headers['x-guest-id'] || req.query.guestId || req.body.guestId || null

  if (!userId && !guestId) return null

  const query = userId ? { user: userId } : { guestId }
  let list = await Wishlist.findOne(query).populate('items.product')

  if (!list) {
    list = new Wishlist({
      user: userId,
      guestId: userId ? null : guestId,
      items: [],
    })
  }

  return list
}

// 1. GET /api/wishlist — Get wishlist items
export const getWishlist = async (req, res, next) => {
  try {
    const list = await resolveWishlist(req)
    if (!list) {
      return res.json({ success: true, data: [] })
    }

    const validItems = list.items
      .filter((i) => i.product && i.product.isActive)
      .map((i) => ({
        _id: i._id,
        addedAt: i.addedAt,
        product: formatProduct(i.product),
      }))

    res.json({ success: true, data: validItems, count: validItems.length })
  } catch (err) {
    next(err)
  }
}

// 2. POST /api/wishlist — Toggle item in wishlist
export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' })
    }

    const product = await Product.findById(productId)
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    const list = await resolveWishlist(req)
    if (!list) {
      return res.status(400).json({ success: false, message: 'Session ID or Login required' })
    }

    const existingIndex = list.items.findIndex(
      (item) => String(item.product._id || item.product) === String(productId)
    )

    let added = false
    if (existingIndex > -1) {
      list.items.splice(existingIndex, 1)
      added = false
    } else {
      list.items.push({ product: product._id, addedAt: new Date() })
      added = true
    }

    await list.save()
    await list.populate('items.product')

    const validItems = list.items
      .filter((i) => i.product && i.product.isActive)
      .map((i) => ({
        _id: i._id,
        addedAt: i.addedAt,
        product: formatProduct(i.product),
      }))

    res.json({
      success: true,
      added,
      message: added ? 'Added to wishlist' : 'Removed from wishlist',
      data: validItems,
      count: validItems.length,
    })
  } catch (err) {
    next(err)
  }
}

// 3. DELETE /api/wishlist/:productId — Remove item from wishlist
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params
    const list = await resolveWishlist(req)

    if (list) {
      list.items = list.items.filter(
        (i) => String(i.product._id || i.product) !== String(productId)
      )
      await list.save()
      await list.populate('items.product')
    }

    const validItems = (list?.items || [])
      .filter((i) => i.product && i.product.isActive)
      .map((i) => ({
        _id: i._id,
        addedAt: i.addedAt,
        product: formatProduct(i.product),
      }))

    res.json({
      success: true,
      message: 'Removed from wishlist',
      data: validItems,
      count: validItems.length,
    })
  } catch (err) {
    next(err)
  }
}
