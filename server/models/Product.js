import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema(
  {
    variantType: {
      type: String, // 'color', 'storage', 'size', 'ram'
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    sku: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { _id: true }
)

const specificationSchema = new mongoose.Schema(
  {
    group: {
      type: String, // e.g. "General", "Display", "Processor & Memory", "Camera"
      required: true,
      trim: true,
      default: 'General',
    },
    name: {
      type: String, // e.g. "Model Name", "Screen Size", "RAM"
      required: true,
      trim: true,
    },
    value: {
      type: String, // e.g. "Galaxy S24 Ultra", "6.8 Inch QHD+", "12 GB"
      required: true,
      trim: true,
    },
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    price: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Price must be positive'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price (MRP) must be positive'],
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    sku: {
      type: String,
      trim: true,
      sparse: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    highlights: {
      type: [String],
      default: [],
    },
    specifications: {
      type: [specificationSchema],
      default: [],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
    warranty: {
      type: String,
      default: '1 Year Brand Warranty',
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Pre-save calculate discount percentage if not provided
productSchema.pre('save', function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    this.discountPercent = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    )
  } else {
    this.discountPercent = 0
  }
})

// Virtual helper for inStock
productSchema.virtual('inStock').get(function () {
  return this.stock > 0
})

// Database Indexes for performant search, category browsing, and sorting
productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' })
productSchema.index({ category: 1, price: 1 })
productSchema.index({ category: 1, rating: -1 })
productSchema.index({ brand: 1 })
productSchema.index({ isActive: 1, createdAt: -1 })
productSchema.index({ isFeatured: 1, isActive: 1 })
productSchema.index({ isBestseller: 1, isActive: 1 })

export default mongoose.model('Product', productSchema)
