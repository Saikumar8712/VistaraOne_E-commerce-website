import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Mail, Sparkles, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useShop } from '../context/ShopContext'
import { getCategories, getProducts } from '../services/api'

const Section = ({ title, sub, onSeeMore, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mx-auto max-w-7xl px-4 py-8"
  >
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
      <div>
        <h2 className="text-2xl font-black text-navy dark:text-white">{title}</h2>
        {sub && <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>}
      </div>
      {onSeeMore && (
        <button
          type="button"
          onClick={onSeeMore}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-navy/15 bg-white px-3.5 py-1.5 text-xs font-bold text-navy shadow-sm transition hover:border-lime hover:bg-lime hover:text-navy dark:border-white/10 dark:bg-white/10 dark:text-lime dark:hover:bg-lime dark:hover:text-navy"
        >
          <span>See More</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      )}
    </div>
    {children}
  </motion.section>
)

const Grid = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#131d31]"
          >
            <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    )
  }

  return items.length ? (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {items.map((p) => (
        <ProductCard key={p._id} p={p} />
      ))}
    </div>
  ) : (
    <p className="text-sm text-slate-400">No products available in this section.</p>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { showToast, allCategories } = useShop()

  const [cats, setCats] = useState(allCategories || [])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [email, setEmail] = useState('')

  const loadHomeData = async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const [cRes, pRes] = await Promise.all([
        getCategories(),
        getProducts({ limit: 50 }),
      ])

      if (cRes?.success && Array.isArray(cRes.data)) {
        setCats(cRes.data)
      }
      if (pRes?.success && Array.isArray(pRes.data)) {
        setProducts(pRes.data)
      }
    } catch (err) {
      console.error('Home data load error:', err)
      setLoadError(err.message || 'Failed to connect to backend API')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    loadHomeData()
  }, [])

  useEffect(() => {
    if (allCategories?.length) {
      setCats(allCategories)
    }
  }, [allCategories])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    showToast('Subscribed to VistaraOne updates! 📬')
    setEmail('')
  }

  const perks = [
    [Truck, 'Fast Delivery', 'Real-time delivery checking across India'],
    [ShieldCheck, '100% Genuine', 'Verified products from trusted suppliers'],
    [RotateCcw, 'Easy Returns', 'Hassle-free 7-day replacement policy'],
    [Headphones, '24/7 Support', 'Dedicated Indian customer care team'],
  ]

  // Dynamic collections from real server data
  const dealsList = products
    .filter((p) => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
    .slice(0, 6)

  const freshList = products
    .filter((p) => /fresh|fruit|veg|market/i.test(p.category || ''))
    .slice(0, 6)

  const electronicsList = products
    .filter((p) => /electronic|mobile|gadget|tech/i.test(p.category || ''))
    .slice(0, 6)

  const fashionList = products
    .filter((p) => /fashion|apparel|lifestyle|wear/i.test(p.category || ''))
    .slice(0, 6)

  const trendingList = products
    .filter((p) => p.isBestseller || (p.reviewCount && p.reviewCount > 100))
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={cats} />

      {/* Hero Section */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-16 pb-14 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/20 px-3.5 py-1 text-xs font-bold text-lime">
              <Sparkles className="h-3.5 w-3.5" />
              Real Marketplace. Live Server Data.
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl md:text-5xl">
              Everything You Need, <span className="text-lime">One Destination</span>
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              India's premier e-commerce shopping destination with genuine electronics, fashion, groceries, fresh market produce and kitchen essentials.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('categories')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-lime px-6 py-3.5 text-xs font-black text-navy shadow-lg transition hover:bg-[#a5e354]"
              >
                Explore Categories <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/c/electronics')}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                Electronics Hub
              </button>
            </div>
          </motion.div>

          {/* Interactive Category Showcase Icons */}
          <div className="grid grid-cols-3 gap-3 max-h-[380px] overflow-y-auto scrollbar-none pr-1">
            {cats.map((c, i) => {
              const I = c.icon && Icons[c.icon] ? Icons[c.icon] : Icons.Package
              return (
                <motion.div
                  key={c._id || i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/c/${c.slug}`)}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-navy-700/80 p-3 text-center transition hover:bg-navy-600 hover:shadow-xl"
                >
                  <I className="h-9 w-9 text-lime" />
                  <span className="mt-2 line-clamp-1 text-[11px] font-bold text-slate-200">
                    {c.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Backend Offline / Error Banner if API fails */}
      {loadError && (
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between rounded-2xl bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Could not load live products from server: {loadError}</span>
            </div>
            <button
              onClick={loadHomeData}
              className="rounded-lg bg-rose-600 px-3 py-1 font-bold text-white hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Category Circular Bar */}
      <div id="categories" className="border-b border-slate-200 bg-white py-5 dark:border-white/5 dark:bg-[#131d31]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:gap-6">
            {cats.map((c) => {
              const I = c.icon && Icons[c.icon] ? Icons[c.icon] : Icons.Package
              return (
                <button
                  key={c._id}
                  onClick={() => navigate(`/c/${c.slug}`)}
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-navy transition-all duration-200 group-hover:scale-105 group-hover:bg-navy group-hover:text-lime group-hover:shadow-md dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-lime dark:group-hover:text-navy sm:h-18 sm:w-18">
                    <I className="h-7 w-7" />
                  </span>
                  <span className="w-20 truncate text-xs font-semibold text-slate-700 group-hover:text-navy dark:text-slate-300 dark:group-hover:text-lime">
                    {c.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 1. Deals of the Day */}
      {dealsList.length > 0 && (
        <Section
          title="⚡ Deals of the Day"
          sub="Unbeatable price drops on top smartphones, audio, and kitchen appliances"
          onSeeMore={() => navigate('/c/electronics')}
        >
          <Grid items={dealsList} loading={loading} />
        </Section>
      )}

      {/* 2. Electronics & Mobiles */}
      {electronicsList.length > 0 && (
        <Section
          title="📱 Electronics & Mobiles"
          sub="Smartphones, noise-cancelling headphones, and smart wearables"
          onSeeMore={() => navigate('/c/electronics')}
        >
          <Grid items={electronicsList} loading={loading} />
        </Section>
      )}

      {/* 3. Fashion & Lifestyle */}
      {fashionList.length > 0 && (
        <Section
          title="👔 Fashion & Lifestyle"
          sub="Men's casual wear, festive ethnic collections, and performance footwear"
          onSeeMore={() => navigate('/c/fashion')}
        >
          <Grid items={fashionList} loading={loading} />
        </Section>
      )}

      {/* 4. Fresh Market & Groceries */}
      {freshList.length > 0 && (
        <Section
          title="🍎 Fresh Market & Groceries"
          sub="Farm-fresh fruits, aged basmati rice, dry fruits and daily staples"
          onSeeMore={() => navigate('/c/fresh-market')}
        >
          <Grid items={freshList} loading={loading} />
        </Section>
      )}

      {/* 5. Trending & Bestsellers */}
      {trendingList.length > 0 && (
        <Section
          title="🔥 Trending & Bestsellers"
          sub="Most popular products with thousands of 5-star customer ratings"
          onSeeMore={() => navigate('/c/electronics')}
        >
          <Grid items={trendingList} loading={loading} />
        </Section>
      )}

      {/* Value Perks */}
      <Section title="Why Shop on VistaraOne" sub="Building India's most dependable marketplace">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {perks.map(([I, t, s]) => (
            <div
              key={t}
              className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-[#131d31]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy dark:bg-white/10 dark:text-lime flex-shrink-0">
                <I className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-navy dark:text-white">{t}</h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-12 bg-navy text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-xl font-black text-white">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-lime text-navy">
                  V
                </span>
                Vistara<span className="text-lime">One</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                “One Destination. Everything You Need.” Modern Indian marketplace delivering electronics, fashion, groceries, and daily essentials.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-lime">
                Top Categories
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                {cats.map((c) => (
                  <li key={c._id}>
                    <button
                      onClick={() => navigate(`/c/${c.slug}`)}
                      className="hover:text-lime"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-lime">
                Stay Updated
              </h4>
              <p className="mt-2 text-xs text-slate-400">
                Subscribe to receive special festival deals, discount coupons, and new launches.
              </p>
              <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-lime px-4 text-xs font-extrabold text-navy hover:bg-[#a5e354]"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} VistaraOne Technologies Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
