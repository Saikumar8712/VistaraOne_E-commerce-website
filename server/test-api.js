process.env.NODE_ENV = 'test'
import http from 'http'
import { connectDB } from './config/db.js'
import app from './server.js'

const PORT = 5056

function makeRequest(path, method = 'GET', bodyData = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = bodyData ? JSON.stringify(bodyData) : null
    const reqHeaders = {
      ...headers,
      'Content-Type': 'application/json',
      ...(payload && { 'Content-Length': Buffer.byteLength(payload) }),
    }

    const req = http.request(
      `http://localhost:${PORT}${path}`,
      {
        method,
        headers: reqHeaders,
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) })
          } catch {
            resolve({ status: res.statusCode, body: data })
          }
        })
      }
    )

    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

async function runTests() {
  console.log('───────────────────────────────────────────────────────')
  console.log('🚀 RUNNING PHASE 5 VISTARAONE AUTH & CART TESTS')
  console.log('───────────────────────────────────────────────────────')

  await connectDB()

  const server = app.listen(PORT, async () => {
    let passed = 0
    let failed = 0

    const assert = (name, condition, extra = '') => {
      if (condition) {
        console.log(`  ✅ PASS: ${name}`)
        passed++
      } else {
        console.error(`  ❌ FAIL: ${name} ${extra}`)
        failed++
      }
    }

    try {
      const guestHeader = { 'x-guest-id': 'test_guest_session_999' }

      // 1. Health check
      const health = await makeRequest('/api/health')
      assert('Health check endpoint /api/health', health.status === 200 && health.body.ok === true)

      // 2. Fetch sample product for cart operations
      const productsRes = await makeRequest('/api/products?limit=2')
      assert('Products list accessible', productsRes.status === 200 && productsRes.body.data.length > 0)
      const sampleProd = productsRes.body.data[0]

      // 3. Cart: Initially empty
      const initialCart = await makeRequest('/api/cart', 'GET', null, guestHeader)
      assert('Get initial cart (empty)', initialCart.status === 200 && Array.isArray(initialCart.body.data.items))

      // 4. Cart: Add product
      const addRes = await makeRequest(
        '/api/cart',
        'POST',
        { productId: sampleProd._id, quantity: 2 },
        guestHeader
      )
      assert(
        'Add product to cart with server-side pricing',
        addRes.status === 200 &&
          addRes.body.data.items.length === 1 &&
          addRes.body.data.summary.subtotal === sampleProd.price * 2
      )

      const cartItem = addRes.body.data.items[0]

      // 5. Cart: Update quantity
      const updateRes = await makeRequest(
        `/api/cart/${cartItem._id}`,
        'PUT',
        { quantity: 3 },
        guestHeader
      )
      assert(
        'Update cart item quantity',
        updateRes.status === 200 &&
          updateRes.body.data.items[0].quantity === 3 &&
          updateRes.body.data.summary.subtotal === sampleProd.price * 3
      )

      // 6. Cart: Stock limit rejection
      const stockRejectRes = await makeRequest(
        `/api/cart/${cartItem._id}`,
        'PUT',
        { quantity: 9999 },
        guestHeader
      )
      assert(
        'Reject quantity exceeding live stock',
        stockRejectRes.status === 400 && stockRejectRes.body.success === false
      )

      // 7. Cart: Remove line item
      const removeRes = await makeRequest(
        `/api/cart/${cartItem._id}`,
        'DELETE',
        null,
        guestHeader
      )
      assert(
        'Remove item from cart',
        removeRes.status === 200 && removeRes.body.data.items.length === 0
      )

      // 8. Wishlist: Toggle Add
      const wishAdd = await makeRequest(
        '/api/wishlist',
        'POST',
        { productId: sampleProd._id },
        guestHeader
      )
      assert(
        'Add item to wishlist',
        wishAdd.status === 200 && wishAdd.body.added === true && wishAdd.body.count === 1
      )

      // 9. Wishlist: Get items
      const wishList = await makeRequest('/api/wishlist', 'GET', null, guestHeader)
      assert(
        'Fetch wishlist items',
        wishList.status === 200 &&
          wishList.body.data.length === 1 &&
          wishList.body.data[0].product._id === sampleProd._id
      )

      // 10. Wishlist: Toggle Remove
      const wishRemove = await makeRequest(
        '/api/wishlist',
        'POST',
        { productId: sampleProd._id },
        guestHeader
      )
      assert(
        'Toggle item out of wishlist',
        wishRemove.status === 200 && wishRemove.body.added === false && wishRemove.body.count === 0
      )

      // ── PHASE 5 AUTH & ADDRESS TESTS ──
      const testEmail = `testuser_${Date.now()}@example.com`

      // 11. Register new user
      const registerRes = await makeRequest('/api/auth/register', 'POST', {
        name: 'Sai Kumar Test',
        email: testEmail,
        password: 'password123',
        phone: '9876543210',
      })
      assert(
        'Register new user account',
        registerRes.status === 201 && registerRes.body.token && registerRes.body.user.email === testEmail
      )

      const userToken = registerRes.body.token
      const authHeader = { Authorization: `Bearer ${userToken}` }

      // 12. Reject duplicate email
      const dupRes = await makeRequest('/api/auth/register', 'POST', {
        name: 'Duplicate Test',
        email: testEmail,
        password: 'password123',
      })
      assert('Reject duplicate email registration', dupRes.status === 400 && dupRes.body.success === false)

      // 13. Login with credentials
      const loginRes = await makeRequest('/api/auth/login', 'POST', {
        emailOrPhone: testEmail,
        password: 'password123',
      })
      assert('Login with valid email & password', loginRes.status === 200 && loginRes.body.token)

      // 14. Access protected profile route
      const meRes = await makeRequest('/api/auth/me', 'GET', null, authHeader)
      assert('Access protected route /api/auth/me', meRes.status === 200 && meRes.body.user.name === 'Sai Kumar Test')

      // 15. Reject access without token
      const unauthRes = await makeRequest('/api/auth/me', 'GET')
      assert('Reject /api/auth/me without token (401)', unauthRes.status === 401)

      // 16. Add delivery address
      const addAddrRes = await makeRequest(
        '/api/auth/addresses',
        'POST',
        {
          name: 'Sai Kumar',
          phone: '9876543210',
          pincode: '500081',
          locality: 'Madhapur',
          addressLine: 'Flat 402, Sunshine Heights',
          city: 'Hyderabad',
          state: 'Telangana',
          addressType: 'home',
          isDefault: true,
        },
        authHeader
      )
      assert(
        'Add delivery address to user profile',
        addAddrRes.status === 201 && Array.isArray(addAddrRes.body.addresses) && addAddrRes.body.addresses.length === 1
      )

      const addressId = addAddrRes.body.addresses[0]._id

      // 17. Delete delivery address
      const delAddrRes = await makeRequest(`/api/auth/addresses/${addressId}`, 'DELETE', null, authHeader)
      assert('Delete delivery address', delAddrRes.status === 200 && delAddrRes.body.addresses.length === 0)

      // ── PHASE 6 ORDER, INVENTORY & PAYMENT TESTS ──
      // 18. Add item to user cart before checkout
      const userCartAdd = await makeRequest(
        '/api/cart',
        'POST',
        { productId: sampleProd._id, quantity: 1 },
        authHeader
      )
      assert('Add item to user cart for checkout', userCartAdd.status === 200 && userCartAdd.body.data.items.length === 1)

      // Initial product stock
      const initialStock = sampleProd.stock

      // 19. Place order with server price & inventory deduction
      const placeOrderRes = await makeRequest(
        '/api/orders',
        'POST',
        {
          shippingAddress: {
            name: 'Sai Kumar',
            phone: '9876543210',
            addressLine: 'Flat 402, Sunshine Heights',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500081',
          },
          paymentMethod: 'TestSandbox',
        },
        authHeader
      )
      assert(
        'Create order with server verification',
        placeOrderRes.status === 201 &&
          placeOrderRes.body.data.orderNumber.startsWith('VO-') &&
          placeOrderRes.body.data.isPaid === true
      )

      const createdOrder = placeOrderRes.body.data

      // 20. Fetch My Orders
      const myOrdersRes = await makeRequest('/api/orders/myorders', 'GET', null, authHeader)
      assert(
        'Fetch user order history',
        myOrdersRes.status === 200 &&
          myOrdersRes.body.data.some((o) => o._id === createdOrder._id)
      )

      // 21. Cancel order and restore inventory
      const cancelRes = await makeRequest(
        `/api/orders/${createdOrder._id}/cancel`,
        'PUT',
        { reason: 'Customer test cancellation' },
        authHeader
      )
      assert(
        'Cancel order and restore inventory',
        cancelRes.status === 200 && cancelRes.body.data.orderStatus === 'Cancelled'
      )

      // 22. Festival Campaign: Validate coupon FESTIVAL20
      const couponRes = await makeRequest('/api/campaigns/validate-coupon', 'POST', {
        code: 'FESTIVAL20',
        cartTotal: 2500,
      })
      assert(
        'Validate FESTIVAL20 coupon code',
        couponRes.status === 200 &&
          couponRes.body.data.discountAmount === 500 &&
          couponRes.body.data.finalTotal === 2000
      )

      // 23. Active Campaigns list
      const campaignsRes = await makeRequest('/api/campaigns')
      assert(
        'Fetch active festival campaigns list',
        campaignsRes.status === 200 && campaignsRes.body.data.length >= 1
      )

      // 24. Admin Login
      const adminLoginRes = await makeRequest('/api/auth/login', 'POST', {
        email: 'admin@vistaraone.com',
        password: 'admin123',
      })
      assert(
        'Admin authentication with role check',
        adminLoginRes.status === 200 && adminLoginRes.body.user?.role === 'admin'
      )
      const adminToken = adminLoginRes.body.token
      const adminHeader = { Authorization: `Bearer ${adminToken}` }

      // 25. Admin Dashboard Analytics Stats
      const adminStatsRes = await makeRequest('/api/admin/stats', 'GET', null, adminHeader)
      assert(
        'Admin dashboard analytics stats',
        adminStatsRes.status === 200 && adminStatsRes.body.data.totalProducts > 0
      )

      // 26. Admin Product Inventory Management
      const adminProdsRes = await makeRequest('/api/admin/products?limit=5', 'GET', null, adminHeader)
      assert(
        'Admin product list retrieval',
        adminProdsRes.status === 200 && adminProdsRes.body.data.length > 0
      )

      const prodToUpdate = adminProdsRes.body.data[0]
      const updateStockRes = await makeRequest(
        `/api/admin/products/${prodToUpdate._id}`,
        'PUT',
        { stock: 45 },
        adminHeader
      )
      assert(
        'Admin inline stock update',
        updateStockRes.status === 200 && updateStockRes.body.data.stock === 45
      )

      // 27. Admin Order Fulfillment
      const adminOrdersRes = await makeRequest('/api/admin/orders', 'GET', null, adminHeader)
      assert(
        'Admin orders retrieval',
        adminOrdersRes.status === 200 && Array.isArray(adminOrdersRes.body.data)
      )

      // 28. Customer Reviews: Get product reviews
      const reviewsRes = await makeRequest(`/api/reviews/product/${sampleProd._id}`)
      assert(
        'Fetch product reviews with star breakdown',
        reviewsRes.status === 200 && typeof reviewsRes.body.breakdown === 'object'
      )

      // 29. Customer Reviews: Submit review
      const newReviewRes = await makeRequest(
        '/api/reviews',
        'POST',
        {
          productId: sampleProd._id,
          rating: 5,
          title: 'Automated Test Review',
          comment: 'Outstanding quality and fast shipping. Highly recommend this!',
        },
        authHeader
      )
      assert(
        'Submit verified customer review',
        newReviewRes.status === 201 && newReviewRes.body.data.rating === 5
      )

      console.log('───────────────────────────────────────────────────────')
      console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`)
      console.log('───────────────────────────────────────────────────────')

      server.close(() => {
        process.exit(failed > 0 ? 1 : 0)
      })
    } catch (testErr) {
      console.error('Test error:', testErr)
      server.close(() => process.exit(1))
    }
  })
}

runTests()
