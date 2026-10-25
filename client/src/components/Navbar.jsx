import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Loader2,
  LocateFixed,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Building2,
  Navigation,
  CheckCircle2,
  Edit3,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import { getProducts } from '../services/api'

const CATEGORY_KEYWORD_MAP = [
  {
    slug: 'electronics',
    keywords: ['electronics', 'electronic', 'mobi', 'mobile', 'mobiles', 'phone', 'phones', 'smartphone', 'smartphones', 'cell', 'lap', 'laptop', 'laptops', 'notebook', 'macbook', 'audio', 'earphone', 'headphone', 'earbuds', 'tablet', 'gadget', 'comp', 'computer'],
  },
  {
    slug: 'fashion',
    keywords: ['fash', 'fashion', 'cloth', 'clothes', 'clothing', 'apparel', 'shirt', 'tshirt', 'jeans', 'dress', 'footwear', 'shoes', 'sneakers', 'wear', 'men', 'women'],
  },
  {
    slug: 'appliances',
    keywords: ['appli', 'appliance', 'appliances', 'tv', 'television', 'fridge', 'refrigerator', 'ac', 'air conditioner', 'cooler', 'washing machine', 'microwave', 'oven', 'geyser', 'heater'],
  },
  {
    slug: 'home-kitchen',
    keywords: ['home', 'kitch', 'kitchen', 'cook', 'cookware', 'pan', 'pot', 'bedding', 'decor', 'furniture', 'knife', 'utensil'],
  },
  {
    slug: 'groceries',
    keywords: ['groc', 'grocery', 'groceries', 'staples', 'snack', 'snacks', 'beverage', 'tea', 'coffee', 'rice', 'dal', 'oil', 'atta', 'flour', 'spices', 'masala', 'biscuit'],
  },
  {
    slug: 'fresh-market',
    keywords: ['fresh', 'market', 'fru', 'fruit', 'fruits', 'veg', 'vegetable', 'vegetables', 'apple', 'banana', 'mango', 'organic', 'herbs', 'greens'],
  },
  {
    slug: 'beauty-pets',
    keywords: ['beaut', 'beauty', 'skin', 'skincare', 'hair', 'haircare', 'serum', 'lotion', 'cream', 'perfume', 'fragrance', 'makeup', 'grooming', 'shampoo', 'pet', 'pets'],
  },
  {
    slug: 'sports',
    keywords: ['sport', 'sports', 'fit', 'fitness', 'gym', 'workout', 'yoga', 'dumbbell', 'running', 'exercise', 'cricket', 'badminton', 'football'],
  },
  {
    slug: 'toys',
    keywords: ['toy', 'toys', 'baby', 'babies', 'kid', 'kids', 'infant', 'doll', 'game', 'puzzle', 'lego', 'blocks', 'car'],
  },
  {
    slug: 'books',
    keywords: ['book', 'books', 'novel', 'novels', 'stationery', 'notebook', 'pen', 'pens', 'fiction', 'literature', 'read', 'art'],
  },
]

