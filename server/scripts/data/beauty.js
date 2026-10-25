import { imagePools } from '../productData.js'

const imgs = imagePools.beauty

const beautyTemplates = [
  { brand: 'Minimalist', name: 'Minimalist 10% Niacinamide Face Serum with Zinc for Acne Marks (30 ml)', price: 569, mrp: 599, vol: '30 ml', type: 'Face Serum', skin: 'All Skin Types / Acne Prone', form: 'Lightweight Fragrance-Free Liquid', featured: true, best: true },
  { brand: 'The Derma Co', name: 'The Derma Co 1% Hyaluronic Sunscreen Aqua Gel with SPF 50 & PA++++ (50g)', price: 449, mrp: 499, vol: '50 g', type: 'Sunscreen Gel', skin: 'All Skin Types / Oily & Sensitive', form: 'Broad Spectrum Blue Light Protection', featured: true, best: true },
  { brand: 'Mamaearth', name: 'Mamaearth Onion Hair Oil with Redensyl for Hair Fall Control (250 ml)', price: 539, mrp: 599, vol: '250 ml', type: 'Hair Growth Oil', skin: 'All Hair Types', form: 'Paraben & Silicone Free Cold Pressed', featured: true, best: true },
  { brand: 'Biotique', name: 'Biotique Morning Nectar Flawless Skin Moisturizer Lotion (190 ml)', price: 199, mrp: 280, vol: '190 ml', type: 'Body & Face Lotion', skin: 'Normal to Dry Skin', form: '100% Botanical Ayurvedic Extracts', featured: false, best: true },
  { brand: 'Forest Essentials', name: 'Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200 ml)', price: 1575, mrp: 1695, vol: '200 ml', type: 'Luxury Face Wash', skin: 'All Skin Types', form: 'Pure Steam Distilled Rose & Saffron', featured: true, best: false },
  { brand: 'Plum', name: 'Plum 15% Vitamin C Face Serum with Mandarin for Glowing Skin (20 ml)', price: 675, mrp: 790, vol: '20 ml', type: 'Vitamin C Serum', skin: 'Dull Skin / Hyperpigmentation', form: '100% Vegan & Cruelty Free', featured: false, best: true },
  { brand: 'WOW Skin Science', name: 'WOW Skin Science Apple Cider Vinegar Foaming Face Wash with Brush (150 ml)', price: 349, mrp: 499, vol: '150 ml', type: 'Foaming Face Wash', skin: 'Oily & Acne Prone Skin', form: 'Built-in Silicone Bristle Cleanser', featured: false, best: true },
  { brand: 'Lakme', name: 'Lakme Eyeconic Smudge-Proof Waterproof Kajal (0.35g Deep Black)', price: 195, mrp: 260, vol: '0.35 g', type: 'Kajal Pencil', skin: 'Ophthalmologically Tested', form: '24 Hour Long Lasting Matte Finish', featured: true, best: true },
  { brand: 'Maybelline New York', name: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick (Pioneer 5ml)', price: 549, mrp: 699, vol: '5 ml', type: 'Liquid Matte Lipstick', skin: 'All Lips', form: '16 Hour Non-Transfer Waterproof', featured: true, best: true },
  { brand: "L'Oreal Paris", name: "L'Oreal Paris Extraordinary Oil Hair Serum with 6 Rare Flower Oils (100 ml)", price: 499, mrp: 649, vol: '100 ml', type: 'Hair Serum', skin: 'Dry & Frizzy Hair', form: 'Non-Greasy Instant Gloss Finish', featured: true, best: true },
  { brand: 'mCaffeine', name: 'mCaffeine Naked & Raw Coffee Body Scrub with Coconut Oil (100g Jar)', price: 399, mrp: 449, vol: '100 g', type: 'Exfoliating Body Scrub', skin: 'All Skin Types / De-Tan', form: 'Pure Arabica Coffee Granules', featured: false, best: true },
  { brand: 'Dot & Key', name: 'Dot & Key Barrier Repair Ceramides & Hyaluronic Hydrating Face Cream (100g)', price: 425, mrp: 495, vol: '100 g', type: 'Moisturizer Cream', skin: 'Dry & Damaged Barrier Skin', form: 'Ceramides 3, 6, 1 & Japanese Rice Water', featured: false, best: true },
  { brand: 'Kama Ayurveda', name: 'Kama Ayurveda Pure Rose Water Face Mist Hydrating Toner (200 ml)', price: 1450, mrp: 1595, vol: '200 ml', type: 'Facial Toner Mist', skin: 'All Skin Types', form: '100% Steam Distilled Kannauj Roses', featured: true, best: false },
  { brand: 'Nivea', name: 'Nivea Men Dark Spot Reduction Deep Clean Face Wash (100g)', price: 185, mrp: 249, vol: '100 g', type: "Men's Face Wash", skin: "Men's Oily Skin", form: 'Active Vitamin Complex with 10X Glow', featured: false, best: true },
  { brand: 'Khadi Natural', name: 'Khadi Natural Amla & Bhringraj Ayurvedic Herbal Hair Cleanser Shampoo (210 ml)', price: 175, mrp: 225, vol: '210 ml', type: 'Herbal Shampoo', skin: 'All Scalp Types', form: 'SLS and Paraben Free Handcrafted', featured: false, best: false },
  { brand: 'Minimalist', name: 'Minimalist 2% Salicylic Acid Face Serum for Blackheads & Open Pores (30 ml)', price: 549, mrp: 599, vol: '30 ml', type: 'Exfoliating Serum', skin: 'Oily & Acne Prone Skin', form: 'Aloe Vera Base BHA Solution', featured: false, best: true },
  { brand: 'The Derma Co', name: 'The Derma Co 2% Kojic Acid Face Cream with L-Ascorbic Acid (30g)', price: 449, mrp: 499, vol: '30 g', type: 'Pigmentation Cream', skin: 'Dark Spots & Pigmentation', form: 'Dermatologically Designed Formulation', featured: false, best: false },
  { brand: 'Mamaearth', name: 'Mamaearth Ubtan Natural Face Wash with Turmeric & Saffron (150 ml)', price: 349, mrp: 399, vol: '150 ml', type: 'De-Tan Face Wash', skin: 'All Skin Types', form: 'Natural Walnut Shell Exfoliator', featured: false, best: true },
  { brand: 'Plum', name: 'Plum Green Tea Renewed Clarity Night Gel with Glycolic Acid (50 ml)', price: 499, mrp: 575, vol: '50 ml', type: 'Night Gel Cream', skin: 'Oily & Acne-Prone Skin', form: 'Ultra-Light Hydrating Gel Base', featured: false, best: false },
  { brand: 'Biotique', name: 'Biotique Bio Kelp Protein Shampoo for Falling Hair Intensive Treatment (340 ml)', price: 249, mrp: 330, vol: '340 ml', type: 'Anti Hair Fall Shampoo', skin: 'All Hair Types', form: 'Ayurvedic Kelp & Natural Peppermint', featured: false, best: false },
  { brand: 'Garnier', name: 'Garnier Skin Naturals Micellar Cleansing Water All-in-1 Remover (400 ml)', price: 349, mrp: 425, vol: '400 ml', type: 'Micellar Water', skin: 'Sensitive Skin Friendly', form: 'Magnetic Micelles No-Rinse Cleanser', featured: false, best: true },
  { brand: 'Maybelline New York', name: 'Maybelline New York Colossal Waterproof Mascara for Dramatic Volume (9.2ml)', price: 399, mrp: 499, vol: '9.2 ml', type: 'Volumizing Mascara', skin: 'Contact Lens Safe', form: 'Colossal Mega Brush 2X Volume', featured: false, best: true },
  { brand: 'Lakme', name: 'Lakme 9 to 5 Complexion Care CC Face Cream SPF 30 (Honey 30g)', price: 299, mrp: 375, vol: '30 g', type: 'CC Cream Foundation', skin: 'Medium Wheatish Indian Tones', form: 'SPF 30 Daily Skin Tint & Concealer', featured: false, best: true },
  { brand: "L'Oreal Paris", name: "L'Oreal Paris Revitalift 1.5% Hyaluronic Acid Anti-Aging Serum (30 ml)", price: 799, mrp: 999, vol: '30 ml', type: 'Hydrating Face Serum', skin: 'Dehydrated Skin', form: 'Micro & Macro Hyaluronic Duo', featured: true, best: true },
  { brand: 'Forest Essentials', name: 'Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)', price: 4800, mrp: 5200, vol: '50 g', type: 'Luxury 24K Gold Cream', skin: 'All Skin Types Mature Skin', form: 'Ayurvedic Herbs Infused 24 Karat Gold Bhasma', featured: true, best: false },
  { brand: 'Dot & Key', name: 'Dot & Key Watermelon Cooling Sunscreen Matte Fluid SPF 50+ PA++++ (50g)', price: 425, mrp: 495, vol: '50 g', type: 'Matte Sunscreen', skin: 'Oily Skin No White Cast', form: 'Cooling Watermelon & Hyaluronic Fluid', featured: false, best: true },
  { brand: 'mCaffeine', name: 'mCaffeine Espresso Deep Exfoliating Coffee Face Wash with Walnut (100 ml)', price: 299, mrp: 349, vol: '100 ml', type: 'Face Wash Scrub', skin: 'Normal to Oily Skin', form: 'Pure Coffee Aroma & Natural Antioxidants', featured: false, best: false },
  { brand: 'Nivea', name: 'Nivea Nourishing Body Milk with Deep Moisture Serum & Almond Oil (400 ml)', price: 349, mrp: 475, vol: '400 ml', type: 'Body Lotion Milk', skin: 'Very Dry Skin', form: '48 Hour Intense Hydration Lock', featured: false, best: true },
  { brand: 'Khadi Natural', name: 'Khadi Natural Sandalwood & Honey Body Wash Herbal Shower Gel (210 ml)', price: 185, mrp: 240, vol: '210 ml', type: 'Herbal Body Wash', skin: 'All Skin Types', form: 'Pure Sandalwood Extract & Wild Honey', featured: false, best: false },
  { brand: 'Minimalist', name: 'Minimalist PHA 3% + Biotic Alcohol-Free Hydrating Face Toner (150 ml)', price: 379, mrp: 399, vol: '150 ml', type: 'Exfoliating Toner', skin: 'Sensitive & Dry Skin', form: 'Prebiotics & Polyhydroxy Gentle Exfoliation', featured: false, best: false },
  { brand: 'The Derma Co', name: 'The Derma Co 10% Vitamin C Face Serum for Radiance & Dark Spot Reduction (30ml)', price: 599, mrp: 699, vol: '30 ml', type: 'Vitamin C Serum', skin: 'Dull & Pigmented Skin', form: '3-O-Ethyl Ascorbic Acid Active Form', featured: false, best: false },
  { brand: 'Mamaearth', name: 'Mamaearth Tea Tree Anti-Dandruff Hair Shampoo with Ginger Oil (250 ml)', price: 315, mrp: 349, vol: '250 ml', type: 'Anti-Dandruff Shampoo', skin: 'Dandruff Scalp', form: 'Sulfate-Free Tea Tree Oil & Vitamin E', featured: false, best: false },
  { brand: 'Plum', name: 'Plum BodyLovin Hawaiian Rumba Long Lasting Body Mist Perfume (150 ml)', price: 445, mrp: 525, vol: '150 ml', type: 'Body Mist Cologne', skin: 'All Skin Types', form: 'Tropical Vanilla & Passionfruit Notes', featured: false, best: true },
  { brand: 'WOW Skin Science', name: 'WOW Skin Science Red Onion Black Seed Oil Shampoo with Redensyl (300 ml)', price: 349, mrp: 499, vol: '300 ml', type: 'Anti Hair Fall Shampoo', skin: 'Thin & Weak Hair', form: 'Holistic Onion Extract & Vitamin B5', featured: false, best: false },
  { brand: 'Lakme', name: 'Lakme Forever Matte Liquid Lip Color (Nude Myth 5.6ml)', price: 295, mrp: 350, vol: '5.6 ml', type: 'Matte Liquid Lip Color', skin: 'Comfortable Lip Wear', form: 'Intense Pigment 16H Stay Lightweight', featured: false, best: false },
  { brand: 'Maybelline New York', name: 'Maybelline New York Fit Me Matte + Poreless Liquid Foundation (128 Warm Nude 30ml)', price: 549, mrp: 699, vol: '30 ml', type: 'Liquid Foundation', skin: 'Normal to Oily Skin', form: 'Micro-Powders Clay Oil Control SPF 22', featured: true, best: true },
  { brand: "L'Oreal Paris", name: "L'Oreal Paris Casting Creme Gloss Ammonia-Free Hair Color (Dark Brown 300)", price: 525, mrp: 650, vol: '1 Application Kit', type: 'Ammonia-Free Hair Color', skin: '100% Grey Coverage', form: 'Royal Jelly Enriched Gloss & Shine', featured: false, best: true },
  { brand: 'Biotique', name: 'Biotique Bio Dandelion Visibly Ageless Botanical Serum (40 ml)', price: 210, mrp: 290, vol: '40 ml', type: 'Anti-Aging Serum', skin: 'All Skin Types', form: 'Bihidana & Pure Dandelion Herbal Elixir', featured: false, best: false },
  { brand: 'Forest Essentials', name: 'Forest Essentials Tejasvi Emulsion Nourishing Day Radiance Balm (30g)', price: 2475, mrp: 2650, vol: '30 g', type: 'Ayurvedic Beauty Balm', skin: 'Dry to Normal Skin', form: 'Cow Ghee & Saffron Restorative Formula', featured: false, best: false },
  { brand: 'Dot & Key', name: 'Dot & Key 10% Vitamin C + E Super Bright Face Sunscreen SPF 50+ (50g)', price: 445, mrp: 495, vol: '50 g', type: 'Brightening Sunscreen', skin: 'Dull Skin', form: 'Kakadu Plum & Blood Orange Active Duo', featured: false, best: false },
  { brand: 'mCaffeine', name: 'mCaffeine Coffee Under Eye Cream with Hyaluronic Acid for Dark Circles (30 ml)', price: 475, mrp: 549, vol: '30 ml', type: 'Under Eye Cream', skin: 'Dark Circles & Puffy Eyes', form: 'Pure Arabica Coffee & Water Lily Actives', featured: false, best: true },
  { brand: 'Nivea', name: 'Nivea Soft Light Moisturizing Cream with Vitamin E & Jojoba Oil (300 ml)', price: 349, mrp: 475, vol: '300 ml', type: 'Light Moisturizer Cream', skin: 'All Skin Types Face & Body', form: 'Quick Absorbing Non-Sticky Emulsion', featured: false, best: true },
  { brand: 'Kama Ayurveda', name: 'Kama Ayurveda Bringadi Intensive Hair Treatment Ayurvedic Herbal Oil (100 ml)', price: 995, mrp: 1095, vol: '100 ml', type: 'Hair Treatment Herbal Oil', skin: 'Premature Greying & Thinning', form: 'Traditional Taila Infusion Bhringraj & Amla', featured: false, best: false },
  { brand: 'Minimalist', name: 'Minimalist SPF 50 PA++++ Multi-Vitamin Sunscreen Fluid (50g)', price: 379, mrp: 399, vol: '50 g', type: 'Broad Spectrum Sunscreen', skin: 'All Skin Types Photostable', form: 'Infused with Vitamin A, B, E & F', featured: false, best: true },
  { brand: 'The Derma Co', name: 'The Derma Co 2% Niacinamide Gentle Hydrating Cleanser (125 ml)', price: 319, mrp: 349, vol: '125 ml', type: 'Gentle Hydrating Cleanser', skin: 'Sensitive & Dry Skin', form: 'Soap-Free Ceramides Barrier Support', featured: false, best: false },
  { brand: 'Mamaearth', name: 'Mamaearth Charcoal Face Scrub with Walnut Beads for Blackhead Removal (100g)', price: 315, mrp: 349, vol: '100 g', type: 'Exfoliating Charcoal Scrub', skin: 'Toxified & Polluted Skin', form: 'Activated Charcoal & Tea Tree Antiseptic', featured: false, best: false },
  { brand: 'Plum', name: 'Plum 10% Niacinamide Face Serum with Rice Water & Squalane (30 ml)', price: 699, mrp: 790, vol: '30 ml', type: 'Niacinamide Serum', skin: 'Blemish Prone Skin', form: 'Fermented Rice Water Clear Complexion', featured: false, best: false },
  { brand: 'Garnier', name: 'Garnier Bright Complete 30X Vitamin C Booster Serum (30 ml)', price: 425, mrp: 549, vol: '30 ml', type: 'Brightening Serum', skin: 'Spot Reduction Dull Skin', form: 'Fast Action Japanese Yuzu Lemon Formula', featured: false, best: true },
  { brand: 'Maybelline New York', name: 'Maybelline New York Sensational Liquid Matte Lipstick (Touch of Spice 7ml)', price: 329, mrp: 399, vol: '7 ml', type: 'Matte Liquid Lipstick', skin: 'Velvety Smooth Lips', form: 'Non-Drying Intense Pigment Matte Wear', featured: false, best: false },
  { brand: 'Lakme', name: 'Lakme Absolute Skin Gloss Gel Day Creme with Hyaluronic Acid (50g)', price: 475, mrp: 599, vol: '50 g', type: 'Gloss Gel Day Creme', skin: 'Glass Skin Glow Look', form: 'Mineral Rich Glacial Water Gel', featured: false, best: false },
  { brand: "L'Oreal Paris", name: "L'Oreal Paris Total Repair 5 Restoring Conditioner with Ceramide (175 ml)", price: 199, mrp: 260, vol: '175 ml', type: 'Hair Conditioner', skin: 'Damaged & Split End Hair', form: 'Pro-Keratin & Ceramide 5-in-1 Repair', featured: false, best: false },
  { brand: 'Biotique', name: 'Biotique Bio Papaya Revitalizing Tan Removal Scrub (100g Jar)', price: 175, mrp: 240, vol: '100 g', type: 'Tan Removal Scrub', skin: 'All Skin Types', form: 'Pure Papaya Fruit Enzymes & Fenugreek', featured: false, best: false },
  { brand: 'Khadi Natural', name: 'Khadi Natural Pure Rosewater Herbal Skin Toner Hydro-Distilled (210 ml)', price: 155, mrp: 195, vol: '210 ml', type: 'Herbal Rose Toner', skin: 'Pore Tightening Mist', form: 'Hydro Distilled Kannauj Desi Rose', featured: false, best: false },
  { brand: 'WOW Skin Science', name: 'WOW Skin Science Moroccan Argan Oil Hair Conditioner (300 ml)', price: 349, mrp: 499, vol: '300 ml', type: 'Restorative Hair Conditioner', skin: 'Frizzy & Treated Hair', form: 'Virgin Moroccan Argan Oil & Shea Butter', featured: false, best: false },
  { brand: 'Dot & Key', name: 'Dot & Key Gloss Boss Tinted Strawberry Lip Balm SPF 30 (12g)', price: 210, mrp: 249, vol: '12 g', type: 'Tinted Lip Balm', skin: 'Chapped Lips', form: 'Shea Butter Vitamin C Tinted Gloss SPF 30', featured: false, best: true },
]

export const generateBeauty = (categoryId) => {
  return beautyTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-BEA-${num}`
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
      stock: 25 + ((index * 7) % 110),
      rating: +(4.2 + ((index * 3) % 8) * 0.1).toFixed(1),
      reviewCount: 50 + ((index * 97) % 3800),
      images: [img1, img2],
      highlights: [
        `Product Category: ${item.type}`,
        `Ideal For: ${item.skin}`,
        `Volume / Net Quantity: ${item.vol}`,
        `Formulation: ${item.form}`,
        'Dermatologically Tested & Cruelty-Free',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Product Type', value: item.type },
        { group: 'Application & Skin Type', name: 'Recommended Skin / Hair', value: item.skin },
        { group: 'Volume & Quantity', name: 'Net Content', value: item.vol },
        { group: 'Formulation Details', name: 'Key Formulation', value: item.form },
        { group: 'Safety Standards', name: 'Safety Testing', value: '100% Dermatologically Tested and Certified Safe' },
      ],
      warranty: 'Authentic Sealed Product Guarantee',
      tags: ['beauty', 'personal care', 'skincare', item.brand.toLowerCase(), item.type.toLowerCase(), 'cosmetics'],
      description: `Revitalize your daily grooming and skincare ritual with the ${item.name}. Formulated by ${item.brand} with ${item.form} to nourish, protect, and deliver visible healthy results for ${item.skin}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
