import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Heart, ShoppingCart, Star, Package, Check } from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function ProductCard({ p }) {
  const { add, wish, toggleWish } = useShop()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [imgErr, setImgErr] = useState(false)
  const [added, setAdded] = useState(false)

  if (!p) return null

  const liked = !!wish[p._id]
  const hasDeal = p.originalPrice && p.originalPrice > p.price
  const off =
    p.discountPercent ||
    (hasDeal ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0)
  const isOutOfStock = p.stock !== undefined && p.stock < 1

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (isOutOfStock) return
    add(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleToggleWish = (e) => {
    e.stopPropagation()
    toggleWish(p)
  }

  const displayImg =
    p.image ||
    (Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '') ||
    (typeof p.images === 'string' ? p.images : '')

  return (
    <motion.article
      whileHover={reduce ? {} : { y: -5 }}
      onClick={() => navigate(`/product/${p.slug || p._id}`)}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-lime/40 hover:shadow-xl dark:border-white/5 dark:bg-[#131d31]"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/50">
        {displayImg && !imgErr ? (
          <img
            src={displayImg}
            alt={p.name}
            loading="lazy"
            onError={() => setImgErr(true)}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Package className="h-10 w-10 text-slate-300" aria-hidden />
          </div>
        )}

        {/* Discount Badge */}
        {hasDeal && off > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-lime px-2 py-0.5 text-[11px] font-black text-navy shadow-sm">
            {off}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 grid place-items-center bg-navy/60 backdrop-blur-[2px]">
            <span className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleToggleWish}
          aria-label="Toggle wishlist"
          aria-pressed={liked}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-rose-500 dark:bg-navy/80 dark:text-slate-200"
        >
          <Heart
            className={`h-4 w-4 ${
              liked ? 'fill-rose-500 text-rose-500' : 'hover:scale-110'
            }`}
          />
        </motion.button>
      </div>

      {/* Meta: Brand & Category */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span className="truncate uppercase tracking-wider">{p.brand || 'Brand'}</span>
        <span className="truncate capitalize">{p.category}</span>
      </div>

      {/* Title */}
      <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-navy group-hover:text-lime-700 dark:text-slate-100 dark:group-hover:text-lime">
        {p.name}
      </h3>

      {/* Rating badge */}
      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-0.5 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
          <span>{p.rating || 4.2}</span>
          <Star className="h-2.5 w-2.5 fill-white text-white" />
        </div>
        <span>({(p.reviewCount || 0).toLocaleString()})</span>
      </div>

      {/* Price section */}
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-base font-extrabold text-navy dark:text-white">
          ₹{(p.price || 0).toLocaleString()}
        </span>
        {hasDeal && (
          <span className="text-xs text-slate-400 line-through">
            ₹{(p.originalPrice || 0).toLocaleString()}
          </span>
        )}
      </div>

      {/* Quick Add Button */}
      <div className="mt-auto pt-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`flex h-9 w-full items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-colors ${
            isOutOfStock
              ? 'cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800'
              : added
              ? 'bg-emerald-600 text-white'
              : 'bg-navy text-white hover:bg-navy-700 dark:bg-white/10 dark:text-lime dark:hover:bg-lime dark:hover:text-navy'
          }`}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added!
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  )
}
