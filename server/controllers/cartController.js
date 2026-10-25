import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

// Helper: resolve cart document for current request (User or Guest)
const resolveCart = async (req) => {
  const userId = req.user?._id || req.user?.id || null
  const guestId = req.headers['x-guest-id'] || req.query.guestId || req.body.guestId || null

  if (!userId && !guestId) {
    return null
  }

  const query = userId ? { user: userId } : { guestId }
  let cart = await Cart.findOne(query).populate('items.product')

  if (!cart) {
    cart = new Cart({
      user: userId,
      guestId: userId ? null : guestId,
      items: [],
    })
  }

  return cart
}

// Helper: Recalculate cart pricing and check live stock authoritative data
export const computeCartDetails = (cart) => {
  if (!cart) {
    return {
      items: [],
      summary: { subtotal: 0, originalTotal: 0, discount: 0, deliveryFee: 0, total: 0, itemCount: 0 },
      warnings: [],
    }
  }

  let subtotal = 0
  let originalTotal = 0
  let itemCount = 0
  const warnings = []
  const computedItems = []

  for (const item of cart.items) {
    const product = item.product
    if (!product || !product.isActive) {
      warnings.push(`An item in your cart is no longer available and was excluded from checkout.`)
      computedItems.push({
        _id: item._id,
        productId: product?._id || item.product,
        name: product?.name || 'Unavailable Product',
        image: product?.images?.[0] || '',
        price: item.price,
        originalPrice: item.price,
        quantity: item.quantity,
        isUnavailable: true,
      })
      continue
    }

    // Determine variant and current live authoritative price & stock
    let currentLivePrice = product.price
    let currentLiveMRP = product.originalPrice || product.price
    let availableStock = product.stock
    let variantObj = null

    if (item.variantId && product.variants?.length > 0) {
      variantObj = product.variants.find((v) => String(v._id) === String(item.variantId))
      if (variantObj) {
        currentLivePrice = variantObj.price || product.price
        currentLiveMRP = variantObj.originalPrice || product.originalPrice || currentLivePrice
        availableStock = variantObj.stock !== undefined ? variantObj.stock : product.stock
      }
    }

    // Check if price changed while in cart
    const priceChanged = Number(item.price) !== Number(currentLivePrice)
    if (priceChanged) {
      warnings.push(
        `Price for "${product.name}" updated from ₹${item.price.toLocaleString()} to ₹${currentLivePrice.toLocaleString()}`
      )
    }

    // Check stock availability
    const outOfStock = availableStock < 1
    const stockShortage = item.quantity > availableStock

    if (outOfStock) {
      warnings.push(`"${product.name}" is currently out of stock.`)
    } else if (stockShortage) {
      warnings.push(`Only ${availableStock} units available for "${product.name}". Please adjust quantity.`)
    }

    const itemTotal = currentLivePrice * item.quantity
    const itemOriginalTotal = currentLiveMRP * item.quantity

    subtotal += itemTotal
    originalTotal += itemOriginalTotal
    itemCount += item.quantity

    computedItems.push({
      _id: item._id,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      image: product.images?.[0] || '',
      price: currentLivePrice,
      originalPrice: currentLiveMRP,
      recordedPrice: item.price,
      priceChanged,
      quantity: item.quantity,
      variantId: item.variantId,
      variantName: item.variantName || variantObj?.name || '',
      availableStock,
      outOfStock,
      stockShortage,
      itemTotal,
    })
  }

  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 49
  const discount = Math.max(0, originalTotal - subtotal)
  const total = subtotal + deliveryFee

  return {
    _id: cart._id,
    items: computedItems,
    summary: {
      subtotal,
      originalTotal,
      discount,
      deliveryFee,
      freeDeliveryThreshold: 499,
      total,
      itemCount,
    },
    warnings,
  }
}

// 1. GET /api/cart — Retrieve user or guest cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await resolveCart(req)
    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          summary: { subtotal: 0, originalTotal: 0, discount: 0, deliveryFee: 0, total: 0, itemCount: 0 },
          warnings: [],
        },
      })
    }

    const details = computeCartDetails(cart)
    res.json({ success: true, data: details })
  } catch (err) {
    next(err)
  }
}

