import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './db.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import Campaign from '../models/Campaign.js'
import Review from '../models/Review.js'

const img = (id) => `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`

const categoriesData = [
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

const productsData = [
  // ── ELECTRONICS ──
  {
    categorySlug: 'electronics',
    name: 'Samsung Galaxy S24 5G (Onyx Black, 256 GB)',
    slug: 'samsung-galaxy-s24-5g-256gb',
    brand: 'Samsung',
    price: 64999,
    originalPrice: 79999,
    stock: 24,
    rating: 4.7,
    reviewCount: 1420,
    isFeatured: true,
    isBestseller: true,
    warranty: '1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories',
    images: [
      img('photo-1610945265064-0e34e5519bbf'),
      img('photo-1511707171634-5f897ff02aa9'),
      img('photo-1580910051074-3eb694886505'),
    ],
    highlights: [
      '8 GB RAM | 256 GB ROM',
      '15.75 cm (6.2 inch) Full HD+ Dynamic AMOLED 2X Display',
      '50MP + 12MP + 10MP | 12MP Front Camera',
      '4000 mAh Lithium-ion Battery',
      'Exynos 2400 Deca-Core Processor with Galaxy AI',
    ],
    description:
      'Meet Galaxy S24, the smartphone that welcomes a new era of mobile AI. Search like never before, get quick language translation on a call, convert voice recordings into text and edit photos with generative AI effortlessly.',
    specifications: [
      { group: 'General', name: 'Model Name', value: 'Galaxy S24 5G' },
      { group: 'General', name: 'Color', value: 'Onyx Black' },
      { group: 'Display', name: 'Display Size', value: '15.75 cm (6.2 inch)' },
      { group: 'Display', name: 'Resolution', value: '2340 x 1080 Pixels Full HD+' },
      { group: 'Os & Processor', name: 'Operating System', value: 'Android 14 (One UI 6.1)' },
      { group: 'Os & Processor', name: 'Processor', value: 'Exynos 2400 Deca-Core' },
      { group: 'Memory & Storage', name: 'Internal Storage', value: '256 GB' },
      { group: 'Memory & Storage', name: 'RAM', value: '8 GB' },
      { group: 'Camera', name: 'Primary Camera', value: '50MP + 12MP + 10MP' },
      { group: 'Camera', name: 'Secondary Camera', value: '12MP' },
      { group: 'Battery', name: 'Battery Capacity', value: '4000 mAh' },
    ],
    variants: [
      { variantType: 'storage', name: '128 GB', value: '128GB', price: 59999, originalPrice: 74999, stock: 15 },
      { variantType: 'storage', name: '256 GB', value: '256GB', price: 64999, originalPrice: 79999, stock: 24 },
      { variantType: 'color', name: 'Onyx Black', value: 'black', price: 64999, originalPrice: 79999, stock: 20 },
      { variantType: 'color', name: 'Amber Yellow', value: 'yellow', price: 64999, originalPrice: 79999, stock: 12 },
    ],
    tags: ['mobile', 'smartphone', 'samsung', '5g', 'galaxy'],
  },
  {
    categorySlug: 'electronics',
    name: 'Apple iPhone 15 (Blue, 128 GB)',
    slug: 'apple-iphone-15-128gb-blue',
    brand: 'Apple',
    price: 69999,
    originalPrice: 79900,
    stock: 18,
    rating: 4.8,
    reviewCount: 3890,
    isFeatured: true,
    isBestseller: true,
    warranty: '1 Year Apple Limited Warranty',
    images: [
      img('photo-1592750475338-74b7b21085ab'),
      img('photo-1510557880182-3d4d3cba35a5'),
      img('photo-1565849904461-04a58ad377e0'),
    ],
    highlights: [
      '128 GB ROM',
      '15.49 cm (6.1 inch) Super Retina XDR Display',
      '48MP + 12MP | 12MP Front Camera with Dynamic Island',
      'A16 Bionic Chip with 5-Core GPU',
      'Next-Generation Portraits with Focus and Depth Control',
    ],
    description:
      'iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C — all in a durable color-infused glass and aluminum design.',
    specifications: [
      { group: 'General', name: 'Model Name', value: 'iPhone 15' },
      { group: 'Display', name: 'Display Size', value: '6.1 inch OLED' },
      { group: 'Processor', name: 'Processor Type', value: 'A16 Bionic Chip' },
      { group: 'Camera', name: 'Main Camera', value: '48MP + 12MP Ultra Wide' },
    ],
    variants: [
      { variantType: 'storage', name: '128 GB', value: '128GB', price: 69999, originalPrice: 79900, stock: 18 },
      { variantType: 'storage', name: '256 GB', value: '256GB', price: 79999, originalPrice: 89900, stock: 10 },
      { variantType: 'color', name: 'Blue', value: 'blue', price: 69999, originalPrice: 79900, stock: 18 },
      { variantType: 'color', name: 'Black', value: 'black', price: 69999, originalPrice: 79900, stock: 14 },
    ],
    tags: ['iphone', 'apple', 'mobile', 'smartphone', 'ios'],
  },
  {
    categorySlug: 'electronics',
    name: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-wireless-anc-headphones',
    brand: 'Sony',
    price: 26990,
    originalPrice: 34990,
    stock: 35,
    rating: 4.8,
    reviewCount: 920,
    isFeatured: true,
    isBestseller: true,
    warranty: '1 Year Warranty Provided by the Manufacturer',
    images: [
      img('photo-1505740420928-5e560c06d30e'),
      img('photo-1546435770-a3e426bf472b'),
      img('photo-1484704849700-f032a568e944'),
    ],
    highlights: [
      'Industry-leading Noise Cancellation with two processors and 8 microphones',
      'Magnificent sound engineered with Ultra-lightweight 30mm precision driver',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Up to 30-hour battery life with quick charging (3 min for 3 hours of playback)',
    ],
    description:
      'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. 2 processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.',
    specifications: [
      { group: 'General', name: 'Model Name', value: 'WH-1000XM5' },
      { group: 'General', name: 'Headphone Type', value: 'Over Ear' },
      { group: 'Connectivity', name: 'Bluetooth Version', value: '5.2 with LDAC support' },
      { group: 'Battery', name: 'Battery Life', value: '30 Hours (ANC ON)' },
    ],
    variants: [
      { variantType: 'color', name: 'Silver', value: 'silver', price: 26990, originalPrice: 34990, stock: 15 },
      { variantType: 'color', name: 'Black', value: 'black', price: 26990, originalPrice: 34990, stock: 20 },
    ],
    tags: ['sony', 'headphones', 'audio', 'noise cancelling', 'bluetooth'],
  },
  {
    categorySlug: 'electronics',
    name: 'OnePlus Nord Buds 3 Pro Truly Wireless Earbuds',
    slug: 'oneplus-nord-buds-3-pro-tws',
    brand: 'OnePlus',
    price: 2799,
    originalPrice: 3299,
    stock: 50,
    rating: 4.4,
    reviewCount: 2310,
    isFeatured: false,
    isBestseller: true,
    warranty: '1 Year Brand Warranty',
    images: [
      img('photo-1590658268037-6bf12f032f55'),
      img('photo-1606220588913-b3aacb4d2f46'),
    ],
    highlights: [
      'Up to 49dB Hybrid Active Noise Cancellation',
      '12.4mm Titanized Diaphragm with BassWave 2.0',
      'Up to 44 hours of total battery life',
      'Dual Connection & Google Fast Pair',
    ],
    description:
      'Immerse yourself in deep bass and serene silence with up to 49dB Active Noise Cancellation and large 12.4mm titanium drivers.',
    specifications: [
      { group: 'General', name: 'Model Name', value: 'Nord Buds 3 Pro' },
      { group: 'Audio', name: 'Driver Size', value: '12.4 mm' },
      { group: 'Battery', name: 'Playtime', value: '44 Hours' },
    ],
    variants: [],
    tags: ['oneplus', 'earbuds', 'audio', 'tws', 'wireless'],
  },
  {
    categorySlug: 'electronics',
    name: 'Apple Watch Series 9 GPS 45mm (Midnight Aluminium)',
    slug: 'apple-watch-series-9-gps-45mm',
    brand: 'Apple',
    price: 37999,
    originalPrice: 44900,
    stock: 14,
    rating: 4.7,
    reviewCount: 540,
    isFeatured: true,
    isBestseller: false,
    warranty: '1 Year Apple Warranty',
    images: [
      img('photo-1523275335684-37898b6baf30'),
      img('photo-1508685096489-7aacd43bd3b1'),
    ],
    highlights: [
      'S9 SiP with 64-bit dual-core processor',
      'Double tap gesture to easily control music and answer calls',
      'Always-On Retina display up to 2000 nits',
      'Advanced health sensors for Blood Oxygen, ECG, and Sleep Tracking',
    ],
    description:
      'Smarter, brighter, and mightier. Watch Series 9 introduces Double Tap gesture and carbon-neutral combinations.',
    specifications: [
      { group: 'General', name: 'Model Name', value: 'Watch Series 9' },
      { group: 'Display', name: 'Size', value: '45mm' },
    ],
    variants: [],
    tags: ['smartwatch', 'apple', 'fitness', 'watch'],
  },

  // ── FASHION & LIFESTYLE ──
  {
    categorySlug: 'fashion',
    name: "Men's Slim Fit Cotton Blend Casual Shirt",
    slug: 'mens-slim-fit-cotton-casual-shirt',
    brand: 'StyleCraft',
    price: 899,
    originalPrice: 1999,
    stock: 45,
    rating: 4.3,
    reviewCount: 780,
    isFeatured: true,
    isBestseller: true,
    warranty: '30 Days Return & Exchange Policy',
    images: [
      img('photo-1596755094514-f87e34085b2c'),
      img('photo-1602810318383-e386cc2a3ccf'),
    ],
    highlights: [
      'Fabric: 100% Breathable Combed Cotton',
      'Fit: Slim Fit with Spread Collar',
      'Pattern: Solid Classic Design',
      'Machine wash cold with like colors',
    ],
    description:
      'Elevate your daily formal and casual wardrobe with this ultra-soft, breathable slim-fit cotton shirt designed for Indian summers.',
    specifications: [
      { group: 'General', name: 'Fabric', value: '100% Cotton' },
      { group: 'General', name: 'Fit', value: 'Slim' },
      { group: 'General', name: 'Sleeve', value: 'Full Sleeve' },
    ],
    variants: [
      { variantType: 'size', name: 'Size S (38)', value: 'S', price: 899, originalPrice: 1999, stock: 10 },
      { variantType: 'size', name: 'Size M (40)', value: 'M', price: 899, originalPrice: 1999, stock: 15 },
      { variantType: 'size', name: 'Size L (42)', value: 'L', price: 899, originalPrice: 1999, stock: 12 },
      { variantType: 'size', name: 'Size XL (44)', value: 'XL', price: 899, originalPrice: 1999, stock: 8 },
    ],
    tags: ['shirt', 'men', 'fashion', 'casual', 'cotton'],
  },
  {
    categorySlug: 'fashion',
    name: "Women's Anarkali Embroidered Kurta with Dupatta Set",
    slug: 'womens-anarkali-embroidered-kurta-set',
    brand: 'VedicTrends',
    price: 1599,
    originalPrice: 3499,
    stock: 30,
    rating: 4.6,
    reviewCount: 620,
    isFeatured: true,
    isBestseller: true,
    warranty: '15 Days Easy Returns',
    images: [
      img('photo-1610030469983-98e550d6193c'),
      img('photo-1583391733956-3750e0ff4e8b'),
    ],
    highlights: [
      'Fabric: Pure Georgette with Zari Embroidery',
      'Set Contents: 1 Kurta, 1 Pant, 1 Chiffon Dupatta',
      'Occasion: Festive, Wedding & Party Wear',
      'Comfortable Flared Anarkali Silhouette',
    ],
    description:
      'Shine at every festive gathering with this regal embroidered Anarkali Kurta set crafted from featherlight breathable fabric.',
    specifications: [
      { group: 'General', name: 'Fabric', value: 'Georgette & Cotton Blend' },
      { group: 'General', name: 'Pattern', value: 'Intricate Floral Zari' },
    ],
    variants: [
      { variantType: 'size', name: 'Size M (38)', value: 'M', price: 1599, originalPrice: 3499, stock: 10 },
      { variantType: 'size', name: 'Size L (40)', value: 'L', price: 1599, originalPrice: 3499, stock: 12 },
      { variantType: 'size', name: 'Size XL (42)', value: 'XL', price: 1599, originalPrice: 3499, stock: 8 },
    ],
    tags: ['kurta', 'women', 'ethnic', 'festive', 'anarkali'],
  },
  {
    categorySlug: 'fashion',
    name: "Men's Velocity Cushion Running Shoes (UK 9)",
    slug: 'mens-velocity-cushion-running-shoes',
    brand: 'StrideMax',
    price: 2199,
    originalPrice: 3999,
    stock: 22,
    rating: 4.5,
    reviewCount: 450,
    isFeatured: false,
    isBestseller: true,
    warranty: '3 Months Manufacturer Warranty against Manufacturing Defects',
    images: [
      img('photo-1542291026-7eec264c27ff'),
      img('photo-1608231387042-66d1773070a5'),
    ],
    highlights: [
      'Engineered Breathable Mesh Upper with Airflow Ventilation',
      'EVA Foam Midsole for superior shock absorption',
      'High-Traction Anti-Slip Rubber Outsole',
      'Lightweight design weighing under 280 grams',
    ],
    description:
      'Engineered for long-distance marathoners and daily morning joggers, StrideMax Velocity delivers unmatched bounce and foot support.',
    specifications: [
      { group: 'General', name: 'Ideal For', value: 'Men Running & Training' },
      { group: 'General', name: 'Closure', value: 'Lace-Up' },
    ],
    variants: [
      { variantType: 'size', name: 'UK 7', value: '7', price: 2199, originalPrice: 3999, stock: 6 },
      { variantType: 'size', name: 'UK 8', value: '8', price: 2199, originalPrice: 3999, stock: 8 },
      { variantType: 'size', name: 'UK 9', value: '9', price: 2199, originalPrice: 3999, stock: 5 },
      { variantType: 'size', name: 'UK 10', value: '10', price: 2199, originalPrice: 3999, stock: 3 },
    ],
    tags: ['shoes', 'sneakers', 'running', 'men', 'footwear'],
  },

  // ── HOME & KITCHEN ──
  {
    categorySlug: 'home-kitchen',
    name: 'Prestige Omega Deluxe Induction Base Non-Stick Cookware Set (3 Pcs)',
    slug: 'prestige-omega-deluxe-cookware-set-3pcs',
    brand: 'Prestige',
    price: 1899,
    originalPrice: 2890,
    stock: 35,
    rating: 4.4,
    reviewCount: 1120,
    isFeatured: true,
    isBestseller: true,
    warranty: '2 Years Manufacturer Warranty',
    images: [
      img('photo-1556909114-f6e7ad7d3136'),
      img('photo-1584992236310-6edddc08acff'),
    ],
    highlights: [
      'Set includes: Omni Tawa (250mm), Fry Pan (240mm), and Kadai with Glass Lid (240mm)',
      'Durable 3-layer German Granite Stone Coating',
      'Compatible with Gas Stoves and Induction Cooktops',
      'PFOA-free food-safe healthy cooking surface',
    ],
    description:
      'Cook tasty and healthy meals with minimum oil. The Prestige Omega Deluxe cookware set features revolutionary granite non-stick coating for easy food release and effortless cleaning.',
    specifications: [
      { group: 'General', name: 'Sales Package', value: 'Tawa, Fry Pan, Kadai with Lid' },
      { group: 'General', name: 'Induction Bottom', value: 'Yes' },
      { group: 'General', name: 'Dishwasher Safe', value: 'Yes' },
    ],
    variants: [],
    tags: ['cookware', 'kitchen', 'prestige', 'nonstick', 'pan'],
  },
  {
    categorySlug: 'home-kitchen',
    name: 'Philips Digital Rapid Air Fryer with Touchscreen (4.1 L)',
    slug: 'philips-digital-rapid-air-fryer-4l',
    brand: 'Philips',
    price: 6499,
    originalPrice: 9995,
    stock: 16,
    rating: 4.6,
    reviewCount: 890,
    isFeatured: true,
    isBestseller: true,
    warranty: '2 Years Philips India Domestic Warranty',
    images: [
      img('photo-1583863788434-e58a36330cf0'),
      img('photo-1556911220-e15b29be8c8f'),
    ],
    highlights: [
      'Rapid Air Technology with unique Starfish design for 90% less fat',
      'Touch screen with 7 presets for samosas, fries, chicken, and baking',
      'Keep Warm function keeps food hot up to 30 minutes',
      'Dishwasher safe removable QuickClean basket',
    ],
    description:
      'Enjoy crispy, delicious snacks with up to 90% less oil thanks to Philips patented Rapid Air Technology.',
    specifications: [
      { group: 'General', name: 'Capacity', value: '4.1 Litres' },
      { group: 'General', name: 'Power Consumption', value: '1400 W' },
    ],
    variants: [],
    tags: ['airfryer', 'philips', 'kitchen', 'appliance'],
  },
  {
    categorySlug: 'home-kitchen',
    name: 'DreamWeave 100% Pure Cotton 300 TC King Bed Sheet with 2 Pillow Covers',
    slug: 'dreamweave-pure-cotton-300tc-king-bedsheet',
    brand: 'DreamWeave',
    price: 1199,
    originalPrice: 2499,
    stock: 40,
    rating: 4.5,
    reviewCount: 380,
    isFeatured: false,
    isBestseller: false,
    warranty: 'Brand Guarantee against Color Bleeding',
    images: [
      img('photo-1522771739806-5bba53d77547'),
      img('photo-1584100936595-c0654b55a2e2'),
    ],
    highlights: [
      'Material: 100% Long-Staple Pure Cotton',
      'Thread Count: 300 TC Satin Weave for Hotel-Luxe Softness',
      'Dimensions: King Size Sheet (274 cm x 274 cm)',
      'Fade-resistant and breathable',
    ],
    description:
      'Transform your bedroom into a five-star suite with this silky-soft, breathable 300 Thread Count pure cotton king-size bedsheet.',
    specifications: [
      { group: 'General', name: 'Size', value: 'King (108 x 108 inches)' },
      { group: 'General', name: 'Thread Count', value: '300 TC' },
    ],
    variants: [],
    tags: ['bedsheet', 'home', 'cotton', 'bedroom'],
  },

  // ── GROCERIES & DAILY NEEDS ──
  {
    categorySlug: 'groceries',
    name: 'Daawat Rozana Super Basmati Rice (5 kg)',
    slug: 'daawat-rozana-super-basmati-rice-5kg',
    brand: 'Daawat',
    price: 389,
    originalPrice: 495,
    stock: 60,
    rating: 4.5,
    reviewCount: 1650,
    isFeatured: true,
    isBestseller: true,
    warranty: 'Best before 24 months from packaging',
    images: [
      img('photo-1586201375761-83865001e31c'),
      img('photo-1542838132-92c53300491e'),
    ],
    highlights: [
      'Aged Long Grain Basmati Rice with authentic rich aroma',
      'Perfect for daily cooking of Biryanis, Pulao, and Fried Rice',
      'Hygienically sorted and packed in state-of-the-art facility',
    ],
    description:
      'Daawat Rozana Super is the finest quality everyday basmati rice with slender, fluffy grains and mouth-watering aroma.',
    specifications: [
      { group: 'General', name: 'Quantity', value: '5 kg' },
      { group: 'General', name: 'Type', value: 'Aged Basmati Rice' },
    ],
    variants: [],
    tags: ['rice', 'basmati', 'grocery', 'daawat', 'staple'],
  },
  {
    categorySlug: 'groceries',
    name: 'Tata Tea Gold Leaf & Gentle Pressed Long Leaves (1 kg)',
    slug: 'tata-tea-gold-1kg',
    brand: 'Tata Tea',
    price: 520,
    originalPrice: 620,
    stock: 80,
    rating: 4.6,
    reviewCount: 2140,
    isFeatured: false,
    isBestseller: true,
    warranty: 'Best before 12 months from manufacture',
    images: [
      img('photo-1576092768241-dec231879fc3'),
      img('photo-1544787219-7f47ccb76574'),
    ],
    highlights: [
      'Exquisite blend of 85% Assam CTC teas and 15% long tea leaves',
      'Rich golden liquor with unmatched aroma and strong taste',
      'Ideal companion for morning freshness and evening tea time',
    ],
    description:
      'Tata Tea Gold brings together the strength of CTC tea with the rich flavor notes of 15% gently pressed long tea leaves.',
    specifications: [
      { group: 'General', name: 'Quantity', value: '1 kg' },
      { group: 'General', name: 'Form', value: 'Tea Granules & Leaves' },
    ],
    variants: [],
    tags: ['tea', 'chai', 'grocery', 'beverage', 'tata'],
  },
  {
    categorySlug: 'groceries',
    name: 'NutriPack California Raw Whole Almonds (1 kg)',
    slug: 'nutripack-california-raw-almonds-1kg',
    brand: 'NutriPack',
    price: 849,
    originalPrice: 1200,
    stock: 45,
    rating: 4.7,
    reviewCount: 940,
    isFeatured: true,
    isBestseller: true,
    warranty: 'Best before 9 months from packaging',
    images: [
      img('photo-1508061252966-f72fb982235e'),
      img('photo-1548036328-c9fa89d128fa'),
    ],
    highlights: [
      '100% Genuine Non-GMO California Badam',
      'Zero cholesterol, rich in Vitamin E, Magnesium, and Dietary Fiber',
      'Resealable zip-lock pouch for lasting freshness and crunch',
    ],
    description:
      'Crunchy, wholesome, and packed with energy, these hand-selected California almonds make a healthy daily snack for your family.',
    specifications: [
      { group: 'General', name: 'Weight', value: '1 kg' },
      { group: 'General', name: 'Container Type', value: 'Pouch with Zip-lock' },
    ],
    variants: [],
    tags: ['almonds', 'dryfruits', 'badam', 'nuts', 'healthy'],
  },

  // ── FRESH MARKET ──
  {
    categorySlug: 'fresh-market',
    name: 'Farm-Fresh Ratnagiri Alphonso Mangoes (1 Dozen)',
    slug: 'farm-fresh-ratnagiri-alphonso-mangoes-1-dozen',
    brand: 'Farm Direct',
    price: 799,
    originalPrice: 1199,
    stock: 25,
    rating: 4.8,
    reviewCount: 420,
    isFeatured: true,
    isBestseller: true,
    warranty: '100% Freshness Guarantee upon delivery',
    images: [
      img('photo-1553279768-865429fa0078'),
      img('photo-1601493700631-48242ff8273e'),
    ],
    highlights: [
      'Naturally ripened without carbide or chemical treatment',
      'Directly sourced from trusted GI-tagged Konkan orchards',
      'Sweet, pulpy golden flesh with signature heavenly aroma',
    ],
    description:
      'Known as the King of Mangoes, our Alphonso mangoes are carefully hand-picked, sorted for prime sweetness, and packed safely in protective cardboard trays.',
    specifications: [
      { group: 'General', name: 'Pack Size', value: '12 Pieces (approx 2.8 - 3.2 kg)' },
      { group: 'General', name: 'Origin', value: 'Ratnagiri, Maharashtra' },
    ],
    variants: [],
    tags: ['mango', 'alphonso', 'fruits', 'fresh', 'organic'],
  },
  {
    categorySlug: 'fresh-market',
    name: 'Kashmir Royal Red Delicious Apples (1 kg)',
    slug: 'kashmir-royal-red-apples-1kg',
    brand: 'Nature Best',
    price: 199,
    originalPrice: 260,
    stock: 50,
    rating: 4.4,
    reviewCount: 310,
    isFeatured: false,
    isBestseller: true,
    warranty: 'Quality check verified',
    images: [
      img('photo-1560806887-1e4cd0b6cbd6'),
      img('photo-1570913149827-d2ac84ab3f9a'),
    ],
    highlights: [
      'Crisp, juicy and naturally sweet red apples',
      'Loaded with antioxidants, dietary fiber, and Vitamin C',
      'Hand-plucked from the high-altitude orchards of Kashmir',
    ],
    description:
      'Sweet, juicy, and ruby-red, our fresh Kashmir apples arrive crisp at your doorstep for your daily healthy fruit salad.',
    specifications: [
      { group: 'General', name: 'Net Weight', value: '1 kg (approx 4-5 apples)' },
      { group: 'General', name: 'Origin', value: 'Kashmir Valley' },
    ],
    variants: [],
    tags: ['apple', 'fruits', 'fresh', 'healthy'],
  },

  // ── BEAUTY & PERSONAL CARE ──
  {
    categorySlug: 'beauty-pets',
    name: 'Forest Essentials Luxury Ayurvedic Skincare Gift Hamper',
    slug: 'forest-essentials-luxury-ayurvedic-skincare-box',
    brand: 'Forest Essentials',
    price: 3499,
    originalPrice: 4800,
    stock: 20,
    rating: 4.8,
    reviewCount: 320,
    isFeatured: true,
    isBestseller: false,
    warranty: '100% Genuine Certified Ayurvedic Formulation',
    images: [
      img('photo-1556228578-0d85b1a4d571'),
      img('photo-1608248597359-2b02a7dcbcfe'),
    ],
    highlights: [
      'Infused with pure 24K Gold Bhasma and cold-pressed floral oils',
      'Includes Soundarya Radiance Cream, Facial Cleanser, and Body Mist',
      'Cruelty-free, sulfate-free and paraben-free formulation',
    ],
    description:
      'Immerse in timeless Ayurvedic royal self-care. Forest Essentials combines age-old botanicals with artisanal perfumery to nourish and illuminate your skin.',
    specifications: [
      { group: 'General', name: 'Ideal For', value: 'Men & Women' },
      { group: 'General', name: 'Skin Type', value: 'All Skin Types' },
    ],
    variants: [],
    tags: ['skincare', 'beauty', 'ayurvedic', 'luxury', 'gift'],
  },

  // ── SPORTS & FITNESS ──
  {
    categorySlug: 'sports',
    name: 'FlexFit Anti-Tear Dual Color Non-Slip Yoga Mat with Carry Strap (6mm)',
    slug: 'flexfit-anti-tear-yoga-mat-6mm',
    brand: 'FlexFit',
    price: 799,
    originalPrice: 1499,
    stock: 35,
    rating: 4.6,
    reviewCount: 510,
    isFeatured: false,
    isBestseller: true,
    warranty: '6 Months Warranty against Peeling or Cracking',
    images: [
      img('photo-1601925260368-ae2f83cf8b7f'),
      img('photo-1545205597-3d9d02c29597'),
    ],
    highlights: [
      'High Density Eco-friendly TPE Material with extra cushioning',
      'Double-sided anti-skid wavy texture for rock-solid grip on tiles and wood',
      'Waterproof, sweat-resistant and easily washable with soap and water',
      'Free adjustable shoulder carry strap included',
    ],
    description:
      'Perform Surya Namaskar and intense Pilates routines safely without slipping. 6mm thickness offers ideal knee and wrist joint cushioning.',
    specifications: [
      { group: 'General', name: 'Thickness', value: '6 mm' },
      { group: 'General', name: 'Dimensions', value: '183 cm x 61 cm' },
    ],
    variants: [],
    tags: ['yoga', 'fitness', 'mat', 'exercise', 'gym'],
  },

  // ── BOOKS & STATIONERY ──
  {
    categorySlug: 'books',
    name: 'Atomic Habits by James Clear (Paperback, Deluxe Edition)',
    slug: 'atomic-habits-james-clear-paperback',
    brand: 'Penguin Random House',
    price: 499,
    originalPrice: 799,
    stock: 75,
    rating: 4.9,
    reviewCount: 14500,
    isFeatured: true,
    isBestseller: true,
    warranty: 'Replacement guaranteed if damaged in transit',
    images: [
      img('photo-1544716278-ca5e3f4abd8c'),
      img('photo-1512820790803-83ca734da794'),
    ],
    highlights: [
      'International #1 Bestseller with over 15 million copies sold',
      'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      'Deluxe ivory paper edition with ribbon bookmark',
    ],
    description:
      'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    specifications: [
      { group: 'General', name: 'Author', value: 'James Clear' },
      { group: 'General', name: 'Language', value: 'English' },
      { group: 'General', name: 'Pages', value: '320' },
      { group: 'General', name: 'Binding', value: 'Paperback' },
    ],
    variants: [],
    tags: ['books', 'selfhelp', 'bestseller', 'atomichabits', 'reading'],
  },
]

