import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Mail, Sparkles, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductHorizontalRow from '../components/ProductHorizontalRow'
import { useShop } from '../context/ShopContext'
import { getCategories, getProducts } from '../services/api'

const Section = ({ title, sub, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mx-auto max-w-7xl px-4 py-8"
  >
    <div className="mb-5">
      <h2 className="text-2xl font-black text-navy dark:text-white">{title}</h2>
      {sub && <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>}
    </div>
    {children}
  </motion.section>
)

export default function Home() {
  const navigate = useNavigate()
  const { showToast, allCategories } = useShop()

  const [cats, setCats] = useState(() => allCategories || [])
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
    if (allCategories?.length && !cats.length) {
      setCats(allCategories)
    }
  }, [allCategories, cats.length])

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

  // Memoized collections to prevent unnecessary child re-renders
  const dealsList = useMemo(
    () =>
      products
        .filter((p) => p.originalPrice && p.originalPrice > p.price)
        .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)),
    [products]
  )

  const trendingList = useMemo(
    () =>
      products
        .filter((p) => p.isBestseller || (p.reviewCount && p.reviewCount > 100))
        .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)),
    [products]
  )

  // Deduplicate categories by lowercase name to ensure clean section display
  const distinctCategories = useMemo(
    () =>
      Array.from(
        cats.reduce((map, cat) => {
          const key = (cat.name || '').trim().toLowerCase()
          if (!key) return map
          if (!map.has(key)) {
            map.set(key, cat)
          } else {
            const existing = map.get(key)
            if ((cat.productCount || 0) > (existing.productCount || 0)) {
              map.set(key, cat)
            }
          }
          return map
        }, new Map()).values()
      ),
    [cats]
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={cats} />

      {/* Hero Section */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-16 pb-16 md:pb-20 md:grid-cols-2">
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
          <div className="grid grid-cols-3 gap-3 max-h-[390px] overflow-y-auto scrollbar-none pr-1 pb-6">
            {cats.map((c, i) => {
              const I = c.icon && Icons[c.icon] ? Icons[c.icon] : Icons.Package
              return (
                <motion.div
                  key={c._id || i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/c/${c.slug}`)}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-navy-700/80 p-3 text-center transition hover:bg-navy-600 hover:shadow-xl"
                >
                  <I className="h-7 w-7 text-lime" />
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

      {/* 1. Deals of the Day (Horizontal Row) */}
      {dealsList.length > 0 && (
        <ProductHorizontalRow
          title="⚡ Deals of the Day"
          sub="Unbeatable price drops on top smartphones, audio, and kitchen appliances"
          initialItems={dealsList}
          icon={Icons.Zap}
        />
      )}

      {/* 2. All Homepage Categories from Real Catalog (Horizontal Rows) */}
      {distinctCategories.map((c) => {
        const IconComponent = c.icon && Icons[c.icon] ? Icons[c.icon] : Icons.Package
        return (
          <ProductHorizontalRow
            key={c._id || c.slug}
            title={c.name}
            sub={c.description || `Explore our top-rated ${c.name} collection`}
            categorySlug={c.slug}
            icon={IconComponent}
          />
        )
      })}

      {/* 3. Trending & Bestsellers (Horizontal Row) */}
      {trendingList.length > 0 && (
        <ProductHorizontalRow
          title="🔥 Trending & Bestsellers"
          sub="Most popular products with thousands of 5-star customer ratings"
          initialItems={trendingList}
          icon={Icons.Flame}
        />
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
