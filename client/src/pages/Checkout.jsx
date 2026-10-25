import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  CreditCard,
  Truck,
  Plus,
  ArrowRight,
  Package,
  AlertCircle,
  Loader2,
  Lock,
  Zap,
  Tag,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, validateCoupon } from '../services/api'
import Navbar from '../components/Navbar'

export default function Checkout() {
  const navigate = useNavigate()
  const { allCategories, cartItems, cartSummary, clearCart, showToast } = useShop()
  const { user, isAuthenticated, addNewAddress } = useAuth()

  // Selected delivery address
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0)
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    pincode: '500081',
    addressLine: '',
    locality: '',
    city: 'Hyderabad',
    state: 'Telangana',
    addressType: 'home',
  })

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('TestSandbox') // 'TestSandbox' | 'COD'
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [placedOrder, setPlacedOrder] = useState(null)

  // Festival Coupon state
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' })

  const handleApplyCoupon = async (codeToApply) => {
    const code = (typeof codeToApply === 'string' ? codeToApply : couponCode).trim()
    if (!code) return
    setCouponLoading(true)
    setCouponMsg({ text: '', type: '' })
    try {
      const res = await validateCoupon(code, cartSummary.total)
      const isSuccess = res?.success || res?.data?.success
      const couponData = res?.data || res?.data?.data
      if (isSuccess && couponData) {
        setAppliedCoupon(couponData)
        setCouponCode(code.toUpperCase())
        setCouponMsg({ text: res?.message || res?.data?.message || 'Coupon applied! 🎉', type: 'success' })
      } else {
        setCouponMsg({
          text: res?.message || res?.data?.message || 'Invalid or expired coupon',
          type: 'error',
        })
        setAppliedCoupon(null)
      }
    } catch (err) {
      setCouponMsg({
        text: err.message || 'Invalid or expired coupon',
        type: 'error',
      })
      setAppliedCoupon(null)
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponMsg({ text: '', type: '' })
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) return null

  const addresses = user.addresses || []
  const activeAddress = addresses[selectedAddressIndex] || null

  const handleCreateNewAddress = async (e) => {
    e.preventDefault()
    try {
      await addNewAddress(newAddr)
      setShowNewAddress(false)
      setSelectedAddressIndex(user.addresses?.length || 0)
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save address')
    }
  }

  const handlePlaceOrder = async () => {
    setErrorMsg(null)

    if (!activeAddress && !showNewAddress) {
      setErrorMsg('Please select or add a delivery shipping address.')
      return
    }

    const shippingAddress = activeAddress || newAddr

    setSubmitting(true)
    try {
      const res = await createOrder({
        shippingAddress,
        paymentMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        paymentDetails:
          paymentMethod === 'TestSandbox'
            ? { id: 'sandbox_pay_' + Date.now(), status: 'Completed' }
            : null,
      })

      if (res?.success && res.data) {
        setPlacedOrder(res.data)
        await clearCart()
        showToast('Order confirmed! 🎉')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order')
    } finally {
      setSubmitting(false)
    }
  }

  // ── ORDER SUCCESS SCREEN ──
  if (placedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        <Navbar categories={allCategories} />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-[#131d31] sm:p-12"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="mt-4 inline-block rounded-full bg-lime/20 px-3 py-1 text-xs font-black text-lime-800 dark:bg-lime/10 dark:text-lime">
              Order Confirmed & Verified
            </span>

            <h1 className="mt-3 text-2xl font-black text-navy dark:text-white sm:text-3xl">
              Thank You for Your Order!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Order ID: <span className="font-extrabold text-navy dark:text-white">{placedOrder.orderNumber}</span>
            </p>

            <div className="my-8 rounded-2xl bg-slate-50 p-6 text-left dark:bg-slate-800/40">
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Delivering To:</span>
                  <p className="mt-1 font-bold text-navy dark:text-white">{placedOrder.shippingAddress.name}</p>
                  <p className="text-slate-500">
                    {placedOrder.shippingAddress.addressLine}, {placedOrder.shippingAddress.city} —{' '}
                    {placedOrder.shippingAddress.pincode}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Payment Status:</span>
                  <p className="mt-1 font-bold text-navy dark:text-white">
                    {placedOrder.paymentMethod} ({placedOrder.isPaid ? 'Paid' : 'Pay on Delivery'})
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Total: ₹{placedOrder.pricing.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center gap-2 rounded-2xl bg-navy px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-navy-700 dark:bg-lime dark:text-navy"
              >
                <Package className="h-4 w-4" /> View My Orders
              </button>
              <button
                onClick={() => navigate('/')}
                className="rounded-2xl border border-slate-200 px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-black text-navy dark:text-white sm:text-3xl">
          Order Checkout
        </h1>

        {errorMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl bg-rose-50 p-4 text-xs font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Address + Payment (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* STEP 1: DELIVERY ADDRESS */}
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy text-xs font-black text-lime">
                    1
                  </span>
                  <h2 className="text-base font-black text-navy dark:text-white">Delivery Address</h2>
                </div>
                {!showNewAddress && (
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className="flex items-center gap-1 text-xs font-bold text-lime-700 hover:underline dark:text-lime"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New
                  </button>
                )}
              </div>

              {/* Saved Addresses Selector */}
              {!showNewAddress && addresses.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {addresses.map((addr, idx) => {
                    const isSelected = selectedAddressIndex === idx
                    return (
                      <label
                        key={addr._id || idx}
                        onClick={() => setSelectedAddressIndex(idx)}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                          isSelected
                            ? 'border-navy bg-slate-50/80 shadow-sm dark:border-lime dark:bg-slate-800/40'
                            : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={isSelected}
                          onChange={() => setSelectedAddressIndex(idx)}
                          className="mt-1 text-navy focus:ring-lime"
                        />
                        <div className="flex-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-navy dark:text-white">{addr.name}</span>
                            <span className="rounded bg-slate-200 px-1.5 py-0.2 text-[10px] font-bold uppercase text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                              {addr.addressType}
                            </span>
                            <span className="font-semibold text-slate-500">{addr.phone}</span>
                          </div>
                          <p className="mt-1 text-slate-600 dark:text-slate-300">
                            {addr.addressLine}, {addr.locality}, {addr.city}, {addr.state} —{' '}
                            <span className="font-bold">{addr.pincode}</span>
                          </p>
                        </div>
                      </label>
                    )
                  })}
                </div>
              ) : (
                /* Inline New Address Form */
                <form onSubmit={handleCreateNewAddress} className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Phone Number"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-Digit PIN Code"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Locality / Area"
                      value={newAddr.locality}
                      onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Flat, House no., Building, Street"
                    value={newAddr.addressLine}
                    onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowNewAddress(false)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white dark:bg-lime dark:text-navy"
                    >
                      Save & Deliver Here
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* STEP 2: PAYMENT METHOD */}
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 dark:border-white/5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy text-xs font-black text-lime">
                  2
                </span>
                <h2 className="text-base font-black text-navy dark:text-white">Payment Options</h2>
              </div>

              <div className="mt-4 space-y-3">
                {/* Test Sandbox (Instant verification) */}
                <label
                  onClick={() => setPaymentMethod('TestSandbox')}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    paymentMethod === 'TestSandbox'
                      ? 'border-navy bg-slate-50/80 shadow-sm dark:border-lime dark:bg-slate-800/40'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentMethod === 'TestSandbox'}
                    onChange={() => setPaymentMethod('TestSandbox')}
                    className="mt-1 text-navy focus:ring-lime"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-lime-700 dark:text-lime" />
                      <span className="text-xs font-black text-navy dark:text-white">
                        Test Sandbox / Instant Verification (Recommended)
                      </span>
                      <span className="rounded bg-lime px-2 py-0.5 text-[10px] font-black text-navy">
                        Fast Test
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Simulates successful server signature verification without requiring live bank credentials.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    paymentMethod === 'COD'
                      ? 'border-navy bg-slate-50/80 shadow-sm dark:border-lime dark:bg-slate-800/40'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 text-navy focus:ring-lime"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-slate-600" />
                      <span className="text-xs font-black text-navy dark:text-white">
                        Cash on Delivery (Pay at Doorstep)
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Pay with cash or UPI directly to the courier agent upon arrival.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* STEP 3: ORDER ITEMS SNAPSHOT */}
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 dark:border-white/5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy text-xs font-black text-lime">
                  3
                </span>
                <h2 className="text-base font-black text-navy dark:text-white">
                  Order Items ({cartItems.length})
                </h2>
              </div>
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between py-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 p-1 dark:bg-slate-800">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-navy dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-slate-400">Qty: {item.quantity} {item.variantName ? `• ${item.variantName}` : ''}</p>
                      </div>
                    </div>
                    <span className="font-black text-navy dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
              <h3 className="border-b border-slate-100 pb-4 text-base font-black uppercase tracking-wider text-navy dark:border-white/5 dark:text-white">
                Price Breakdown
              </h3>

              {/* Festival Coupons & Promo Code Box */}
              <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-[#B8F36B]" />
                  <span className="text-xs font-bold text-navy dark:text-white">Festival Promo Coupon</span>
                </div>

                {!appliedCoupon ? (
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleApplyCoupon()
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. FESTIVAL20"
                        className="flex-1 min-w-0 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold uppercase text-navy dark:text-white focus:outline-none focus:border-[#B8F36B]"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-3 py-1.5 rounded-xl bg-navy dark:bg-[#B8F36B] text-[#B8F36B] dark:text-slate-950 text-xs font-black hover:opacity-90 transition disabled:opacity-50"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </form>

                    {/* Quick Suggestions */}
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-slate-400">Try:</span>
                      {['FESTIVAL20', 'WELCOME100', 'DIWALI500'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCouponCode(c)
                            handleApplyCoupon(c)
                          }}
                          className="text-[10px] font-mono font-bold bg-[#B8F36B]/15 text-[#B8F36B] dark:bg-[#B8F36B]/10 px-1.5 py-0.5 rounded border border-[#B8F36B]/30 hover:bg-[#B8F36B]/30 transition"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2">
                    <div>
                      <p className="text-xs font-mono font-bold text-emerald-400">
                        {appliedCoupon.code} APPLIED
                      </p>
                      <p className="text-[10px] text-emerald-500">
                        Saved ₹{appliedCoupon.discountAmount.toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-rose-400 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponMsg.text && (
                  <p
                    className={`mt-2 text-[11px] font-medium ${
                      couponMsg.type === 'success' ? 'text-emerald-500' : 'text-rose-400'
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Price ({cartSummary.itemCount} items)</span>
                  <span className="font-bold text-navy dark:text-white">
                    ₹{cartSummary.originalTotal.toLocaleString()}
                  </span>
                </div>

                {cartSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Product Discount</span>
                    <span className="font-bold">- ₹{cartSummary.discount.toLocaleString()}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-[#B8F36B] font-bold">
                    <span>Coupon Savings ({appliedCoupon.code})</span>
                    <span>- ₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Delivery Charges</span>
                  <span className="font-bold">
                    {cartSummary.deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                    ) : (
                      `₹${cartSummary.deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 dark:border-slate-800">
                  <div className="flex justify-between text-base font-black text-navy dark:text-white">
                    <span>Total Payable</span>
                    <span>
                      ₹{Math.max(0, cartSummary.total - (appliedCoupon?.discountAmount || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Order Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={submitting || cartItems.length === 0}
                onClick={handlePlaceOrder}
                className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-lime font-black text-navy shadow-lg transition hover:bg-[#a5e354] disabled:opacity-40"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Zap className="h-5 w-5 fill-navy" />
                    Confirm & Place Order
                  </>
                )}
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                <span>Encrypted 256-bit Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
