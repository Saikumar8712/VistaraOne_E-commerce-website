import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import {
  getCategories,
  getProducts,
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  getWishlist,
  toggleWishlist as apiToggleWishlist,
} from '../services/api'

const ShopCtx = createContext(null)
export const useShop = () => useContext(ShopCtx)

export function ShopProvider({ children }) {
  /* ── Dark mode with localStorage persistence ── */
  const [dark, setDark] = useState(() => localStorage.getItem('vo-dark') === 'true')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('vo-dark', dark)
  }, [dark])
  const toggleDark = useCallback(() => setDark((d) => !d), [])

  /* ── Catalog state from real backend API ── */
  const [allCategories, setAllCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [isLive, setIsLive] = useState(false)
  const [catalogLoading, setCatalogLoading] = useState(true)

  /* ── Server-Side Authoritative Cart State ── */
  const [cartData, setCartData] = useState({
    items: [],
    summary: { subtotal: 0, originalTotal: 0, discount: 0, deliveryFee: 0, total: 0, itemCount: 0 },
    warnings: [],
  })
  const [cartLoading, setCartLoading] = useState(false)

  /* ── Server-Side Authoritative Wishlist State ── */
  const [wishlistItems, setWishlistItems] = useState([])

  /* ── User Delivery Location / PIN Code State ── */
  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('vo-delivery-loc'))
      if (stored && stored.pincode) return stored
      return {
        building: 'H.No 12-4/A, Flat 302',
        street: 'Road No. 36',
        cross: '2nd Cross, Srinivas Nagar',
        area: 'Ameerpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500038',
        formatted: 'Flat 302, Road No. 36, 2nd Cross, Srinivas Nagar, Ameerpet, Hyderabad - 500038',
        isServiceable: true,
      }
    } catch {
      return {
        building: 'H.No 12-4/A, Flat 302',
        street: 'Road No. 36',
        cross: '2nd Cross, Srinivas Nagar',
        area: 'Ameerpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500038',
        formatted: 'Flat 302, Road No. 36, 2nd Cross, Srinivas Nagar, Ameerpet, Hyderabad - 500038',
        isServiceable: true,
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('vo-delivery-loc', JSON.stringify(deliveryLocation))
  }, [deliveryLocation])

  /* ── Global Toast ── */
  const [toast, setToast] = useState(null)
  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }, [])

  /* ── Fetch Cart from Server ── */
  const refreshCart = useCallback(async () => {
    try {
      const res = await getCart()
      if (res?.success && res.data) {
        setCartData(res.data)
      }
    } catch (err) {
      console.warn('Cart sync warning:', err.message)
    }
  }, [])

  /* ── Fetch Wishlist from Server ── */
  const refreshWishlist = useCallback(async () => {
    try {
      const res = await getWishlist()
      if (res?.success && Array.isArray(res.data)) {
        setWishlistItems(res.data)
      }
    } catch (err) {
      console.warn('Wishlist sync warning:', err.message)
    }
  }, [])

  /* ── Initial Load of Catalog, Cart, and Wishlist ── */
  const fetchInitialData = useCallback(async () => {
    setCatalogLoading(true)
    try {
      const [catRes, prodRes] = await Promise.all([
        getCategories().catch(() => null),
        getProducts({ limit: 40 }).catch(() => null),
        refreshCart(),
        refreshWishlist(),
      ])

      if (catRes?.success && Array.isArray(catRes.data)) {
        setAllCategories(catRes.data)
      }
      if (prodRes?.success && Array.isArray(prodRes.data)) {
        setAllProducts(prodRes.data)
        setIsLive(true)
      }
    } catch (err) {
      console.error('[VistaraOne] Initial data error:', err.message)
    } finally {
      setCatalogLoading(false)
    }
  }, [refreshCart, refreshWishlist])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  /* ── Cart Actions (Synchronized with Backend API) ── */
  const add = useCallback(
    async (product, quantity = 1, selectedVariant = null) => {
      if (!product?._id) return
      setCartLoading(true)
      try {
        const payload = {
          productId: product._id,
          variantId: selectedVariant?._id || null,
          variantName: selectedVariant?.name || '',
          quantity,
        }
        const res = await apiAddToCart(payload)
        if (res?.success && res.data) {
          setCartData(res.data)
          showToast(`Added to cart! 🛒`)
        }
      } catch (err) {
        showToast(err.message || 'Could not add to cart ⚠️')
      } finally {
        setCartLoading(false)
      }
    },
    [showToast]
  )

  const updateQty = useCallback(
    async (itemId, newQty) => {
      setCartLoading(true)
      try {
        const res = await apiUpdateCartItem(itemId, { quantity: newQty })
        if (res?.success && res.data) {
          setCartData(res.data)
        }
      } catch (err) {
        showToast(err.message || 'Could not update quantity ⚠️')
      } finally {
        setCartLoading(false)
      }
    },
    [showToast]
  )

  const removeFromCart = useCallback(
    async (itemId) => {
      setCartLoading(true)
      try {
        const res = await apiRemoveFromCart(itemId)
        if (res?.success && res.data) {
          setCartData(res.data)
          showToast('Item removed from cart')
        }
      } catch (err) {
        showToast(err.message || 'Could not remove item ⚠️')
      } finally {
        setCartLoading(false)
      }
    },
    [showToast]
  )

  const clearCart = useCallback(async () => {
    setCartLoading(true)
    try {
      const res = await apiClearCart()
      if (res?.success) {
        setCartData({
          items: [],
          summary: { subtotal: 0, originalTotal: 0, discount: 0, deliveryFee: 0, total: 0, itemCount: 0 },
          warnings: [],
        })
        showToast('Cart cleared')
      }
    } catch (err) {
      showToast(err.message || 'Could not clear cart ⚠️')
    } finally {
      setCartLoading(false)
    }
  }, [showToast])

  /* ── Wishlist Actions (Synchronized with Backend API) ── */
  const toggleWish = useCallback(
    async (product) => {
      if (!product?._id) return
      try {
        const res = await apiToggleWishlist(product._id)
        if (res?.success && Array.isArray(res.data)) {
          setWishlistItems(res.data)
          showToast(res.message || (res.added ? 'Added to wishlist! ❤️' : 'Removed from wishlist'))
        }
      } catch (err) {
        showToast(err.message || 'Could not update wishlist ⚠️')
      }
    },
    [showToast]
  )

  const moveWishToCart = useCallback(
    async (product) => {
      await add(product)
      await toggleWish(product)
    },
    [add, toggleWish]
  )

  /* ── Fast lookup map for wishlist ── */
  const wish = useMemo(() => {
    const map = {}
    for (const w of wishlistItems) {
      if (w.product?._id) {
        map[w.product._id] = true
      }
    }
    return map
  }, [wishlistItems])

  const wishItems = useMemo(
    () => wishlistItems.map((w) => w.product).filter(Boolean),
    [wishlistItems]
  )
  const wishCount = wishlistItems.length

  /* ── Computed Cart Values ── */
  const cartItems = cartData.items || []
  const count = cartData.summary?.itemCount || 0
  const cartTotal = cartData.summary?.total || 0
  const cartSummary = cartData.summary || {
    subtotal: 0,
    originalTotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    itemCount: 0,
  }
  const cartWarnings = cartData.warnings || []

  const getCategoryBySlug = useCallback(
    (slug) => {
      if (!slug) return null
      const s = slug.toLowerCase().trim()
      const aliases = {
        mobiles: 'mobiles-smartphones',
        smartphones: 'mobiles-smartphones',
        laptops: 'laptops-computers',
        computers: 'laptops-computers',
        'electronics-accessories': 'electronics',
        'fashion-clothing': 'fashion',
        clothing: 'fashion',
        shoes: 'footwear',
        'home-appliances': 'appliances',
        'grocery-essentials': 'groceries',
        grocery: 'groceries',
        'beauty-pets': 'beauty-personal-care',
        beauty: 'beauty-personal-care',
        watches: 'watches-accessories',
      }
      const target = aliases[s] || s
      return (
        allCategories.find(
          (c) =>
            c.slug.toLowerCase() === s ||
            c.slug.toLowerCase() === target ||
            c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === s
        ) || null
      )
    },
    [allCategories]
  )

  return (
    <ShopCtx.Provider
      value={{
        dark,
        toggleDark,
        allCategories,
        setAllCategories,
        allProducts,
        setAllProducts,
        isLive,
        catalogLoading,
        deliveryLocation,
        setDeliveryLocation,
        // Cart
        cartData,
        cartItems,
        cartSummary,
        cartWarnings,
        cartLoading,
        count,
        cartTotal,
        add,
        updateQty,
        removeFromCart,
        clearCart,
        refreshCart,
        // Wishlist
        wish,
        wishItems,
        wishCount,
        toggleWish,
        moveWishToCart,
        refreshWishlist,
        // UI
        toast,
        showToast,
        getCategoryBySlug,
      }}
    >
      {children}
    </ShopCtx.Provider>
  )
}
