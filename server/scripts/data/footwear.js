import { imagePools } from '../productData.js'

const imgs = imagePools.footwear

const footwearTemplates = [
  { brand: 'Nike', name: 'Nike Air Zoom Pegasus 40 Men\'s Road Running Shoes (Black/White)', price: 9495, mrp: 11895, type: 'Running Shoes', upper: 'Engineered Mesh Upper', sole: 'Nike React Foam with Zoom Air Units', closure: 'Lace-Up', occ: 'Running & Training', featured: true, best: true },
  { brand: 'Adidas', name: 'Adidas Ultraboost Light Running Shoes (Core Black/Cloud White)', price: 13999, mrp: 18999, type: 'Performance Running', upper: 'Adidas PRIMEKNIT+ Textile', sole: 'Light BOOST Midsole with Continental Rubber', closure: 'Lace-Up', occ: 'Marathon & Training', featured: true, best: true },
  { brand: 'Puma', name: 'Puma Smash v2 Leather Unisex Sneakers (White/Peacoat)', price: 2499, mrp: 4499, type: 'Lifestyle Sneakers', upper: 'Soft Genuine Leather Upper', sole: 'Durable Rubber Cupsole', closure: 'Lace-Up', occ: 'Casual & College', featured: false, best: true },
  { brand: 'Reebok', name: 'Reebok Floatride Energy 5 Running Shoes (Vector Navy/Solar Acid)', price: 5499, mrp: 8999, type: 'Road Running Shoes', upper: 'Breathable Speed Shift Mesh', sole: 'Floatride Energy Foam with Torsion Plate', closure: 'Lace-Up', occ: 'Daily Running', featured: false, best: false },
  { brand: 'Woodland', name: 'Woodland Men\'s Khaki Nubuck Leather Trekking Boots', price: 3895, mrp: 5295, type: 'Outdoor Boots', upper: 'Genuine Oiled Nubuck Leather', sole: 'High-Traction Deep Grooved Thermoplastic Rubber', closure: 'Rust-Proof Metal Eyelet Lace-Up', occ: 'Hiking & Trekking', featured: true, best: true },
  { brand: 'Red Tape', name: 'Red Tape Men\'s Classic Leather Oxford Formal Shoes (Tan Brown)', price: 1899, mrp: 5499, type: 'Formal Oxfords', upper: 'Full Grain Soft Leather', sole: 'TPR Flexible Slip-Resistant Sole', closure: 'Lace-Up', occ: 'Office & Weddings', featured: false, best: true },
  { brand: 'Bata', name: 'Bata Comfit Men\'s Memory Foam Slip-On Loafers (Dark Brown)', price: 1499, mrp: 2299, type: 'Loafers', upper: 'Synthetic Leather with Elastic Gussets', sole: 'Ultra-Light Cushioning PU Sole', closure: 'Slip-On', occ: 'Daily Office & Casual', featured: false, best: true },
  { brand: 'Asics', name: 'Asics GEL-Kayano 30 Stability Running Shoes (Deep Ocean)', price: 12999, mrp: 15999, type: 'Stability Running Shoes', upper: 'Stretch Knit Upper', sole: '4D GUIDANCE SYSTEM with PureGEL Cushioning', closure: 'Lace-Up', occ: 'Distance Running & Overpronation', featured: true, best: false },
  { brand: 'Skechers', name: 'Skechers Men\'s Go Walk 6 Slip-Ins Walking Shoes (Charcoal Grey)', price: 4799, mrp: 6999, type: 'Walking Shoes', upper: 'Stretch Fit Athletic Mesh', sole: 'ULTRA GO Cushioning with Hyper Pillar Technology', closure: 'Hands-Free Slip-In', occ: 'Daily Walking & Comfort', featured: false, best: true },
  { brand: 'Crocs', name: 'Crocs Classic Unisex Lightweight Water-Friendly Clogs (Navy)', price: 2395, mrp: 2995, type: 'Comfort Clogs', upper: 'Proprietary Croslite Foam', sole: 'Croslite Non-Marking Outsole with Pivoting Heel Strap', closure: 'Slip-On with Heel Strap', occ: 'Casual & Beachwear', featured: true, best: true },
  { brand: 'Nike', name: 'Nike Court Vision Low Next Nature Sneakers (White/Black)', price: 4495, mrp: 5695, type: 'Retro Basketball Sneakers', upper: 'Synthetic Leather with Perforations on Toe', sole: 'Rubber Cupsole with Pivot Circle', closure: 'Lace-Up', occ: 'Streetwear Casual', featured: false, best: true },
  { brand: 'Adidas', name: 'Adidas Originals Stan Smith Classic Leather Shoes (Cloud White/Green)', price: 6999, mrp: 8999, type: 'Tennis Sneakers', upper: 'Synthetic Leather Upper with Perforated 3-Stripes', sole: 'OrthoLite Sockliner with Rubber Outsole', closure: 'Lace-Up', occ: 'Iconic Streetwear', featured: false, best: true },
  { brand: 'Puma', name: 'Puma Darter Pro Running Shoes (Feather Gray/Mint)', price: 2999, mrp: 4999, type: 'Road Running', upper: 'Engineered Mesh Upper with PROFOAM Midsole', sole: 'High-Abrasion Full Rubber Outsole', closure: 'Lace-Up', occ: 'Daily Running', featured: false, best: false },
  { brand: 'Woodland', name: 'Woodland Men\'s Brown Leather Fisherman Sandals with Velcro', price: 2695, mrp: 3495, type: 'Outdoor Sandals', upper: 'Genuine Milled Oiled Leather Straps', sole: 'Deep Lugged Rubber Outdoor Sole', closure: 'Adjustable Hook & Loop Velcro', occ: 'Casual & Outdoor', featured: false, best: false },
  { brand: 'Red Tape', name: 'Red Tape Men\'s Breathable Athleisure Walking Sneakers (Grey)', price: 1599, mrp: 4999, type: 'Casual Athleisure', upper: 'Knit Mesh Upper with Padded Collar', sole: 'EVA Shock Absorbing Midsole', closure: 'Lace-Up', occ: 'Daily Casual', featured: false, best: true },
  { brand: 'Bata', name: 'Bata Hush Puppies Men\'s Bounce Leather Formal Derby Shoes (Black)', price: 3499, mrp: 4999, type: 'Formal Derby', upper: 'Premium Hand-Burnished Leather', sole: 'Bounce Technology Comfort Footbed with TPR Outsole', closure: 'Lace-Up', occ: 'Executive Formal', featured: false, best: false },
  { brand: 'Asics', name: 'Asics GT-2000 12 Running Shoes (Black/Illusion Blue)', price: 9999, mrp: 12999, type: 'Daily Running Shoes', upper: 'Jacquard Mesh Upper', sole: 'FF BLAST PLUS Cushioning with 3D GUIDANCE', closure: 'Lace-Up', occ: 'Road Running', featured: false, best: false },
  { brand: 'Skechers', name: 'Skechers Women\'s D\'Lites Fresh Start Chunky Sneakers (White/Silver)', price: 3999, mrp: 5999, type: 'Fashion Sneakers', upper: 'Smooth Leather and Synthetic Upper', sole: 'Air-Cooled Memory Foam Insole with Chunky Midsole', closure: 'Lace-Up', occ: 'Fashion & Walking', featured: false, best: false },
  { brand: 'Nike', name: 'Nike Revolution 7 Men\'s Road Running Shoes (Obsidian Blue)', price: 3195, mrp: 3695, type: 'Entry Running Shoes', upper: 'Soft Knit Mesh Upper', sole: 'Foam Midsole with Generative Traction Pattern', closure: 'Lace-Up', occ: 'Beginner Running & Gym', featured: false, best: true },
  { brand: 'Adidas', name: 'Adidas Adilette Comfort Unisex Slides (Core Black/White)', price: 1999, mrp: 3299, type: 'Comfort Slides', upper: 'Single-Band Synthetic Upper with 3-Stripes', sole: 'Cloudfoam Plus Contoured Footbed', closure: 'Slip-On', occ: 'Poolside & Lounging', featured: false, best: true },
  { brand: 'Woodland', name: 'Woodland Men\'s Navy Suede Leather Casual Driving Loafers', price: 2995, mrp: 3995, type: 'Driving Loafers', upper: 'Velvety Suede Genuine Leather', sole: 'Segmented Pebble Rubber Outsole', closure: 'Slip-On with Front Tie Cord', occ: 'Smart Casual Outing', featured: false, best: false },
  { brand: 'Crocs', name: 'Crocs LiteRide 360 Clogs with Super-Soft Foam Footbed (Smoke/Pearl)', price: 3995, mrp: 4995, type: 'Ergonomic Clogs', upper: 'Matlite Motion Flexible Perforated Upper', sole: '360-Degree LiteRide Foam Footbed', closure: 'Pivoting TPU Heel Strap', occ: 'All-Day Standing Comfort', featured: false, best: true },
  { brand: 'Reebok', name: 'Reebok Classic Leather Legacy AZ Sneakers (Chalk/Alabaster)', price: 4499, mrp: 7999, type: 'Heritage Sneakers', upper: 'Nylon with Suede and Leather Overlays', sole: 'Die-Cut EVA Midsole with Rubber Outsole', closure: 'Lace-Up', occ: 'Retro Streetwear', featured: false, best: false },
  { brand: 'Puma', name: 'Puma Softride Rift Unisex Slip-On Running Shoes (High Risk Red)', price: 2799, mrp: 4999, type: 'Slip-On Running', upper: 'Bootie Construction Knitted Mesh', sole: 'SOFTRIDE Foam with SoftFoam+ Sockliner', closure: 'Elastic Slip-On with Pull Tab', occ: 'Gym & Light Runs', featured: false, best: false },
  { brand: 'Red Tape', name: 'Red Tape Men\'s Leather Chelsea Boots with Elastic Gore (Dark Tan)', price: 2299, mrp: 6999, type: 'Chelsea Boots', upper: 'Genuine Full-Grain Leather', sole: 'Durable Cleated TPR Sole', closure: 'Slip-On with Elastic Side Panels', occ: 'Winter & Party Casual', featured: false, best: true },
  { brand: 'Bata', name: 'Bata Power Men\'s N-Walk Walking Shoes (Navy/Orange)', price: 1299, mrp: 1999, type: 'Lightweight Walking', upper: 'Breathable Honeycomb Mesh', sole: 'Flexible Phylon Midsole with Rubber Pods', closure: 'Lace-Up', occ: 'Morning Walk & Fitness', featured: false, best: false },
  { brand: 'Asics', name: 'Asics Gel-Nimbus 26 Max Cushion Running Shoes (French Blue)', price: 14999, mrp: 17999, type: 'Max Cushion Running', upper: 'Engineered Knit Upper with Soft Collar', sole: 'FF BLAST PLUS ECO with PureGEL Cushioning', closure: 'Lace-Up', occ: 'Long Distance Road Running', featured: true, best: false },
  { brand: 'Skechers', name: 'Skechers Arch Fit Titan Men\'s Walking Shoes (Black)', price: 5499, mrp: 7499, type: 'Podiatrist Certified Arch Shoes', upper: 'Engineered Mesh with Synthetic Overlays', sole: 'Removable Arch Fit Insole System with Cushioning', closure: 'Lace-Up', occ: 'Foot Pain Relief & Long Walks', featured: false, best: false },
  { brand: 'Nike', name: 'Nike Metcon 9 Men\'s Workout Training Shoes (Smoke Grey/Volt)', price: 11495, mrp: 12795, type: 'Cross Training Shoes', upper: 'Tough Breathable Haptic Print Textile', sole: 'Hyperlift Plate with Dual-Density Foam Midsole', closure: 'Lace-Up with Lace Lock System', occ: 'CrossFit, Lifting & Gym', featured: false, best: false },
  { brand: 'Adidas', name: 'Adidas Runfalcon 3.0 Men\'s Road Running Shoes (Lucid Blue)', price: 3499, mrp: 4999, type: 'Road Running Shoes', upper: 'Breathable Textile Upper with Synthetic Cage', sole: 'Cloudfoam Midsole with High Traction Outsole', closure: 'Lace-Up', occ: 'Daily Jogging & Treadmill', featured: false, best: false },
  { brand: 'Woodland', name: 'Woodland Men\'s Olive Green Casual Canvas Lace-Up Shoes', price: 1995, mrp: 2795, type: 'Canvas Casuals', upper: 'Heavy Duty 100% Cotton Washed Canvas', sole: 'Vulcanized Rubber Ribbed Sole', closure: 'Cotton Laces with Metal Eyelets', occ: 'Casual Weekend Hangout', featured: false, best: false },
  { brand: 'Puma', name: 'Puma Unisex Rebound V6 Mid-Top Retro Basketball Shoes (White/Red)', price: 3299, mrp: 5999, type: 'Mid-Top Sneakers', upper: 'Synthetic Leather with Padded Ankle Collar', sole: 'Rubber Cupsole with SoftFoam+ Cushioning', closure: 'Lace-Up', occ: 'Retro Basketball & Casual', featured: false, best: false },
  { brand: 'Reebok', name: 'Reebok Men\'s Zig Kinetica 2.5 Edge Trail Shoes (Army Green)', price: 6999, mrp: 11999, type: 'Trail & Outdoor Shoes', upper: 'CORDURA High-Durability Ripstop Textile', sole: 'Vibram Ecostep Lugged Outsole with Zig Energy Band', closure: 'Bungee Lace-Up', occ: 'Off-Road Trail & Outdoor', featured: false, best: false },
  { brand: 'Red Tape', name: 'Red Tape Men\'s Tan Leather Penny Loafers (Burnished Finish)', price: 1999, mrp: 5999, type: 'Penny Loafers', upper: 'Genuine Polished Crust Leather', sole: 'Cushioned Leather Lined Insole with TPR Sole', closure: 'Slip-On', occ: 'Semi-Formal & Cocktail', featured: false, best: false },
  { brand: 'Bata', name: 'Bata Men\'s Genuine Leather Dual-Strap Flip Flop Slippers (Tan)', price: 999, mrp: 1499, type: 'Leather Slippers', upper: 'Wide Leather Cross Straps with Soft Lining', sole: 'Contoured PU Footbed with Textured Grip', closure: 'Slip-On', occ: 'Home & Casual Lounging', featured: false, best: false },
  { brand: 'Crocs', name: 'Crocs Crocband Unisex Retro Sport Clogs (Stucco/Melon)', price: 2795, mrp: 3495, type: 'Sport Clogs', upper: 'Lightweight Water-Resistant Croslite with Racing Stripe', sole: 'Odor-Resistant Easy-to-Clean Outsole', closure: 'Pivoting Heel Strap', occ: 'Casual & Garden', featured: false, best: false },
  { brand: 'Nike', name: 'Nike Air Max SC Men\'s Casual Shoes (White/Obsidian/University Red)', price: 5495, mrp: 6795, type: 'Air Max Sneakers', upper: 'Real and Synthetic Leather with Breathable Mesh', sole: 'Max Air Unit with Foam Midsole for All-Day Bounce', closure: 'Lace-Up', occ: 'Everyday Retro Fashion', featured: false, best: true },
  { brand: 'Adidas', name: 'Adidas Advantage Base Court Shoes (Cloud White/Core Black)', price: 3299, mrp: 5599, type: 'Court Sneakers', upper: 'Smooth Recycled Synthetic Leather Upper', sole: 'EVA Sockliner with Durable Rubber Cupsole', closure: 'Lace-Up', occ: 'Casual & Office Friday', featured: false, best: false },
  { brand: 'Woodland', name: 'Woodland Women\'s Camel Leather High-Ankle Hiking Boots', price: 3695, mrp: 4995, type: 'Women\'s Outdoor Boots', upper: 'Premium Nubuck Leather with Padded Suede Collar', sole: 'High-Density Rugged Rubber Outsole', closure: 'Round D-Ring Metal Lace-Up', occ: 'Trekking & Cold Weather', featured: false, best: false },
  { brand: 'Asics', name: 'Asics Gel-Contend 8 Running Shoes (Black/Carrier Grey)', price: 3499, mrp: 4999, type: 'Daily Running', upper: 'Engineered Jacquard Mesh Upper', sole: 'Rearfoot GEL Technology with AMPLIFOAM Midsole', closure: 'Lace-Up', occ: 'Walking, Gym & Jogging', featured: false, best: false },
  { brand: 'Skechers', name: 'Skechers Men\'s Max Cushioning Premier Trail Shoes (Navy/Orange)', price: 6499, mrp: 8999, type: 'Max Cushion Trail', upper: 'Water-Repellent Mesh and Synthetic Overlays', sole: 'Goodyear Performance Outsole with ULTRA GO Foam', closure: 'Lace-Up', occ: 'Trail Running & Wet Weather', featured: false, best: false },
  { brand: 'Puma', name: 'Puma BMW M Motorsport Drift Cat Decima Shoes (Black/Marina)', price: 4199, mrp: 6999, type: 'Motorsport Shoes', upper: 'Synthetic Leather with Perforated Formstrip', sole: 'Low-Profile Rubber Sole for Maximum Pedal Feel', closure: 'Lace-Up', occ: 'Motorsport Lifestyle', featured: false, best: false },
  { brand: 'Red Tape', name: 'Red Tape Men\'s Black Formal Leather Monk Strap Shoes', price: 2199, mrp: 6499, type: 'Double Monk Straps', upper: 'Full Grain Glossy Leather', sole: 'Durable Anti-Skid TPR Sole', closure: 'Dual Silver Buckle Fastening', occ: 'Formal & Black Tie', featured: false, best: false },
  { brand: 'Bata', name: 'Bata Power Women\'s Air Flow Slip-On Athletic Shoes (Mauve)', price: 1499, mrp: 2499, type: 'Women\'s Slip-On', upper: 'Stretchy Lightweight Engineered Mesh', sole: 'Memory Tech Cushioned Insole with Phylon Outsole', closure: 'Slip-On with Elastic Collar', occ: 'Walking & Daily Wear', featured: false, best: false },
  { brand: 'Nike', name: 'Nike Offcourt Men\'s Premium Slides (Black/Anthracite)', price: 2295, mrp: 2795, type: 'Slide Sandals', upper: 'Contoured Synthetic Strap with Soft Fabric Lining', sole: 'Dual-Density Revive Foam with Deep Flex Grooves', closure: 'Slip-On', occ: 'Post-Workout & Recovery', featured: false, best: false },
  { brand: 'Adidas', name: 'Adidas Duramo Speed Men\'s Running Shoes (Carbon/Core Black)', price: 4799, mrp: 6999, type: 'Fast Tempo Running', upper: 'Breathable Engineered Mesh with Internal Support', sole: 'Lightstrike Cushioning with Adiwear Outsole', closure: 'Lace-Up', occ: 'Speed Training & 10K Runs', featured: false, best: false },
  { brand: 'Woodland', name: 'Woodland Men\'s Tan Genuine Leather Formal Slip-On Shoes', price: 3295, mrp: 4495, type: 'Formal Slip-On', upper: 'Supple Crust Leather with Burnished Toe', sole: 'Cushioned Leather Footbed with PU Outsole', closure: 'Slip-On with Hidden Elastic Gussets', occ: 'Corporate Office', featured: false, best: false },
  { brand: 'Reebok', name: 'Reebok Men\'s Nano X3 Training & Gym Shoes (Pure Grey/Black)', price: 8999, mrp: 12999, type: 'Functional Fitness Shoes', upper: 'Flexweave Woven Textile Upper', sole: 'Lift and Run (L.A.R) Chassis with Floatride Energy', closure: 'Lace-Up', occ: 'Lifting, Sprints & HIIT', featured: false, best: false },
  { brand: 'Crocs', name: 'Crocs Unisex Baya Lined Winter Clogs with Faux Fur (Espresso)', price: 3495, mrp: 4495, type: 'Lined Winter Clogs', upper: 'Croslite Outer Shell with Warm Plush Fleece Lining', sole: 'Dual Crocs Comfort Lightweight Cushion', closure: 'Pivoting Heel Strap', occ: 'Winter Indoors & Outdoors', featured: false, best: false },
  { brand: 'Red Tape', name: 'Red Tape Men\'s High-Top Chunky Platform Sneaker (White/Navy)', price: 1899, mrp: 5799, type: 'High-Top Sneakers', upper: 'Soft PU Leather with Suede Details', sole: 'Chunky Cushioning Rubberized Outsole', closure: 'Lace-Up with Padded Ankle', occ: 'Streetwear & Concerts', featured: false, best: false },
]