export async function runSeed() {
  try {
    console.log('[Seed] Starting database seed process...')
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

    // 3. Insert Products with referenced Category IDs
    console.log(`[Seed] Inserting ${productsData.length} rich products...`)
    const productsToInsert = productsData.map((item) => {
      const categoryId = categoryMap[item.categorySlug]
      if (!categoryId) {
        throw new Error(`Category slug "${item.categorySlug}" not found in inserted categories!`)
      }

      const { categorySlug, ...rest } = item
      return {
        ...rest,
        category: categoryId,
        isDemo: false,
      }
    })

    const insertedProducts = await Product.insertMany(productsToInsert)
    console.log(`[Seed] Successfully seeded ${insertedProducts.length} products across ${createdCategories.length} categories!`)

    // 4. Seed Users (Admin & Customer)
    console.log('[Seed] Ensuring Admin and Demo Customer accounts exist...')
    let admin = await User.findOne({ email: 'admin@vistaraone.com' })
    if (!admin) {
      admin = await User.create({
        name: 'Vistara Admin',
        email: 'admin@vistaraone.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210',
      })
      console.log('[Seed] Created default Admin: admin@vistaraone.com / admin123')
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
      console.log('[Seed] Created default Customer: customer@vistaraone.com / cust123')
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
    console.log(`[Seed] Seeded ${campaignsData.length} promotional campaigns.`)

    // 6. Seed Sample Verified Reviews for the first 3 products
    if (insertedProducts.length > 0 && customer) {
      console.log('[Seed] Adding verified customer reviews...')
      const reviewSamples = [
        {
          product: insertedProducts[0]._id,
          user: customer._id,
          rating: 5,
          title: 'Exceeded all expectations! Absolute flagship perfection.',
          comment: 'Fast delivery by VistaraOne. Camera and battery life are simply unparalleled in this price segment. Build quality is premium!',
          isVerifiedPurchase: true,
          likes: 12,
        },
        {
          product: insertedProducts[1]._id,
          user: customer._id,
          rating: 5,
          title: 'Unbelievable performance and display!',
          comment: 'Received within 2 days with tamper-proof packaging. Flawless multitasking and looks gorgeous in hand.',
          isVerifiedPurchase: true,
          likes: 8,
        },
      ]
      for (const rev of reviewSamples) {
        await Review.create(rev)
      }
      console.log('[Seed] Seeded verified product reviews.')
    }

    console.log('[Seed] All marketplace collections successfully seeded!')
    process.exit(0)
  } catch (err) {
    console.error('[Seed] Seeding failed with error:', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

// Run immediately when script is executed directly
runSeed()
