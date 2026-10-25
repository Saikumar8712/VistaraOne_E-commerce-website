import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { categoriesConfig } from './productData.js'

import { generateMobiles } from './data/mobiles.js'
import { generateLaptops } from './data/laptops.js'
import { generateElectronics } from './data/electronics.js'
import { generateFashion } from './data/fashion.js'
import { generateFootwear } from './data/footwear.js'
import { generateAppliances } from './data/appliances.js'
import { generateKitchen } from './data/kitchen.js'
import { generateGroceries } from './data/groceries.js'
import { generateBeauty } from './data/beauty.js'
import { generateWatches } from './data/watches.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function seedProducts() {
  console.log('\n============================================================')
  console.log('  VistaraOne — MongoDB High-Density Catalog Seeder (50+/Cat)')
  console.log('============================================================\n')

  try {
    // 1. Establish Database Connection
    console.log('📡 Connecting to MongoDB using application config...')
    await connectDB()
    console.log('✅ Connected successfully to database.\n')

    // 2. Ensure / Upsert the 10 Required Categories
    console.log('📁 Synchronizing 10 Product Categories...')
    const categoryMap = {}

    for (const cat of categoriesConfig) {
      const savedCat = await Category.findOneAndUpdate(
        { slug: cat.slug },
        {
          $set: {
            name: cat.name,
            icon: cat.icon,
            image: cat.image,
            description: cat.description,
            order: cat.order,
            isFeatured: cat.isFeatured,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      )
      categoryMap[cat.slug] = savedCat._id
      console.log(`   • [${cat.slug}] -> ${savedCat.name} (ID: ${savedCat._id})`)
    }

    console.log('\n✅ Categories synchronized successfully.\n')

    // 3. Normalize any pre-existing products missing SKUs (from prior dev seeds)
    const unkeyedProducts = await Product.find({
      $or: [{ sku: null }, { sku: '' }, { sku: { $exists: false } }],
    })

    if (unkeyedProducts.length > 0) {
      console.log(`🔧 Normalizing ${unkeyedProducts.length} existing pre-seed products with stable SKUs...`)
      for (let i = 0; i < unkeyedProducts.length; i++) {
        const item = unkeyedProducts[i]
        item.sku = `VO-LEGACY-${String(i + 1).padStart(3, '0')}`
        if (!item.slug) {
          item.slug = `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${item.sku.toLowerCase()}`
        }
        await item.save()
      }
      console.log('✅ Legacy products normalized with unique SKUs.\n')
    }

    // 4. Generate Products for all 10 categories
    console.log('📦 Generating 50+ unique, realistic products per category...')

    const categoryGenerators = [
      { slug: 'mobiles-smartphones', name: 'Mobiles & Smartphones', fn: generateMobiles },
      { slug: 'laptops-computers', name: 'Laptops & Computers', fn: generateLaptops },
      { slug: 'electronics', name: 'Electronics & Accessories', fn: generateElectronics },
      { slug: 'fashion', name: 'Fashion & Clothing', fn: generateFashion },
      { slug: 'footwear', name: 'Footwear', fn: generateFootwear },
      { slug: 'appliances', name: 'Home Appliances', fn: generateAppliances },
      { slug: 'home-kitchen', name: 'Home & Kitchen', fn: generateKitchen },
      { slug: 'groceries', name: 'Grocery & Daily Essentials', fn: generateGroceries },
      { slug: 'beauty-personal-care', name: 'Beauty & Personal Care', fn: generateBeauty },
      { slug: 'watches-accessories', name: 'Watches & Accessories', fn: generateWatches },
    ]

    const allProducts = []

    for (const { slug, name, fn } of categoryGenerators) {
      const catId = categoryMap[slug]
      if (!catId) {
        throw new Error(`Category ID not found for slug: ${slug}`)
      }

      const products = fn(catId)
      console.log(`   • ${name} (${slug}): ${products.length} products generated`)

      for (const p of products) {
        if (p.originalPrice && p.originalPrice > p.price) {
          p.discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        } else {
          p.discountPercent = 0
        }
        allProducts.push(p)
      }
    }

    console.log(`\n📊 Total products generated for upsert: ${allProducts.length}\n`)

    // 5. Perform Idempotent BulkWrite Upserts
    console.log('⚡ Executing MongoDB bulkWrite operations (idempotent upserts)...')
    const bulkOps = allProducts.map((p) => ({
      updateOne: {
        filter: { sku: p.sku },
        update: { $set: p },
        upsert: true,
      },
    }))

    const bulkResult = await Product.bulkWrite(bulkOps, { ordered: false })

    console.log('✅ Bulk write complete:')
    console.log(`   - Matched: ${bulkResult.matchedCount}`)
    console.log(`   - Modified: ${bulkResult.modifiedCount}`)
    console.log(`   - Upserted: ${bulkResult.upsertedCount}\n`)

    // 6. Verification Queries Against Actual Database
    console.log('============================================================')
    console.log('  ACTUAL DATABASE VERIFICATION AUDIT')
    console.log('============================================================\n')

    const totalInDB = await Product.countDocuments({ isActive: true })
    console.log(`📦 Total Active Products in MongoDB: ${totalInDB}`)

    // Category breakdown
    const categoryCounts = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryDoc',
        },
      },
      { $unwind: { path: '$categoryDoc', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$categoryDoc.name' },
          categorySlug: { $first: '$categoryDoc.slug' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])

    const requiredSlugs = new Set(categoriesConfig.map((c) => c.slug))
    let requiredBelowFifty = 0

    console.log('\n📊 Product Count Per Required Category:')
    for (const item of categoryCounts) {
      if (requiredSlugs.has(item.categorySlug)) {
        const passed = item.count >= 50
        if (!passed) requiredBelowFifty++
        const status = passed ? '✅ PASSED (>= 50)' : '❌ FAILED (< 50)'
        console.log(`   • ${item.categoryName} [${item.categorySlug}]: ${item.count} products [${status}]`)
      }
    }

    const additionalCategories = categoryCounts.filter((item) => !requiredSlugs.has(item.categorySlug))
    if (additionalCategories.length > 0) {
      console.log('\n📁 Preserved Additional Categories in Database:')
      for (const item of additionalCategories) {
        console.log(`   • ${item.categoryName || 'Unassigned'} [${item.categorySlug || item._id}]: ${item.count} existing products (preserved)`)
      }
    }

    // Check for categories with < 50 products
    if (requiredBelowFifty === 0) {
      console.log('\n🎉 ALL 10 REQUIRED CATEGORIES HAVE AT LEAST 50 UNIQUE PRODUCTS!')
    } else {
      console.error(`\n⚠️ Failure: ${requiredBelowFifty} required categories have fewer than 50 products.`)
    }

    // Duplicate SKU check
    const dupSkus = await Product.aggregate([
      { $match: { sku: { $exists: true, $ne: null, $ne: '' } } },
      { $group: { _id: '$sku', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
    console.log(`\n🔍 Duplicate SKU check: ${dupSkus.length} duplicates found ${dupSkus.length === 0 ? '✅' : '❌'}`)

    // Duplicate Slug check
    const dupSlugs = await Product.aggregate([
      { $group: { _id: '$slug', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
    console.log(`🔍 Duplicate Slug check: ${dupSlugs.length} duplicates found ${dupSlugs.length === 0 ? '✅' : '❌'}`)

    // Missing required fields check
    const invalidProducts = await Product.countDocuments({
      $or: [
        { name: { $in: [null, ''] } },
        { slug: { $in: [null, ''] } },
        { brand: { $in: [null, ''] } },
        { category: null },
        { price: { $in: [null, undefined] } },
        { sku: { $in: [null, ''] } },
      ],
    })
    console.log(`🔍 Invalid / Missing Required Fields check: ${invalidProducts} records found ${invalidProducts === 0 ? '✅' : '❌'}\n`)

    console.log('============================================================')
    console.log('  Seeding Finished Successfully!')
    console.log('============================================================\n')

    await mongoose.connection.close()
    console.log('🔒 Database connection closed safely.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error during database seeding:', err)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
    process.exit(1)
  }
}

seedProducts()
