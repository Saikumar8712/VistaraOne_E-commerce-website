import mongoose from 'mongoose'
import Product from '../models/Product.js'
import Category from '../models/Category.js'

// Helper: check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id

// Helper to resolve category by ID, slug, or popular aliases
export const resolveCategory = async (catStr) => {
  if (!catStr) return null
  if (isValidObjectId(catStr)) {
    const cat = await Category.findById(catStr).lean()
    if (cat) return cat
  }
  const clean = catStr.toLowerCase().trim()
  const aliases = {
    // Mobiles & Electronics (full and partial words)
    mobiles: 'electronics',
    mobile: 'electronics',
    mobi: 'electronics',
    mob: 'electronics',
    smartphones: 'electronics',
    smartphone: 'electronics',
    smartph: 'electronics',
    phone: 'electronics',
    phones: 'electronics',
    phon: 'electronics',
    laptops: 'electronics',
    laptop: 'electronics',
    lap: 'electronics',
    lapt: 'electronics',
    computers: 'electronics',
    computer: 'electronics',
    comp: 'electronics',
    'electronics-accessories': 'electronics',
    electronic: 'electronics',
    electronics: 'electronics',
    elec: 'electronics',
    audio: 'electronics',
    headphones: 'electronics',
    earbuds: 'electronics',

    // Fashion & Lifestyle (full and partial words)
    'fashion-clothing': 'fashion',
    clothing: 'fashion',
    clothes: 'fashion',
    cloth: 'fashion',
    fashion: 'fashion',
    fash: 'fashion',
    shoes: 'fashion',
    shoe: 'fashion',
    footwear: 'fashion',
    sneakers: 'fashion',
    sneaker: 'fashion',
    watches: 'fashion',
    watch: 'fashion',

    // Boys & Girls Fashion (full and partial words)
    'boys-girls-fashion': 'boys-girls-fashion',
    boys: 'boys-girls-fashion',
    boy: 'boys-girls-fashion',
    girls: 'boys-girls-fashion',
    girl: 'boys-girls-fashion',
    'boys-fashion': 'boys-girls-fashion',
    'girls-fashion': 'boys-girls-fashion',
    'kids-fashion': 'boys-girls-fashion',
    teen: 'boys-girls-fashion',
    teens: 'boys-girls-fashion',
    youth: 'boys-girls-fashion',

    // Baby Boys Collection (full and partial words)
    'baby-boys-fashion': 'baby-boys-fashion',
    'baby-boys': 'baby-boys-fashion',
    'baby-boy': 'baby-boys-fashion',
    'boy-baby': 'baby-boys-fashion',
    'baby-boy-fashion': 'baby-boys-fashion',
    'infant-boy': 'baby-boys-fashion',
    'toddler-boy': 'baby-boys-fashion',
    romper: 'baby-boys-fashion',
    rompers: 'baby-boys-fashion',
    dungaree: 'baby-boys-fashion',
    dungarees: 'baby-boys-fashion',

    // Appliances (full and partial words)
    'home-appliances': 'appliances',
    appliances: 'appliances',
    appliance: 'appliances',
    appli: 'appliances',
    tv: 'appliances',
    tvs: 'appliances',
    refrigerator: 'appliances',
    fridge: 'appliances',
    'washing-machine': 'appliances',

    // Home & Kitchen (full and partial words)
    'home-kitchen': 'home-kitchen',
    kitchen: 'home-kitchen',
    kitch: 'home-kitchen',
    cookware: 'home-kitchen',
    cook: 'home-kitchen',

    // Groceries (full and partial words)
    'grocery-essentials': 'groceries',
    grocery: 'groceries',
    groceries: 'groceries',
    groc: 'groceries',
    staples: 'groceries',

    // Fresh Market (full and partial words)
    fruits: 'fresh-market',
    fruit: 'fresh-market',
    fru: 'fresh-market',
    fresh: 'fresh-market',
    vegetables: 'fresh-market',
    vegetable: 'fresh-market',
    veggies: 'fresh-market',
    veg: 'fresh-market',
    vegg: 'fresh-market',

    // Beauty & Personal Care (full and partial words)
    'beauty-personal-care': 'beauty-pets',
    'beauty-pets': 'beauty-pets',
    beauty: 'beauty-pets',
    beaut: 'beauty-pets',
    skincare: 'beauty-pets',
    cosmetics: 'beauty-pets',

    // Sports & Fitness (full and partial words)
    sports: 'sports',
    sport: 'sports',
    fitness: 'sports',
    fit: 'sports',
    gym: 'sports',
    yoga: 'sports',

    // Toys & Baby Care (full and partial words)
    toys: 'toys',
    toy: 'toys',
    baby: 'toys',
    kids: 'toys',
    games: 'toys',

    // Books & Stationery (full and partial words)
    books: 'books',
    book: 'books',
    stationery: 'books',
    novels: 'books',
    novel: 'books',
  }
  const targetSlug = aliases[clean] || clean
  return await Category.findOne({
    $or: [
      { slug: clean },
      { slug: targetSlug },
      { name: new RegExp(`^${clean.replace(/-/g, ' ')}$`, 'i') },
      { name: new RegExp(`${clean.replace(/-/g, ' ')}`, 'i') },
      { slug: new RegExp(`^${clean}`, 'i') },
    ],
  }).lean()
}

