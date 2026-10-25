import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, ShoppingBag, ArrowLeft, Trash2, ShoppingCart, Star, Package } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Navbar from '../components/Navbar'

export default function Wishlist() {
  const navigate = useNavigate()
  const { allCategories, wishItems, wishCount, toggleWish, add, showToast } = useShop()

  const handleMoveToCart = async (product) => {
    await add(product)
    await toggleWish(product)
    showToast(`Moved ${product.name} to Cart! 🛒`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-navy dark:text-white sm:text-3xl">
              My Wishlist
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {wishCount} {wishCount === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>

        {wishItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-16 text-center shadow-sm dark:bg-[#131d31]"
          >
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400">
              <Heart className="h-12 w-12" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-navy dark:text-white">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Explore our wide range of products and save your favorites to buy later!
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy px-8 py-3.5 text-xs font-extrabold text-white shadow-lg transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
            >
              <ArrowLeft className="h-4 w-4" /> Discover Products
            </button>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence>
              {wishItems.map((p) => {
                const hasDeal = p.originalPrice && p.originalPrice > p.price
                const discount = hasDeal
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0
                const isOutOfStock = p.stock !== undefined && p.stock < 1

                return (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-xl dark:border-white/5 dark:bg-[#131d31]"
                  >
                    <div>
                      {/* Image & Remove button */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 p-2 dark:bg-slate-800/40">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain cursor-pointer"
                            onClick={() => navigate(`/product/${p.slug || p._id}`)}
                          />
                        ) : (
                          <div className="grid h-full place-items-center">
                            <Package className="h-10 w-10 text-slate-300" />
                          </div>
                        )}
                        <button
                          onClick={() => toggleWish(p)}
                          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-rose-500 shadow hover:bg-rose-50 dark:bg-navy"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {hasDeal && discount > 0 && (
                          <span className="absolute left-2 top-2 rounded-lg bg-lime px-2 py-0.5 text-[10px] font-black text-navy shadow">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {p.brand}
                        </span>
                        <h3
                          onClick={() => navigate(`/product/${p.slug || p._id}`)}
                          className="line-clamp-2 cursor-pointer text-xs font-bold text-navy hover:text-lime-600 dark:text-slate-100 dark:hover:text-lime"
                        >
                          {p.name}
                        </h3>

                        {/* Rating */}
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                          <div className="flex items-center gap-0.5 rounded bg-emerald-600 px-1 py-0.2 text-[10px] font-bold text-white">
                            <span>{p.rating || 4.2}</span>
                            <Star className="h-2.5 w-2.5 fill-white text-white" />
                          </div>
                          <span>({(p.reviewCount || 0).toLocaleString()})</span>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-base font-black text-navy dark:text-white">
                            ₹{(p.price || 0).toLocaleString()}
                          </span>
                          {hasDeal && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{(p.originalPrice || 0).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Move to Cart Action */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                      <button
                        disabled={isOutOfStock}
                        onClick={() => handleMoveToCart(p)}
                        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-navy text-xs font-bold text-white transition hover:bg-navy-700 disabled:opacity-40 dark:bg-lime dark:text-navy"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {isOutOfStock ? 'Out of Stock' : 'Move to Cart'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}
