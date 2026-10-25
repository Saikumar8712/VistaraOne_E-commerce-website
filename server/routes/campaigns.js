import express from 'express'
import {
  getActiveCampaigns,
  validateCoupon,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getActiveCampaigns)
router.post('/validate-coupon', validateCoupon)

router.post('/', protect, authorize('admin'), createCampaign)
router.put('/:id', protect, authorize('admin'), updateCampaign)
router.delete('/:id', protect, authorize('admin'), deleteCampaign)

export default router
