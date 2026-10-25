import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    variantName: {
      type: String,
      default: '',
    },
    variantId: {
      type: String,
      default: null,
    },
  },
  { _id: true }
)

const shippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine: { type: String, required: true },
    locality: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    addressType: { type: String, default: 'home' },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'TestSandbox', 'Razorpay', 'UPI'],
      default: 'COD',
    },
    paymentResult: {
      id: { type: String, default: '' },
      status: { type: String, default: 'Pending' },
      updateTime: { type: Date },
      emailAddress: { type: String },
    },
    pricing: {
      itemsPrice: { type: Number, required: true, min: 0 },
      deliveryFee: { type: Number, required: true, default: 0 },
      discount: { type: Number, default: 0 },
      couponDiscount: { type: Number, default: 0 },
      couponCode: { type: String, default: '' },
      totalPrice: { type: Number, required: true, min: 0 },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    orderStatus: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Shipped', 'OutForDelivery', 'Delivered', 'Cancelled'],
      default: 'Placed',
    },
    timeline: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        comment: { type: String, default: '' },
      },
    ],
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

orderSchema.index({ user: 1, createdAt: -1 })

export default mongoose.model('Order', orderSchema)
