import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Heart,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Package,
  Zap,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Navbar from '../components/Navbar'

export default function Cart() {
  const navigate = useNavigate()
  const {
    allCategories,
    cartItems,
    cartSummary,
    cartWarnings,
    cartLoading,
    count,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWish,
    showToast,
  } = useShop()

  const { subtotal, originalTotal, discount, deliveryFee, total, freeDeliveryThreshold } =
    cartSummary

  const freeDeliveryShortage = Math.max(0, freeDeliveryThreshold - subtotal)

  const handleMoveToWishlist = async (item) => {
    if (!item?.productId) return
    await toggleWish({ _id: item.productId, name: item.name })
    await removeFromCart(item._id)
    showToast(`Moved ${item.name} to Wishlist ❤️`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Cart Page Title */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-navy dark:text-white sm:text-3xl">
              Shopping Cart
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {count} {count === 1 ? 'item' : 'items'} in your cart (Server verified prices & stock)
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-500 transition hover:text-rose-700 hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Server Warnings Banner (Price updates, stock changes) */}
        {cartWarnings?.length > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Cart Updates
                </h4>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-amber-700 dark:text-amber-400">
                  {cartWarnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-16 text-center shadow-sm dark:bg-[#131d31]"
          >
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-slate-50 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500">
              <ShoppingBag className="h-12 w-12" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-navy dark:text-white">Your Cart is Empty</h2>
            <p className="mt-2 text-sm text-slate-500">
              Looks like you haven't added anything to your cart yet. Explore our top deals and fresh arrivals!
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy px-8 py-3.5 text-xs font-extrabold text-white shadow-lg transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
            >
              <ArrowLeft className="h-4 w-4" /> Start Shopping
            </button>
          </motion.div>
        ) : (
          /* Cart Grid: Items (Left) + Price Summary (Right) */
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left: Cart Items (8 cols) */}
            <div className="space-y-4 lg:col-span-8">
              {/* Free Delivery Banner Indicator */}
              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#131d31]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime/20 text-lime-700 dark:bg-lime/10 dark:text-lime flex-shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  {freeDeliveryShortage > 0 ? (
                    <>
                      <p className="text-xs font-bold text-navy dark:text-slate-200">
                        Add <span className="text-lime-700 dark:text-lime font-black">₹{freeDeliveryShortage.toLocaleString()}</span> more to get <span className="font-black text-emerald-600 dark:text-emerald-400">FREE Delivery</span>!
                      </p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full bg-lime transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> You've unlocked FREE Delivery on this order!
                    </p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-[#131d31] sm:flex-row sm:items-start"
                  >
                    {/* Product Image */}
                    <div
                      onClick={() => navigate(`/product/${item.slug || item.productId}`)}
                      className="aspect-square h-28 w-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-slate-50 p-2 dark:bg-slate-800/40"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="grid h-full place-items-center">
                          <Package className="h-8 w-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-1 flex-col justify-between self-stretch">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {item.brand}
                            </span>
                            <h3
                              onClick={() => navigate(`/product/${item.slug || item.productId}`)}
                              className="cursor-pointer text-sm font-bold text-navy hover:text-lime-600 dark:text-slate-100 dark:hover:text-lime line-clamp-2"
                            >
                              {item.name}
                            </h3>
                          </div>
                          <span className="text-base font-black text-navy dark:text-white">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Variant info */}
                        {item.variantName && (
                          <div className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            Option: {item.variantName}
                          </div>
                        )}

                        {/* Price Change Warning */}
                        {item.priceChanged && (
                          <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                            Price changed from ₹{item.recordedPrice} to ₹{item.price}
                          </p>
                        )}

                        {/* Stock warning */}
                        {item.outOfStock ? (
                          <span className="mt-1.5 inline-block text-xs font-bold text-rose-600">
                            ⚠️ Out of stock
                          </span>
                        ) : item.stockShortage ? (
                          <span className="mt-1.5 inline-block text-xs font-bold text-amber-600">
                            ⚠️ Only {item.availableStock} available
                          </span>
                        ) : (
                          <span className="mt-1.5 inline-block text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Bottom Controls: Quantity + Remove + Wishlist */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-white/5">
                        {/* Quantity Counter */}
                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                          <button
                            onClick={() => updateQty(item._id, item.quantity - 1)}
                            disabled={cartLoading}
                            aria-label="Decrease quantity"
                            className="grid h-8 w-8 place-items-center text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-30 rounded-l-xl"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-black text-navy dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.quantity + 1)}
                            disabled={cartLoading || (item.availableStock && item.quantity >= item.availableStock)}
                            aria-label="Increase quantity"
                            className="grid h-8 w-8 place-items-center text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-30 rounded-r-xl"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center gap-1 text-slate-500 hover:text-navy dark:text-slate-400 dark:hover:text-white"
                          >
                            <Heart className="h-3.5 w-3.5" />
                            <span>Save for later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="flex items-center gap-1 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary Box (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
                <h3 className="border-b border-slate-100 pb-4 text-base font-black uppercase tracking-wider text-navy dark:border-white/5 dark:text-white">
                  Price Details
                </h3>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Price ({count} items)</span>
                    <span className="font-semibold text-navy dark:text-white">
                      ₹{originalTotal.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Discount Savings</span>
                      <span className="font-bold">- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Delivery Charges</span>
                    <span className="font-bold">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-3 dark:border-slate-800">
                    <div className="flex justify-between text-base font-black text-navy dark:text-white">
                      <span>Total Amount</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="mt-4 rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    🎉 You will save ₹{discount.toLocaleString()} on this order!
                  </div>
                )}

                {/* Checkout CTA */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={cartItems.some((i) => i.outOfStock)}
                  onClick={() => navigate('/checkout')}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-lime font-black text-navy shadow-lg transition hover:bg-[#a5e354] disabled:opacity-40"
                >
                  <Zap className="h-5 w-5 fill-navy" />
                  Proceed to Checkout
                </motion.button>

                {/* Security Assurance */}
                <div className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>100% Safe and Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
