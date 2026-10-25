import { useState, useRef, useEffect } from 'react'
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
    e.preventDefault()
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`)
      setSearchQ('')
      setOpen(false)
    }
  }

  const locationSummary = deliveryLocation?.area || deliveryLocation?.city || 'Delivery Area'
  const locationPincode = deliveryLocation?.pincode || '500001'

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

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative mx-2 hidden flex-1 max-w-xl md:block"
          role="search"
        >
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            aria-label="Search products"
            placeholder="Search for Mobiles, Electronics, Fashion, Cookware, Groceries…"
            className="w-full rounded-xl border-0 bg-white py-2.5 pl-4 pr-11 text-xs font-medium text-navy shadow-inner focus:outline-none focus:ring-2 focus:ring-lime"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-lg bg-lime text-navy transition hover:bg-[#a5e354]"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

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
            <form onSubmit={handleSearch} className="mb-3 flex gap-2">
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl bg-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none"
                aria-label="Search"
              />
              <button
                type="submit"
                className="rounded-xl bg-lime px-3.5 text-xs font-black text-navy"
              >
                Go
              </button>
            </form>
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
