import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Campaign name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: [0, 'Discount must be positive'],
    },
    maxDiscount: {
      type: Number,
      default: null, // Cap for percentage discounts (e.g. Max ₹1,000)
    },
    minCartValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, 'Campaign end date is required'],
    },
    bannerText: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'FESTIVAL', // e.g. 'DIWALI', 'DASARA', 'WEEKEND'
    },
    usageLimit: {
      type: Number,
      default: 10000,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Campaign', campaignSchema)
