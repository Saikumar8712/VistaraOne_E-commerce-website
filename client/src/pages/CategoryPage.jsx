import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import * as Icons from 'lucide-react'
import {
  SlidersHorizontal,
  ChevronRight,
  Star,
  Check,
  RotateCcw,
  Package,
  ChevronLeft,
  X,
  Filter,
  ArrowUp,
  Loader2,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { getProducts, getFilterMeta } from '../services/api'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { allCategories, getCategoryBySlug } = useShop()

  const currentCategory = getCategoryBySlug(slug)

  // Products and Infinite Stream state
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1, hasNextPage: false })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
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

  // Dynamic filter metadata
  const [availableBrands, setAvailableBrands] = useState([])
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 100000 })

  // Active filter state
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState('newest')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Load filter metadata for this category
  useEffect(() => {
    async function loadMeta() {
      try {
        const res = await getFilterMeta(slug)
        if (res?.success && res.data) {
          setAvailableBrands(res.data.brands || [])
          setPriceBounds({
            min: res.data.minPrice || 0,
            max: res.data.maxPrice || 100000,
          })
        }
      } catch (err) {
        console.error('Error fetching filter metadata:', err)
      }
    }
    loadMeta()
    // Reset filters when category slug changes
    setSelectedBrands([])
    setMinPrice('')
    setMaxPrice('')
    setSelectedRating('')
    setInStockOnly(false)
    setSort('newest')
    setPage(1)
  }, [slug])

  // Fetch products whenever filters or page changes
  const fetchCategoryProducts = useCallback(
    async (targetPage, isAppend = false) => {
      if (isAppend) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      try {
        const params = {
          category: slug,
          page: targetPage,
          limit: 12,
          sort,
        }
        if (selectedBrands.length > 0) {
          params.brand = selectedBrands.join(',')
        }
        if (minPrice !== '') params.min = minPrice
        if (maxPrice !== '') params.max = maxPrice
        if (selectedRating !== '') params.rating = selectedRating
        if (inStockOnly) params.inStock = true

        const res = await getProducts(params)
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
        console.error('Failed to load category products:', err)
        if (!isAppend) setProducts([])
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [slug, sort, selectedBrands, minPrice, maxPrice, selectedRating, inStockOnly]
  )

  // Trigger page 1 fetch when filters or category changes
  useEffect(() => {
    setPage(1)
    fetchCategoryProducts(1, false)
  }, [fetchCategoryProducts])

  // Trigger next page for continuous stream
  const loadNextPage = useCallback(() => {
    if (!loading && !loadingMore && pagination.hasNextPage) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchCategoryProducts(nextPage, true)
    }
  }, [loading, loadingMore, pagination.hasNextPage, page, fetchCategoryProducts])

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

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([])
    setMinPrice('')
    setMaxPrice('')
    setSelectedRating('')
    setInStockOnly(false)
    setPage(1)
  }

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
    setPage(1)
  }

  const CatIcon = currentCategory?.icon && Icons[currentCategory.icon]
    ? Icons[currentCategory.icon]
    : Icons.Package

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-lime-600 dark:hover:text-lime">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-navy dark:text-slate-200">
            {currentCategory?.name || slug}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-navy p-6 text-white shadow-lg dark:border dark:border-white/5 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lime text-navy shadow-lg sm:h-20 sm:w-20">
              <CatIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lime">
                Category Store
              </span>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                {currentCategory?.name || slug}
              </h1>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                {currentCategory?.description || `Explore the best collection in ${slug}`}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-2 text-center backdrop-blur-sm">
            <span className="text-xs text-slate-300">Total Products</span>
            <p className="text-xl font-extrabold text-lime">{pagination.total || products.length}</p>
          </div>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Products */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* DESKTOP FILTER SIDEBAR (col-span-3) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                <div className="flex items-center gap-2 font-black text-navy dark:text-white">
                  <SlidersHorizontal className="h-4 w-4 text-lime-600 dark:text-lime" />
                  <span>Filters</span>
                </div>
                {(selectedBrands.length > 0 || minPrice || maxPrice || selectedRating || inStockOnly) && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600"
                  >
                    <RotateCcw className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Price Range (₹)
                </h4>
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value)
                      setPagination((p) => ({ ...p, page: 1 }))
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  <span className="text-xs text-slate-400">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value)
                      setPagination((p) => ({ ...p, page: 1 }))
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Brands Filter */}
              {availableBrands.length > 0 && (
                <div className="border-t border-slate-100 pt-4 dark:border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Brands
                  </h4>
                  <div className="mt-2.5 max-h-48 space-y-2 overflow-y-auto pr-1">
                    {availableBrands.map((b) => {
                      const isChecked = selectedBrands.includes(b)
                      return (
                        <label
                          key={b}
                          className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-navy dark:text-slate-300 dark:hover:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleBrand(b)}
                            className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-lime"
                          />
                          <span>{b}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Customer Rating Filter */}
              <div className="border-t border-slate-100 pt-4 dark:border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Customer Rating
                </h4>
                <div className="mt-2.5 space-y-2">
                  {['4', '3', '2'].map((star) => (
                    <label
                      key={star}
                      className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700 hover:text-navy dark:text-slate-300 dark:hover:text-white"
                    >
                      <input
                        type="radio"
                        name="rating-filter"
                        checked={selectedRating === star}
                        onChange={() => {
                          setSelectedRating(selectedRating === star ? '' : star)
                          setPagination((p) => ({ ...p, page: 1 }))
                        }}
                        className="text-navy focus:ring-lime"
                      />
                      <span className="flex items-center gap-1">
                        {star}★ & above
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="border-t border-slate-100 pt-4 dark:border-white/5">
                <label className="flex cursor-pointer items-center justify-between text-xs font-bold text-navy dark:text-slate-200">
                  <span>In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked)
                      setPagination((p) => ({ ...p, page: 1 }))
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-lime"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* PRODUCTS LIST & CONTROLS (col-span-9) */}
          <div className="space-y-6 lg:col-span-9">
            {/* Top Toolbar: Sorting & Mobile Filter trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-navy dark:border-slate-700 dark:text-white lg:hidden"
                >
                  <Filter className="h-3.5 w-3.5" /> Filters
                </button>
                <p className="text-xs text-slate-500">
                  Showing <span className="font-bold text-navy dark:text-white">{products.length}</span>{' '}
                  of {pagination.total || products.length} products
                </p>
              </div>

              {/* Sorting Options */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value)
                    setPagination((p) => ({ ...p, page: 1 }))
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy focus:border-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-2xl bg-white p-4 shadow-sm dark:bg-[#131d31]"
                  >
                    <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-3 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-4 h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#131d31]">
                <Package className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-700" />
                <h3 className="mt-4 text-lg font-bold text-navy dark:text-white">
                  No products matched your criteria
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try clearing some filters or exploring a different price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-2xl bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-700 dark:bg-lime dark:text-navy"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
            )}

            {/* Continuous Stream Sentinel & Infinite Loading Status */}
            <div ref={sentinelRef} className="mt-8 flex flex-col items-center justify-center py-6">
              {loadingMore && (
                <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-navy shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-white">
                  <Loader2 className="h-4 w-4 animate-spin text-lime-600 dark:text-lime" />
                  <span>Loading more products...</span>
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
                  ✨ You've viewed all {pagination.total} products
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FILTER MODAL */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex bg-navy/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl dark:bg-[#131d31]"
            >
              <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
                <h3 className="text-base font-black text-navy dark:text-white">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Price Range (₹)
                  </h4>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-xl border p-2 text-xs dark:bg-slate-900"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-xl border p-2 text-xs dark:bg-slate-900"
                    />
                  </div>
                </div>

                {availableBrands.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Brands
                    </h4>
                    <div className="mt-2 space-y-2">
                      {availableBrands.map((b) => (
                        <label key={b} className="flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(b)}
                            onChange={() => toggleBrand(b)}
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-xl bg-navy py-2.5 text-xs font-bold text-white dark:bg-lime dark:text-navy"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
