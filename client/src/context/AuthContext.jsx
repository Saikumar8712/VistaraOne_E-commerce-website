import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile as apiUpdateProfile,
  addAddress as apiAddAddress,
  deleteAddress as apiDeleteAddress,
} from '../services/api'
import { useShop } from './ShopContext'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const { refreshCart, refreshWishlist, showToast } = useShop()

  const [token, setToken] = useState(() => localStorage.getItem('vo-token') || null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Verify and fetch profile on boot if token exists
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setAuthLoading(false)
        return
      }
      try {
        const res = await getMe()
        if (res?.success && res.user) {
          setUser(res.user)
        } else {
          setToken(null)
          localStorage.removeItem('vo-token')
        }
      } catch {
        setToken(null)
        localStorage.removeItem('vo-token')
      } finally {
        setAuthLoading(false)
      }
    }

    loadUser()
  }, [token])

  // Login
  const login = useCallback(
    async (emailOrPhone, password) => {
      const guestId = localStorage.getItem('vo-guest-id')
      const res = await loginUser({ emailOrPhone, password, guestId })

      if (res?.success && res.token) {
        localStorage.setItem('vo-token', res.token)
        setToken(res.token)
        setUser(res.user)
        // Refresh cart & wishlist to reflect merged user data
        await refreshCart()
        await refreshWishlist()
        showToast(`Welcome back, ${res.user.name}! 👋`)
        return res.user
      }
      throw new Error(res?.message || 'Login failed')
    },
    [refreshCart, refreshWishlist, showToast]
  )

  // Register
  const register = useCallback(
    async (name, email, password, phone) => {
      const guestId = localStorage.getItem('vo-guest-id')
      const res = await registerUser({ name, email, password, phone, guestId })

      if (res?.success && res.token) {
        localStorage.setItem('vo-token', res.token)
        setToken(res.token)
        setUser(res.user)
        await refreshCart()
        await refreshWishlist()
        showToast(`Account created! Welcome to VistaraOne, ${res.user.name}! 🎉`)
        return res.user
      }
      throw new Error(res?.message || 'Registration failed')
    },
    [refreshCart, refreshWishlist, showToast]
  )

  // Logout
  const logout = useCallback(async () => {
    localStorage.removeItem('vo-token')
    setToken(null)
    setUser(null)
    // Generate a fresh guest session ID
    const newGuestId = 'guest_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
    localStorage.setItem('vo-guest-id', newGuestId)
    await refreshCart()
    await refreshWishlist()
    showToast('Logged out successfully')
  }, [refreshCart, refreshWishlist, showToast])

  // Update profile
  const updateUser = useCallback(
    async (data) => {
      const res = await apiUpdateProfile(data)
      if (res?.success && res.user) {
        setUser(res.user)
        showToast('Profile updated successfully')
        return res.user
      }
    },
    [showToast]
  )

  // Add delivery address
  const addNewAddress = useCallback(
    async (addressData) => {
      const res = await apiAddAddress(addressData)
      if (res?.success && Array.isArray(res.addresses)) {
        setUser((prev) => ({ ...prev, addresses: res.addresses }))
        showToast('Delivery address saved! 📍')
        return res.addresses
      }
    },
    [showToast]
  )

  // Remove delivery address
  const removeAddress = useCallback(
    async (addressId) => {
      const res = await apiDeleteAddress(addressId)
      if (res?.success && Array.isArray(res.addresses)) {
        setUser((prev) => ({ ...prev, addresses: res.addresses }))
        showToast('Address removed')
        return res.addresses
      }
    },
    [showToast]
  )

  return (
    <AuthCtx.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.role === 'admin',
        authLoading,
        login,
        register,
        logout,
        updateUser,
        addNewAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthCtx.Provider>
  )
}