export const generateFootwear = (categoryId) => {
  return footwearTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-FOO-${num}`
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
      stock: 20 + ((index * 6) % 75),
      rating: +(4.1 + ((index * 3) % 9) * 0.1).toFixed(1),
      reviewCount: 30 + ((index * 65) % 2400),
      images: [img1, img2],
      highlights: [
        `Style: ${item.type}`,
        `Upper Material: ${item.upper}`,
        `Sole Technology: ${item.sole}`,
        `Fastening: ${item.closure}`,
        `Ideal For: ${item.occ}`,
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Shoe Category', value: item.type },
        { group: 'Material & Care', name: 'Upper Material', value: item.upper },
        { group: 'Material & Care', name: 'Sole & Cushioning', value: item.sole },
        { group: 'Design Details', name: 'Fastening Closure', value: item.closure },
        { group: 'Design Details', name: 'Occasion & Usage', value: item.occ },
        { group: 'Care Instructions', name: 'Maintenance', value: 'Wipe with clean dry cloth. Allow to air dry naturally.' },
      ],
      warranty: '3 Months Brand Warranty against Manufacturing Defects',
      tags: ['footwear', 'shoes', 'sneakers', item.brand.toLowerCase(), item.type.toLowerCase(), 'sports'],
      description: `Experience unparalleled comfort, foot stability, and modern street aesthetics with the ${item.name}. Engineered with ${item.upper} and ${item.sole} for optimal everyday performance.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
