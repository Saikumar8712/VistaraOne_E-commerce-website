import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './db.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import Campaign from '../models/Campaign.js'
import Review from '../models/Review.js'

// High-density product generators (50+ items each)
import { generateMobiles } from '../scripts/data/mobiles.js'
import { generateLaptops } from '../scripts/data/laptops.js'
import { generateElectronics } from '../scripts/data/electronics.js'
import { generateFashion } from '../scripts/data/fashion.js'
import { generateFootwear } from '../scripts/data/footwear.js'
import { generateAppliances } from '../scripts/data/appliances.js'
import { generateKitchen } from '../scripts/data/kitchen.js'
import { generateGroceries } from '../scripts/data/groceries.js'
import { generateBeauty } from '../scripts/data/beauty.js'
import { generateWatches } from '../scripts/data/watches.js'
import { generateFreshMarket } from '../scripts/data/freshMarket.js'
import { generateSports } from '../scripts/data/sports.js'
import { generateToys } from '../scripts/data/toys.js'
import { generateBooks } from '../scripts/data/books.js'

const img = (id) => `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`

export const categoriesData = [
  {
    name: 'Electronics & Mobiles',
    slug: 'electronics',
    icon: 'Smartphone',
    image: img('photo-1511707171634-5f897ff02aa9'),
    description: 'Smartphones, Laptops, Audio, Smartwatches and Accessories',
    order: 1,
    isFeatured: true,
  },
  {
    name: 'Fashion & Lifestyle',
    slug: 'fashion',
    icon: 'Shirt',
    image: img('photo-1445205170230-053b83016050'),
    description: "Men's, Women's, Footwear, Accessories and Ethnic Wear",
    order: 2,
    isFeatured: true,
  },
  {
    name: 'Appliances',
    slug: 'appliances',
    icon: 'Tv',
    image: img('photo-1583863788434-e58a36330cf0'),
    description: 'Smart TVs, Air Conditioners, Refrigerators, and Microwaves',
    order: 3,
    isFeatured: true,
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: 'CookingPot',
    image: img('photo-1556909114-f6e7ad7d3136'),
    description: 'Cookware, Kitchen Appliances, Bedding, and Home Decor',
    order: 4,
    isFeatured: true,
  },
  {
    name: 'Groceries & Daily Needs',
    slug: 'groceries',
    icon: 'ShoppingBasket',
    image: img('photo-1542838132-92c53300491e'),
    description: 'Staples, Snacks, Beverages, Gourmet, and Household Essentials',
    order: 5,
    isFeatured: true,
  },
  {
    name: 'Fresh Market',
    slug: 'fresh-market',
    icon: 'Apple',
    image: img('photo-1610832958506-aa56368176cf'),
    description: 'Farm-Fresh Fruits, Organic Vegetables, and Fresh Herbs',
    order: 6,
    isFeatured: true,
  },
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty-pets',
    icon: 'Sparkles',
    image: img('photo-1556228578-0d85b1a4d571'),
    description: 'Skincare, Haircare, Perfumes, and Grooming Essentials',
    order: 7,
    isFeatured: true,
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports',
    icon: 'Dumbbell',
    image: img('photo-1517838277536-f5f99be501cd'),
    description: 'Gym Equipment, Yoga Mats, Running Gear, and Sports Accessories',
    order: 8,
    isFeatured: true,
  },
  {
    name: 'Toys & Baby Care',
    slug: 'toys',
    icon: 'Blocks',
    image: img('photo-1596461404969-9ae70f2830c1'),
    description: 'Educational Toys, Remote Control Cars, and Infant Care',
    order: 9,
    isFeatured: false,
  },
  {
    name: 'Books & Stationery',
    slug: 'books',
    icon: 'BookOpen',
    image: img('photo-1544716278-ca5e3f4abd8c'),
    description: 'Bestselling Novels, Notebooks, Fountain Pens, and Art Supplies',
    order: 10,
    isFeatured: false,
  },
]

