import { Router } from 'express'
import {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
} from '../controllers/categoryController.js'

const router = Router()

// List all active categories
router.get('/', getCategories)

// Products within a category slug
router.get('/:slug/products', getCategoryProducts)

// Single category detail by slug
router.get('/:slug', getCategoryBySlug)

export default router