// Format product for consistent frontend consumption
export const formatProduct = (p) => {
  const obj = p.toObject ? p.toObject({ virtuals: true }) : { ...p }
  const categoryName = typeof obj.category === 'object' && obj.category !== null ? obj.category.name : obj.category
  const categorySlug = typeof obj.category === 'object' && obj.category !== null ? obj.category.slug : undefined

  const discountPercent =
    obj.discountPercent ||
    (obj.originalPrice && obj.originalPrice > obj.price
      ? Math.round(((obj.originalPrice - obj.price) / obj.originalPrice) * 100)
      : 0)

  return {
    ...obj,
    category: categoryName,
    categorySlug,
    image: obj.images?.[0] || '',
    demo: Boolean(obj.isDemo),
    discountPercent,
    inStock: obj.stock > 0,
  }
}

// 1. GET /api/products — Search, Filter, Sort, Paginate
export const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      brand,
      min,
      max,
      rating,
      inStock,
      featured,
      bestseller,
      deal,
      sort = '-createdAt',
    } = req.query

    const page = Math.max(+req.query.page || 1, 1)
    const limit = Math.min(Math.max(+req.query.limit || 12, 1), 100)
    const filter = { isActive: true }

    // Category filter: handle either ObjectId, slug, or alias
    if (category) {
      const foundCat = await resolveCategory(category)
      if (foundCat) {
        filter.category = foundCat._id
      } else {
        // No such category exists, return empty result safely
        return res.json({
          success: true,
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
        })
      }
    }

    // Brand filter (supports comma-separated multiple brands)
    if (brand) {
      const brands = brand
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean)
      if (brands.length === 1) {
        filter.brand = new RegExp(`^${brands[0]}$`, 'i')
      } else if (brands.length > 1) {
        filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) }
      }
    }

    // Price range filter
    if (min !== undefined || max !== undefined) {
      filter.price = {}
      if (min !== undefined && min !== '') filter.price.$gte = Number(min)
      if (max !== undefined && max !== '') filter.price.$lte = Number(max)
    }

    // Minimum rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) }
    }

    // In stock filter
    if (inStock === 'true' || inStock === true) {
      filter.stock = { $gt: 0 }
    }

    // Featured / Bestseller / Deal filters
    if (featured === 'true' || featured === true) filter.isFeatured = true
    if (bestseller === 'true' || bestseller === true) filter.isBestseller = true
    if (deal === 'true' || deal === true) {
      filter.$expr = { $gt: ['$originalPrice', '$price'] }
    }

    // Search query: Enhanced regex search across name, brand, tags, description + matching categories
    if (q && q.trim()) {
      const queryStr = q.trim()
      const singular = queryStr.length > 3 ? queryStr.replace(/s$/i, '') : queryStr
      const regexPattern = queryStr.length > 3 ? `${queryStr}|${singular}` : queryStr
      const searchRegex = new RegExp(regexPattern, 'i')

      // Also check if the search term matches any category (e.g. "fruits", "mobile", "laptops")
      const resolvedCat = await resolveCategory(queryStr)
      const matchingCats = await Category.find({
        $or: [
          { name: searchRegex },
          { slug: searchRegex },
          { description: searchRegex },
        ],
      }).select('_id').lean()

      const catIds = []
      if (resolvedCat) catIds.push(resolvedCat._id)
      matchingCats.forEach((c) => {
        if (!catIds.some((id) => String(id) === String(c._id))) {
          catIds.push(c._id)
        }
      })

      const orConditions = [
        { name: searchRegex },
        { brand: searchRegex },
        { tags: searchRegex },
        { description: searchRegex },
      ]

      if (catIds.length > 0) {
        orConditions.push({ category: { $in: catIds } })
      }

      filter.$or = orConditions
    }

    // Sorting map
    const hasExplicitNonRelevanceSort = [
      'price-asc',
      'price',
      'price-desc',
      '-price',
      'rating',
      '-rating',
      'popularity',
      '-reviewCount',
    ].includes(req.query.sort)

    let sortOption = { createdAt: -1 }
    switch (sort) {
      case 'price-asc':
      case 'price':
        sortOption = { price: 1 }
        break
      case 'price-desc':
      case '-price':
        sortOption = { price: -1 }
        break
      case 'rating':
      case '-rating':
        sortOption = { rating: -1, reviewCount: -1 }
        break
      case 'popularity':
      case '-reviewCount':
        sortOption = { reviewCount: -1, rating: -1 }
        break
      case 'newest':
      case '-createdAt':
      default:
        sortOption = { createdAt: -1 }
        break
    }

    // When searching with a text query, rank candidates by 2-tier relevance
    // (Primary items matching the search term come FIRST, followed by remaining items in that category)
    if (q && q.trim() && !hasExplicitNonRelevanceSort) {
      const qLower = q.trim().toLowerCase()
      const resolvedCatId = filter.category ? String(filter.category) : null

      const isActualMobile = (p) => {
        const n = (p.name || '').toLowerCase()
        const t = (p.tags || []).map((x) => String(x).toLowerCase())
        const exclusions = [
          'headphone', 'headphones', 'earphone', 'earphones', 'earbuds', 'buds', 'neckband',
          'headset', 'cable', 'charger', 'adapter', 'power bank', 'powerbank', 'case', 'cover',
          'screen protector', 'tempered glass', 'watch', 'smartwatch', 'speaker', 'soundbar',
          'laptop', 'macbook', 'thinkpad', 'vostro', 'katana', 'drive', 'flash drive', 'pen drive',
          'ssd', 'mouse', 'keyboard', 'airpods', 'hub', 'dock', 'stand'
        ]
        if (exclusions.some((x) => n.includes(x))) return false
        const phoneKeywords = [
          'galaxy s', 'galaxy a', 'galaxy z', 'galaxy m', 'galaxy f',
          'iphone', 'pixel', 'oneplus 12', 'oneplus open', 'oneplus nord',
          'vivo', 'realme 12', 'realme gt', 'realme narzo', 'realme c',
          'redmi', 'xiaomi 14', 'motorola edge', 'motorola g', 'motorola razr',
          'poco', 'iqoo', 'nothing phone', 'lava agni', 'smartphone'
        ]
        const hasGb = /\b\d+\s*gb\b/i.test(n)
        const has5g = /\b5g\b/i.test(n)
        return phoneKeywords.some((k) => n.includes(k)) || ((hasGb || has5g) && (t.includes('smartphone') || t.includes('mobile')))
      }

      const isActualLaptop = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['bag', 'sleeve', 'backpack', 'mouse', 'keyboard', 'stand', 'cooler', 'adapter', 'charger', 'hub', 'dock', 'cable']
        if (exclusions.some((x) => n.includes(x))) return false
        const laptopKeywords = ['macbook', 'thinkpad', 'zenbook', 'yoga', 'inspiron', 'ideapad', 'laptop', 'vostro', 'katana', 'surface laptop', 'vivobook', 'pavilion', 'legion', 'predator', 'gaming laptop']
        return laptopKeywords.some((k) => n.includes(k))
      }

      const isActualFruit = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['scrub', 'wash', 'face', 'shampoo', 'lotion', 'cream', 'juice', 'gel', 'soap', 'oil', 'spinach', 'potato', 'onion', 'tomato', 'carrot', 'broccoli', 'coriander', 'ginger', 'garlic', 'chilli', 'capsicum', 'cauliflower', 'cucumber', 'peas', 'beans', 'cabbage']
        if (exclusions.some((x) => n.includes(x))) return false
        const fruitKeywords = ['apple', 'banana', 'mango', 'orange', 'grape', 'grapes', 'berry', 'strawberry', 'kiwi', 'pomegranate', 'avocado', 'papaya', 'watermelon', 'melon', 'pineapple', 'guava', 'fig', 'fruit', 'fruits', 'pitaya', 'dragon fruit', 'citrus', 'peaches', 'plums', 'mosambi', 'sapota', 'custard apple']
        return fruitKeywords.some((k) => n.includes(k))
      }

      const isActualVeg = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['apple', 'banana', 'mango', 'orange', 'grape', 'kiwi', 'papaya', 'watermelon', 'melon', 'pineapple', 'guava', 'dragon fruit', 'pitaya', 'fruit', 'fruits']
        if (exclusions.some((x) => n.includes(x))) return false
        const vegKeywords = ['spinach', 'potato', 'onion', 'tomato', 'carrot', 'broccoli', 'coriander', 'ginger', 'garlic', 'chilli', 'capsicum', 'cauliflower', 'cucumber', 'peas', 'beans', 'cabbage', 'vegetable', 'vegetables', 'veggies', 'greens', 'mushroom', 'bhindi', 'okra', 'palak', 'methi', 'pudina']
        return vegKeywords.some((k) => n.includes(k))
      }

      const isActualFootwear = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['shirt', 't-shirt', 'tshirt', 'jeans', 'pant', 'trouser', 'jacket', 'hoodie', 'socks']
        if (exclusions.some((x) => n.includes(x))) return false
        const footKeywords = ['shoe', 'shoes', 'sneaker', 'sneakers', 'footwear', 'boots', 'sandals', 'loafers', 'running shoes', 'slippers', 'flip flop', 'slides']
        return footKeywords.some((k) => n.includes(k))
      }

      const isActualWatch = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['strap', 'guard', 'charger', 'band replacement']
        if (exclusions.some((x) => n.includes(x))) return false
        const watchKeywords = ['watch', 'watches', 'smartwatch', 'smartwatches', 'chronograph', 'analog watch', 'digital watch']
        return watchKeywords.some((k) => n.includes(k))
      }

      const isActualTV = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['remote', 'mount', 'stand', 'cable']
        if (exclusions.some((x) => n.includes(x))) return false
        const tvKeywords = ['smart tv', 'television', 'led tv', 'oled tv', 'qled tv', 'bravia', 'google tv', 'android tv']
        return tvKeywords.some((k) => n.includes(k))
      }

      const isActualFridge = (p) => {
        const n = (p.name || '').toLowerCase()
        const fridgeKeywords = ['refrigerator', 'fridge', 'single door', 'double door', 'side by side', 'frost free']
        return fridgeKeywords.some((k) => n.includes(k))
      }

      const isActualBook = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['pen', 'pencil', 'notebook', 'diary', 'marker', 'eraser', 'sharpener', 'ruler', 'compass', 'geometry', 'bag']
        if (exclusions.some((x) => n.includes(x))) return false
        const bookKeywords = ['book', 'novel', 'edition', 'paperback', 'hardcover', 'author', 'biography', 'fiction', 'non-fiction']
        const t = (p.tags || []).map((x) => String(x).toLowerCase())
        return bookKeywords.some((k) => n.includes(k)) || t.includes('book') || t.includes('novel')
      }

      const isActualToy = (p) => {
        const n = (p.name || '').toLowerCase()
        const exclusions = ['wipe', 'wipes', 'diaper', 'lotion', 'shampoo', 'cream', 'powder', 'soap']
        if (exclusions.some((x) => n.includes(x))) return false
        const toyKeywords = ['toy', 'toys', 'game', 'puzzle', 'lego', 'car', 'rc car', 'doll', 'action figure', 'blocks', 'board game', 'nerf']
        const t = (p.tags || []).map((x) => String(x).toLowerCase())
        return toyKeywords.some((k) => n.includes(k)) || t.includes('toy') || t.includes('toys')
      }

      const calculateRelevance = (p) => {
        let score = 0
        const nameLower = (p.name || '').toLowerCase()
        const tags = Array.isArray(p.tags) ? p.tags.map((t) => String(t).toLowerCase()) : []
        const brandLower = (p.brand || '').toLowerCase()

        // Mobiles & Smartphones queries: ALL actual mobiles get Tier 1 (+100,000)
        if (
          ['mobile', 'mobiles', 'smartphone', 'smartphones', 'phone', 'phones'].includes(qLower) ||
          'mobile'.startsWith(qLower) ||
          'smartphones'.startsWith(qLower) ||
          qLower.startsWith('mobi') ||
          qLower.startsWith('phon') ||
          qLower.startsWith('smartph')
        ) {
          if (isActualMobile(p)) {
            score += 100000
          }
        }

        // Laptops & Computers queries: ALL actual laptops get Tier 1 (+100,000)
        if (
          ['laptop', 'laptops', 'computer', 'computers'].includes(qLower) ||
          'laptops'.startsWith(qLower) ||
          qLower.startsWith('lap') ||
          qLower.startsWith('comp')
        ) {
          if (isActualLaptop(p)) {
            score += 100000
          }
        }

        // Fruits queries: ALL actual fruits get Tier 1 (+100,000)
        if (
          ['fruit', 'fruits'].includes(qLower) ||
          'fruits'.startsWith(qLower) ||
          qLower.startsWith('fru')
        ) {
          if (isActualFruit(p)) {
            score += 100000
          }
        }

        // Vegetables queries: ALL actual veggies get Tier 1 (+100,000)
        if (
          ['vegetable', 'vegetables', 'veggies', 'veg'].includes(qLower) ||
          qLower.startsWith('veg')
        ) {
          if (isActualVeg(p)) {
            score += 100000
          }
        }

        // Footwear queries: ALL actual footwear get Tier 1 (+100,000)
        if (
          ['shoe', 'shoes', 'footwear', 'sneakers', 'sneaker'].includes(qLower) ||
          qLower.startsWith('shoe') ||
          qLower.startsWith('foot')
        ) {
          if (isActualFootwear(p)) {
            score += 100000
          }
        }

        // Watches queries: ALL actual watches get Tier 1 (+100,000)
        if (
          ['watch', 'watches', 'smartwatch', 'smartwatches'].includes(qLower) ||
          qLower.startsWith('watch')
        ) {
          if (isActualWatch(p)) {
            score += 100000
          }
        }

        // TVs queries: ALL actual TVs get Tier 1 (+100,000)
        if (
          ['tv', 'tvs', 'television', 'televisions'].includes(qLower) ||
          qLower === 'tv'
        ) {
          if (isActualTV(p)) {
            score += 100000
          }
        }

        // Refrigerators queries: ALL actual fridges get Tier 1 (+100,000)
        if (
          ['fridge', 'fridges', 'refrigerator', 'refrigerators'].includes(qLower) ||
          qLower.startsWith('fridg') ||
          qLower.startsWith('refrig')
        ) {
          if (isActualFridge(p)) {
            score += 100000
          }
        }

        // Books queries: ALL actual books get Tier 1 (+100,000)
        if (
          ['book', 'books', 'novel', 'novels'].includes(qLower) ||
          qLower.startsWith('book') ||
          qLower.startsWith('novel')
        ) {
          if (isActualBook(p)) {
            score += 100000
          }
        }

        // Toys queries: ALL actual toys get Tier 1 (+100,000)
        if (
          ['toy', 'toys', 'game', 'games'].includes(qLower) ||
          qLower.startsWith('toy')
        ) {
          if (isActualToy(p)) {
            score += 100000
          }
        }

        // General text matches (for specific brand, product name, tags)
        if (nameLower.startsWith(qLower)) score += 20000
        else if (nameLower.includes(qLower)) score += 5000

        const words = nameLower.split(/\s+/)
        if (words.some((w) => w.startsWith(qLower) || w === qLower)) score += 10000

        if (brandLower === qLower || brandLower.startsWith(qLower)) score += 4000
        else if (brandLower.includes(qLower)) score += 2000

        if (tags.some((t) => t === qLower || t.startsWith(qLower))) score += 2000
        else if (tags.some((t) => t.includes(qLower))) score += 1000

        if (resolvedCatId && String(p.category?._id || p.category) === String(resolvedCatId)) {
          score += 500 // Base score for remaining items in the matched category
        }

        return score
      }

      const candidates = await Product.find(filter)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .limit(1000)
        .lean()

      candidates.sort((a, b) => calculateRelevance(b) - calculateRelevance(a))
      const total = candidates.length
      const paginated = candidates.slice((page - 1) * limit, page * limit)
      const totalPages = Math.ceil(total / limit)
      const formatted = paginated.map(formatProduct)

      return res.json({
        success: true,
        data: formatted,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      })
    }

    const [rawProducts, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ])

    const totalPages = Math.ceil(total / limit)
    const formatted = rawProducts.map(formatProduct)

    res.json({
      success: true,
      data: formatted,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (err) {
    next(err)
  }
}

// 2. GET /api/products/:id — Single product by ID or Slug
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = null

    if (isValidObjectId(id)) {
      product = await Product.findById(id)
        .populate('category', 'name slug description icon')
        .populate('subcategory', 'name slug')
        .lean()
    }

    // Fallback lookup by slug if not found or not an ObjectId
    if (!product) {
      product = await Product.findOne({ slug: id.toLowerCase() })
        .populate('category', 'name slug description icon')
        .populate('subcategory', 'name slug')
        .lean()
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.json({
      success: true,
      data: formatProduct(product),
    })
  } catch (err) {
    next(err)
  }
}

