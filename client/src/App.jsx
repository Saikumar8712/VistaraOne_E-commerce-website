import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useShop } from './context/ShopContext'
import PageLoader from './components/PageLoader'
import TopBarProgress from './components/TopBarProgress'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CategoryPage from './pages/CategoryPage'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import SearchResults from './pages/SearchResults'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Admin from './pages/Admin'

export default function App() {
  const { toast, catalogLoading } = useShop()
  const [initialSplash, setInitialSplash] = useState(true)

  // Ensure splash loader displays smoothly on first website visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialSplash(false)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])

  const isPageLoading = initialSplash || catalogLoading

  return (
    <div className="relative min-h-screen">
      {/* Top Bar Glow on Route Transitions */}
      <TopBarProgress />

      {/* Beautiful Branded Website Entrance Loader */}
      <PageLoader show={isPageLoading} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/c/:slug" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-navy px-6 py-3.5 text-sm font-bold text-lime shadow-2xl ring-2 ring-lime/40"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
