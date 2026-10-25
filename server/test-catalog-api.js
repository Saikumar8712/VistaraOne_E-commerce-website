async function testCatalogAPI() {
  console.log('\n============================================================')
  console.log('  TESTING BACKEND API ENDPOINTS WITH LIVE MONGODB CATALOG')
  console.log('============================================================\n')

  const BASE_URL = 'http://localhost:5000/api'
  let passCount = 0
  let totalTests = 0

  async function test(name, fn) {
    totalTests++
    try {
      await fn()
      console.log(`✅ [PASS] ${name}`)
      passCount++
    } catch (err) {
      console.error(`❌ [FAIL] ${name} - ${err.message}`)
    }
  }

  // 1. GET /api/categories
  await test('GET /api/categories returns all categories', async () => {
    const res = await fetch(`${BASE_URL}/categories`)
    const data = await res.json()
    if (!data.success || !Array.isArray(data.data) || data.data.length < 10) {
      throw new Error(`Expected at least 10 categories, got ${data?.data?.length}`)
    }
    console.log(`   Fetched ${data.data.length} categories from MongoDB`)
  })

  // 2. GET /api/products with pagination
  let sampleProductId = null
  await test('GET /api/products with pagination returns total count > 500', async () => {
    const res = await fetch(`${BASE_URL}/products?page=1&limit=12`)
    const data = await res.json()
    const total = data.pagination?.total
    if (!data.success || !Array.isArray(data.data) || data.data.length !== 12) {
      throw new Error(`Expected 12 products per page, got ${data?.data?.length}`)
    }
    if (total < 500) {
      throw new Error(`Expected total count >= 500, got ${total}`)
    }
    sampleProductId = data.data[0]._id
    console.log(`   Page 1 returned 12 products. Total catalog size: ${total} products`)
  })

  // 3. GET /api/products/:id
  await test('GET /api/products/:id fetches single product with specifications', async () => {
    if (!sampleProductId) throw new Error('No sample product ID from prior test')
    const res = await fetch(`${BASE_URL}/products/${sampleProductId}`)
    const data = await res.json()
    if (!data.success || !data.data || data.data._id !== sampleProductId) {
      throw new Error(`Failed to retrieve product details for ID ${sampleProductId}`)
    }
    if (!data.data.specifications || data.data.specifications.length === 0) {
      throw new Error('Product specifications missing')
    }
    console.log(`   Retrieved: "${data.data.name}" (${data.data.brand}) - Specs: ${data.data.specifications.length}`)
  })

  // 4. Category filtering for Mobiles
  await test('GET /api/products?category=mobiles-smartphones returns 50 products', async () => {
    const res = await fetch(`${BASE_URL}/products?category=mobiles-smartphones&limit=100`)
    const data = await res.json()
    const total = data.pagination?.total
    if (!data.success || total < 50) {
      throw new Error(`Expected at least 50 mobiles, got ${total}`)
    }
    console.log(`   Mobiles category filtered total: ${total} products`)
  })

  // 5. Category filtering for Laptops
  await test('GET /api/products?category=laptops-computers returns 50 products', async () => {
    const res = await fetch(`${BASE_URL}/products?category=laptops-computers&limit=100`)
    const data = await res.json()
    const total = data.pagination?.total
    if (!data.success || total < 50) {
      throw new Error(`Expected at least 50 laptops, got ${total}`)
    }
    console.log(`   Laptops category filtered total: ${total} products`)
  })

  // 6. Search query "mobile"
  await test('GET /api/products?q=mobile returns relevant matching products', async () => {
    const res = await fetch(`${BASE_URL}/products?q=mobile`)
    const data = await res.json()
    const total = data.pagination?.total
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Expected search results for 'mobile', got 0`)
    }
    console.log(`   Search for 'mobile' returned ${data.data.length} items on page 1 (Total matching: ${total})`)
  })

  // 7. Search by brand "Samsung"
  await test('GET /api/products?q=Samsung returns Samsung products', async () => {
    const res = await fetch(`${BASE_URL}/products?q=Samsung`)
    const data = await res.json()
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Expected search results for 'Samsung', got 0`)
    }
    console.log(`   Search for 'Samsung' returned ${data.data.length} items`)
  })

  // 8. Category alias test (e.g. ?category=mobiles or ?category=appliances)
  await test('Category alias resolution works for ?category=appliances', async () => {
    const res = await fetch(`${BASE_URL}/products?category=appliances&limit=10`)
    const data = await res.json()
    if (!data.success || data.total < 50) {
      throw new Error(`Expected at least 50 appliances, got ${data?.total}`)
    }
    console.log(`   Appliances filtered total: ${data.total} products`)
  })

  console.log('\n============================================================')
  console.log(`  API TEST SUMMARY: ${passCount} / ${totalTests} TESTS PASSED`)
  console.log('============================================================\n')

  process.exit(passCount === totalTests ? 0 : 1)
}

testCatalogAPI()