// 3. GET /api/products/slug/:slug — Single product by Slug
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug: slug.toLowerCase() })
      .populate('category', 'name slug description icon')
      .populate('subcategory', 'name slug')
      .lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found with this slug',
      })
    }

    res.json({
      success: true,
      data: formatProduct(product),
    })
  } catch (err) {
    next(err)
  }
}

// 4. GET /api/products/:id/similar — Related / Similar products
export const getSimilarProducts = async (req, res, next) => {
  try {
    const { id } = req.params
    const limit = Math.min(Math.max(+req.query.limit || 12, 1), 50)

    let currentProduct = null
    if (isValidObjectId(id)) {
      currentProduct = await Product.findById(id).lean()
    }
    if (!currentProduct) {
      currentProduct = await Product.findOne({ slug: id }).lean()
    }

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    const minPrice = currentProduct.price * 0.5
    const maxPrice = currentProduct.price * 1.5

    // Find similar items by same category or brand, in similar price band
    let similar = await Product.find({
      _id: { $ne: currentProduct._id },
      isActive: true,
      $or: [
        { category: currentProduct.category },
        { brand: currentProduct.brand },
        { price: { $gte: minPrice, $lte: maxPrice } },
      ],
    })
      .populate('category', 'name slug')
      .limit(limit)
      .lean()

    // If still less than desired limit, grab other top-rated items
    if (similar.length < limit) {
      const existingIds = [currentProduct._id, ...similar.map((s) => s._id)]
      const fallback = await Product.find({
        _id: { $nin: existingIds },
        isActive: true,
      })
        .populate('category', 'name slug')
        .sort('-rating')
        .limit(limit - similar.length)
        .lean()

      similar = [...similar, ...fallback]
    }

    res.json({
      success: true,
      data: similar.map(formatProduct),
    })
  } catch (err) {
    next(err)
  }
}

// 5. GET /api/products/filters/meta — Dynamic Filter Metadata (available brands, price min/max)
export const getFilterMeta = async (req, res, next) => {
  try {
    const { category } = req.query
    const match = { isActive: true }

    if (category) {
      const cat = await resolveCategory(category)
      if (cat) match.category = cat._id
    }

    const [brands, priceStats] = await Promise.all([
      Product.distinct('brand', match),
      Product.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
            count: { $sum: 1 },
          },
        },
      ]),
    ])

    res.json({
      success: true,
      data: {
        brands: brands.filter(Boolean).sort(),
        minPrice: priceStats[0]?.minPrice || 0,
        maxPrice: priceStats[0]?.maxPrice || 100000,
        totalProducts: priceStats[0]?.count || 0,
      },
    })
  } catch (err) {
    next(err)
  }
}
