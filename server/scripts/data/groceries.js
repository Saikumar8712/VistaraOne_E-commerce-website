import { imagePools } from '../productData.js'

const imgs = imagePools.groceries

const groceryTemplates = [
  { brand: 'Aashirvaad', name: 'Aashirvaad Select Sharbati 100% MP Whole Wheat Atta (5 kg)', price: 349, mrp: 395, weight: '5 kg', type: 'Flour & Atta', diet: '100% Vegetarian', shelf: '6 Months from Packaging', featured: true, best: true },
  { brand: 'India Gate', name: 'India Gate Basmati Rice Classic Premium Aged Long Grain (5 kg Bag)', price: 699, mrp: 950, weight: '5 kg', type: 'Basmati Rice', diet: '100% Vegetarian', shelf: '24 Months', featured: true, best: true },
  { brand: 'Fortune', name: 'Fortune Sunlite Refined Sunflower Oil Pouch (1 Litre)', price: 135, mrp: 165, weight: '1 Litre', type: 'Cooking Oil', diet: '100% Vegetarian', shelf: '9 Months', featured: true, best: true },
  { brand: 'Tata Sampann', name: 'Tata Sampann Unpolished Toor Dal / Arhar Dal (1 kg)', price: 175, mrp: 210, weight: '1 kg', type: 'Pulses & Lentils', diet: '100% Vegetarian Unpolished', shelf: '12 Months', featured: true, best: true },
  { brand: 'Saffola', name: 'Saffola Gold Pro Healthy Lifestyle Blended Cooking Oil (5 Litre Can)', price: 849, mrp: 1045, weight: '5 Litres', type: 'Blended Edible Oil', diet: '100% Vegetarian', shelf: '12 Months', featured: true, best: true },
  { brand: 'Daawat', name: 'Daawat Rozana Gold Basmati Rice Daily Use Aged Grain (5 kg)', price: 425, mrp: 540, weight: '5 kg', type: 'Basmati Rice', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: true },
  { brand: '24 Mantra Organic', name: '24 Mantra Organic Sonamasuri Brown Rice (1 kg)', price: 110, mrp: 135, weight: '1 kg', type: 'Organic Rice', diet: '100% Certified Organic', shelf: '12 Months', featured: false, best: false },
  { brand: 'Organic Tattva', name: 'Organic Tattva Certified Organic Moong Dal Yellow Split (1 kg)', price: 185, mrp: 230, weight: '1 kg', type: 'Organic Pulses', diet: '100% Certified Organic', shelf: '12 Months', featured: false, best: true },
  { brand: 'Tata Salt', name: 'Tata Salt Vacuum Evaporated Iodized Salt (1 kg)', price: 28, mrp: 30, weight: '1 kg', type: 'Iodized Salt', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: true },
  { brand: 'Everest', name: 'Everest Garam Masala Authentic Spice Blend (100g Carton)', price: 85, mrp: 95, weight: '100 g', type: 'Spices & Masala', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: true },
  { brand: 'Catch', name: 'Catch Kashmiri Mirch Red Chilli Powder Rich Red Color (200g)', price: 120, mrp: 145, weight: '200 g', type: 'Spices & Seasoning', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'MDH', name: 'MDH Chana Masala Blended Spice Powder (100g Carton)', price: 78, mrp: 88, weight: '100 g', type: 'Blended Spices', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Maggi', name: 'Maggi 2-Minute Masala Instant Noodles Family Saver Pack (12-Pack, 840g)', price: 155, mrp: 168, weight: '840 g (12 x 70g)', type: 'Instant Noodles', diet: '100% Vegetarian', shelf: '9 Months', featured: true, best: true },
  { brand: 'Nescafe', name: 'Nescafe Classic 100% Pure Instant Soluble Coffee Glass Jar (200g)', price: 495, mrp: 575, weight: '200 g', type: 'Instant Coffee', diet: '100% Pure Coffee', shelf: '24 Months', featured: true, best: true },
  { brand: 'Brooke Bond', name: 'Brooke Bond Red Label Strong CTC Black Tea (1 kg Pouch)', price: 480, mrp: 550, weight: '1 kg', type: 'Black Tea', diet: '100% Vegetarian', shelf: '12 Months', featured: true, best: true },
  { brand: 'Bru', name: 'Bru Instant Coffee-Chicory Mix Granules (200g Pouch)', price: 299, mrp: 360, weight: '200 g', type: 'Coffee Chicory Blend', diet: '100% Vegetarian', shelf: '18 Months', featured: false, best: false },
  { brand: 'Dabur', name: 'Dabur 100% Pure Honey with Antioxidants Squeezy Bottle (400g + 100g Free)', price: 245, mrp: 310, weight: '500 g', type: 'Pure Honey', diet: '100% Pure Natural', shelf: '18 Months', featured: true, best: true },
  { brand: "Kellogg's", name: "Kellogg's Real Almond & Honey Crunchy Corn Flakes (1 kg Bag)", price: 399, mrp: 490, weight: '1 kg', type: 'Breakfast Cereal', diet: '100% Vegetarian', shelf: '9 Months', featured: false, best: true },
  { brand: 'Saffola', name: 'Saffola Masala Oats Classic Masala Instant Healthy Snack (1 kg Bag)', price: 189, mrp: 240, weight: '1 kg', type: 'Rolled Oats', diet: '100% High Fibre Oats', shelf: '12 Months', featured: false, best: true },
  { brand: 'Nutrela', name: 'Nutrela High Protein Soya Mini Chunks 99% Fat Free (1 kg Carton)', price: 140, mrp: 165, weight: '1 kg', type: 'Soya Chunks', diet: '100% High Protein Veg', shelf: '12 Months', featured: false, best: false },
  { brand: "Haldiram's", name: "Haldiram's Nagpur All In One Tasty Mixture Namkeen (1 kg Pouch)", price: 235, mrp: 275, weight: '1 kg', type: 'Snacks & Namkeen', diet: '100% Vegetarian', shelf: '6 Months', featured: false, best: true },
  { brand: 'Bikaji', name: 'Bikaji Aslee Bikaneri Bhujia Crispy Savory Namkeen (1 kg)', price: 260, mrp: 310, weight: '1 kg', type: 'Bikaneri Bhujia', diet: '100% Vegetarian', shelf: '6 Months', featured: false, best: true },
  { brand: 'Tata Sampann', name: 'Tata Sampann Unpolished Chana Dal Rich in Protein (1 kg)', price: 125, mrp: 155, weight: '1 kg', type: 'Pulses & Lentils', diet: '100% Vegetarian Unpolished', shelf: '12 Months', featured: false, best: false },
  { brand: 'Aashirvaad', name: 'Aashirvaad Svasti Pure Cow Ghee Traditional Aroma (1 Litre Tin)', price: 649, mrp: 750, weight: '1 Litre', type: 'Desi Cow Ghee', diet: '100% Pure Dairy', shelf: '9 Months', featured: true, best: true },
  { brand: 'Fortune', name: 'Fortune Kachi Ghani Pure Mustard Oil Cold Pressed (1 Litre Bottle)', price: 145, mrp: 180, weight: '1 Litre', type: 'Mustard Oil', diet: '100% Natural Cold Pressed', shelf: '12 Months', featured: false, best: true },
  { brand: 'India Gate', name: 'India Gate Feast Rozana Basmati Rice Slender Grains (5 kg)', price: 380, mrp: 495, weight: '5 kg', type: 'Basmati Rice', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: false },
  { brand: '24 Mantra Organic', name: '24 Mantra Organic Cold Pressed Virgin Groundnut Peanut Oil (1L)', price: 320, mrp: 380, weight: '1 Litre', type: 'Cold Pressed Peanut Oil', diet: '100% Certified Organic', shelf: '9 Months', featured: false, best: false },
  { brand: 'Organic Tattva', name: 'Organic Tattva Whole Grain Rolled Oats High Fibre (1 kg)', price: 220, mrp: 280, weight: '1 kg', type: 'Organic Oats', diet: '100% Certified Organic', shelf: '12 Months', featured: false, best: false },
  { brand: 'Dabur', name: 'Dabur Chyawanprash 2X Immunity Clinically Tested Formula (1 kg)', price: 395, mrp: 460, weight: '1 kg', type: 'Ayurvedic Immunity Booster', diet: '100% Vegetarian Ayurvedic', shelf: '36 Months', featured: false, best: true },
  { brand: 'Tata Tea', name: 'Tata Tea Gold Rich Taste with Gently Rolled Long Leaf (1 kg)', price: 510, mrp: 620, weight: '1 kg', type: 'Premium CTC Leaf Tea', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: true },
  { brand: 'Everest', name: 'Everest Royal Rajma Masala Traditional Punjabi Blend (100g)', price: 79, mrp: 90, weight: '100 g', type: 'Blended Spices', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Catch', name: 'Catch Turmeric Powder Haldi High Curcumin Content (500g Pouch)', price: 135, mrp: 165, weight: '500 g', type: 'Pure Ground Spices', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Aashirvaad', name: 'Aashirvaad Multigrain Atta with 6 Natural Grains (5 kg)', price: 325, mrp: 375, weight: '5 kg', type: 'Multigrain Flour', diet: 'High Fibre Vegetarian', shelf: '6 Months', featured: false, best: true },
  { brand: 'Fortune', name: 'Fortune Soya Health Refined Soyabean Oil Rich in Omega-3 (1 Litre)', price: 125, mrp: 155, weight: '1 Litre', type: 'Soyabean Cooking Oil', diet: '100% Vegetarian', shelf: '9 Months', featured: false, best: false },
  { brand: 'Tata Sampann', name: 'Tata Sampann Organic Moong Dal Chilka (1 kg)', price: 170, mrp: 215, weight: '1 kg', type: 'Organic Pulses', diet: '100% Organic Unpolished', shelf: '12 Months', featured: false, best: false },
  { brand: 'India Gate', name: 'India Gate Super Daily Premium Long Grain Basmati Rice (10 kg)', price: 1299, mrp: 1750, weight: '10 kg', type: 'Aged Basmati Rice', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: true },
  { brand: 'Daawat', name: 'Daawat Super Basmati Rice with Extraordinary Grain Length (5 kg)', price: 799, mrp: 1050, weight: '5 kg', type: 'Aged Basmati Rice', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: true },
  { brand: 'Brooke Bond', name: 'Brooke Bond Taj Mahal Rich Loose Leaf Black Tea (500g Jar)', price: 349, mrp: 410, weight: '500 g', type: 'Gourmet Tea Leaf', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Nescafe', name: 'Nescafe Gold Premium Rich & Smooth Freeze Dried Instant Coffee (100g)', price: 549, mrp: 650, weight: '100 g', type: 'Gourmet Instant Coffee', diet: '100% Arabica Blend', shelf: '24 Months', featured: false, best: true },
  { brand: "Kellogg's", name: "Kellogg's Muesli 0% Added Sugar with 21% Fruits Nuts & Seeds (750g)", price: 395, mrp: 475, weight: '750 g', type: 'Healthy Breakfast Muesli', diet: '100% Vegetarian', shelf: '9 Months', featured: false, best: false },
  { brand: 'Dabur', name: 'Dabur Hommade Ginger Garlic Paste Traditional Granular Texture (200g)', price: 55, mrp: 65, weight: '200 g', type: 'Culinary Paste', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Everest', name: 'Everest Sambhar Masala South Indian Authentic Recipe (100g)', price: 75, mrp: 85, weight: '100 g', type: 'Traditional Spice Mix', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Catch', name: 'Catch Coriander Powder Dhaniya Powder Fresh Green Aroma (500g)', price: 140, mrp: 170, weight: '500 g', type: 'Pure Ground Spices', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Tata Sampann', name: 'Tata Sampann Kabuli Chana Chickpeas High Protein Grade-A (1 kg)', price: 185, mrp: 225, weight: '1 kg', type: 'Whole Pulses', diet: '100% Vegetarian Unpolished', shelf: '12 Months', featured: false, best: false },
  { brand: 'Organic Tattva', name: 'Organic Tattva Certified Organic Jaggery Powder Shakkar (1 kg)', price: 115, mrp: 145, weight: '1 kg', type: 'Organic Sweetener', diet: '100% Organic Unrefined', shelf: '12 Months', featured: false, best: true },
  { brand: 'Saffola', name: 'Saffola Active Pro Weight Watchers Cooking Edible Oil (5 Litre Can)', price: 825, mrp: 995, weight: '5 Litres', type: 'Heart Healthy Edible Oil', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Aashirvaad', name: 'Aashirvaad Nature’s Superfoods Gluten Free Flour Millet Atta (1 kg)', price: 135, mrp: 160, weight: '1 kg', type: 'Gluten-Free Millet Flour', diet: '100% Gluten Free', shelf: '6 Months', featured: false, best: false },
  { brand: 'Fortune', name: 'Fortune Chakki Fresh Pure Whole Wheat Atta Soft Rotis (10 kg)', price: 395, mrp: 460, weight: '10 kg', type: 'Chakki Whole Wheat Atta', diet: '100% Vegetarian', shelf: '6 Months', featured: false, best: true },
  { brand: "Haldiram's", name: "Haldiram's Classic Salted Kaju Cashew Nuts Roasted Premium (200g)", price: 299, mrp: 380, weight: '200 g', type: 'Dry Fruits & Nuts', diet: '100% Vegetarian', shelf: '6 Months', featured: false, best: false },
  { brand: 'Bikaji', name: 'Bikaji Tana-Tan Spicy Masala Aloo Bhujia Namkeen (1 kg)', price: 240, mrp: 290, weight: '1 kg', type: 'Spiced Potato Bhujia', diet: '100% Vegetarian', shelf: '6 Months', featured: false, best: false },
  { brand: '24 Mantra Organic', name: '24 Mantra Organic Raw Wild Honey Unprocessed & Unheated (500g)', price: 320, mrp: 390, weight: '500 g', type: 'Organic Honey', diet: '100% Certified Organic', shelf: '18 Months', featured: false, best: false },
  { brand: 'MDH', name: 'MDH Deggi Mirch Natural Red Colour Mild Chilli Powder (100g)', price: 92, mrp: 105, weight: '100 g', type: 'Pure Chilli Powder', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Tata Salt', name: 'Tata Salt Lite Low Sodium Iodized Salt for BP Control (1 kg)', price: 42, mrp: 48, weight: '1 kg', type: 'Low Sodium Salt', diet: '100% Vegetarian', shelf: '24 Months', featured: false, best: false },
  { brand: 'Maggi', name: 'Maggi Rich Tomato Ketchup Pitchkari Squeezy Bottle (1 kg)', price: 130, mrp: 160, weight: '1 kg', type: 'Tomato Sauce Ketchup', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: false },
  { brand: 'Everest', name: 'Everest Pav Bhaji Masala Mumbai Street Style Spice Blend (100g)', price: 82, mrp: 95, weight: '100 g', type: 'Blended Spices', diet: '100% Vegetarian', shelf: '12 Months', featured: false, best: true },
]

export const generateGroceries = (categoryId) => {
  return groceryTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-GRO-${num}`
    const slug = `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${sku.toLowerCase()}`
    const img1 = imgs[index % imgs.length]
    const img2 = imgs[(index + 3) % imgs.length]

    return {
      name: item.name,
      slug,
      sku,
      brand: item.brand,
      category: categoryId,
      price: item.price,
      originalPrice: item.mrp,
      stock: 40 + ((index * 9) % 150),
      rating: +(4.2 + ((index * 2) % 8) * 0.1).toFixed(1),
      reviewCount: 70 + ((index * 113) % 4500),
      images: [img1, img2],
      highlights: [
        `Category: ${item.type}`,
        `Net Quantity / Weight: ${item.weight}`,
        `Dietary Preference: ${item.diet}`,
        `Shelf Life: ${item.shelf}`,
        'FSSAI Certified Food Grade Safety',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Product Type', value: item.type },
        { group: 'Packaging & Weight', name: 'Net Quantity', value: item.weight },
        { group: 'Quality & Dietary', name: 'Dietary Preference', value: item.diet },
        { group: 'Storage & Expiry', name: 'Shelf Life', value: item.shelf },
        { group: 'Standards', name: 'Certification', value: '100% Food Safety & FSSAI Compliant' },
      ],
      warranty: 'Freshness Guaranteed or 100% Replacement',
      tags: ['groceries', 'daily essentials', 'food', item.brand.toLowerCase(), item.type.toLowerCase(), 'kitchen staple'],
      description: `Stock up your household with ${item.name}. Carefully sourced, cleaned, and packed to preserve maximum natural nutrition, taste, and freshness for everyday wholesome meals.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
