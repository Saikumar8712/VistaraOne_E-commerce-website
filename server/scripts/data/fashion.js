import { imagePools } from '../productData.js'

const imgs = imagePools.fashion

const fashionTemplates = [
  { brand: 'Levi\'s', name: 'Levi\'s Men\'s 511 Slim Fit Stretch Jeans (Dark Indigo)', price: 2199, mrp: 3999, fabric: '99% Cotton, 1% Elastane', fit: 'Slim Fit', gender: 'Men', type: 'Jeans', occ: 'Casual', featured: true, best: true },
  { brand: 'Allen Solly', name: 'Allen Solly Men\'s Regular Fit Solid Polo T-Shirt (Navy Blue)', price: 899, mrp: 1499, fabric: '100% Combed Cotton Pique', fit: 'Regular Fit', gender: 'Men', type: 'Polo T-Shirt', occ: 'Smart Casual', featured: false, best: true },
  { brand: 'Peter England', name: 'Peter England Men\'s Formal Slim Fit Cotton Shirt (Sky Blue)', price: 1199, mrp: 1899, fabric: '100% Breathable Cotton', fit: 'Slim Fit', gender: 'Men', type: 'Formal Shirt', occ: 'Office & Formal', featured: true, best: true },
  { brand: 'FabIndia', name: 'FabIndia Men\'s Handloom Pure Cotton Long Kurta (Mustard Yellow)', price: 1690, mrp: 2290, fabric: '100% Handloom Cotton', fit: 'Straight Comfort Fit', gender: 'Men', type: 'Ethnic Kurta', occ: 'Festive & Traditional', featured: true, best: false },
  { brand: 'Manyavar', name: 'Manyavar Men\'s Jacquard Silk Blend Kurta Churidar Set (Maroon/Gold)', price: 4999, mrp: 6999, fabric: 'Jacquard Silk Blend with Thread Embroidery', fit: 'Tailored Fit', gender: 'Men', type: 'Ethnic Kurta Set', occ: 'Wedding & Celebration', featured: true, best: true },
  { brand: 'Raymond', name: 'Raymond Men\'s Classic Notched Lapel Wool Blend Blazer (Charcoal Grey)', price: 5499, mrp: 7999, fabric: '65% Wool, 35% Polyester Poly-Wool', fit: 'Contemporary Fit', gender: 'Men', type: 'Blazer', occ: 'Formal & Business', featured: false, best: false },
  { brand: 'Van Heusen', name: 'Van Heusen Men\'s Flat Front Formal Trousers (Dark Olive)', price: 1799, mrp: 2499, fabric: 'Polyester-Viscose Stretch Twill', fit: 'Ultra Slim Fit', gender: 'Men', type: 'Trousers', occ: 'Formal', featured: false, best: true },
  { brand: 'Biba', name: 'Biba Women\'s Floral Printed Cotton Anarkali Kurta with Dupatta (Peach)', price: 2599, mrp: 4999, fabric: '100% Fine Cambric Cotton', fit: 'Anarkali Flared Fit', gender: 'Women', type: 'Ethnic Set', occ: 'Festive & Casual', featured: true, best: true },
  { brand: 'W', name: 'W for Woman Women\'s Geometric Print Straight Rayon Kurta (Teal Green)', price: 1299, mrp: 2199, fabric: '100% Viscose Rayon', fit: 'Straight Fit', gender: 'Women', type: 'Kurta', occ: 'Daily Wear', featured: false, best: false },
  { brand: 'Zara', name: 'Zara Women\'s Oversized Double-Breasted Trench Coat (Camel Khaki)', price: 6990, mrp: 8990, fabric: '100% Cotton Gabardine Water-Repellent', fit: 'Oversized Relaxed Fit', gender: 'Women', type: 'Outerwear', occ: 'Casual & Travel', featured: true, best: false },
  { brand: 'Levi\'s', name: 'Levi\'s Men\'s Classic Trucker Denim Jacket (Medium Stonewash)', price: 3499, mrp: 5499, fabric: '100% Non-Stretch Cotton Denim', fit: 'Standard Fit', gender: 'Men', type: 'Denim Jacket', occ: 'Casual Layering', featured: false, best: true },
  { brand: 'Peter England', name: 'Peter England Men\'s Checked Cotton Casual Shirt (Olive & White)', price: 999, mrp: 1699, fabric: '100% Pure Cotton', fit: 'Slim Fit', gender: 'Men', type: 'Casual Shirt', occ: 'Weekend Casual', featured: false, best: false },
  { brand: 'Allen Solly', name: 'Allen Solly Women\'s Formal Solid Crepe Blazer (Powder Pink)', price: 3299, mrp: 4999, fabric: 'Poly-Spandex Stretch Crepe', fit: 'Tailored Slim Fit', gender: 'Women', type: 'Blazer', occ: 'Workwear', featured: false, best: false },
  { brand: 'FabIndia', name: 'FabIndia Women\'s Chanderi Silk Zari Embroidered Saree (Emerald Green)', price: 4290, mrp: 5990, fabric: 'Chanderi Silk with Zari Woven Border', fit: 'Free Size 5.5m with Blouse Piece', gender: 'Women', type: 'Saree', occ: 'Traditional & Festive', featured: true, best: true },
  { brand: 'Manyavar', name: 'Manyavar Men\'s Printed Mandarin Collar Bandhgala Jacket (Midnight Blue)', price: 3999, mrp: 5499, fabric: 'Art Silk with Structured Interlining', fit: 'Slim Fit', gender: 'Men', type: 'Nehru Jacket', occ: 'Festive & Occasion', featured: false, best: false },
  { brand: 'Van Heusen', name: 'Van Heusen Men\'s Pure Linen Casual Button-Down Shirt (Crisp White)', price: 2499, mrp: 3499, fabric: '100% European Flax Linen', fit: 'Regular Fit', gender: 'Men', type: 'Linen Shirt', occ: 'Summer Casual', featured: false, best: true },
  { brand: 'Biba', name: 'Biba Women\'s Straight Cotton Palazzo Suit with Gota Patti (Ruby Red)', price: 3199, mrp: 5599, fabric: 'Pure Cotton with Chiffon Dupatta', fit: 'Straight Silhouette', gender: 'Women', type: 'Suit Set', occ: 'Festive Celebrations', featured: false, best: false },
  { brand: 'W', name: 'W for Woman Women\'s Solid A-Line Rayon Fusion Dress (Mustard)', price: 1799, mrp: 2999, fabric: 'Soft Flowy Rayon', fit: 'A-Line Fit', gender: 'Women', type: 'Fusion Dress', occ: 'Casual Outing', featured: false, best: false },
  { brand: 'Raymond', name: 'Raymond Men\'s Unstitched Premium Poly-Wool Suiting Fabric (2.00 Metres)', price: 2199, mrp: 3299, fabric: 'Premium Poly-Wool Blend (Terrywool)', fit: 'Custom Tailorable Length', gender: 'Men', type: 'Suiting Fabric', occ: 'Bespoke Tailoring', featured: false, best: false },
  { brand: 'Levi\'s', name: 'Levi\'s Women\'s 711 Skinny Fit Mid-Rise Jeans (Washed Black)', price: 1999, mrp: 3499, fabric: '78% Cotton, 21% Polyester, 1% Elastane', fit: 'Skinny Fit', gender: 'Women', type: 'Jeans', occ: 'Everyday Casual', featured: false, best: true },
  { brand: 'Allen Solly', name: 'Allen Solly Men\'s Khaki Stretch Cotton Chino Trousers (Beige)', price: 1699, mrp: 2299, fabric: '98% Cotton, 2% Elastane Chino Twill', fit: 'Custom Slim Fit', gender: 'Men', type: 'Chinos', occ: 'Smart Casual', featured: false, best: true },
  { brand: 'Peter England', name: 'Peter England Men\'s Micro-Print Spread Collar Shirt (Burgundy)', price: 1099, mrp: 1799, fabric: 'Cotton Rich Blend', fit: 'Slim Fit', gender: 'Men', type: 'Semi-Formal Shirt', occ: 'Evening & Dinner', featured: false, best: false },
  { brand: 'Zara', name: 'Zara Men\'s Textured Knit High-Neck Jumper Sweater (Ecrù Off-White)', price: 3590, mrp: 4990, fabric: 'Cotton-Acrylic Cable Knit Blend', fit: 'Relaxed Fit', gender: 'Men', type: 'Winterwear Sweater', occ: 'Autumn & Winter', featured: false, best: false },
  { brand: 'FabIndia', name: 'FabIndia Women\'s Printed Cotton Gathered Tunic Top (Indigo Blue)', price: 1490, mrp: 1990, fabric: '100% Bagru Hand-Block Printed Cotton', fit: 'Relaxed Comfort Fit', gender: 'Women', type: 'Tunic Top', occ: 'Casual Bohemian', featured: false, best: false },
  { brand: 'Biba', name: 'Biba Girls Ethnic Printed Cotton Lehenga Choli Set (Yellow/Magenta)', price: 1999, mrp: 3499, fabric: 'Pure Cotton with Foil Print', fit: 'Traditional Flared Silhouette', gender: 'Girls', type: 'Kids Ethnic', occ: 'Festivals & Weddings', featured: false, best: false },
  { brand: 'Manyavar', name: 'Manyavar Men\'s Pure Silk Churidar Pyjama (Glossy Off-White)', price: 1299, mrp: 1799, fabric: 'Dupion Art Silk Fabric with Drawstring', fit: 'Regular Traditional Gather', gender: 'Men', type: 'Churidar', occ: 'Traditional Wear', featured: false, best: false },
  { brand: 'Van Heusen', name: 'Van Heusen Men\'s Cotton Rich Anti-Bacterial Crew Socks (Pack of 3)', price: 449, mrp: 699, fabric: '85% Cotton, 13% Spandex, 2% Nylon', fit: 'Elastic Ribbed Fit', gender: 'Men', type: 'Socks', occ: 'Formal & Daily', featured: false, best: true },
  { brand: 'W', name: 'W for Woman Women\'s Flared Rayon Culottes Trousers (Jet Black)', price: 1199, mrp: 1899, fabric: 'Soft Drape Rayon Twill', fit: 'Wide Leg Flared Crop', gender: 'Women', type: 'Trousers', occ: 'Work & Casual', featured: false, best: false },
  { brand: 'Peter England', name: 'Peter England Men\'s V-Neck Cotton Sleeveless Sweater Vest (Navy)', price: 899, mrp: 1499, fabric: '100% Acrylic Soft Wool Touch', fit: 'Regular Fit', gender: 'Men', type: 'Sweater Vest', occ: 'Winter Office Wear', featured: false, best: false },
  { brand: 'Allen Solly', name: 'Allen Solly Men\'s Striped Cotton Round Neck T-Shirt (Maroon/White)', price: 699, mrp: 1199, fabric: '100% Bio-Washed Cotton Jersey', fit: 'Slim Fit', gender: 'Men', type: 'T-Shirt', occ: 'Casual Wear', featured: false, best: false },
  { brand: 'Levi\'s', name: 'Levi\'s Men\'s Graphic Batwing Logo Printed T-Shirt (White)', price: 999, mrp: 1499, fabric: '100% Ringspun Cotton Single Jersey', fit: 'Standard Fit', gender: 'Men', type: 'Graphic T-Shirt', occ: 'Streetwear Casual', featured: false, best: true },
  { brand: 'FabIndia', name: 'FabIndia Men\'s Hand-Woven Tussar Silk Stole Scarf (Rust Brown)', price: 1890, mrp: 2490, fabric: '100% Pure Tussar Silk with Fringed Border', fit: 'Free Size 2.0m x 0.6m', gender: 'Men', type: 'Stole Scarf', occ: 'Winter Traditional', featured: false, best: false },
  { brand: 'Manyavar', name: 'Manyavar Men\'s Printed Satin Silk Pocket Square (Burgundy Paisley)', price: 499, mrp: 799, fabric: '100% Micro-Satin Silk', fit: 'Hand-Rolled Edges 33cm x 33cm', gender: 'Men', type: 'Pocket Square', occ: 'Weddings & Galas', featured: false, best: false },
  { brand: 'Raymond', name: 'Raymond Men\'s Solid Notch Lapel 2-Piece Formal Suit (Midnight Navy)', price: 8999, mrp: 12999, fabric: 'Premium Poly-Viscose Structured Fabric', fit: 'Regular Tailored Fit', gender: 'Men', type: '2-Piece Suit', occ: 'Executive & Formal', featured: true, best: false },
  { brand: 'Biba', name: 'Biba Women\'s Solid Cotton Tiered Maxi Dress (Olive Green)', price: 2199, mrp: 3999, fabric: '100% Breathable Cotton', fit: 'Tiered Bohemian Maxi Fit', gender: 'Women', type: 'Maxi Dress', occ: 'Vacation & Brunch', featured: false, best: false },
  { brand: 'Zara', name: 'Zara Men\'s Pleated Relaxed Trousers with Drawstring (Charcoal)', price: 2990, mrp: 3990, fabric: 'Fluid Lyocell-Cotton Blend', fit: 'Relaxed Wide Fit', gender: 'Men', type: 'Trousers', occ: 'Contemporary Streetwear', featured: false, best: false },
  { brand: 'Van Heusen', name: 'Van Heusen Men\'s Anti-Wrinkle Textured Formal Shirt (White)', price: 1499, mrp: 2299, fabric: '100% Cotton with Easy-Care Finish', fit: 'Classic Fit', gender: 'Men', type: 'Formal Shirt', occ: 'Business Meetings', featured: false, best: true },
  { brand: 'W', name: 'W for Woman Women\'s Embroidered Festive Straight Kurta (Fuchsia Pink)', price: 1699, mrp: 2799, fabric: 'Chanderi Rayon Blend with Zari Work', fit: 'Straight Silhouette', gender: 'Women', type: 'Kurta', occ: 'Festive Gatherings', featured: false, best: false },
  { brand: 'Levi\'s', name: 'Levi\'s Men\'s 501 Original Fit Straight Leg Jeans (Light Stonewash)', price: 2999, mrp: 4999, fabric: '100% Heavyweight Cotton Denim with Button Fly', fit: 'Original Straight Fit', gender: 'Men', type: 'Jeans', occ: 'Heritage Casual', featured: false, best: true },
  { brand: 'Peter England', name: 'Peter England Men\'s Pack of 2 Solid Cotton Lounge Pants (Grey & Black)', price: 1199, mrp: 1899, fabric: '100% Cotton Combed Yarn with Pockets', fit: 'Relaxed Lounge Fit', gender: 'Men', type: 'Track Pants', occ: 'Home & Sleepwear', featured: false, best: false },
  { brand: 'Allen Solly', name: 'Allen Solly Women\'s Striped Cotton Shirt Dress with Belt (Light Blue)', price: 1999, mrp: 2999, fabric: '100% Crisp Yarn-Dyed Cotton', fit: 'Fit and Flare with Fabric Belt', gender: 'Women', type: 'Shirt Dress', occ: 'Casual Daywear', featured: false, best: false },
  { brand: 'FabIndia', name: 'FabIndia Men\'s Silk Blend Jacquard Nehru Waistcoat (Beige)', price: 2990, mrp: 3990, fabric: 'Art Silk with Cotton Lining', fit: 'Sleeveless Tailored Cut', gender: 'Men', type: 'Nehru Jacket', occ: 'Festive Wear', featured: false, best: false },
  { brand: 'Manyavar', name: 'Manyavar Men\'s Pure Cotton Pathani Kurta Salwar Set (Jet Black)', price: 3499, mrp: 4999, fabric: '100% Stiffened Cotton Sheeting', fit: 'Traditional Pathani Cut', gender: 'Men', type: 'Pathani Suit', occ: 'Traditional Functions', featured: false, best: false },
  { brand: 'Raymond', name: 'Raymond Men\'s Micro-Checkered Pure Cotton Formal Shirt (Lavender)', price: 1599, mrp: 2399, fabric: 'Giza Cotton Soft Touch Weave', fit: 'Slim Fit', gender: 'Men', type: 'Formal Shirt', occ: 'Boardroom Meetings', featured: false, best: false },
  { brand: 'Biba', name: 'Biba Women\'s Straight Cotton Kurta with Embroidery on Yoke (Mustard)', price: 1299, mrp: 2199, fabric: '100% Pure Cambric Cotton', fit: 'Straight Comfort Fit', gender: 'Women', type: 'Kurta', occ: 'Everyday Casual', featured: false, best: false },
  { brand: 'Zara', name: 'Zara Women\'s Pleated Midi Skirt with Elastic Waistband (Champagne Gold)', price: 2590, mrp: 3590, fabric: '100% Shimmering Pleated Polyester', fit: 'A-Line Midi Length', gender: 'Women', type: 'Skirts', occ: 'Evening Cocktails', featured: false, best: false },
  { brand: 'Van Heusen', name: 'Van Heusen Men\'s Solid Cotton Pique Polo with Contrast Tipping (Black)', price: 999, mrp: 1699, fabric: '100% Superfine Mercerised Cotton', fit: 'Custom Fit', gender: 'Men', type: 'Polo T-Shirt', occ: 'Golf & Weekend', featured: false, best: false },
  { brand: 'W', name: 'W for Woman Women\'s Solid Rayon Draped Dhoti Pants (Beige)', price: 999, mrp: 1599, fabric: 'Fluid Soft Viscose Rayon', fit: 'Draped Dhoti Cut with Elastic Waist', gender: 'Women', type: 'Ethnic Bottoms', occ: 'Festive Fusion', featured: false, best: false },
  { brand: 'Peter England', name: 'Peter England Men\'s Printed Cotton Boxer Shorts (Pack of 3)', price: 699, mrp: 1099, fabric: '100% Combed Cotton Poplin', fit: 'Relaxed Fit with Concealed Button Fly', gender: 'Men', type: 'Innerwear Boxers', occ: 'Daily Essentials', featured: false, best: false },
  { brand: 'Allen Solly', name: 'Allen Solly Men\'s Lightly Washed Slim Fit Chino Shorts (Navy Blue)', price: 1299, mrp: 1899, fabric: '98% Cotton, 2% Spandex Stretch Twill', fit: 'Slim Above-the-Knee Fit', gender: 'Men', type: 'Shorts', occ: 'Vacation & Weekend', featured: false, best: false },
]

