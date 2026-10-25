import { useEffect, useState, useCallback, useRef } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Search, ArrowLeft, ArrowUp, Loader2, Package } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { getProducts } from '../services/api'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

export default function SearchResults() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { allCategories } = useShop()

  const q = params.get('q') || ''
  const sortParam = params.get('sort') || 'newest'

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1, hasNextPage: false })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [sort, setSort] = useState(sortParam)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const sentinelRef = useRef(null)

  // Floating Back to Top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch search products (page 1 or append next pages)
  const fetchSearchProducts = useCallback(
    async (targetPage, isAppend = false) => {
      if (!q.trim()) {
        setProducts([])
        setLoading(false)
        return
      }

      if (isAppend) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      try {
        const res = await getProducts({
          q: q.trim(),
          page: targetPage,
          limit: 12,
          sort,
        })
        if (res?.success && Array.isArray(res.data)) {
          if (isAppend) {
            setProducts((prev) => {
              const existingIds = new Set(prev.map((p) => p._id))
              const fresh = res.data.filter((p) => !existingIds.has(p._id))
              return [...prev, ...fresh]
            })
          } else {
            setProducts(res.data)
          }
          if (res.pagination) {
            setPagination(res.pagination)
          }
        } else if (!isAppend) {
          setProducts([])
        }
      } catch (err) {
        console.error('Search API error:', err)
        if (!isAppend) setProducts([])
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [q, sort]
  )

  // Trigger page 1 fetch when search query or sort changes
  useEffect(() => {
    setPage(1)
    fetchSearchProducts(1, false)
  }, [fetchSearchProducts])

  // Continuous stream: load next page
  const loadNextPage = useCallback(() => {
    if (!loading && !loadingMore && pagination.hasNextPage) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchSearchProducts(nextPage, true)
    }
  }, [loading, loadingMore, pagination.hasNextPage, page, fetchSearchProducts])

  // Automated IntersectionObserver Sentinel for Infinite Scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage()
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadNextPage])

  const handleSortChange = (newSort) => {
    setSort(newSort)
    setParams({ q, sort: newSort })
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-lime-600 dark:hover:text-lime">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-navy dark:text-slate-200">Search</span>
          <span>/</span>
          <span className="text-slate-400">"{q}"</span>
        </nav>

        {/* Search Header Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-[#131d31]">
          <div>
            <h1 className="text-xl font-black text-navy dark:text-white sm:text-2xl">
              Results for <span className="text-lime-600 dark:text-lime">"{q}"</span>
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Showing {products.length} of {pagination.total} products from database
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy focus:border-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Product Grid / Empty State */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#131d31]"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm dark:bg-[#131d31]">
            <Search className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-700" />
            <h2 className="mt-4 text-xl font-black text-navy dark:text-white">
              No products found for "{q}"
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try checking your spelling, using more general terms, or exploring categories above.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy px-6 py-3 text-xs font-bold text-white hover:bg-navy-700 dark:bg-lime dark:text-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {products.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}

        {/* Continuous Stream Sentinel & Infinite Loading Status */}
        <div ref={sentinelRef} className="mt-10 flex flex-col items-center justify-center py-6">
          {loadingMore && (
            <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-navy shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-white">
              <Loader2 className="h-4 w-4 animate-spin text-lime-600 dark:text-lime" />
              <span>Loading more results...</span>
            </div>
          )}

          {!loadingMore && pagination.hasNextPage && (
            <button
              type="button"
              onClick={loadNextPage}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-navy shadow-sm transition hover:border-lime hover:bg-lime hover:text-navy dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:hover:bg-lime dark:hover:text-navy"
            >
              Load More Products ({products.length} of {pagination.total})
            </button>
          )}

          {!loadingMore && !pagination.hasNextPage && products.length > 0 && (
            <div className="rounded-full bg-slate-100 px-6 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              ✨ All {pagination.total} matching products loaded
            </div>
          )}
        </div>
      </main>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-navy shadow-xl transition-transform hover:scale-110 active:scale-95"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
