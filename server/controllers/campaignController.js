import Campaign from '../models/Campaign.js'

// 1. GET /api/campaigns — Active public campaigns and promo banners
export const getActiveCampaigns = async (req, res, next) => {
  try {
    const now = new Date()
    const campaigns = await Campaign.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .sort('endDate')
      .lean()

    res.json({
      success: true,
      data: campaigns,
    })
  } catch (err) {
    next(err)
  }
}

// 2. POST /api/campaigns/validate-coupon — Server-side coupon code calculation
export const validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal = 0 } = req.body

    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' })
    }

    const cleanCode = code.toUpperCase().trim()
    const now = new Date()

    const campaign = await Campaign.findOne({
      code: cleanCode,
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired coupon code',
      })
    }

    if (cartTotal < campaign.minCartValue) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum cart value of ₹${campaign.minCartValue.toLocaleString()}`,
      })
    }

    if (campaign.usageLimit && campaign.usageCount >= campaign.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'This coupon has reached its maximum redemption limit',
      })
    }

    let discountAmount = 0
    if (campaign.discountType === 'percentage') {
      discountAmount = Math.round((cartTotal * campaign.discountValue) / 100)
      if (campaign.maxDiscount && discountAmount > campaign.maxDiscount) {
        discountAmount = campaign.maxDiscount
      }
    } else {
      discountAmount = campaign.discountValue
    }

    // Discount cannot exceed cart value
    discountAmount = Math.min(discountAmount, cartTotal)

    res.json({
      success: true,
      message: `Coupon "${campaign.code}" applied successfully!`,
      data: {
        code: campaign.code,
        name: campaign.name,
        discountType: campaign.discountType,
        discountValue: campaign.discountValue,
        discountAmount,
        finalTotal: Math.max(0, cartTotal - discountAmount),
      },
    })
  } catch (err) {
    next(err)
  }
}

// 3. POST /api/campaigns — Admin: Create new festival campaign
export const createCampaign = async (req, res, next) => {
  try {
    const { name, code, description, discountType, discountValue, maxDiscount, minCartValue, startDate, endDate, bannerText, tag } = req.body

    if (!name || !code || !discountValue || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Name, code, discount value, and end date are required',
      })
    }

    const campaign = await Campaign.create({
      name: name.trim(),
      code: code.toUpperCase().trim(),
      description: description?.trim() || '',
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      minCartValue: minCartValue ? Number(minCartValue) : 0,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: new Date(endDate),
      bannerText: bannerText?.trim() || '',
      tag: tag || 'FESTIVAL',
    })

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign,
    })
  } catch (err) {
    next(err)
  }
}

// 4. PUT /api/campaigns/:id — Admin: Update campaign
export const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    })
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' })
    }
    res.json({ success: true, message: 'Campaign updated', data: campaign })
  } catch (err) {
    next(err)
  }
}

// 5. DELETE /api/campaigns/:id — Admin: Delete campaign
export const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id)
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' })
    }
    res.json({ success: true, message: 'Campaign deleted successfully' })
  } catch (err) {
    next(err)
  }
}
