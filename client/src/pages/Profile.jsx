import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  User,
  MapPin,
  Package,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  Building,
  Home,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function Profile() {
  const navigate = useNavigate()
  const { allCategories } = useShop()
  const { user, isAuthenticated, logout, updateUser, addNewAddress, removeAddress } = useAuth()

  const [activeTab, setActiveTab] = useState('addresses') // 'profile' | 'addresses'

  // Edit Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })
  const [profileSaving, setProfileSaving] = useState(false)

  // Add Address modal / toggle
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressForm, setAddressForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    pincode: '',
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'home',
    isDefault: false,
  })
  const [addressSaving, setAddressSaving] = useState(false)
  const [addressError, setAddressError] = useState(null)

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        <Navbar categories={allCategories} />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <User className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-black text-navy dark:text-white">Please Log In</h2>
          <p className="mt-2 text-xs text-slate-500">
            Sign in to access your saved delivery addresses, profile, and order history.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 rounded-2xl bg-lime px-8 py-3 text-xs font-black text-navy shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileSaving(true)
    try {
      await updateUser(profileForm)
    } finally {
      setProfileSaving(false)
    }
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    setAddressSaving(true)
    setAddressError(null)
    try {
      await addNewAddress(addressForm)
      setShowAddressForm(false)
      setAddressForm({
        name: user.name || '',
        phone: user.phone || '',
        pincode: '',
        addressLine: '',
        locality: '',
        city: '',
        state: '',
        landmark: '',
        addressType: 'home',
        isDefault: false,
      })
    } catch (err) {
      setAddressError(err.message || 'Failed to save address')
    } finally {
      setAddressSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <Navbar categories={allCategories} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Navigation Sidebar (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lime text-2xl font-black text-navy shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Hello,
                  </span>
                  <h2 className="text-lg font-black text-navy dark:text-white">{user.name}</h2>
                  <p className="text-xs text-slate-500 truncate max-w-[200px]">{user.email}</p>
                </div>
              </div>

              {/* Sidebar Menu Options */}
              <div className="mt-8 space-y-2 border-t border-slate-100 pt-6 dark:border-white/5">
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition ${
                    activeTab === 'addresses'
                      ? 'bg-navy text-lime shadow dark:bg-lime dark:text-navy'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4" />
                    <span>Manage Addresses ({user.addresses?.length || 0})</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition ${
                    activeTab === 'profile'
                      ? 'bg-navy text-lime shadow dark:bg-lime dark:text-navy'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4" />
                    <span>Personal Information</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => navigate('/orders')}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 dark:border-white/5">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-700"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content Area (8 cols) */}
          <section className="lg:col-span-8">
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
                  <div>
                    <h2 className="text-xl font-black text-navy dark:text-white">Delivery Addresses</h2>
                    <p className="text-xs text-slate-500">
                      Manage your saved home and work addresses for fast checkout
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-lime px-4 py-2.5 text-xs font-black text-navy shadow transition hover:bg-[#a5e354]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{showAddressForm ? 'Cancel' : 'Add New Address'}</span>
                  </button>
                </div>

                {/* Add Address Form Modal / Inline Box */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]"
                    >
                      <h3 className="mb-4 text-sm font-black text-navy dark:text-white">
                        Add a New Delivery Address
                      </h3>
                      {addressError && (
                        <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-600">
                          <AlertCircle className="h-4 w-4" />
                          <span>{addressError}</span>
                        </div>
                      )}

                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.name}
                              onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              Phone Number (10 Digits)
                            </label>
                            <input
                              type="tel"
                              required
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              Pincode
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              placeholder="6 Digits [0-9]"
                              value={addressForm.pincode}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  pincode: e.target.value.replace(/\D/g, ''),
                                })
                              }
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              Locality / Area
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Madhapur / Hitech City"
                              value={addressForm.locality}
                              onChange={(e) =>
                                setAddressForm({ ...addressForm, locality: e.target.value })
                              }
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            Flat, House No., Building, Apartment
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={addressForm.addressLine}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, addressLine: e.target.value })
                            }
                            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              City / District
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.city}
                              onChange={(e) =>
                                setAddressForm({ ...addressForm, city: e.target.value })
                              }
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              State
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.state}
                              onChange={(e) =>
                                setAddressForm({ ...addressForm, state: e.target.value })
                              }
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              Landmark (Optional)
                            </label>
                            <input
                              type="text"
                              value={addressForm.landmark}
                              onChange={(e) =>
                                setAddressForm({ ...addressForm, landmark: e.target.value })
                              }
                              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Address Type & Default */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <div className="flex items-center gap-4 text-xs">
                            <span className="font-bold text-slate-500">Address Type:</span>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="addressType"
                                value="home"
                                checked={addressForm.addressType === 'home'}
                                onChange={() => setAddressForm({ ...addressForm, addressType: 'home' })}
                              />
                              <span>Home (All day delivery)</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="addressType"
                                value="work"
                                checked={addressForm.addressType === 'work'}
                                onChange={() => setAddressForm({ ...addressForm, addressType: 'work' })}
                              />
                              <span>Work (10 AM - 5 PM)</span>
                            </label>
                          </div>

                          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={addressForm.isDefault}
                              onChange={(e) =>
                                setAddressForm({ ...addressForm, isDefault: e.target.checked })
                              }
                            />
                            <span>Make this my default address</span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={addressSaving}
                            className="rounded-xl bg-navy px-6 py-2.5 text-xs font-bold text-white transition hover:bg-navy-700 dark:bg-lime dark:text-navy"
                          >
                            {addressSaving ? 'Saving...' : 'Save Address'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Saved Addresses List */}
                {user.addresses?.length === 0 ? (
                  <div className="rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#131d31]">
                    <MapPin className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-4 text-base font-bold text-navy dark:text-white">
                      No Saved Addresses Yet
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Add a delivery address to enable one-click checkout.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className="relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#131d31]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              {addr.addressType === 'work' ? <Building className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                              {addr.addressType}
                            </span>
                            {addr.isDefault && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Default
                              </span>
                            )}
                          </div>

                          <h4 className="mt-3 text-sm font-black text-navy dark:text-white">
                            {addr.name}
                          </h4>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {addr.addressLine}, {addr.locality}
                            <br />
                            {addr.city}, {addr.state} — <span className="font-bold">{addr.pincode}</span>
                          </p>
                          <p className="mt-2 text-xs font-semibold text-slate-500">
                            Mobile: <span className="text-navy dark:text-white">{addr.phone}</span>
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end dark:border-white/5">
                          <button
                            onClick={() => removeAddress(addr._id)}
                            className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#131d31]">
                <h2 className="text-xl font-black text-navy dark:text-white">Personal Information</h2>
                <p className="text-xs text-slate-500">Update your name and primary phone number</p>

                <form onSubmit={handleProfileSubmit} className="mt-6 max-w-lg space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address (Permanent)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-xs text-slate-500 cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-navy dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="rounded-2xl bg-navy px-8 py-3 text-xs font-bold text-white hover:bg-navy-700 dark:bg-lime dark:text-navy shadow-md"
                    >
                      {profileSaving ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
