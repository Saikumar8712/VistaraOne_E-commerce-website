import { Router } from 'express'
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getSimilarProducts,
  getFilterMeta,
} from '../controllers/productController.js'

const router = Router()

// List products with filtering, search, sorting, and pagination
router.get('/', getProducts)

// Get dynamic filter metadata (available brands, price ranges)
router.get('/filters/meta', getFilterMeta)

// Get single product by slug
router.get('/slug/:slug', getProductBySlug)

// Get similar products
router.get('/:id/similar', getSimilarProducts)

// Get single product by ID (or fallback to slug)
router.get('/:id', getProductById)

export default router
