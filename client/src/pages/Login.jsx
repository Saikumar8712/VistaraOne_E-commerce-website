import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  User,
  Mail,
  Lock,
  Phone,
  Package,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { allCategories } = useShop()
  const { user, isAuthenticated, login, register, logout } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    email: '',
    password: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null)
    setSubmitting(true)

    try {
      if (isLogin) {
        await login(formData.emailOrPhone, formData.password)
        navigate(from, { replace: true })
      } else {
        await register(formData.name, formData.email, formData.password, formData.phone)
        navigate(from, { replace: true })
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-[#131d31] md:flex">
          {/* Left Hero Panel (Flipkart Style) */}
          <div className="flex flex-col justify-between bg-navy p-8 text-white md:w-2/5">
            <div>
              <span className="rounded-full bg-lime/20 px-3.5 py-1 text-xs font-black text-lime">
                {isAuthenticated ? 'My Profile' : isLogin ? 'Welcome Back' : 'Join VistaraOne'}
              </span>
              <h1 className="mt-4 text-3xl font-black">
                {isAuthenticated
                  ? `Hello, ${user.name}`
                  : isLogin
                  ? 'Login to VistaraOne'
                  : "Looks like you're new here!"}
              </h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {isAuthenticated
                  ? 'Manage your orders, saved delivery addresses, and personal preferences.'
                  : isLogin
                  ? 'Get access to your Orders, Wishlist, and Personalized Recommendations with server security.'
                  : 'Sign up with your mobile or email to unlock fast checkout and special festival discounts.'}
              </p>
            </div>

            <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Package className="h-4 w-4 text-lime" />
                <span>Track your orders in real-time</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-lime" />
                <span>100% safe & verified JWT transactions</span>
              </div>
            </div>
          </div>

          {/* Right Form / Account Panel */}
          <div className="p-8 md:w-3/5">
            {isAuthenticated ? (
              /* Already Logged In State */
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lime text-2xl font-black text-navy shadow">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-navy dark:text-white">{user.name}</h2>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    {user.phone && <p className="text-xs text-slate-500">{user.phone}</p>}
                    <span className="mt-1 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Role: {user.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-xs font-bold text-navy transition hover:border-lime dark:border-slate-700 dark:text-white"
                  >
                    <span>Manage Saved Addresses & Profile</span>
                    <ArrowRight className="h-4 w-4 text-lime" />
                  </button>
                  <button
                    onClick={() => navigate('/cart')}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-xs font-bold text-navy transition hover:border-lime dark:border-slate-700 dark:text-white"
                  >
                    <span>View Shopping Cart</span>
                    <ArrowRight className="h-4 w-4 text-lime" />
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="flex w-full items-center justify-between rounded-2xl bg-navy p-4 text-xs font-bold text-lime shadow transition hover:bg-navy-700"
                    >
                      <span>Admin Control Center</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-700"
                  >
                    <LogOut className="h-4 w-4" /> Log out of this account
                  </button>
                </div>
              </div>
            ) : (
              /* Login / Register Form */
              <div>
                {/* Form Toggle Header */}
                <div className="mb-6 flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
                  <button
                    onClick={() => {
                      setIsLogin(true)
                      setErrorMsg(null)
                    }}
                    className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
                      isLogin
                        ? 'bg-white text-navy shadow-sm dark:bg-[#131d31] dark:text-white'
                        : 'text-slate-500 hover:text-navy dark:text-slate-400'
                    }`}
                  >
                    Existing User? Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false)
                      setErrorMsg(null)
                    }}
                    className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
                      !isLogin
                        ? 'bg-white text-navy shadow-sm dark:bg-[#131d31] dark:text-white'
                        : 'text-slate-500 hover:text-navy dark:text-slate-400'
                    }`}
                  >
                    New Here? Sign Up
                  </button>
                </div>

                {errorMsg && (
                  <div className="mb-4 flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <div className="relative mt-1">
                        <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sai Kumar"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {isLogin ? (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address or Phone Number
                      </label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.emailOrPhone}
                          onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                          placeholder="Enter your registered Email or Mobile"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Email Address
                        </label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Mobile Phone (Optional)
                        </label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit mobile number"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="At least 6 characters"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-navy focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    By continuing, you agree to VistaraOne's Terms of Use and Privacy Policy.
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime font-black text-navy shadow-md transition hover:bg-[#a5e354] disabled:opacity-40"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span>{isLogin ? 'Log In' : 'Create Account'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
