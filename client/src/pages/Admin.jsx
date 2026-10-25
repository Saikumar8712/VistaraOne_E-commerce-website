import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getAdminStats,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminOrders,
  updateAdminOrderStatus,
  getActiveCampaigns,
  getCategories,
} from '../services/api'
import {
  BarChart3,
  Package,
  ShoppingBag,
  Tag,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Search,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Save,
  X,
  Trash2,
} from 'lucide-react'

export default function Admin() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [categories, setCategories] = useState([])

  // Product modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    warranty: '1 Year Brand Warranty',
    image: '',
  })
  const [submittingProduct, setSubmittingProduct] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [productMessage, setProductMessage] = useState('')

  // Order status update state
  const [updatingOrderId, setUpdatingOrderId] = useState(null)

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadInitialData()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadInitialData = async () => {
    setLoading(true)
    try {
      const [statsRes, prodsRes, ordersRes, campsRes, catsRes] = await Promise.all([
        getAdminStats(),
        getAdminProducts({ limit: 50 }),
        getAdminOrders({ limit: 50 }),
        getActiveCampaigns(),
        getCategories(),
      ])

      const extract = (res) => (res?.success ? res.data : res?.data?.success ? res.data.data : res?.data || null)

      const statsData = extract(statsRes)
      if (statsData) setStats(statsData)

      const prodsData = extract(prodsRes)
      if (Array.isArray(prodsData)) setProducts(prodsData)

      const ordersData = extract(ordersRes)
      if (Array.isArray(ordersData)) setOrders(ordersData)

      const campsData = extract(campsRes)
      if (Array.isArray(campsData)) setCampaigns(campsData)

      const catsData = extract(catsRes)
      if (Array.isArray(catsData)) setCategories(catsData)
    } catch (err) {
      console.error('Failed to load admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStock = async (productId, newStock) => {
    try {
      const stockNum = Math.max(0, parseInt(newStock, 10) || 0)
      const res = await updateAdminProduct(productId, { stock: stockNum })
      if (res?.success || res?.data?.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? { ...p, stock: stockNum } : p))
        )
      }
    } catch (err) {
      console.error('Failed to update stock:', err)
    }
  }

  const handleUpdatePrice = async (productId, newPrice) => {
    try {
      const priceNum = Math.max(0, parseInt(newPrice, 10) || 0)
      const res = await updateAdminProduct(productId, { price: priceNum })
      if (res?.success || res?.data?.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === productId ? { ...p, price: priceNum } : p))
        )
      }
    } catch (err) {
      console.error('Failed to update price:', err)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to remove/deactivate this product?')) return
    try {
      const res = await deleteAdminProduct(productId)
      if (res?.success || res?.data?.success) {
        setProducts((prev) => prev.filter((p) => p._id !== productId))
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setSubmittingProduct(true)
    setProductMessage('')
    try {
      const payload = {
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stock: Number(productForm.stock || 10),
        description: productForm.description,
        warranty: productForm.warranty,
        images: productForm.image ? [productForm.image] : [],
      }

      const res = await createAdminProduct(payload)
      const isSuccess = res?.success || res?.data?.success
      const createdItem = res?.data || res?.data?.data
      if (isSuccess && createdItem) {
        setProducts([createdItem, ...products])
        setShowAddProductModal(false)
        setProductForm({
          name: '',
          brand: '',
          category: '',
          price: '',
          originalPrice: '',
          stock: '',
          description: '',
          warranty: '1 Year Brand Warranty',
          image: '',
        })
        setProductMessage('Product added successfully!')
        setTimeout(() => setProductMessage(''), 4000)
      }
    } catch (err) {
      setProductMessage(err.message || 'Failed to create product')
    } finally {
      setSubmittingProduct(false)
    }
  }

  const handleOrderStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId)
    try {
      const res = await updateAdminOrderStatus(orderId, {
        status: newStatus,
        comment: `Order marked as ${newStatus} by store administrator.`,
      })
      if (res?.success || res?.data?.success) {
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord))
        )
      }
    } catch (err) {
      console.error('Failed to update order status:', err)
    } finally {
      setUpdatingOrderId(null)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Administrator Access Required</h2>
          <p className="text-slate-400 text-sm mb-6">
            You must be logged in with an administrator account to view marketplace inventory, order fulfillment, and analytics.
          </p>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-left text-xs text-slate-300 mb-6 space-y-1">
            <p className="font-semibold text-slate-200">Default Admin Credentials:</p>
            <p>Email: <span className="text-[#B8F36B] font-mono">admin@vistaraone.com</span></p>
            <p>Password: <span className="text-[#B8F36B] font-mono">admin123</span></p>
          </div>
          <Link
            to="/login?redirect=/admin"
            className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-bold text-slate-950 bg-[#B8F36B] hover:bg-[#a3df57] transition shadow-lg shadow-[#B8F36B]/10"
          >
            Log in as Administrator
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#B8F36B] animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading Marketplace Command Center...</p>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand?.toLowerCase().includes(productSearch.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B8F36B]/20 text-[#B8F36B] border border-[#B8F36B]/30">
              Admin Portal
            </span>
            <span className="text-xs text-slate-500">Live Production Mode</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Marketplace Command Center</h1>
          <p className="text-slate-400 text-sm">
            Manage inventory, fulfill orders, track revenue, and launch festival discount promotions.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-[#B8F36B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'products'
                ? 'bg-[#B8F36B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-[#B8F36B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === 'campaigns'
                ? 'bg-[#B8F36B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            Campaigns ({campaigns.length})
          </button>
        </div>
      </div>

      {productMessage && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-between">
          <span>{productMessage}</span>
          <button onClick={() => setProductMessage('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: OVERVIEW ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="mt-8 space-y-8">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white mt-3">
                ₹{(stats?.totalRevenue || 0).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">Confirmed marketplace gross volume</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</span>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white mt-3">
                {stats?.totalOrders || 0}
              </p>
              <p className="text-xs text-slate-500 mt-1">Total customer orders placed</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Inventory</span>
                <div className="w-10 h-10 rounded-xl bg-[#B8F36B]/10 text-[#B8F36B] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white mt-3">
                {stats?.totalProducts || products.length}
              </p>
              <p className="text-xs text-slate-500 mt-1">Across {categories.length} marketplace categories</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Alert</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-amber-400 mt-3">
                {stats?.lowStockProducts ?? products.filter((p) => p.stock <= 5).length}
              </p>
              <p className="text-xs text-slate-500 mt-1">Items with &le; 5 units remaining</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Customer Orders</h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#B8F36B] hover:underline"
              >
                View all orders &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Order Number</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-mono font-bold text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{ord.shippingAddress?.name || 'Customer'}</p>
                        <p className="text-xs text-slate-500">{ord.shippingAddress?.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {(ord.orderItems || ord.items)?.length || 0} product(s)
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#B8F36B]">
                        ₹{ord.pricing?.totalPrice?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs capitalize text-slate-400">
                        {ord.paymentMethod}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : ord.orderStatus === 'Shipped'
                              ? 'bg-blue-500/20 text-blue-400'
                              : ord.orderStatus === 'Cancelled'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-500">
                        No orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS INVENTORY */}
      {activeTab === 'products' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title or brand..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B8F36B]"
              />
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-[#B8F36B] hover:bg-[#a3df57] transition shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </div>

          {/* Product Inventory Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Live Selling Price (₹)</th>
                    <th className="px-4 py-3">Stock Units</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                          />
                          <div>
                            <p className="font-semibold text-white line-clamp-1">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.brand} • SKU: {p.sku || 'VO-AUTO'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {p.category?.name || 'General'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 text-xs">₹</span>
                          <input
                            type="number"
                            defaultValue={p.price}
                            onBlur={(e) => handleUpdatePrice(p._id, e.target.value)}
                            className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-sm text-[#B8F36B] font-bold focus:outline-none focus:border-[#B8F36B]"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={p.stock}
                            onBlur={(e) => handleUpdateStock(p._id, e.target.value)}
                            className={`w-20 bg-slate-950 border rounded-lg px-2 py-1 text-sm font-bold focus:outline-none focus:border-[#B8F36B] ${
                              p.stock <= 5
                                ? 'border-amber-500 text-amber-400'
                                : 'border-slate-700 text-white'
                            }`}
                          />
                          {p.stock <= 5 && (
                            <span className="text-[10px] text-amber-400 font-semibold uppercase">Low</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        ★ {p.rating || '4.5'} ({p.reviewCount || 0})
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-3">
                          <Link
                            to={`/product/${p._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#B8F36B] hover:underline"
                          >
                            View Live <ExternalLink className="w-3 h-3" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                            title="Deactivate product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-500">
                        No products match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER FULFILLMENT */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Order Details</th>
                    <th className="px-4 py-3">Recipient & Delivery</th>
                    <th className="px-4 py-3">Items Ordered</th>
                    <th className="px-4 py-3">Grand Total</th>
                    <th className="px-4 py-3">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-3">
                        <p className="font-mono font-bold text-white">{ord.orderNumber}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {ord.paymentMethod?.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">{ord.shippingAddress?.name}</p>
                        <p className="text-xs text-slate-400">{ord.shippingAddress?.phone}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {ord.shippingAddress?.addressLine}, {ord.shippingAddress?.city} - {ord.shippingAddress?.pincode}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-xs text-slate-400">
                        {(ord.orderItems || ord.items)?.map((it, idx) => (
                          <div key={idx} className="line-clamp-1 mb-1">
                            • {it.name} (x{it.quantity})
                          </div>
                        ))}
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-bold text-[#B8F36B]">₹{ord.pricing?.totalPrice?.toLocaleString()}</p>
                        <p className="text-[11px] text-slate-500">
                          {ord.isPaid ? 'Payment Confirmed' : 'COD Pending'}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            disabled={updatingOrderId === ord._id || ord.orderStatus === 'Cancelled'}
                            value={ord.orderStatus}
                            onChange={(e) => handleOrderStatusChange(ord._id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#B8F36B] disabled:opacity-50"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          {updatingOrderId === ord._id && (
                            <Loader2 className="w-3.5 h-3.5 text-[#B8F36B] animate-spin" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-500">
                        No customer orders received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FESTIVAL CAMPAIGNS & COUPONS */}
      {activeTab === 'campaigns' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((camp) => (
              <div
                key={camp._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-black text-sm tracking-widest px-3 py-1 rounded-lg bg-[#B8F36B]/20 text-[#B8F36B] border border-[#B8F36B]/30">
                      {camp.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{camp.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{camp.description}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <p>
                    Benefit: <span className="text-white font-bold">{camp.discountType === 'percentage' ? `${camp.discountValue}% OFF` : `₹${camp.discountValue} FLAT OFF`}</span>
                  </p>
                  <p>Min Cart: <span className="text-white font-bold">₹{camp.minCartValue || 0}</span></p>
                  <p className="text-slate-500 text-[11px]">
                    Valid till: {new Date(camp.endDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Add New Marketplace Product</h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="e.g. Sony, Apple, Samsung"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="e.g. 29990"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    MRP (Original Price)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    placeholder="e.g. 34990"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    placeholder="e.g. 25"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Product highlights and description..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#B8F36B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProduct}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-[#B8F36B] hover:bg-[#a3df57] transition disabled:opacity-50"
                >
                  {submittingProduct ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
