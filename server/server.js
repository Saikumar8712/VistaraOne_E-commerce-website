import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/db.js'
import categoryRoutes from './routes/categories.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import wishlistRoutes from './routes/wishlist.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'
import campaignRoutes from './routes/campaigns.js'
import adminRoutes from './routes/admin.js'
import reviewRoutes from './routes/reviews.js'
import { optionalAuth } from './middleware/auth.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

// Security HTTP headers
app.use(helmet())

// Flexible CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(null, true) // permissive in local development
    },
    credentials: true,
  })
)

// Body parser
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))

// Rate limiting for API protection
const isDev = process.env.NODE_ENV !== 'production'
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: isDev ? 50000 : 10000,
    skip: (req) => isDev || req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === 'localhost',
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
)

// Health check endpoint
app.get('/api/health', (_, res) =>
  res.json({
    ok: true,
    name: 'VistaraOne E-Commerce API',
    status: 'operational',
    timestamp: new Date().toISOString(),
  })
)

// Mount API routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', optionalAuth, cartRoutes)
app.use('/api/wishlist', optionalAuth, wishlistRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/reviews', reviewRoutes)

// Centralized error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Initialize database and start listening only if executed directly
const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('server.js')

if (isMain) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[VistaraOne API] Running on http://localhost:${PORT}`)
      })
    })
    .catch((err) => {
      console.error('[VistaraOne API] Startup error:', err.message)
      process.exit(1)
    })
}

export default app
