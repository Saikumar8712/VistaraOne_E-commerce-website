import { Router } from 'express'
import {
  register,
  login,
  getMe,
  updateProfile,
  addAddress,
  deleteAddress,
} from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// Public Auth Endpoints
router.post('/register', register)
router.post('/login', login)

// Protected User Profile & Address Endpoints
router.get('/me', protect, getMe)
router.put('/profile', protect, updateProfile)
router.post('/addresses', protect, addAddress)
router.delete('/addresses/:addressId', protect, deleteAddress)

export default router
