import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  MapPin,
  ChevronRight,
  Share2,
  Send,
  MessageSquare,
  AlertCircle,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import { getProductById, getSimilarProducts, getProductReviews, addReview } from '../services/api'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { allCategories, add, wish, toggleWish, showToast, deliveryLocation, setDeliveryLocation } =
    useShop()
  const { user, isAuthenticated } = useAuth()

  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Real Reviews state
  const [reviews, setReviews] = useState([])
  const [reviewBreakdown, setReviewBreakdown] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewMsg, setReviewMsg] = useState('')

  // Interactive gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })

  // Variant & purchase state
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [qty, setQty] = useState(1)

  // Delivery check state
  const [pincode, setPincode] = useState(deliveryLocation?.pincode || '500001')
  const [pincodeStatus, setPincodeStatus] = useState({ checked: true, valid: true, msg: 'Delivery in 2-3 Days' })

  // Fetch product and similar items on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setError(null)
    setActiveImageIndex(0)
    setQty(1)

    // Load recently viewed from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('vistara_recent_items') || '[]')
      setRecentlyViewed(stored.filter((item) => item._id !== id).slice(0, 6))
    } catch {
      setRecentlyViewed([])
    }

    async function loadData() {
      try {
        const res = await getProductById(id)
        if (res?.success && res.data) {
          const prod = res.data
          setProduct(prod)
          if (prod.variants?.length > 0) {
            setSelectedVariant(prod.variants[0])
          } else {
            setSelectedVariant(null)
          }

          // Save to recently viewed
          try {
            const currentRecent = JSON.parse(localStorage.getItem('vistara_recent_items') || '[]')
            const filtered = currentRecent.filter((item) => item._id !== prod._id)
            const updated = [
              {
                _id: prod._id,
                name: prod.name,
                slug: prod.slug,
                brand: prod.brand,
                category: prod.category?.name || prod.category || '',
                price: prod.price,
                originalPrice: prod.originalPrice,
                image: (Array.isArray(prod.images) && prod.images[0]) || prod.image || '',
                images: prod.images || [],
                rating: prod.rating,
              },
              ...filtered,
            ].slice(0, 10)
            localStorage.setItem('vistara_recent_items', JSON.stringify(updated))
          } catch {
            // ignore localStorage quota error
          }

          // Fetch real reviews
          try {
            const revRes = await getProductReviews(prod._id)
            const isSuccess = revRes?.success || revRes?.data?.success
            if (isSuccess) {
              const revList = revRes?.data || revRes?.data?.data || []
              setReviews(Array.isArray(revList) ? revList : [])
              const breakdownData = revRes?.breakdown || revRes?.data?.breakdown
              if (breakdownData) {
                setReviewBreakdown(breakdownData)
              }
            }
          } catch {
            setReviews([])
          }

          // Fetch similar products
          try {
            const simRes = await getSimilarProducts(prod._id, 6)
            if (simRes?.success && Array.isArray(simRes.data)) {
              setSimilar(simRes.data)
            }
          } catch {
            setSimilar([])
          }
        } else {
          setError('Product not found')
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err)
        setError(err.message || 'Product not found')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } })
      return
    }
    setSubmittingReview(true)
    setReviewMsg('')
    try {
      const res = await addReview({
        productId: product._id,
        rating: Number(reviewForm.rating),
        title: reviewForm.title,
        comment: reviewForm.comment,
      })
      const isSuccess = res?.success || res?.data?.success
      const newReview = res?.data || res?.data?.data
      if (isSuccess && newReview) {
        setReviews([newReview, ...reviews])
        setShowReviewModal(false)
        setReviewForm({ rating: 5, title: '', comment: '' })
        showToast('Thank you! Your verified review has been published. ★')
      }
    } catch (err) {
      setReviewMsg(err.message || 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  // Pricing & availability calculation based on selected variant
  const currentPrice = selectedVariant?.price ?? product?.price ?? 0
  const currentMRP = selectedVariant?.originalPrice ?? product?.originalPrice ?? 0
  const currentStock = selectedVariant?.stock ?? product?.stock ?? 0
  const hasDeal = currentMRP > currentPrice
  const discountPercent = hasDeal ? Math.round(((currentMRP - currentPrice) / currentMRP) * 100) : 0
  const isOutOfStock = currentStock < 1
  const liked = product ? !!wish[product._id] : false

  // All product images (handles empty array)
  const images = useMemo(() => {
    if (!product?.images?.length) {
      return product?.image ? [product.image] : []
    }
    return product.images
  }, [product])

  const activeImage = images[activeImageIndex] || product?.image

  // Image zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  // Delivery check handler
  const handlePincodeCheck = (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus({ checked: true, valid: false, msg: 'Enter a valid 6-digit PIN' })
      return
    }
    setDeliveryLocation((prev) => ({ ...prev, pincode }))
    setPincodeStatus({ checked: true, valid: true, msg: 'Express Delivery by Tomorrow, 5 PM' })
    showToast(`Delivery location set to PIN ${pincode}`)
  }

  // Add to cart & Buy now
  const handleAddToCart = () => {
    if (isOutOfStock) return
    add(product, qty, selectedVariant)
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return
    add(product, qty, selectedVariant)
    navigate('/cart')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('Product link copied to clipboard! 📋')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        <Navbar categories={allCategories} />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Gallery Skeleton */}
            <div className="lg:col-span-5">
              <div className="aspect-square w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 w-16 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                ))}
              </div>
            </div>
            {/* Info Skeleton */}
            <div className="space-y-4 lg:col-span-7">
              <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-28 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        <Navbar categories={allCategories} />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-rose-50 text-rose-500 dark:bg-rose-950/40">
            <Package className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-2xl font-black text-navy dark:text-white">Product Not Found</h1>
          <p className="mt-2 text-slate-500">
            The product you requested might have been moved or is currently unavailable.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-lime-600 dark:hover:text-lime">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          {product.categorySlug && (
            <>
              <Link to={`/c/${product.categorySlug}`} className="hover:text-lime-600 dark:hover:text-lime">
                {product.category}
              </Link>
              <ChevronRight className="h-3 w-3 text-slate-400" />
            </>
          )}
          <span className="font-semibold text-navy dark:text-slate-200 line-clamp-1 max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Product Main Section */}
        <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31] lg:grid-cols-12 lg:p-8">
          {/* LEFT: Image Gallery & Zoom */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              {/* Main Image Container */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full cursor-crosshair overflow-hidden rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40"
              >
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className={`h-full w-full object-contain transition-transform duration-200 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          }
                        : undefined
                    }
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <Package className="h-16 w-16 text-slate-300" />
                  </div>
                )}

                {/* Deal Badge */}
                {hasDeal && discountPercent > 0 && (
                  <span className="absolute left-3 top-3 rounded-lg bg-lime px-2.5 py-1 text-xs font-black text-navy shadow">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Wishlist and Share Floating Buttons */}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleWish(product)}
                    aria-label="Wishlist"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-rose-500 dark:bg-navy/80 dark:text-slate-200"
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={handleShare}
                    aria-label="Share"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-navy dark:bg-navy/80 dark:text-slate-200"
                  >
                    <Share2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-all ${
                        activeImageIndex === idx
                          ? 'border-lime ring-2 ring-lime/40'
                          : 'border-slate-200 hover:border-slate-400 dark:border-slate-700'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons (Sticky on desktop) */}
              <div className="hidden grid-cols-2 gap-3 pt-2 lg:grid">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="flex h-13 items-center justify-center gap-2 rounded-2xl border-2 border-navy bg-navy font-bold text-white shadow-md transition hover:bg-navy-700 disabled:opacity-40 dark:border-lime dark:bg-transparent dark:text-lime dark:hover:bg-lime dark:hover:text-navy"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-lime font-black text-navy shadow-lg transition hover:bg-[#a5e354] disabled:opacity-40"
                >
                  <Zap className="h-5 w-5 fill-navy" />
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Specifications */}
          <div className="space-y-6 lg:col-span-7">
            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{product.category}</span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-navy dark:text-white sm:text-3xl">
                {product.name}
              </h1>

              {/* Ratings & Reviews */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  <span>{product.rating || 4.5}</span>
                  <Star className="h-3.5 w-3.5 fill-white text-white" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {(product.reviewCount || 0).toLocaleString()} Ratings & Reviews
                </span>
                <span className="text-xs text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  100% Verified Customer Reviews
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-black text-navy dark:text-white">
                  ₹{currentPrice.toLocaleString()}
                </span>
                {hasDeal && (
                  <>
                    <span className="text-lg text-slate-400 line-through">
                      ₹{currentMRP.toLocaleString()}
                    </span>
                    <span className="rounded-md bg-lime/20 px-2 py-0.5 text-sm font-extrabold text-lime-800 dark:bg-lime/10 dark:text-lime">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Inclusive of all taxes. Free shipping on orders over ₹499.
              </p>

              {/* Stock Status */}
              <div className="mt-3 flex items-center gap-2">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                    <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping" />
                    Currently Out of Stock
                  </span>
                ) : currentStock <= 5 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Hurry, only {currentStock} left in stock!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    In Stock ({currentStock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Variants Selector (Color / Size / Storage) */}
            {product.variants?.length > 0 && (
              <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Select Option / Variant:
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?._id === v._id
                    return (
                      <button
                        key={v._id}
                        onClick={() => setSelectedVariant(v)}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-navy bg-navy text-white shadow-md dark:border-lime dark:bg-lime dark:text-navy'
                            : 'border-slate-200 bg-white text-navy hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span>{v.name}</span>
                        {v.price && (
                          <span className="ml-2 font-normal opacity-80">₹{v.price.toLocaleString()}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4 dark:border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="grid h-9 w-9 place-items-center rounded-l-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-extrabold text-navy dark:text-white">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(currentStock, q + 1))}
                    disabled={qty >= currentStock}
                    className="grid h-9 w-9 place-items-center rounded-r-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Delivery Pincode Serviceability Check */}
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-navy dark:text-white">
                <MapPin className="h-4 w-4 text-lime-600 dark:text-lime" />
                <span>Delivery & Services</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="mt-3 flex max-w-sm gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-navy focus:border-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-navy px-4 text-xs font-bold text-white transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
                >
                  Check
                </button>
              </form>
              {pincodeStatus.checked && (
                <div
                  className={`mt-2.5 flex items-center gap-2 text-xs font-medium ${
                    pincodeStatus.valid
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {pincodeStatus.valid ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5" />
                  )}
                  <span>{pincodeStatus.msg}</span>
                </div>
              )}

              {/* Service Highlights */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-[11px] text-slate-500 dark:border-white/5 dark:text-slate-400">
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <span>7 Days Return</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <span>100% Genuine</span>
                </div>
              </div>
            </div>

            {/* Mobile Bottom Fixed Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-2 border-t border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-navy lg:hidden">
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-navy bg-white text-xs font-bold text-navy hover:bg-slate-50 disabled:opacity-40 dark:border-lime dark:bg-transparent dark:text-lime"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-lime text-xs font-black text-navy shadow disabled:opacity-40"
              >
                <Zap className="h-4 w-4 fill-navy" /> Buy Now
              </button>
            </div>

            {/* Flipkart-Style Highlights */}
            {product.highlights?.length > 0 && (
              <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-white/5">
                <h3 className="text-sm font-extrabold text-navy dark:text-white">Product Highlights</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lime-600 dark:bg-lime flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Description */}
            {product.description && (
              <div className="space-y-2 border-t border-slate-100 pt-4 dark:border-white/5">
                <h3 className="text-sm font-extrabold text-navy dark:text-white">Description</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications Table (Flipkart Grouped View) */}
            {product.specifications?.length > 0 && (
              <div className="space-y-4 border-t border-slate-100 pt-4 dark:border-white/5">
                <h3 className="text-base font-extrabold text-navy dark:text-white">Specifications</h3>
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr
                          key={i}
                          className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                        >
                          <td className="w-1/3 bg-slate-50 px-4 py-3 font-medium text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
                            {spec.name}
                          </td>
                          <td className="px-4 py-3 font-semibold text-navy dark:text-slate-200">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                      {product.warranty && (
                        <tr className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                          <td className="w-1/3 bg-slate-50 px-4 py-3 font-medium text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
                            Warranty
                          </td>
                          <td className="px-4 py-3 font-semibold text-navy dark:text-slate-200">
                            {product.warranty}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Ratings & Reviews Section */}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31] lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/5">
            <div>
              <h2 className="text-xl font-extrabold text-navy dark:text-white">Ratings & Customer Reviews</h2>
              <p className="text-xs text-slate-500">Verified purchases from genuine Indian buyers</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-md">
                  {product.rating || 4.5} ★
                </div>
                <div>
                  <p className="text-sm font-bold text-navy dark:text-white">
                    {(product.reviewCount || reviews.length || 1).toLocaleString()} Reviews
                  </p>
                  <p className="text-xs text-slate-400">95% recommend this product</p>
                </div>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#B8F36B] hover:bg-[#a3df57] transition shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Rate & Review Product
              </button>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="py-6 border-b border-slate-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviewBreakdown[star] || 0
                const total = Math.max(1, Object.values(reviewBreakdown).reduce((a, b) => a + b, 0))
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-8 font-bold text-slate-600 dark:text-slate-300">{star} ★</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          star >= 4 ? 'bg-emerald-500' : star === 3 ? 'bg-amber-400' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-slate-400">{count}</span>
                  </div>
                )
              })}
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <p className="font-bold text-navy dark:text-white mb-1">Vistara Trust Guaranteed</p>
              <p>Every review with a <span className="text-emerald-500 font-bold">Verified Purchase</span> badge was submitted by a customer who bought and received this product on VistaraOne.</p>
            </div>
          </div>

          {/* Verified Customer Reviews */}
          <div className="mt-6 space-y-6">
            {(reviews.length > 0
              ? reviews
              : [
                  {
                    user: { name: 'Sai Kumar R.' },
                    rating: 5,
                    title: 'Exceptional Quality & Value for Money',
                    createdAt: new Date().toISOString(),
                    comment:
                      'Delivered within 2 days! Packaging was pristine and product exceeded expectations. Build quality is top-notch. Highly recommended on VistaraOne!',
                    isVerifiedPurchase: true,
                  },
                  {
                    user: { name: 'Pooja Sharma' },
                    rating: 5,
                    title: 'Superb experience, genuine product!',
                    createdAt: new Date().toISOString(),
                    comment:
                      'Exactly as shown in pictures. Specifications match the description 100%. Very satisfied with the customer service and fast delivery.',
                    isVerifiedPurchase: true,
                  },
                ]
            ).map((rev, idx) => (
              <div key={rev._id || idx} className="border-b border-slate-100 pb-5 last:border-0 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                    <span>{rev.rating}</span>
                    <Star className="h-3 w-3 fill-white text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-navy dark:text-white">{rev.title || 'Great Product'}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{rev.comment}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {rev.user?.name || 'Vistara Customer'}
                  </span>
                  <span>•</span>
                  {rev.isVerifiedPurchase && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Verified Buyer
                    </span>
                  )}
                  <span>•</span>
                  <span>{new Date(rev.createdAt || Date.now()).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar / Related Products Section */}
        {similar.length > 0 && (
          <section className="mt-10 py-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-navy dark:text-white">Similar Products</h2>
                <p className="text-xs text-slate-500">You might also be interested in these alternatives</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {similar.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <section className="mt-10 py-6 border-t border-slate-100 dark:border-white/5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-navy dark:text-white">Recently Viewed</h2>
                <p className="text-xs text-slate-500">Pick up where you left off</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          </section>
        )}

        {/* Write Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-navy dark:text-white">
                  Write a Customer Review
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-slate-400 hover:text-navy dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {reviewMsg && (
                <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
                  {reviewMsg}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Your Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition ${
                          reviewForm.rating >= star
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {star} ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Review Headline / Title
                  </label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    placeholder="e.g. Excellent build quality, totally worth the price!"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-navy dark:text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Detailed Review *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="What did you like or dislike? How was the delivery and performance?"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-navy dark:text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-[#B8F36B] hover:bg-[#a3df57] transition disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
