import { imagePools } from '../productData.js'

const imgs = imagePools.sports

const sportsTemplates = [
  { brand: 'Boldfit', name: 'Boldfit Anti-Skid TPE Yoga Mat with Alignment Lines (6mm)', price: 799, mrp: 1499, type: 'Yoga Mat', mat: 'Eco-Friendly TPE Cushioning', spec: '183cm x 61cm x 6mm', war: '6 Months Replacement Warranty', featured: true, best: true },
  { brand: 'Kore', name: 'Kore 20kg PVC Home Gym Dumbbell & Barbell Weight Set', price: 1299, mrp: 2999, type: 'Home Gym Set', mat: 'PVC Concrete Filled Plates', spec: '20 kg Total with 3ft Curl Bar', war: '1 Year Warranty', featured: true, best: true },
  { brand: 'Yonex', name: 'Yonex Nanoray Light 18i Graphite Badminton Racket (77g)', price: 2199, mrp: 3490, type: 'Badminton Racket', mat: 'Ultra Lightweight High Modulus Graphite', spec: 'Weight 77g, Tension up to 30 lbs', war: '6 Months Manufacturer Warranty', featured: true, best: true },
  { brand: 'Nivia', name: 'Nivia Storm Rubber Moulded Football (Size 5, FIFA Standard)', price: 449, mrp: 750, type: 'Football', mat: 'Rubber Moulded 32-Panel Construction', spec: 'Size 5, All Surface Playable', war: '3 Months Stitch Warranty', featured: false, best: true },
  { brand: 'Cosco', name: 'Cosco Super Volley Synthetic Leather Volleyball (Size 4)', price: 799, mrp: 1150, type: 'Volleyball', mat: 'Soft Touch Microfiber Synthetic Leather', spec: 'Official 18-Panel Match Ball', war: '6 Months Shape Retention Warranty', featured: false, best: false },
  { brand: 'SG', name: 'SG Scorer Classic Kashmir Willow Cricket Bat (Short Handle)', price: 1899, mrp: 2799, type: 'Cricket Bat', mat: 'Selected Kashmir Willow with Thick Edges', spec: 'Full Size Men Short Handle (approx 1200g)', war: 'Handle Replacement Warranty', featured: true, best: true },
  { brand: 'Boldfit', name: 'Boldfit Heavy Duty Loop Resistance Bands for Workout (Set of 5)', price: 399, mrp: 899, type: 'Resistance Bands', mat: '100% Natural Malaysian Latex', spec: '5 Tension Levels: X-Light to X-Heavy', war: '6 Months Snapping Warranty', featured: false, best: true },
  { brand: 'Strauss', name: 'Strauss Adjustable Skipping Jump Rope with Ball Bearings', price: 249, mrp: 499, type: 'Jump Rope', mat: 'Tangle-Free Steel Wire with PVC Coat', spec: '3 Meter Adjustable Length with Foam Handles', war: '6 Months Warranty', featured: false, best: false },
  { brand: 'Kore', name: 'Kore Pull-Up Chin-Up Doorway Exercise Bar with Foam Grips', price: 699, mrp: 1499, type: 'Pull-Up Bar', mat: 'Heavy Duty Chrome Plated Steel Tube', spec: 'Adjustable from 62cm to 100cm (Max 120kg)', war: '1 Year Structural Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Orthopedic Knee Support Brace with Silicon Gel Pad', price: 499, mrp: 850, type: 'Knee Brace', mat: 'Breathable 3D Knit Elastic Fabric', spec: 'Size Large / XL Compression Fit', war: '6 Months Elasticity Warranty', featured: false, best: true },
  { brand: 'Yonex', name: 'Yonex Mavis 350 Nylon Shuttlecocks (Yellow, Pack of 6)', price: 899, mrp: 1190, type: 'Badminton Shuttlecocks', mat: 'Precision Wing-Rib Nylon Skirt with Natural Cork', spec: 'Slow / Medium Speed Pack of 6', war: 'Standard Quality Warranty', featured: true, best: true },
  { brand: 'Boldfit', name: 'Boldfit Gym Shaker Bottle with Wire Whisk Blender (700ml)', price: 229, mrp: 499, type: 'Gym Shaker', mat: 'BPA-Free 100% Leak Proof Tritan Plastic', spec: '700 ml Capacity with Measurement Markings', war: '1 Year Leakproof Warranty', featured: false, best: true },
  { brand: 'Decathlon', name: 'Domyos Hexagonal Rubber Coated Dumbbells (Set of 2x 5kg)', price: 2199, mrp: 2999, type: 'Hex Dumbbells', mat: 'Cast Iron with Thick Anti-Roll Rubber Casing', spec: 'Pair of 5 kg (Total 10 kg) with Knurled Chrome Handle', war: '2 Years Manufacturer Warranty', featured: true, best: false },
  { brand: 'Nivia', name: 'Nivia Classic Basketball (Size 7, Deep Channel Grip)', price: 599, mrp: 950, type: 'Basketball', mat: 'Heavy Duty Rubber with Pebble Grain Texture', spec: 'Official Size 7 Men Outdoor / Indoor', war: '6 Months Valve Warranty', featured: false, best: false },
  { brand: 'Strauss', name: 'Strauss Hand Grip Strengthener with Adjustable Resistance (10-40kg)', price: 199, mrp: 399, type: 'Hand Grip', mat: 'Stainless Steel Spring with Non-Slip Rubber Grip', spec: 'Adjustable Dial 10 kg to 40 kg Resistance', war: '1 Year Spring Warranty', featured: false, best: false },
  { brand: 'SG', name: 'SG Club Leather Cricket Ball (Red, Pack of 2)', price: 799, mrp: 1100, type: 'Cricket Ball', mat: 'Four-Piece Water-Proof Alum Tanned Leather', spec: 'Weight 156g, Cork Core with Linen Seam', war: 'Original SG Stamp Guarantee', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Ab Roller Wheel with Knee Mat for Core Workout', price: 349, mrp: 799, type: 'Ab Roller', mat: 'Ultra-Wide Rubber Tread Wheel with Stainless Steel Rod', spec: 'Max Weight Capacity 150 kg with EVA Knee Pad', war: '1 Year Wheel Warranty', featured: false, best: true },
  { brand: 'Cosco', name: 'Cosco Shot 32 Heavy Speed Tennis Cricket Balls (Pack of 6)', price: 499, mrp: 690, type: 'Tennis Balls', mat: 'High Durability Rubber with Heavy Felt Cover', spec: 'Official Heavy Weight Tennis Cricket Ball', war: 'Standard Quality Warranty', featured: false, best: true },
  { brand: 'Decathlon', name: 'Kipsta Sports Duffel Gym Bag with Shoe Compartment (30L)', price: 799, mrp: 1299, type: 'Gym Bag', mat: 'Water-Repellent Polyester Fabric', spec: '30 Liters Capacity with Ventilated Shoe Pocket', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Pro Carbon Shin Guards with Ankle Support', price: 349, mrp: 550, type: 'Shin Guards', mat: 'High Impact Polypropylene Shell with EVA Foam', spec: 'Ergonomic Anatomical Left/Right Fit', war: '6 Months Crack Warranty', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Weight Lifting Gym Gloves with Wrist Wrap Support', price: 449, mrp: 899, type: 'Gym Gloves', mat: 'Breathable Mesh with Anti-Slip Silicone Padded Palm', spec: 'Integrated 45cm Adjustable Wrist Support Strap', war: '6 Months Stitch Warranty', featured: false, best: false },
  { brand: 'Yonex', name: 'Yonex Smash Professional Badminton Shoes (Non-Marking Sole)', price: 2999, mrp: 4490, type: 'Badminton Shoes', mat: 'Power Cushion Midsole with Non-Marking Gum Rubber Sole', spec: 'True Cushion Shock Absorption Tech', war: '6 Months Sole Pasting Warranty', featured: true, best: false },
  { brand: 'Kore', name: 'Kore Hexagon Cast Iron Kettlebell (10 kg)', price: 1699, mrp: 2699, type: 'Kettlebell', mat: 'Solid Cast Iron with Wide Textured Handle', spec: '10 kg Flat Bottom for CrossFit Swings', war: '1 Year Casting Warranty', featured: false, best: false },
  { brand: 'Strauss', name: 'Strauss Round Balance Board for Core Stability & Rehab', price: 749, mrp: 1399, type: 'Balance Board', mat: 'High Strength Heavy-Duty Plastic with 360 Rotation', spec: 'Diameter 40 cm, Max Load 120 kg', war: '1 Year Structural Warranty', featured: false, best: false },
  { brand: 'Decathlon', name: 'Domyos Push Up Bars with Non-Slip Rubber Base (Pair)', price: 499, mrp: 799, type: 'Push Up Bars', mat: 'Ergonomic Foam Grip Steel Handles', spec: 'Relieves Wrist Pressure, Max Load 110 kg', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Stainless Steel Insulated Sports Gym Flask (1000ml)', price: 699, mrp: 1299, type: 'Water Bottle', mat: 'Double Wall Vacuum Insulated 18/8 Stainless Steel', spec: 'Cold 24 Hours / Hot 12 Hours with Chug Cap', war: '1 Year Insulation Warranty', featured: false, best: true },
  { brand: 'SG', name: 'SG Test Cricket Batting Gloves (Men Right Hand)', price: 1499, mrp: 2200, type: 'Batting Gloves', mat: 'Premium Sheep Leather Palm with High Density Foam Fingers', spec: 'Split Thumb Design with Three-Piece Side Bar', war: '6 Months Leather Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Dominator All-Surface Rubber Volleyball', price: 499, mrp: 790, type: 'Volleyball', mat: 'Reinforced Rubber Bladder with Nylon Windings', spec: 'Outdoor Hardcourt Playable Size 4', war: '3 Months Air Leakage Warranty', featured: false, best: false },
  { brand: 'Kore', name: 'Kore 4-in-1 Multi-Purpose Adjustable Flat Incline Gym Bench', price: 4499, mrp: 7999, type: 'Gym Bench', mat: 'Heavy 2x2 Inch Commercial Steel Frame with Foam Padding', spec: '6 Backrest Positions (Decline to 90 Degree Incline)', war: '2 Years Frame Warranty', featured: true, best: false },
  { brand: 'Boldfit', name: 'Boldfit Heavy Cotton Boxing Hand Wraps with Thumb Loop (4m)', price: 299, mrp: 599, type: 'Hand Wraps', mat: 'Semi-Elastic Breathable Cotton Blend', spec: '4 Meters Length with Velcro Closure', war: '6 Months Stitch Warranty', featured: false, best: false },
  { brand: 'Yonex', name: 'Yonex 3-Racket Thermo Guard Badminton Kit Bag (Blue/Navy)', price: 1299, mrp: 1990, type: 'Kit Bag', mat: 'Durable Polyester with Thermal Guard Lining', spec: 'Holds 3 Rackets, Shoes, and Apparel', war: '1 Year Zipper Warranty', featured: false, best: false },
  { brand: 'Strauss', name: 'Strauss Foam Roller for Deep Tissue Muscle Massage (45cm)', price: 699, mrp: 1299, type: 'Foam Roller', mat: 'High Density Non-Toxic EVA Foam with Trigger Grid', spec: 'Length 45 cm, Diameter 14 cm', war: '1 Year Compression Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Wrist Wrap Elastic Support Band (Pair)', price: 199, mrp: 350, type: 'Wrist Support', mat: 'Heavy Duty Elastic Poly-Cotton Blend', spec: 'Width 7.5cm with Thumb Loop & Hook-Loop', war: '6 Months Elasticity Warranty', featured: false, best: true },
  { brand: 'Decathlon', name: 'Kipsta Agility Training Ladder for Footwork Speed (4m)', price: 799, mrp: 1199, type: 'Agility Ladder', mat: '10 Rigid Flat Rungs with Heavy Duty Webbing', spec: 'Length 4 Meters with Ground Pegs & Bag', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'SG', name: 'SG Optipro Cricket Helmet with Steel Visor (Men Size L)', price: 1799, mrp: 2499, type: 'Cricket Helmet', mat: 'High Impact Polypropylene Shell with Polystyrene Inner', spec: 'Adjustable Steel Grille with Airflow Vents', war: '1 Year Impact Safety Warranty', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Copper Infused Ankle Compression Sleeve (Pair)', price: 399, mrp: 799, type: 'Ankle Support', mat: 'Copper Infused 4-Way Stretch Elastic Fabric', spec: 'Targeted Heel and Arch Support for Plantar Fasciitis', war: '6 Months Warranty', featured: false, best: false },
  { brand: 'Cosco', name: 'Cosco Table Tennis Racket Club Master (Flared Handle)', price: 399, mrp: 590, type: 'Table Tennis Racket', mat: '5-Ply Selected Wood Blade with ITTF Approved Rubber', spec: 'Control 80, Speed 70, Spin 75', war: '6 Months Rubber Pasting Warranty', featured: false, best: false },
  { brand: 'Kore', name: 'Kore Olympic Barbell Bar 5ft Solid Steel (28mm Grip)', price: 2199, mrp: 3999, type: 'Barbell Bar', mat: 'Solid Cold-Rolled Steel with Hard Chrome Plating', spec: 'Length 152cm with 2 Spring Collar Locks (Max 150kg)', war: '2 Years Bending Warranty', featured: false, best: false },
  { brand: 'Decathlon', name: 'Domyos Weightlifting Dip Station Stand (Equalizer Bars)', price: 3499, mrp: 4999, type: 'Dip Station', mat: 'Reinforced Steel Tubes with Foam Padded Grips', spec: 'Height 83 cm, Supports up to 130 kg', war: '2 Years Frame Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Speed Agility Cones Set for Training (Pack of 12)', price: 299, mrp: 490, type: 'Training Cones', mat: 'Flexible Unbreakable Polyethylene Plastic', spec: 'Height 9 Inches with Carry Strap', war: '1 Year Material Warranty', featured: false, best: false },
  { brand: 'Strauss', name: 'Strauss Swimming Goggles with Anti-Fog UV Protection', price: 349, mrp: 699, type: 'Swimming Goggles', mat: 'Shatter-Resistant Polycarbonate Lens with Silicone Seal', spec: 'Adjustable Head Strap with Free Ear Plugs & Nose Clip', war: '6 Months Seal Warranty', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Thick Knee Pads for Volleyball & Dance (Pair)', price: 449, mrp: 899, type: 'Knee Pads', mat: 'High Density Shock Absorbing Sponge Cushion', spec: 'Ergonomic Elastic Slip-On Fit', war: '6 Months Cushioning Warranty', featured: false, best: false },
  { brand: 'Yonex', name: 'Yonex Super Grap Badminton Overgrip (Pack of 3, White)', price: 299, mrp: 450, type: 'Overgrip Tape', mat: 'Polyurethane Tacky Grip with High Sweat Absorption', spec: 'Width 25mm, Length 1200mm, Thickness 0.6mm', war: 'Original Yonex Product', featured: false, best: true },
  { brand: 'SG', name: 'SG League Cricket Batting Pads / Leg Guards (Men)', price: 2199, mrp: 3100, type: 'Leg Guards', mat: 'Cane and Low Density Foam Construction with PVC Facing', spec: 'Traditional 7-Bar Face with Padded Instep', war: '6 Months Stitch Warranty', featured: false, best: false },
  { brand: 'Decathlon', name: 'Kipsta Mini Football Goal Post with Net (95 x 70 cm)', price: 1499, mrp: 2199, type: 'Goal Post', mat: 'Resilient Steel Corner Tubes with High-Tenacity Net', spec: 'Portable Tool-Free Assembly for Backyard & Turf', war: '2 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Kore', name: 'Kore Weight Lifting Lever Belt (10mm Thick Genuine Leather)', price: 1999, mrp: 3499, type: 'Lifting Belt', mat: '100% Top Grain Cowhide Leather with Heavy Steel Buckle', spec: 'Width 10 cm, Thickness 10 mm for Heavy Squats & Deadlifts', war: '2 Years Buckle Warranty', featured: true, best: false },
  { brand: 'Cosco', name: 'Cosco Table Tennis Balls 3-Star (White, Pack of 6)', price: 249, mrp: 380, type: 'TT Balls', mat: 'Seamless High Grade Celluloid-Free ABS Plastic', spec: 'Diameter 40+ mm, Consistent Bounce & Spin', war: 'ITTF Size & Weight Standard', featured: false, best: false },
  { brand: 'Boldfit', name: 'Boldfit Hand Grip Finger Exerciser Resistance Band', price: 199, mrp: 399, type: 'Finger Exerciser', mat: 'Silicone High Elasticity Stretch Ring', spec: '3 Resistance Levels for Guitarists & Climbing Rehab', war: '6 Months Snapping Warranty', featured: false, best: false },
  { brand: 'Strauss', name: 'Strauss Silicone Swimming Cap for Men & Women (Black)', price: 199, mrp: 399, type: 'Swim Cap', mat: '100% Tear-Resistant Hypoallergenic Silicone', spec: 'Ergonomic 3D Ear Pockets for Complete Hair Protection', war: '6 Months Elasticity Warranty', featured: false, best: false },
  { brand: 'Nivia', name: 'Nivia Heavy Duty Foot Pump with Pressure Gauge (100 PSI)', price: 599, mrp: 950, type: 'Foot Pump', mat: 'Cast Iron Frame with Aluminum Cylinder & Dual Nozzle', spec: '100 PSI Max Pressure for Balls, Bicycles, and Cars', war: '1 Year Gauge Warranty', featured: false, best: true },
  { brand: 'Decathlon', name: 'Domyos Resistance Tube with Handles (15 kg Tension)', price: 499, mrp: 799, type: 'Resistance Tube', mat: 'Elastodiene Rubber Tube with Ergonomic Foam Handles', spec: 'Medium 15 kg Resistance for Full Body Workout', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Kore', name: 'Kore Sit Up Bench with Foot Hold for Core & Abs Workout', price: 2799, mrp: 4999, type: 'Sit Up Bench', mat: 'Steel Tubular Frame with High Density Curved Foam Cushion', spec: 'Adjustable Incline Angles with Padded Leg Rollers', war: '1 Year Frame Warranty', featured: false, best: false },
]

export const generateSports = (categoryId) => {
  return sportsTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-SPRT-${num}`
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
      stock: 12 + ((index * 3) % 40),
      rating: +(4.3 + ((index * 2) % 7) * 0.1).toFixed(1),
      reviewCount: 50 + ((index * 41) % 1500),
      images: [img1, img2],
      highlights: [
        `Equipment Type: ${item.type}`,
        `Material & Build: ${item.mat}`,
        `Specifications: ${item.spec}`,
        item.war,
        'Engineered for maximum athletic performance, safety, and durability',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Sport / Discipline', value: item.type },
        { group: 'Build & Materials', name: 'Material', value: item.mat },
        { group: 'Dimensions & Dimensions', name: 'Key Spec', value: item.spec },
        { group: 'Warranty', name: 'Warranty', value: item.war },
      ],
      warranty: item.war,
      tags: ['sports', 'fitness', 'gym', 'workout', item.type.toLowerCase(), item.brand.toLowerCase()],
      description: `Elevate your training routine with the professional-grade ${item.name}. Constructed with ${item.mat} to ensure longevity, optimal feedback, and backed by ${item.war}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
