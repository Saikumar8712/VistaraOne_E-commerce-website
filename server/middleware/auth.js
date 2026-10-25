import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Protect routes: verify JWT in Bearer header
export const protect = async (req, res, next) => {
  let token = null

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please login.',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'vistaraone_jwt_fallback_secret_key_2026'
    )
    const user = await User.findById(decoded.id).select('-password')

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account not found or deactivated.',
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please login again.',
    })
  }
}

// Optional Auth: attaches user if token is provided, but does not block guest sessions
export const optionalAuth = async (req, res, next) => {
  let token = null

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'vistaraone_jwt_fallback_secret_key_2026'
      )
      const user = await User.findById(decoded.id).select('-password')
      if (user && user.isActive) {
        req.user = user
      }
    } catch {
      // Ignore token errors in optional auth
    }
  }
  next()
}

// Authorize roles (e.g. 'admin')
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user?.role || 'guest'}' is not authorized to perform this operation.`,
      })
    }
    next()
  }
}
