import User from '../models/User.js'
import Cart from '../models/Cart.js'
import Wishlist from '../models/Wishlist.js'

// Format user payload (ensures password hash is omitted)
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || '',
  role: user.role,
  addresses: user.addresses || [],
  createdAt: user.createdAt,
})

// Helper: merge guest cart into user cart upon login or registration
const mergeSessionData = async (userId, guestId) => {
  if (!guestId) return

  try {
    // 1. Merge Cart
    const guestCart = await Cart.findOne({ guestId })
    if (guestCart && guestCart.items.length > 0) {
      let userCart = await Cart.findOne({ user: userId })
      if (!userCart) {
        userCart = new Cart({ user: userId, items: [] })
      }

      for (const gItem of guestCart.items) {
        const matchIdx = userCart.items.findIndex(
          (u) =>
            String(u.product) === String(gItem.product) &&
            String(u.variantId || '') === String(gItem.variantId || '')
        )
        if (matchIdx > -1) {
          userCart.items[matchIdx].quantity += gItem.quantity
        } else {
          userCart.items.push(gItem)
        }
      }
      await userCart.save()
      await Cart.deleteOne({ _id: guestCart._id })
    }

    // 2. Merge Wishlist
    const guestWishlist = await Wishlist.findOne({ guestId })
    if (guestWishlist && guestWishlist.items.length > 0) {
      let userWishlist = await Wishlist.findOne({ user: userId })
      if (!userWishlist) {
        userWishlist = new Wishlist({ user: userId, items: [] })
      }

      for (const gItem of guestWishlist.items) {
        const exists = userWishlist.items.some(
          (u) => String(u.product) === String(gItem.product)
        )
        if (!exists) {
          userWishlist.items.push(gItem)
        }
      }
      await userWishlist.save()
      await Wishlist.deleteOne({ _id: guestWishlist._id })
    }
  } catch (err) {
    console.warn('[Auth] Guest data merge warning:', err.message)
  }
}

// 1. POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, guestId } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login.',
      })
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone?.trim() || '',
      role: 'customer',
      addresses: [],
    })

    const token = user.getSignedJwtToken()

    // Merge guest cart and wishlist
    if (guestId) {
      await mergeSessionData(user._id, guestId)
    }

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: formatUser(user),
    })
  } catch (err) {
    next(err)
  }
}

// 2. POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { emailOrPhone, email, password, guestId } = req.body
    const identifier = (emailOrPhone || email || '').trim().toLowerCase()

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/phone and password',
      })
    }

    // Support login via email or mobile phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.',
      })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.',
      })
    }

    const token = user.getSignedJwtToken()

    // Merge guest cart and wishlist
    if (guestId) {
      await mergeSessionData(user._id, guestId)
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: formatUser(user),
    })
  } catch (err) {
    next(err)
  }
}

// 3. GET /api/auth/me — Current user profile
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({
      success: true,
      user: formatUser(user),
    })
  } catch (err) {
    next(err)
  }
}

// 4. PUT /api/auth/profile — Update name or phone
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    if (name) user.name = name.trim()
    if (phone !== undefined) user.phone = phone.trim()

    await user.save()
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: formatUser(user),
    })
  } catch (err) {
    next(err)
  }
}

// 5. POST /api/auth/addresses — Add new delivery address
export const addAddress = async (req, res, next) => {
  try {
    const { name, phone, pincode, locality, addressLine, city, state, landmark, addressType, isDefault } =
      req.body

    if (!name || !phone || !pincode || !addressLine || !city || !state) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, pincode, address, city, and state are required',
      })
    }

    const user = await User.findById(req.user._id)

    // If marked default or first address, set others as not default
    const shouldBeDefault = isDefault || user.addresses.length === 0
    if (shouldBeDefault) {
      user.addresses.forEach((a) => (a.isDefault = false))
    }

    user.addresses.push({
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      locality: locality?.trim() || '',
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state.trim(),
      landmark: landmark?.trim() || '',
      addressType: addressType === 'work' ? 'work' : 'home',
      isDefault: shouldBeDefault,
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      addresses: user.addresses,
    })
  } catch (err) {
    next(err)
  }
}

// 6. DELETE /api/auth/addresses/:addressId — Delete delivery address
export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params
    const user = await User.findById(req.user._id)

    user.addresses.pull(addressId)
    await user.save()

    res.json({
      success: true,
      message: 'Address deleted successfully',
      addresses: user.addresses,
    })
  } catch (err) {
    next(err)
  }
}
