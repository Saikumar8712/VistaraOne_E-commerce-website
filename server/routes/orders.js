import { Router } from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// All order routes require authentication
router.use(protect)

router.post('/', createOrder)
router.get('/myorders', getMyOrders)
router.get('/:id', getOrderById)
router.put('/:id/cancel', cancelOrder)

export default router