export const generateFashion = (categoryId) => {
  return fashionTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-FAS-${num}`
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
      stock: 25 + ((index * 8) % 90),
      rating: +(4.0 + ((index * 2) % 9) * 0.1).toFixed(1),
      reviewCount: 35 + ((index * 57) % 2100),
      images: [img1, img2],
      highlights: [
        `Fabric: ${item.fabric}`,
        `Fit Type: ${item.fit}`,
        `Gender / Target: ${item.gender}`,
        `Occasion: ${item.occ}`,
        'Machine Washable & Breathable Weave',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Garment Style', value: item.type },
        { group: 'General', name: 'Gender', value: item.gender },
        { group: 'Fabric & Fit', name: 'Material Composition', value: item.fabric },
        { group: 'Fabric & Fit', name: 'Fit', value: item.fit },
        { group: 'Design & Style', name: 'Occasion', value: item.occ },
        { group: 'Care & Maintenance', name: 'Wash Care', value: 'Gentle Machine Wash in Cold Water with Similar Colors' },
      ],
      warranty: '30-Day Return & Replacement Guarantee',
      tags: ['fashion', 'clothing', 'apparel', item.brand.toLowerCase(), item.gender.toLowerCase(), item.type.toLowerCase()],
      description: `Step out in effortless style with the ${item.name}. Crafted from premium ${item.fabric} tailored to a flattering ${item.fit}, ensuring all-day breathability and elegance for ${item.occ.toLowerCase()} events.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
