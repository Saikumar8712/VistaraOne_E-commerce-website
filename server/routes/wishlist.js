import { Router } from 'express'
import {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js'

const router = Router()

// GET wishlist items
router.get('/', getWishlist)

// POST toggle product in wishlist
router.post('/', toggleWishlist)

// DELETE remove product from wishlist
router.delete('/:productId', removeFromWishlist)

export default router