export async function runSeed() {
  try {
    console.log('\n============================================================')
    console.log('  VistaraOne — Full Database Seeder (50+ Products / Category)')
    console.log('============================================================\n')

    await connectDB()

    // 1. Clear existing collections
    console.log('[Seed] Clearing existing collections...')
    await Category.deleteMany({})
    await Product.deleteMany({})
    await Campaign.deleteMany({})
    await Review.deleteMany({})

    // 2. Insert Categories
    console.log(`[Seed] Inserting ${categoriesData.length} categories...`)
    const createdCategories = await Category.insertMany(categoriesData)
    const categoryMap = createdCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat._id
      return acc
    }, {})

    // 3. Generate 50+ rich products for EACH category
    console.log('[Seed] Generating 50+ products for each category...')

    const allProducts = []

    // 1. Electronics & Mobiles (mobiles + laptops + audio)
    const elecId = categoryMap['electronics']
    const elecItems = [
      ...generateMobiles(elecId),
      ...generateLaptops(elecId).slice(0, 15),
      ...generateElectronics(elecId).slice(0, 15),
    ]
    allProducts.push(...elecItems)
    console.log(`   • [electronics] -> ${elecItems.length} products`)

    // 2. Fashion & Lifestyle (fashion + footwear + watches)
    const fashId = categoryMap['fashion']
    const fashItems = [
      ...generateFashion(fashId),
      ...generateFootwear(fashId).slice(0, 15),
      ...generateWatches(fashId).slice(0, 15),
    ]
    allProducts.push(...fashItems)
    console.log(`   • [fashion] -> ${fashItems.length} products`)

    // 3. Appliances
    const appId = categoryMap['appliances']
    const appItems = generateAppliances(appId)
    allProducts.push(...appItems)
    console.log(`   • [appliances] -> ${appItems.length} products`)

    // 4. Home & Kitchen
    const kitId = categoryMap['home-kitchen']
    const kitItems = generateKitchen(kitId)
    allProducts.push(...kitItems)
    console.log(`   • [home-kitchen] -> ${kitItems.length} products`)

    // 5. Groceries & Daily Needs
    const grocId = categoryMap['groceries']
    const grocItems = generateGroceries(grocId)
    allProducts.push(...grocItems)
    console.log(`   • [groceries] -> ${grocItems.length} products`)

    // 6. Fresh Market
    const frshId = categoryMap['fresh-market']
    const frshItems = generateFreshMarket(frshId)
    allProducts.push(...frshItems)
    console.log(`   • [fresh-market] -> ${frshItems.length} products`)

    // 7. Beauty & Personal Care
    const beautyId = categoryMap['beauty-pets']
    const beautyItems = generateBeauty(beautyId)
    allProducts.push(...beautyItems)
    console.log(`   • [beauty-pets] -> ${beautyItems.length} products`)

    // 8. Sports & Fitness
    const sportsId = categoryMap['sports']
    const sportsItems = generateSports(sportsId)
    allProducts.push(...sportsItems)
    console.log(`   • [sports] -> ${sportsItems.length} products`)

    // 9. Toys & Baby Care
    const toysId = categoryMap['toys']
    const toysItems = generateToys(toysId)
    allProducts.push(...toysItems)
    console.log(`   • [toys] -> ${toysItems.length} products`)

    // 10. Books & Stationery
    const booksId = categoryMap['books']
    const booksItems = generateBooks(booksId)
    allProducts.push(...booksItems)
    console.log(`   • [books] -> ${booksItems.length} products`)

    console.log(`\n[Seed] Bulk inserting ${allProducts.length} verified products into MongoDB...`)
    const insertedProducts = await Product.insertMany(allProducts, { ordered: false })
    console.log(`[Seed] ✅ Successfully seeded ${insertedProducts.length} products across ${createdCategories.length} categories! (50+ each)`)

    // 4. Seed Users (Admin & Customer)
    console.log('\n[Seed] Ensuring Admin and Demo Customer accounts exist...')
    let admin = await User.findOne({ email: 'admin@vistaraone.com' })
    if (!admin) {
      admin = await User.create({
        name: 'Vistara Admin',
        email: 'admin@vistaraone.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210',
      })
      console.log('   • Created default Admin: admin@vistaraone.com / admin123')
    }

    let customer = await User.findOne({ email: 'customer@vistaraone.com' })
    if (!customer) {
      customer = await User.create({
        name: 'Rahul Sharma',
        email: 'customer@vistaraone.com',
        password: 'cust123',
        role: 'customer',
        phone: '9876543211',
        addresses: [
          {
            name: 'Rahul Sharma',
            phone: '9876543211',
            pincode: '122002',
            locality: 'DLF Phase 2',
            addressLine: '42, Cyber Hub Road',
            city: 'Gurugram',
            state: 'Haryana',
            landmark: 'Near Cyber City Metro',
            addressType: 'home',
            isDefault: true,
          },
        ],
      })
      console.log('   • Created default Customer: customer@vistaraone.com / cust123')
    }

    // 5. Seed Festival Campaigns & Coupon Codes
    console.log('[Seed] Creating Indian Festival Coupons & Promotional Campaigns...')
    const now = new Date()
    const nextMonth = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)

    const campaignsData = [
      {
        name: 'Grand Festive Mega Savings',
        code: 'FESTIVAL20',
        description: 'Get 20% instant discount up to ₹2,000 on minimum purchase of ₹1,000',
        discountType: 'percentage',
        discountValue: 20,
        maxDiscount: 2000,
        minCartValue: 1000,
        startDate: now,
        endDate: nextMonth,
        bannerText: '⚡ Grand Festive Sale: Flat 20% OFF with code FESTIVAL20!',
        tag: 'MEGA_SALE',
        isActive: true,
      },
      {
        name: 'New Customer Welcome Gift',
        code: 'WELCOME100',
        description: 'Flat ₹100 instant discount on your first order of ₹499 or more',
        discountType: 'fixed',
        discountValue: 100,
        minCartValue: 499,
        startDate: now,
        endDate: nextMonth,
        bannerText: '🎉 Welcome to VistaraOne! Use code WELCOME100 for ₹100 off.',
        tag: 'WELCOME',
        isActive: true,
      },
      {
        name: 'Big Electronics Super Deal',
        code: 'DIWALI500',
        description: 'Flat ₹500 off on appliances and electronics above ₹2,500',
        discountType: 'fixed',
        discountValue: 500,
        minCartValue: 2500,
        startDate: now,
        endDate: nextMonth,
        bannerText: 'Diwali Dhamaka: Flat ₹500 OFF with code DIWALI500!',
        tag: 'ELECTRONICS',
        isActive: true,
      },
    ]

    await Campaign.insertMany(campaignsData)
    console.log(`   • Seeded ${campaignsData.length} promotional campaigns.`)

    // 6. Seed Sample Verified Reviews for the top products
    if (insertedProducts.length > 0 && customer) {
      console.log('[Seed] Adding verified customer reviews...')
      const reviewSamples = [
        {
          product: insertedProducts[0]._id,
          user: customer._id,
          rating: 5,
          title: 'Exceeded all expectations! Absolute flagship perfection.',
          comment: 'Fast delivery by VistaraOne. Battery and display are simply unparalleled in this price segment. Build quality is premium!',
          isVerifiedPurchase: true,
          likes: 14,
        },
        {
          product: insertedProducts[1]._id,
          user: customer._id,
          rating: 5,
          title: 'Unbelievable performance and quality!',
          comment: 'Received within 2 days with tamper-proof packaging. Flawless multitasking and looks gorgeous in hand.',
          isVerifiedPurchase: true,
          likes: 9,
        },
      ]
      for (const rev of reviewSamples) {
        await Review.create(rev)
      }
      console.log('   • Seeded verified product reviews.')
    }

    console.log('\n============================================================')
    console.log(`  🎉 SEED COMPLETE: ${insertedProducts.length} Products in Atlas Database!`)
    console.log('============================================================\n')
    process.exit(0)
  } catch (err) {
    console.error('[Seed] Seeding failed with error:', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

// Run immediately when script is executed directly
const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('seed.js')
if (isMain) {
  runSeed()
}
