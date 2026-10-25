import { imagePools } from '../productData.js'

const imgs = imagePools.freshMarket

const freshMarketTemplates = [
  { brand: 'Farm Direct', name: 'Fresh Ratnagiri Alphonso Mangoes (1 Dozen)', price: 799, mrp: 1199, weight: '12 Pcs (approx 3 kg)', origin: 'Ratnagiri, Maharashtra', shelf: '5-7 Days', organic: '100% Naturally Ripened Carbide Free', featured: true, best: true },
  { brand: 'Nature Best', name: 'Kashmir Royal Red Delicious Apples (1 kg)', price: 199, mrp: 260, weight: '1 kg (4-5 pcs)', origin: 'Kashmir Valley', shelf: '7-10 Days Refrigerated', organic: 'Wax Free Hand-Picked', featured: true, best: true },
  { brand: 'Farm Fresh', name: 'Fresh Robusta Golden Bananas (1 kg)', price: 49, mrp: 75, weight: '1 kg (6-8 pcs)', origin: 'Jalgaon, Maharashtra', shelf: '3-4 Days', organic: 'Farm Fresh Natural', featured: false, best: true },
  { brand: 'Organic India', name: 'Hydroponic Tender Baby Spinach / Palak (250 g)', price: 39, mrp: 60, weight: '250 g', origin: 'Local Polyhouse Farm', shelf: '3-4 Days', organic: 'Pesticide-Free Hydroponic', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Fresh Hybrid Red Tomatoes (1 kg)', price: 35, mrp: 55, weight: '1 kg', origin: 'Kolar, Karnataka', shelf: '5-6 Days', organic: 'Firm & Juicy Salad Grade', featured: false, best: true },
  { brand: 'Nature Best', name: 'Fresh Button White Mushrooms (200 g Pack)', price: 55, mrp: 80, weight: '200 g Tray', origin: 'Ooty, Tamil Nadu', shelf: '3-5 Days', organic: 'Hygienically Packed', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Imported Hass Avocados (Pack of 2)', price: 249, mrp: 350, weight: 'Pack of 2 (approx 400 g)', origin: 'New Zealand / Peru', shelf: '4-5 Days', organic: 'Rich in Healthy Fats', featured: true, best: false },
  { brand: 'Berry Good', name: 'Mahabaleshwar Fresh Sweet Strawberries (200 g Box)', price: 129, mrp: 180, weight: '200 g Punnet', origin: 'Mahabaleshwar', shelf: '3 Days Refrigerated', organic: 'Grade A Sweet Berries', featured: true, best: true },
  { brand: 'Nature Best', name: 'Green Crunchy Broccoli (1 Piece, 400-500g)', price: 69, mrp: 110, weight: '1 Piece (approx 450 g)', origin: 'Nilgiris Polyhouse', shelf: '5 Days', organic: 'High Vitamin C & K', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Nagpur Sweet Juicy Oranges / Santra (1 kg)', price: 89, mrp: 130, weight: '1 kg (5-6 pcs)', origin: 'Nagpur, Maharashtra', shelf: '6-8 Days', organic: 'Naturally Sweet & Pulpy', featured: false, best: true },
  { brand: 'Farm Direct', name: 'Fresh Pomegranate / Anar Pearls & Whole (1 kg)', price: 179, mrp: 240, weight: '1 kg (3-4 pcs)', origin: 'Solapur, Maharashtra', shelf: '7 Days', organic: 'Ruby Red Juicy Seeds', featured: true, best: true },
  { brand: 'Organic Oasis', name: 'Fresh Seedless Green Grapes (500 g Box)', price: 79, mrp: 120, weight: '500 g', origin: 'Nashik, Maharashtra', shelf: '4-5 Days', organic: 'Crispy Sweet Table Grapes', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Tender Green Coconut / Nariyal Pani (Pack of 2)', price: 119, mrp: 160, weight: '2 Pieces (approx 600ml water)', origin: 'Pollachi, Tamil Nadu', shelf: '4-6 Days', organic: 'Sweet Natural Electrolytes', featured: false, best: true },
  { brand: 'Nature Best', name: 'Fresh English Seedless Cucumbers (500 g)', price: 35, mrp: 50, weight: '500 g (2-3 pcs)', origin: 'Hydroponic Greenhouse', shelf: '5 Days', organic: 'Zero Bitter Crunchy', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Red Crunchy Bell Peppers / Capsicum (Pack of 2)', price: 89, mrp: 140, weight: 'Pack of 2 (approx 350 g)', origin: 'Polyhouse Farm', shelf: '6 Days', organic: 'Crisp Salad Grade', featured: false, best: false },
  { brand: 'Berry Good', name: 'Fresh Imported Blueberries (125 g Punnet)', price: 299, mrp: 420, weight: '125 g', origin: 'Chile / USA', shelf: '5 Days Refrigerated', organic: 'Super Antioxidant Rich', featured: true, best: false },
  { brand: 'Nature Best', name: 'Zespri SunGold Sweet Yellow Kiwi (Pack of 3)', price: 199, mrp: 280, weight: '3 Pieces', origin: 'New Zealand', shelf: '6-8 Days', organic: 'Ultra Sweet Vitamin C Gold', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Fresh Mosambi / Sweet Lime (1 kg)', price: 79, mrp: 110, weight: '1 kg (5-6 pcs)', origin: 'Andhra Pradesh', shelf: '6-7 Days', organic: 'Juicy Citrus Refreshment', featured: false, best: false },
  { brand: 'Organic India', name: 'Fresh Coriander / Dhaniya Leaves (100 g Bunch)', price: 15, mrp: 25, weight: '100 g Bunch', origin: 'Local Farm Fresh', shelf: '3-4 Days', organic: 'Aromatic & Soil Cleaned', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Fresh Green Mint / Pudina Leaves (100 g Bunch)', price: 15, mrp: 25, weight: '100 g Bunch', origin: 'Hydroponic Farm', shelf: '3-4 Days', organic: 'Refreshing Strong Aroma', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Papaya / Papita Semi-Ripe (1 Piece, 1-1.2kg)', price: 59, mrp: 90, weight: '1 Piece (approx 1.1 kg)', origin: 'Karnataka', shelf: '4-5 Days', organic: 'Sweet Honey Red Pulp', featured: false, best: false },
  { brand: 'Nature Best', name: 'Washington Imported Gala Apples (1 kg)', price: 229, mrp: 310, weight: '1 kg (4-5 pcs)', origin: 'Washington, USA', shelf: '10 Days', organic: 'Crisp Juicy Red Striped', featured: false, best: false },
  { brand: 'Organic Oasis', name: 'Fresh Sweet Corn Cobs (Pack of 2)', price: 45, mrp: 70, weight: '2 Pieces (Vacuum Packed)', origin: 'Maharashtra', shelf: '5-7 Days', organic: 'Juicy Golden Kernels', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Tender French Green Beans (250 g)', price: 29, mrp: 45, weight: '250 g', origin: 'Ooty Hills', shelf: '4 Days', organic: 'Stringless Tender Beans', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Cauliflower / Gobi (1 Whole Piece, 500-700g)', price: 39, mrp: 60, weight: '1 Piece (approx 600 g)', origin: 'Local Farms', shelf: '5 Days', organic: 'Snow White Tight Curds', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Green Cabbage / Patta Gobi (1 Whole Piece, 500g)', price: 25, mrp: 40, weight: '1 Piece (approx 500 g)', origin: 'Pune Farms', shelf: '7 Days', organic: 'Crisp Crunchy Leaves', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Ooty Baby Carrots (500 g)', price: 49, mrp: 75, weight: '500 g', origin: 'Ooty Hills', shelf: '6-8 Days', organic: 'Sweet Red Crunchy Carrots', featured: false, best: true },
  { brand: 'Organic Oasis', name: 'Fresh Lady Finger / Bhindi / Okra (500 g)', price: 39, mrp: 60, weight: '500 g', origin: 'Gujarat Farms', shelf: '4 Days', organic: 'Tender & Fresh Green', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Green Bottle Gourd / Lauki (1 Piece, 600g)', price: 35, mrp: 50, weight: '1 Piece (approx 600 g)', origin: 'Local Organic Farm', shelf: '5 Days', organic: 'Light Green Seedless Core', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Bitter Gourd / Karela (500 g)', price: 39, mrp: 55, weight: '500 g', origin: 'Madhya Pradesh', shelf: '5-6 Days', organic: 'Crisp Prickly Green', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Beetroot (500 g)', price: 29, mrp: 45, weight: '500 g (3-4 pcs)', origin: 'Karnataka', shelf: '8-10 Days', organic: 'Deep Crimson Nutrient Dense', featured: false, best: false },
  { brand: 'Organic India', name: 'Fresh Methi / Fenugreek Leaves (250 g Bunch)', price: 25, mrp: 40, weight: '250 g Bunch', origin: 'Local Farms', shelf: '3 Days', organic: 'Tender Green Leaves', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Ginger / Adrak (250 g)', price: 45, mrp: 70, weight: '250 g', origin: 'Wayanad, Kerala', shelf: '14 Days', organic: 'Spicy Juicy Fiber-Rich', featured: false, best: true },
  { brand: 'Farm Direct', name: 'Fresh Garlic / Lahsun Whole Bulbs (250 g)', price: 65, mrp: 95, weight: '250 g', origin: 'Madhya Pradesh', shelf: '20 Days', organic: 'Pungent Tight Cloves', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Lemon / Nimbu (Pack of 6 pcs)', price: 35, mrp: 55, weight: '6 Pieces (approx 250 g)', origin: 'Tenali, Andhra Pradesh', shelf: '10 Days', organic: 'Juicy Thin Skinned', featured: false, best: true },
  { brand: 'Farm Fresh', name: 'Fresh Green Chillies / Hari Mirch (100 g)', price: 15, mrp: 25, weight: '100 g', origin: 'Guntur, Andhra Pradesh', shelf: '7 Days', organic: 'Fiery Spicy Flavor', featured: false, best: false },
  { brand: 'Berry Good', name: 'Fresh Imported Black Grapes (500 g)', price: 119, mrp: 170, weight: '500 g Box', origin: 'Nashik Valley', shelf: '5 Days', organic: 'Seedless Sweet Black Pearls', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Guava / Amrud (1 kg / 4-5 pcs)', price: 69, mrp: 105, weight: '1 kg', origin: 'Allahabad, UP', shelf: '4-5 Days', organic: 'Crispy Sweet White Core', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Watermelon / Tarbooj (1 Piece, 2.5-3kg)', price: 99, mrp: 150, weight: '1 Piece (approx 2.8 kg)', origin: 'Karnataka', shelf: '6 Days', organic: 'Deep Red Sweet & Hydrating', featured: false, best: true },
  { brand: 'Organic Oasis', name: 'Fresh Musk Melon / Kharbooja (1 Piece, 800g-1kg)', price: 69, mrp: 100, weight: '1 Piece (approx 900 g)', origin: 'Andhra Pradesh', shelf: '5 Days', organic: 'Aromatic Honey Sweet Flesh', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Pineapple / Ananas (1 Whole Piece, 1kg)', price: 79, mrp: 120, weight: '1 Piece (approx 1 kg)', origin: 'Vazhakulam, Kerala', shelf: '5-7 Days', organic: 'GI Tagged Sweet Pineapple', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Dragon Fruit / Pitaya (Pack of 2 pcs)', price: 179, mrp: 260, weight: '2 Pieces (approx 600 g)', origin: 'Gujarat / Vietnam', shelf: '6-8 Days', organic: 'Exotic Red Pulp with Seeds', featured: true, best: false },
  { brand: 'Farm Direct', name: 'Fresh Custard Apple / Sitaphal (1 kg)', price: 149, mrp: 210, weight: '1 kg (4-5 pcs)', origin: 'Daulatabad, Maharashtra', shelf: '3-4 Days', organic: 'Creamy Sweet Pulp', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Green Peas / Matar Pods (500 g)', price: 59, mrp: 90, weight: '500 g', origin: 'Himachal Pradesh', shelf: '5 Days', organic: 'Sweet Plump Tender Peas', featured: false, best: true },
  { brand: 'Organic India', name: 'Hydroponic Cherry Tomatoes (200 g Punnet)', price: 69, mrp: 110, weight: '200 g Punnet', origin: 'Polyhouse Hydroponic', shelf: '6 Days', organic: 'Bite-Sized Sweet Candy Red', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Red Radish / Mooli (500 g)', price: 29, mrp: 45, weight: '500 g Bunch', origin: 'Local Organic Farm', shelf: '5 Days', organic: 'Crisp Peppery White Flesh', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Spring Onions with Bulbs (250 g)', price: 29, mrp: 45, weight: '250 g Bunch', origin: 'Polyhouse Farm', shelf: '4 Days', organic: 'Crisp Green Stalks', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Sweet Sweet Potato / Shakarkand (1 kg)', price: 59, mrp: 85, weight: '1 kg', origin: 'Karnataka', shelf: '10 Days', organic: 'Fiber Rich Purple Skin', featured: false, best: false },
  { brand: 'Organic Oasis', name: 'Fresh Ash Gourd / Petha Kaddu (Cut Piece, 500g)', price: 35, mrp: 50, weight: '500 g Cut Piece', origin: 'Kerala Farms', shelf: '5 Days', organic: 'Alkaline Detox Vegetable', featured: false, best: false },
  { brand: 'Farm Fresh', name: 'Fresh Drumsticks / Moringa (Pack of 4 pcs)', price: 39, mrp: 60, weight: '4 Pieces (approx 250 g)', origin: 'Tamil Nadu', shelf: '5-6 Days', organic: 'Nutrient Powerhouse', featured: false, best: false },
  { brand: 'Nature Best', name: 'Fresh Raw Mango for Pickles / Curry (500 g)', price: 49, mrp: 75, weight: '500 g (2 pcs)', origin: 'Konkan Coast', shelf: '7 Days', organic: 'Tangy Firm Raw Mango', featured: false, best: false },
  { brand: 'Farm Direct', name: 'Fresh Figs / Anjeer (Pack of 6 pcs, 250g)', price: 129, mrp: 190, weight: '250 g Tray', origin: 'Saswad, Maharashtra', shelf: '3 Days', organic: 'Naturally Honey Sweet Figs', featured: false, best: false },
]

export const generateFreshMarket = (categoryId) => {
  return freshMarketTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-FRSH-${num}`
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
      stock: 15 + ((index * 5) % 60),
      rating: +(4.3 + ((index * 3) % 7) * 0.1).toFixed(1),
      reviewCount: 45 + ((index * 37) % 1200),
      images: [img1, img2],
      highlights: [
        `Net Quantity: ${item.weight}`,
        `Farm Origin: ${item.origin}`,
        `Freshness Shelf Life: ${item.shelf}`,
        item.organic,
        'Direct from verified farm-gate with zero chemical waxing',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Quantity / Weight', value: item.weight },
        { group: 'Origin & Quality', name: 'Origin', value: item.origin },
        { group: 'Storage', name: 'Expected Shelf Life', value: item.shelf },
        { group: 'Certification', name: 'Quality Guarantee', value: item.organic },
      ],
      warranty: '100% Quality & Freshness Guarantee upon delivery or immediate refund',
      tags: ['fresh', 'fruits', 'vegetables', 'fresh market', 'farm', 'organic', 'grocery'],
      description: `Harvested at peak ripeness, ${item.name} arrives clean, nutrient-dense, and bursting with authentic farm flavor. Sourced directly from ${item.origin}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