export default function Navbar({ categories = [] }) {
  const {
    count,
    wishCount,
    dark,
    toggleDark,
    allCategories,
    deliveryLocation,
    setDeliveryLocation,
    showToast,
  } = useShop()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const cats = categories?.length ? categories : allCategories || []

  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Location form state
  const [building, setBuilding] = useState(deliveryLocation?.building || '')
  const [street, setStreet] = useState(deliveryLocation?.street || '')
  const [cross, setCross] = useState(deliveryLocation?.cross || '')
  const [pin, setPin] = useState(deliveryLocation?.pincode || '500001')

  const [locState, setLocState] = useState({
    loading: false,
    label: deliveryLocation?.pincode
      ? `${deliveryLocation.area || deliveryLocation.city || 'PIN'} ${deliveryLocation.pincode}`
      : 'Select location',
    error: null,
  })
  const [searchQ, setSearchQ] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef(null)
  const mobileSearchRef = useRef(null)

  // Live autocomplete search query with 220ms debounce
  useEffect(() => {
    const trimmed = searchQ.trim()
    if (!trimmed || trimmed.length < 2) {
      setSuggestions([])
      setIsSearching(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await getProducts({ q: trimmed, limit: 6 })
        if (res?.success && Array.isArray(res.data)) {
          setSuggestions(res.data)
        } else {
          setSuggestions([])
        }
      } catch (err) {
        console.warn('Autocomplete search error:', err.message)
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }, 220)

    return () => clearTimeout(timer)
  }, [searchQ])

  // Dynamic and keyword category matcher for all categories
  const getMatchedCategories = (query) => {
    const raw = String(query || '').trim().toLowerCase()
    if (!raw || raw.length < 2) return []

    const clean = raw.replace(/[^a-z0-9]+/g, ' ').trim()
    const tokens = clean.split(/\s+/).filter(Boolean)

    const matches = []
    const seen = new Set()

    for (const c of cats) {
      const cSlug = String(c.slug || '').toLowerCase()
      const cName = String(c.name || '').toLowerCase()

      // Direct slug or name match
      const directMatch =
        cSlug.includes(raw) ||
        raw.includes(cSlug) ||
        cName.includes(raw) ||
        tokens.some((t) => cSlug.includes(t) || cName.includes(t))

      // Keyword / alias match
      const mapEntry = CATEGORY_KEYWORD_MAP.find((entry) => entry.slug === cSlug)
      const keywordMatch = mapEntry?.keywords.some((kw) => {
        return (
          raw === kw ||
          kw.startsWith(raw) ||
          raw.startsWith(kw) ||
          tokens.some((t) => kw === t || kw.startsWith(t) || t.startsWith(kw))
        )
      })

      if ((directMatch || keywordMatch) && !seen.has(cSlug)) {
        seen.add(cSlug)
        matches.push(c)
      }
    }

    return matches
  }

  const matchedCategories = useMemo(() => {
    return getMatchedCategories(searchQ)
  }, [searchQ, cats])

  // Click / tap outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      const inDesktop = searchContainerRef.current?.contains(event.target)
      const inMobile = mobileSearchRef.current?.contains(event.target)
      if (!inDesktop && !inMobile) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Category horizontal scroll ref
  const catScrollRef = useRef(null)

  const scrollCats = (direction) => {
    if (catScrollRef.current) {
      const offset = direction === 'left' ? -320 : 320
      catScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  // Synchronize form fields whenever deliveryLocation changes
  useEffect(() => {
    if (deliveryLocation) {
      setBuilding(deliveryLocation.building || '')
      setStreet(deliveryLocation.street || '')
      setCross(deliveryLocation.cross || '')
      setPin(deliveryLocation.pincode || '')
    }
  }, [deliveryLocation])

  // Detect high-accuracy exact location with building, street, cross, and pincode
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocState({
        loading: false,
        label: 'GPS not supported — enter PIN',
        error: 'Geolocation is not supported by your browser',
      })
      return
    }

    setLocState({ loading: true, label: 'Accessing exact GPS address…', error: null })

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          // Query OpenStreetMap Nominatim with zoom 18 for max street & building precision
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const a = data.address || {}

          // Extract detailed granular components
          const detectedBuilding =
            a.house_number ||
            a.building ||
            a.house_name ||
            a.flat ||
            a.amenity ||
            a.office ||
            a.shop ||
            'H.No 12-4/A, Flat 302'

          const detectedStreet =
            a.road ||
            a.street ||
            a.street_name ||
            a.pedestrian ||
            a.footway ||
            'Main Road'

          const detectedCross =
            a.crossroad ||
            a.neighbourhood ||
            a.suburb_district ||
            a.quarter ||
            a.block ||
            'Near Landmark / Cross'

          const detectedArea = a.suburb || a.residential || a.neighbourhood || 'City Center'
          const detectedCity = a.city || a.town || a.village || a.municipality || a.state_district || 'Hyderabad'
          const detectedState = a.state || 'Telangana'
          const detectedPin = a.postcode || '500001'

          const fullAddressParts = [
            detectedBuilding,
            detectedStreet,
            detectedCross,
            detectedArea,
            detectedCity,
            `- ${detectedPin}`,
          ].filter(Boolean)
          const fullAddress = fullAddressParts.join(', ')

          const locationData = {
            building: detectedBuilding,
            street: detectedStreet,
            cross: detectedCross,
            area: detectedArea,
            city: detectedCity,
            state: detectedState,
            pincode: detectedPin,
            formatted: fullAddress,
            isServiceable: true,
          }

          setDeliveryLocation(locationData)
          setBuilding(detectedBuilding)
          setStreet(detectedStreet)
          setCross(detectedCross)
          setPin(detectedPin)
          setLocState({
            loading: false,
            label: `${detectedArea || detectedCity} - ${detectedPin}`,
            error: null,
          })
          showToast(`📍 Exact Location Detected: ${detectedCity} (${detectedPin})`)
        } catch (err) {
          console.error('Location lookup failed:', err)
          setLocState({
            loading: false,
            label: 'Lookup failed — enter address',
            error: 'Could not fetch address details from GPS. Please enter manually.',
          })
        }
      },
      (err) => {
        setLocState({
          loading: false,
          label: 'Enter location manually',
          error:
            err.code === 1
              ? 'Location access denied. Please allow GPS permission in your browser.'
              : 'Could not detect GPS location. Please enter manually.',
        })
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    )
  }

  // Manual save for building, street, cross, and pincode
  const handleSaveLocation = (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(pin)) {
      setLocState((prev) => ({ ...prev, error: 'Please enter a valid 6-digit PIN code' }))
      return
    }

    const currentCity = deliveryLocation?.city || 'Hyderabad'
    const currentState = deliveryLocation?.state || 'Telangana'
    const currentArea = cross || street || currentCity

    const fullAddressParts = [
      building,
      street,
      cross,
      currentArea,
      currentCity,
      `- ${pin}`,
    ].filter(Boolean)
    const fullAddress = fullAddressParts.join(', ')

    const updatedLoc = {
      building: building || 'Building / Flat',
      street: street || 'Street / Road',
      cross: cross || 'Cross / Landmark',
      area: currentArea,
      city: currentCity,
      state: currentState,
      pincode: pin,
      formatted: fullAddress,
      isServiceable: true,
    }

    setDeliveryLocation(updatedLoc)
    setLocState({ loading: false, label: `${currentArea} - ${pin}`, error: null })
    setIsEditing(false)
    setPanel(false)
    showToast(`📍 Delivery Address Saved: ${pin}`)
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    const query = searchQ.trim()
    if (!query) return

    setShowSuggestions(false)
    setOpen(false)

    // Always navigate to search results page with 2-tier relevance ranking
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleSelectSuggestion = (productId) => {
    setShowSuggestions(false)
    setOpen(false)
    navigate(`/product/${productId}`)
  }

  const handleClearSearch = () => {
    setSearchQ('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const locationSummary = deliveryLocation?.area || deliveryLocation?.city || 'Delivery Area'
  const locationPincode = deliveryLocation?.pincode || '500001'

  // Render unified Search Input & Suggestions (used for both desktop and mobile)
  const renderSearchInput = (isMobile = false) => (
    <div
      ref={isMobile ? mobileSearchRef : searchContainerRef}
      className={`relative ${
        isMobile ? 'w-full' : 'mx-2 hidden flex-1 max-w-xl md:block'
      }`}
    >
      <form onSubmit={handleSearch} className="relative" role="search">
        <input
          value={searchQ}
          onChange={(e) => {
            setSearchQ(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => {
            if (searchQ.trim().length >= 2) {
              setShowSuggestions(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSuggestions(false)
            }
          }}
          aria-label={isMobile ? 'Search products on mobile' : 'Search products'}
          placeholder={
            isMobile
              ? 'Search 570+ products, mobiles, groceries…'
              : 'Search for Mobiles, Electronics, Fashion, Cookware, Groceries…'
          }
          className={`w-full rounded-xl border border-white/10 bg-white text-navy shadow-inner focus:outline-none focus:ring-2 focus:ring-lime ${
            isMobile
              ? 'py-2 pl-9 pr-16 text-xs font-medium placeholder:text-slate-400'
              : 'py-2.5 pl-4 pr-20 text-xs font-medium'
          }`}
        />

        {isMobile && (
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        )}

        {/* Clear Button (X) */}
        {searchQ.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={`absolute top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-navy transition ${
              isMobile ? 'right-9' : 'right-10'
            }`}
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          className={`absolute rounded-lg bg-lime text-navy transition hover:bg-[#a5e354] active:scale-95 ${
            isMobile
              ? 'right-1 top-1 grid h-7 w-7 place-items-center'
              : 'right-1 top-1 grid h-8 w-8 place-items-center'
          }`}
          aria-label="Search"
        >
          {isSearching ? (
            <Loader2 className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} animate-spin text-navy`} />
          ) : (
            <Search className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          )}
        </button>
      </form>

      {/* Autocomplete Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && searchQ.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 right-0 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#131d31] ${
              isMobile ? 'top-11 max-h-[72vh] overflow-y-auto' : 'top-12'
            }`}
          >
            {/* Matching Category Suggestions */}
            {matchedCategories.length > 0 && (
              <div className="border-b border-slate-100 bg-slate-50/70 p-2 dark:border-slate-800/80 dark:bg-slate-900/40">
                <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Categories
                </div>
                <div className="space-y-1">
                  {matchedCategories.map((c) => (
                    <div
                      key={c._id || c.slug}
                      onClick={() => {
                        setShowSuggestions(false)
                        setOpen(false)
                        navigate(`/c/${c.slug}`)
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 transition hover:bg-white dark:hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime/20 text-xs font-bold text-navy dark:text-lime">
                          📁
                        </span>
                        <div className="truncate">
                          <span className="text-xs font-bold text-navy dark:text-white">
                            {c.name}
                          </span>
                          <span className="ml-2 text-[10px] text-slate-400">
                            Explore Category
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-lime-600 dark:text-lime hover:underline">
                        View Category →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSearching && suggestions.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-6 text-xs text-slate-500 dark:text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin text-lime-600 dark:text-lime" />
                <span>Searching catalog for "{searchQ.trim()}"…</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Product Suggestions
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {suggestions.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSelectSuggestion(item._id)}
                      className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 transition hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <img
                        src={
                          item.images?.[0] ||
                          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'
                        }
                        alt={item.name}
                        className="h-10 w-10 shrink-0 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-xs font-bold text-navy dark:text-white">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          {item.brand && <span>{item.brand}</span>}
                          {item.brand && <span>•</span>}
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-navy dark:text-lime">
                          ₹{item.price?.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="text-[10px] text-slate-400 line-through">
                            ₹{item.originalPrice?.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 px-3.5 py-2 text-center dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="text-xs font-bold text-navy hover:text-lime-600 dark:text-lime dark:hover:underline"
                  >
                    View all results for "{searchQ.trim()}" →
                  </button>
                </div>
              </div>
            ) : matchedCategories.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                <p className="font-semibold text-navy dark:text-white">
                  No products found for "{searchQ.trim()}"
                </p>
                <p className="mt-1 text-[11px]">
                  Press Enter to see all search options or explore categories
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-xl dark:border-b dark:border-white/5">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4">
        {/* Mobile menu trigger */}
        <button
          className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime font-black text-navy shadow-md">
            V
          </span>
          <span>
            Vistara<span className="text-lime">One</span>
          </span>
        </button>

        {/* Location selector with crystal-clear address clarity */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setPanel(!panel)}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold hover:border-lime/40 hover:bg-white/10 transition-all text-left"
            aria-expanded={panel}
            title={deliveryLocation?.formatted || 'Click to choose delivery location'}
          >
            <MapPin className="h-4 w-4 text-lime shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-300 font-normal leading-tight">
                Deliver to
              </span>
              <span className="max-w-[160px] truncate text-xs font-bold text-white group-hover:text-lime">
                {locationSummary} - {locationPincode}
              </span>
            </div>
          </button>

          <AnimatePresence>
            {panel && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                className="absolute left-0 top-12 w-96 rounded-3xl border border-slate-200 bg-white p-5 text-navy shadow-2xl dark:border-slate-800 dark:bg-[#131d31] dark:text-white z-50"
              >
                <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Navigation className="h-3.5 w-3.5 text-lime-600 dark:text-lime" />
                    <span>Exact Delivery Location</span>
                  </div>
                  <button
                    onClick={() => setPanel(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-navy dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Primary Button: Detect Exact Location via GPS */}
                <div className="mt-4">
                  <button
                    onClick={detectLocation}
                    disabled={locState.loading}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-lime py-3 text-xs font-black text-navy shadow-md transition hover:bg-[#a5e354] active:scale-95 disabled:opacity-50"
                  >
                    {locState.loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-navy" />
                    ) : (
                      <LocateFixed className="h-4 w-4 text-navy" />
                    )}
                    <span>
                      {locState.loading ? 'Detecting exact GPS address…' : 'Use My Current Location'}
                    </span>
                  </button>
                </div>

                {locState.error && (
                  <p role="alert" className="mt-2 text-xs font-semibold text-rose-500">
                    {locState.error}
                  </p>
                )}

                {/* Active Address Card: Full Clarity */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active Delivery Address
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-navy dark:text-lime hover:underline font-bold"
                    >
                      {isEditing ? 'Cancel' : 'Edit details'}
                    </button>
                  </div>

                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-navy dark:text-slate-100 font-semibold">
                        {deliveryLocation?.building || 'Building / Door: Not specified'}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {deliveryLocation?.street || 'Street / Road'},{' '}
                        {deliveryLocation?.cross || 'Cross / Landmark'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      <span>Area: {deliveryLocation?.area || deliveryLocation?.city || 'Area'}</span>
                      <span>•</span>
                      <span>PIN: <strong className="text-navy dark:text-white font-bold">{locationPincode}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Detailed Manual Edit Form */}
                <form onSubmit={handleSaveLocation} className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400">
                        Building / Flat No.
                      </label>
                      <input
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        placeholder="e.g. Flat 302, Sai Heights"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-navy focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400">
                        Street / Road
                      </label>
                      <input
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. Road No. 36"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-navy focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400">
                        Cross / Landmark
                      </label>
                      <input
                        value={cross}
                        onChange={(e) => setCross(e.target.value)}
                        placeholder="e.g. 2nd Cross, Near Metro"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-navy focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400">
                        6-Digit PIN Code *
                      </label>
                      <input
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="PIN code"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-navy py-2 text-xs font-bold text-white transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
                  >
                    Save Delivery Address
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Search Bar with Live Suggestions Dropdown (Desktop) */}
        {renderSearchInput(false)}

        {/* Right Navigation Icons */}
        <nav className="ml-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-xl transition-colors hover:bg-white/10"
          >
            {dark ? <Sun className="h-4 w-4 text-lime" /> : <Moon className="h-4 w-4 text-slate-200" />}
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="hidden sm:flex items-center gap-1 rounded-lg bg-[#B8F36B]/20 border border-[#B8F36B]/40 px-2.5 py-1 text-xs font-bold text-[#B8F36B] hover:bg-[#B8F36B] hover:text-navy transition-all"
            >
              Admin Portal
            </button>
          )}

          <button
            onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            className="flex items-center gap-1.5 text-xs font-bold hover:text-lime transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isAuthenticated ? user.name.split(' ')[0] : 'Account'}
            </span>
          </button>

          <button
            onClick={() => navigate('/wishlist')}
            className="relative grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white">
                {wishCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="relative grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 transition-colors"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-lime text-[10px] font-black text-navy shadow"
              >
                {count}
              </motion.span>
            )}
          </button>
        </nav>
      </div>

      {/* Dedicated Mobile Search Bar Row (Always visible on mobile screens) */}
      <div className="border-t border-white/10 bg-navy-800/90 px-4 pt-1.5 pb-2 md:hidden">
        {renderSearchInput(true)}
      </div>

      {/* Categories Sub-nav on Desktop with sleek Arrow Navigation and ZERO white scrollbar */}
      {cats.length > 0 && (
        <div className="relative hidden border-t border-white/10 bg-navy-800/60 backdrop-blur-sm lg:block">
          <div className="mx-auto flex max-w-7xl items-center px-4 py-2 relative">
            {/* Left Scroll Arrow Button */}
            <button
              type="button"
              onClick={() => scrollCats('left')}
              className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow transition-all hover:bg-lime hover:text-navy active:scale-90 mr-2"
              title="Scroll Categories Left"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Clean category list — no white scrollbar */}
            <ul
              ref={catScrollRef}
              className="flex items-center gap-7 overflow-x-auto no-scrollbar scrollbar-none scroll-smooth px-2 py-1 text-xs font-semibold"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cats.map((c) => (
                <li key={c._id} className="shrink-0">
                  <button
                    onClick={() => navigate(`/c/${c.slug}`)}
                    className="whitespace-nowrap transition-colors hover:text-lime"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Scroll Arrow Button */}
            <button
              type="button"
              onClick={() => scrollCats('right')}
              className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow transition-all hover:bg-lime hover:text-navy active:scale-90 ml-2"
              title="Scroll Categories Right"
              aria-label="Next categories"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy-800 px-4 py-3 lg:hidden"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 py-1">
              Browse Categories
            </div>
            <ul className="space-y-1">
              {cats.map((c) => (
                <li key={c._id}>
                  <button
                    onClick={() => {
                      navigate(`/c/${c.slug}`)
                      setOpen(false)
                    }}
                    className="block w-full py-2 text-left text-xs font-semibold text-slate-200 hover:text-lime"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
