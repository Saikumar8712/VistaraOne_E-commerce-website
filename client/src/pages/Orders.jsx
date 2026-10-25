import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Truck,
  RotateCcw,
  X,
  Loader2,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import { getMyOrders, cancelOrder } from '../services/api'
import Navbar from '../components/Navbar'

export default function Orders() {
  const navigate = useNavigate()
  const { allCategories, showToast } = useShop()
  const { isAuthenticated } = useAuth()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelModalOrder, setCancelModalOrder] = useState(null)
  const [cancelReason, setCancelReason] = useState('Found a better price elsewhere')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await getMyOrders()
      if (res?.success && Array.isArray(res.data)) {
        setOrders(res.data)
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/orders' } } })
      return
    }
    fetchOrders()
  }, [isAuthenticated, navigate])

  const handleCancelOrder = async () => {
    if (!cancelModalOrder) return
    setCancellingId(cancelModalOrder._id)
    try {
      const res = await cancelOrder(cancelModalOrder._id, cancelReason)
      if (res?.success) {
        showToast('Order cancelled and inventory restored successfully')
        setCancelModalOrder(null)
        await fetchOrders()
      }
    } catch (err) {
      showToast(err.message || 'Failed to cancel order ⚠️')
    } finally {
      setCancellingId(null)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
      case 'Shipped':
      case 'OutForDelivery':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400'
      case 'Confirmed':
      case 'Placed':
        return 'bg-lime/20 text-lime-900 dark:bg-lime/10 dark:text-lime'
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-navy dark:text-white sm:text-3xl">
              My Orders
            </h1>
            <p className="text-xs text-slate-500">
              Track status, delivery schedules, and manage cancellations
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm dark:bg-[#131d31]">
            <Package className="mx-auto h-16 w-16 text-slate-300" />
            <h2 className="mt-4 text-xl font-black text-navy dark:text-white">
              No orders placed yet
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              When you purchase items from VistaraOne, they will appear here with live tracking.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded-2xl bg-navy px-8 py-3 text-xs font-bold text-white hover:bg-navy-700 dark:bg-lime dark:text-navy"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => {
              const canCancel = ['Placed', 'Confirmed'].includes(ord.orderStatus)
              return (
                <div
                  key={ord._id}
                  className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-white/5 dark:bg-[#131d31]"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 px-6 py-4 border-b border-slate-100 dark:border-slate-800 dark:bg-slate-800/40 text-xs">
                    <div>
                      <span className="font-bold text-slate-400">Order ID: </span>
                      <span className="font-extrabold text-navy dark:text-white">{ord.orderNumber}</span>
                      <span className="mx-2 text-slate-300">•</span>
                      <span className="text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${getStatusBadge(ord.orderStatus)}`}>
                        {ord.orderStatus}
                      </span>
                      <span className="font-black text-navy dark:text-white">
                        ₹{ord.pricing.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-slate-100 p-6 dark:divide-slate-800">
                    {ord.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 text-xs">
                        <div className="flex items-center gap-3.5">
                          <div className="h-14 w-14 rounded-xl bg-slate-50 p-1 dark:bg-slate-800 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                          </div>
                          <div>
                            <p className="font-bold text-navy dark:text-white line-clamp-1">{item.name}</p>
                            <p className="text-slate-500">
                              Qty: {item.quantity} {item.variantName ? `• ${item.variantName}` : ''}
                            </p>
                          </div>
                        </div>
                        <span className="font-black text-navy dark:text-white">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer: Address & Cancel CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/40 px-6 py-3.5 dark:border-slate-800 dark:bg-slate-900/20 text-xs">
                    <p className="text-slate-500">
                      Delivering to:{' '}
                      <span className="font-bold text-navy dark:text-slate-300">
                        {ord.shippingAddress.name} ({ord.shippingAddress.city} — {ord.shippingAddress.pincode})
                      </span>
                    </p>

                    {canCancel && (
                      <button
                        onClick={() => setCancelModalOrder(ord)}
                        className="rounded-xl border border-rose-200 px-4 py-1.5 font-bold text-rose-600 hover:bg-rose-50 dark:border-rose-900/60 dark:hover:bg-rose-950/40"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Cancellation Modal */}
        <AnimatePresence>
          {cancelModalOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#131d31]"
              >
                <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                  <h3 className="text-sm font-black text-navy dark:text-white">
                    Cancel Order #{cancelModalOrder.orderNumber}
                  </h3>
                  <button onClick={() => setCancelModalOrder(null)}>
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Are you sure you want to cancel this order? The inventory will be immediately released and returned to the store.
                </p>

                <div className="mt-4">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Reason for Cancellation
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="Found a better price elsewhere">Found a better price elsewhere</option>
                    <option value="Ordered by mistake">Ordered by mistake</option>
                    <option value="Delivery time is too long">Delivery time is too long</option>
                    <option value="Need to change delivery address or phone">Need to change delivery address</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setCancelModalOrder(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Keep Order
                  </button>
                  <button
                    disabled={cancellingId === cancelModalOrder._id}
                    onClick={handleCancelOrder}
                    className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-40"
                  >
                    {cancellingId === cancelModalOrder._id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Confirm Cancellation
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
