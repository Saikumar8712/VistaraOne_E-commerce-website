import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react'
import ProductCard from './ProductCard'
import { getCategoryProducts } from '../services/api'

const EMPTY_LIST = []

export default function ProductHorizontalRow({
  title,
  sub,
  categorySlug = null,
  initialItems = null,
  icon: Icon = null,
}) {
  const [items, setItems] = useState(() => initialItems || EMPTY_LIST)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [loading, setLoading] = useState(() => !initialItems && Boolean(categorySlug))
  const [loadingMore, setLoadingMore] = useState(false)
  const fetchedSlugRef = useRef(null)

  // Scroll boundary state
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  // Sync initialItems when provided directly (e.g. Deals, Trending)
  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems)
      setLoading(false)
    }
  }, [initialItems])

  // Initial load if categorySlug is provided (only fetch once per categorySlug)
  useEffect(() => {
    if (initialItems || !categorySlug) return

    let isMounted = true
    async function loadCategoryItems() {
      setLoading(true)
      try {
        const res = await getCategoryProducts(categorySlug, { page: 1, limit: 12 })
        if (isMounted && res?.success && Array.isArray(res.data)) {
          setItems(res.data)
          if (res.pagination) {
            setHasNextPage(Boolean(res.pagination.hasNextPage))
          } else {
            setHasNextPage(res.data.length >= 12)
          }
        }
      } catch (err) {
        console.warn(`Could not load category section ${categorySlug}:`, err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadCategoryItems()
    return () => {
      isMounted = false
    }
  }, [categorySlug])

  // Update scroll arrow boundaries
  const updateScrollBounds = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const nextLeft = scrollLeft > 15
    const nextRight = scrollLeft < scrollWidth - clientWidth - 25
    setCanScrollLeft((prev) => (prev !== nextLeft ? nextLeft : prev))
    setCanScrollRight((prev) => (prev !== nextRight ? nextRight : prev))
  }, [])

  useEffect(() => {
    updateScrollBounds()
    window.addEventListener('resize', updateScrollBounds)
    return () => window.removeEventListener('resize', updateScrollBounds)
  }, [items.length, updateScrollBounds])

  // Reveal more products from the same category on scrolling right
  const loadNextPage = useCallback(async () => {
    if (!categorySlug || loadingMore || !hasNextPage) return

    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const res = await getCategoryProducts(categorySlug, { page: nextPage, limit: 12 })
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setItems((prev) => {
          const existingIds = new Set(prev.map((p) => p._id))
          const fresh = res.data.filter((p) => !existingIds.has(p._id))
          return [...prev, ...fresh]
        })
        setPage(nextPage)
        if (res.pagination) {
          setHasNextPage(Boolean(res.pagination.hasNextPage))
        } else {
          setHasNextPage(res.data.length >= 12)
        }
      } else {
        setHasNextPage(false)
      }
    } catch {
      setHasNextPage(false)
    } finally {
      setLoadingMore(false)
    }
  }, [categorySlug, page, loadingMore, hasNextPage])

  // Scroll handler with near-end infinite detection
  const handleScroll = () => {
    updateScrollBounds()
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    if (scrollLeft + clientWidth >= scrollWidth - 320 && hasNextPage && !loadingMore && categorySlug) {
      loadNextPage()
    }
  }

  // Smooth scroll via left/right arrows
  const handleScrollBy = (direction) => {
    if (!scrollRef.current) return
    const amount = Math.max(320, scrollRef.current.clientWidth * 0.75)
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })

    if (direction === 'right' && hasNextPage && !loadingMore && categorySlug) {
      loadNextPage()
    }
  }

  // Mouse click-and-drag horizontal scroll
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    if (Math.abs(walk) > 5) {
      hasDragged.current = true
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  // Don't display empty or broken sections when no products are available
  if (!loading && items.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      {/* Section Header (No "See More" button - Hotstar style browsing) */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {Icon ? (
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime/15 text-lime-800 dark:bg-lime/10 dark:text-lime">
              <Icon className="h-5 w-5" />
            </span>
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy/5 text-navy dark:bg-white/10 dark:text-lime">
              <Sparkles className="h-5 w-5" />
            </span>
          )}
          <div>
            <h2 className="text-xl font-black text-navy dark:text-white sm:text-2xl">
              {title}
            </h2>
            {sub && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {sub}
              </p>
            )}
          </div>
        </div>

        {/* Desktop Header Navigation Arrow Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScrollBy('left')}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${title} left`}
            className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm transition-all hover:border-lime hover:bg-lime hover:text-navy disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-lime dark:hover:text-navy"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => handleScrollBy('right')}
            disabled={!canScrollRight && !hasNextPage}
            aria-label={`Scroll ${title} right`}
            className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm transition-all hover:border-lime hover:bg-lime hover:text-navy disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-lime dark:hover:text-navy"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* JioHotstar-Style Horizontal Row with Left/Right floating controls */}
      <div className="group relative">
        {/* Floating Left Arrow (Desktop) */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollBy('left')}
            aria-label={`Scroll ${title} left`}
            className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/90 p-2.5 text-lime shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-lime hover:text-navy md:flex"
          >
            <ChevronLeft className="h-5 w-5 stroke-[3]" />
          </button>
        )}

        {/* Horizontal Product Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-4 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            // Skeleton loader for horizontal cards
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-[195px] sm:w-[220px] md:w-[245px] shrink-0 aspect-[3/4] animate-pulse rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#131d31]"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))
          ) : (
            <>
              {items.map((p) => (
                <div
                  key={p._id}
                  className="w-[195px] sm:w-[220px] md:w-[245px] shrink-0 flex flex-col"
                  onClickCapture={(e) => {
                    // Prevent accidental navigation during drag
                    if (hasDragged.current) {
                      e.stopPropagation()
                    }
                  }}
                >
                  <ProductCard p={p} />
                </div>
              ))}

              {/* Infinite stream loader at right edge */}
              {loadingMore && (
                <div className="w-20 shrink-0 flex items-center justify-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy/80 text-lime shadow-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Right Arrow (Desktop) */}
        {(canScrollRight || hasNextPage) && (
          <button
            type="button"
            onClick={() => handleScrollBy('right')}
            aria-label={`Scroll ${title} right`}
            className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/90 p-2.5 text-lime shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-lime hover:text-navy md:flex"
          >
            <ChevronRight className="h-5 w-5 stroke-[3]" />
          </button>
        )}
      </div>
    </section>
  )
}
