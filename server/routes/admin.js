import express from 'express'
import {
  getDashboardStats,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminOrders,
  updateAdminOrderStatus,
} from '../controllers/adminController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// All routes require authenticated user with admin role
router.use(protect)
router.use(authorize('admin'))

router.get('/stats', getDashboardStats)
router.get('/products', getAdminProducts)
router.post('/products', createAdminProduct)
router.put('/products/:id', updateAdminProduct)
router.delete('/products/:id', deleteAdminProduct)
router.get('/orders', getAdminOrders)
router.put('/orders/:id/status', updateAdminOrderStatus)

export default router
