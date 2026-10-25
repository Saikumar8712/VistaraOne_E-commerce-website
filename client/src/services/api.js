import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach JWT auth token and persistent guest-id header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vo-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    let guestId = localStorage.getItem('vo-guest-id')
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
      localStorage.setItem('vo-guest-id', guestId)
    }
    config.headers['x-guest-id'] = guestId

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for centralized error formatting
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Network error. Please check if the server is running.'
    return Promise.reject(new Error(message))
  }
)

/* ── Product APIs ── */
export const getProducts = (params = {}) => API.get('/products', { params })
export const getProductById = (id) => API.get(`/products/${id}`)
export const getProductBySlug = (slug) => API.get(`/products/slug/${slug}`)
export const getSimilarProducts = (id, limit = 8) =>
  API.get(`/products/${id}/similar`, { params: { limit } })
export const getFilterMeta = (category) =>
  API.get('/products/filters/meta', { params: { category } })

/* ── Category APIs ── */
export const getCategories = () => API.get('/categories')
export const getCategoryBySlug = (slug) => API.get(`/categories/${slug}`)
export const getCategoryProducts = (slug, params = {}) =>
  API.get(`/categories/${slug}/products`, { params })

/* ── Cart APIs (Backed by MongoDB & Server-side Validation) ── */
export const getCart = () => API.get('/cart')
export const addToCart = (data) => API.post('/cart', data)
export const updateCartItem = (itemId, data) => API.put(`/cart/${itemId}`, data)
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`)
export const clearCart = () => API.delete('/cart')
export const mergeGuestCart = (guestId) => API.post('/cart/merge', { guestId })

/* ── Wishlist APIs (Backed by MongoDB) ── */
export const getWishlist = () => API.get('/wishlist')
export const toggleWishlist = (productId) => API.post('/wishlist', { productId })
export const removeFromWishlist = (productId) => API.delete(`/wishlist/${productId}`)

/* ── Auth & User Account APIs ── */
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')
export const updateProfile = (data) => API.put('/auth/profile', data)
export const addAddress = (data) => API.post('/auth/addresses', data)
export const deleteAddress = (addressId) => API.delete(`/auth/addresses/${addressId}`)
/* ── Order APIs ── */
export const createOrder = (orderData) => API.post('/orders', orderData)
export const getMyOrders = () => API.get('/orders/myorders')
export const getOrderDetails = (orderId) => API.get(`/orders/${orderId}`)
export const cancelOrder = (orderId, reason) => API.put(`/orders/${orderId}/cancel`, { reason })

// Campaigns & Coupons
export const getActiveCampaigns = () => API.get('/campaigns')
export const validateCoupon = (code, cartTotal) => API.post('/campaigns/validate-coupon', { code, cartTotal })

// Admin Management
export const getAdminStats = () => API.get('/admin/stats')
export const getAdminProducts = (params) => API.get('/admin/products', { params })
export const createAdminProduct = (data) => API.post('/admin/products', data)
export const updateAdminProduct = (id, data) => API.put(`/admin/products/${id}`, data)
export const deleteAdminProduct = (id) => API.delete(`/admin/products/${id}`)
export const getAdminOrders = (params) => API.get('/admin/orders', { params })
export const updateAdminOrderStatus = (id, data) => API.put(`/admin/orders/${id}/status`, data)

// Reviews
export const getProductReviews = (productId, params) => API.get(`/reviews/product/${productId}`, { params })
export const addReview = (data) => API.post('/reviews', data)
export const deleteReview = (id) => API.delete(`/reviews/${id}`)

export default API