// 2. POST /api/cart — Add product/variant to cart with live stock validation
export const addToCart = async (req, res, next) => {
  try {
    const { productId, variantId, variantName, quantity = 1 } = req.body

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' })
    }

    const qty = Math.max(1, parseInt(quantity, 10))
    const product = await Product.findById(productId)

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not available' })
    }

    // Determine variant & live price
    let activePrice = product.price
    let availableStock = product.stock

    if (variantId && product.variants?.length > 0) {
      const v = product.variants.find((v) => String(v._id) === String(variantId))
      if (v) {
        activePrice = v.price || product.price
        availableStock = v.stock !== undefined ? v.stock : product.stock
      }
    }

    if (availableStock < 1) {
      return res.status(400).json({ success: false, message: 'Product is currently out of stock' })
    }

    const cart = await resolveCart(req)
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Session ID or Login required' })
    }

    // Check if item with same productId and variantId already exists in cart
    const existingIndex = cart.items.findIndex(
      (item) =>
        String(item.product._id || item.product) === String(productId) &&
        String(item.variantId || '') === String(variantId || '')
    )

    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + qty
      if (newQty > availableStock) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more. Only ${availableStock} units available in stock.`,
        })
      }
      cart.items[existingIndex].quantity = newQty
      cart.items[existingIndex].price = activePrice // update to latest price
    } else {
      if (qty > availableStock) {
        return res.status(400).json({
          success: false,
          message: `Cannot add ${qty} units. Only ${availableStock} available.`,
        })
      }
      cart.items.push({
        product: product._id,
        variantId: variantId || null,
        variantName: variantName || '',
        quantity: qty,
        price: activePrice,
      })
    }

    await cart.save()
    await cart.populate('items.product')

    const details = computeCartDetails(cart)
    res.json({
      success: true,
      message: 'Product added to cart',
      data: details,
    })
  } catch (err) {
    next(err)
  }
}

// 3. PUT /api/cart/:itemId — Update quantity
export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const { quantity } = req.body

    const cart = await resolveCart(req)
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    const item = cart.items.id(itemId)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart line item not found' })
    }

    const newQty = parseInt(quantity, 10)
    if (newQty < 1) {
      // Remove item if quantity < 1
      cart.items.pull(itemId)
    } else {
      // Validate live inventory
      const product = await Product.findById(item.product)
      if (product) {
        let availableStock = product.stock
        if (item.variantId && product.variants?.length > 0) {
          const v = product.variants.find((v) => String(v._id) === String(item.variantId))
          if (v && v.stock !== undefined) availableStock = v.stock
        }
        if (newQty > availableStock) {
          return res.status(400).json({
            success: false,
            message: `Only ${availableStock} units available in stock.`,
          })
        }
      }
      item.quantity = newQty
    }

    await cart.save()
    await cart.populate('items.product')

    const details = computeCartDetails(cart)
    res.json({ success: true, message: 'Cart updated', data: details })
  } catch (err) {
    next(err)
  }
}

// 4. DELETE /api/cart/:itemId — Remove line item
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const cart = await resolveCart(req)

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    cart.items.pull(itemId)
    await cart.save()
    await cart.populate('items.product')

    const details = computeCartDetails(cart)
    res.json({ success: true, message: 'Item removed from cart', data: details })
  } catch (err) {
    next(err)
  }
}

// 5. DELETE /api/cart — Clear entire cart
export const clearCart = async (req, res, next) => {
  try {
    const cart = await resolveCart(req)
    if (cart) {
      cart.items = []
      await cart.save()
    }
    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: computeCartDetails(null),
    })
  } catch (err) {
    next(err)
  }
}

// 6. POST /api/cart/merge — Merge guest cart into authenticated user cart
export const mergeGuestCart = async (req, res, next) => {
  try {
    const { guestId } = req.body
    const userId = req.user?._id || req.user?.id

    if (!userId || !guestId) {
      return res.status(400).json({ success: false, message: 'Both user auth and guestId required to merge' })
    }

    const guestCart = await Cart.findOne({ guestId })
    if (!guestCart || guestCart.items.length === 0) {
      return res.json({ success: true, message: 'No guest cart to merge' })
    }

    let userCart = await Cart.findOne({ user: userId })
    if (!userCart) {
      userCart = new Cart({ user: userId, items: [] })
    }

    for (const gItem of guestCart.items) {
      const matchIndex = userCart.items.findIndex(
        (uItem) =>
          String(uItem.product) === String(gItem.product) &&
          String(uItem.variantId || '') === String(gItem.variantId || '')
      )
      if (matchIndex > -1) {
        userCart.items[matchIndex].quantity += gItem.quantity
      } else {
        userCart.items.push(gItem)
      }
    }

    await userCart.save()
    await Cart.deleteOne({ _id: guestCart._id }) // Clean up merged guest cart
    await userCart.populate('items.product')

    res.json({
      success: true,
      message: 'Guest cart merged successfully',
      data: computeCartDetails(userCart),
    })
  } catch (err) {
    next(err)
  }
}
