import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeGuestCart,
} from '../controllers/cartController.js'

const router = Router()

// GET cart details
router.get('/', getCart)

// POST add item to cart
router.post('/', addToCart)

// PUT update quantity of an item
router.put('/:itemId', updateCartItem)

// DELETE remove single item
router.delete('/:itemId', removeFromCart)

// DELETE clear all items
router.delete('/', clearCart)

// POST merge guest cart
router.post('/merge', mergeGuestCart)

export default router
