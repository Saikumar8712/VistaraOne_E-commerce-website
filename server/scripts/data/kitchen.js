import { imagePools } from '../productData.js'

const imgs = imagePools.homeKitchen

const kitchenTemplates = [
  { brand: 'Prestige', name: 'Prestige Deluxe Alpha Stainless Steel Pressure Cooker (5.5 Litres)', price: 2999, mrp: 4150, mat: 'Heavy Gauge Food Grade Stainless Steel', cap: '5.5 Litres', ind: 'Induction and Gas Compatible', type: 'Pressure Cooker', war: '10 Years Manufacturer Warranty', featured: true, best: true },
  { brand: 'Hawkins', name: 'Hawkins Contura Hard Anodized Pressure Cooker (3 Litres, Black)', price: 2199, mrp: 2650, mat: 'Hard Anodized Non-Toxic 60 Micron Body', cap: '3.0 Litres Inner Lid', ind: 'Gas Stovetop Compatible', type: 'Pressure Cooker', war: '5 Years Manufacturer Warranty', featured: true, best: true },
  { brand: 'Pigeon', name: 'Pigeon by Stovekraft Triply Stainless Steel Deep Kadai with Glass Lid (2.5L)', price: 1699, mrp: 3195, mat: '3-Layer Tri-Ply Clad Aluminum Core', cap: '2.5 Litres Diameter 24cm', ind: 'Induction & Gas Compatible', type: 'Kadai Cookware', war: '5 Years Warranty', featured: false, best: true },
  { brand: 'Milton', name: 'Milton Thermosteel Flip Lid Insulated Stainless Steel Flask (1000 ml)', price: 999, mrp: 1350, mat: '18/8 304 Grade Stainless Steel Inside & Out', cap: '1000 ml Vacuum Insulated', ind: 'Keeps Hot/Cold up to 24 Hours', type: 'Water Bottle Flask', war: '1 Year Warranty against Leakage', featured: true, best: true },
  { brand: 'Borosil', name: 'Borosil Glass Lunch Box Set of 3 with Insulated Thermal Bag (400 ml Each)', price: 1299, mrp: 1795, mat: '100% Borosilicate Oven-Proof Glass', cap: 'Set of 3 x 400 ml', ind: 'Microwave, Oven, Freezer & Dishwasher Safe', type: 'Lunch Box Set', war: '2 Years Warranty on Glass', featured: false, best: true },
  { brand: 'Wonderchef', name: 'Wonderchef Nutri-Blend Mixer Grinder & Smoothie Maker (400W, 2 Jars)', price: 2799, mrp: 5000, mat: 'Surgical Grade Stainless Steel Blades with Polycarbonate Jars', cap: '400W 22000 RPM Motor', ind: 'Nutrient Extraction High Speed', type: 'Mixer Grinder', war: '2 Years Onsite Warranty', featured: true, best: true },
  { brand: 'Cello', name: 'Cello Opalware Dazzle Tropical Lagoon 18-Piece Dinner Set', price: 1899, mrp: 3290, mat: 'Thermal Shock Resistant German Opal Glass', cap: '18 Pieces Service for 6', ind: 'Bone-Ash Free 100% Vegetarian', type: 'Dinnerware Set', war: '1 Year Breakage Replacement', featured: false, best: false },
  { brand: 'Philips', name: 'Philips HL7756/00 750W Mixer Grinder with 3 Stainless Steel Jars', price: 3499, mrp: 5495, mat: 'Heavy Duty Turbo Motor with Food Grade SS Jars', cap: '750 Watts Power', ind: 'Advanced Air Ventilation System', type: 'Mixer Grinder', war: '2 Years Warranty on Product', featured: true, best: true },
  { brand: 'Tefal', name: 'Tefal Delicia Non-Stick Hard Titanium Frying Pan (24 cm)', price: 1499, mrp: 2499, mat: 'Titanium Pro Non-Stick Coating', cap: '24 cm Diameter Induction Base', ind: 'Thermo-Signal Heat Indicator', type: 'Frying Pan', war: '2 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Bajaj', name: 'Bajaj Rex 500W Mixer Grinder with Nutri-Pro Feature (3 Jars, White)', price: 2199, mrp: 3870, mat: 'Rust-Proof ABS Body with Stainless Steel Jars', cap: '500 Watts Motor', ind: 'Multi-Functional Blade System', type: 'Mixer Grinder', war: '1 Year Product + 1 Year Motor Warranty', featured: false, best: true },
  { brand: 'Prestige', name: 'Prestige Iris Plus 750W Mixer Grinder with 4 Jars (Juicer Jar Included)', price: 3199, mrp: 6295, mat: 'Ergonomic Handles with Stainless Steel Blades', cap: '750W Powerful Copper Motor', ind: 'Overload Protection Switch', type: 'Mixer Grinder', war: '2 Years Warranty on Product', featured: false, best: true },
  { brand: 'Hawkins', name: 'Hawkins Futura Hard Anodized Non-Stick Dosa Tawa (33 cm Flat Base)', price: 1750, mrp: 2150, mat: '4.88 mm Extra Thick Heavy Gauge Hard Anodized', cap: '33 cm Large Dosa Surface', ind: 'Gas Stovetop Heavy Duty', type: 'Dosa Tawa', war: '5 Years Manufacturer Warranty', featured: false, best: true },
  { brand: 'Milton', name: 'Milton Executive Insulated Stainless Steel Casserole Set of 3 (1000/1500/2500ml)', price: 1899, mrp: 2750, mat: 'PUF Insulated Double Wall Stainless Steel', cap: 'Set of 3 (1L, 1.5L, 2.5L)', ind: 'Keeps Chapatis & Curries Warm for Hours', type: 'Casserole Hotpot', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Borosil', name: 'Borosil Klip N Store Microwavable Airtight Glass Containers (Set of 4)', price: 1499, mrp: 2190, mat: '100% Pure Borosilicate Laboratory Glass', cap: '4 Containers (2x 320ml, 2x 520ml)', ind: 'Guaranteed 100% Spill-Proof Silicone Seal', type: 'Food Storage Jars', war: '2 Years Glass Warranty', featured: false, best: false },
  { brand: 'Pigeon', name: 'Pigeon Cruise 1800W Induction Cooktop with 7 Preset Indian Menus', price: 1699, mrp: 3195, mat: 'Microcrystalline High-Grade Glass Plate', cap: '1800 Watts Fast Heating', ind: 'Dual Heat Sensor Technology', type: 'Induction Cooktop', war: '1 Year Comprehensive Warranty', featured: false, best: true },
  { brand: 'Wonderchef', name: 'Wonderchef Royal Velvet Non-Stick Cookware Set (Kadai, Fry Pan, Dosa Tawa)', price: 2999, mrp: 5500, mat: 'Virgin Grade Pure Aluminum with 5-Layer MetaTuff Coating', cap: '3 Cookware Pieces with Glass Lid', ind: 'PFOA and Heavy Metal Free', type: 'Cookware Set', war: '2 Years Warranty', featured: true, best: false },
  { brand: 'Cello', name: 'Cello Max Fresh Click Stainless Steel Lunch Box (4 Containers + Bag)', price: 899, mrp: 1399, mat: 'Mirror Finish High Grade Stainless Steel', cap: '4 x 300ml Leak-Proof Containers', ind: 'Insulated Soft Fabric Outer Jacket', type: 'Lunch Box', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Philips', name: 'Philips Daily Collection HD9218 Air Fryer with Rapid Air Technology (1425W)', price: 6999, mrp: 10995, mat: 'Non-Stick Coated Food Basket', cap: '4.1 Litres Large Basket', ind: 'Up to 90% Less Fat Frying', type: 'Air Fryer', war: '2 Years Global Warranty', featured: true, best: true },
  { brand: 'Tefal', name: 'Tefal Ingenio Non-Stick Induction Cookware Set with Detachable Handle (3 Pcs)', price: 4499, mrp: 6999, mat: 'Mineralia Non-Stick with Patented 10kg Holding Handle', cap: '24cm Frypan, 26cm Wok + Handle', ind: 'Space-Saving Stackable Design', type: 'Modular Cookware', war: '2 Years Warranty on Pan, 10Y on Handle', featured: false, best: false },
  { brand: 'Bajaj', name: 'Bajaj Flora 3-Litre 3000W Instant Water Heater Geyser (White)', price: 2999, mrp: 4500, mat: 'Rust-Proof Engineered Plastic Outer Body', cap: '3 Litres Instant Heating', ind: 'Fire-Retardant Cable with Neon Indicators', type: 'Water Heater Geyser', war: '2 Years on Product + 5 Years on Inner Tank', featured: false, best: false },
  { brand: 'Prestige', name: 'Prestige PIC 20 1600W Induction Cooktop with Push Button Controls', price: 2199, mrp: 3495, mat: 'Anti-Magnetic Wall Plate with Aerodynamic Cooling', cap: '1600 Watts Energy Saver', ind: 'Indian Menu Presets (Dosa, Chapati, Idli)', type: 'Induction Cooktop', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Hawkins', name: 'Hawkins Classic 5 Litre Aluminum Pressure Cooker (Wide Base)', price: 1950, mrp: 2325, mat: 'Commercially Pure Virgin Aluminum', cap: '5.0 Litres Inner Lid Safety', ind: 'Pressure-Locked Safety Lid', type: 'Pressure Cooker', war: '5 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Milton', name: 'Milton Spotzero Microfiber Spin Mop with Plastic Bucket & 2 Refills', price: 1199, mrp: 1999, mat: 'High Absorption Microfiber Head with 360 Handle', cap: 'Twin Bucket with Drainage Plug', ind: 'Effortless Wringing Mechanism', type: 'Cleaning Spin Mop', war: '1 Year Warranty on Handle & Mechanism', featured: false, best: true },
  { brand: 'Borosil', name: 'Borosil Stainless Steel Hydra Trek Vacuum Insulated Flask (700 ml)', price: 799, mrp: 1195, mat: 'Food Grade 304 Double Wall Stainless Steel', cap: '700 ml Ergonomic Sports Flask', ind: 'Cold for 24 Hours, Hot for 20 Hours', type: 'Insulated Bottle', war: '1 Year Manufacturer Warranty', featured: false, best: false },
  { brand: 'Pigeon', name: 'Pigeon Sheen 60cm 1100 m3/h Curved Glass Kitchen Chimney (Black)', price: 5499, mrp: 12995, mat: 'Curved Toughened Glass with Baffle Filters', cap: 'Suction Capacity 1100 m3/h', ind: 'Low Noise Push Button Controls with LED Lamps', type: 'Kitchen Chimney', war: '1 Year Comprehensive + 5 Years on Motor', featured: false, best: false },
  { brand: 'Wonderchef', name: 'Wonderchef Gas Oven Tandoor Duo with Non-Stick Grill (Cook Naan & Tandoori)', price: 3499, mrp: 5500, mat: 'Cast Aluminum Body with 360 Convection Heat', cap: 'Multi-Layer Tandoor Cooking for Gas Stoves', ind: 'Bake, Roast & Grill at Home on Gas', type: 'Gas Oven Tandoor', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Cello', name: 'Cello Infuse Glass Bottle with Neoprene Sleeve & Strainer (550 ml)', price: 449, mrp: 749, mat: 'Lead-Free High Borosilicate Glass', cap: '550 ml Detachable Tea Infuser', ind: 'Protective Anti-Slip Neoprene Thermal Cover', type: 'Infuser Bottle', war: '6 Months Glass Integrity Warranty', featured: false, best: false },
  { brand: 'Philips', name: 'Philips HD6975/00 25L 1500W Digital Oven Toaster Grill (OTG)', price: 6799, mrp: 9995, mat: 'Chamber Light with Opti-Temp Technology', cap: '25 Litres Capacity', ind: 'Multi-Functional Bake, Grill & Toast Modes', type: 'Oven Toaster Grill (OTG)', war: '2 Years Manufacturer Warranty', featured: false, best: true },
  { brand: 'Prestige', name: 'Prestige Triply Stainless Steel Artisan Frying Pan with Lid (22 cm)', price: 1799, mrp: 2695, mat: 'Heavy 3-Ply Construction Aluminum Core', cap: '22 cm Diameter Mirror Polished', ind: 'Gas & Induction Friendly with Cast Steel Handle', type: 'Triply Frying Pan', war: '5 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Hawkins', name: 'Hawkins Tri-Ply Stainless Steel Deep Kadai with Glass Lid (3 Litres)', price: 2399, mrp: 2950, mat: 'AISI 304 Stainless Steel Inner Cooking Surface', cap: '3.0 Litres Heavy Bottom 3mm', ind: 'Extra Deep Shape for Splatter-Free Cooking', type: 'Deep Kadai', war: '5 Years Manufacturer Warranty', featured: false, best: true },
  { brand: 'Milton', name: 'Milton Pro Cook Granito Die-Cast Induction Kadai with Glass Lid (26cm)', price: 1699, mrp: 2490, mat: 'Heavy Virgin Die-Cast Aluminum with Granite Coating', cap: '3.2 Litres Capacity', ind: 'Scratch-Resistant 5-Layer Granite Finish', type: 'Granite Kadai', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Borosil', name: 'Borosil Prime Electric Kettle 1.0 Litre with Concealed Heating Element', price: 1399, mrp: 1890, mat: 'Double Wall Cool-Touch Stainless Steel Inner Pot', cap: '1.0 Litre 1350W Fast Boil', ind: 'Auto Cut-Off with Boil-Dry Protection', type: 'Electric Kettle', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Pigeon', name: 'Pigeon Handy Mini Chopper with 3 High Quality Stainless Steel Blades', price: 249, mrp: 545, mat: 'Food Grade BPA-Free Polypropylene Plastic', cap: '350 ml Pull-Cord Mechanism', ind: 'Chops Vegetables & Dry Fruits in Seconds', type: 'Manual Chopper', war: '30 Days Return Warranty', featured: false, best: true },
  { brand: 'Wonderchef', name: 'Wonderchef Click Kuche Induction Cookware Set with Glass Lids (4 Pieces)', price: 3999, mrp: 7500, mat: 'Forged Aluminum with Marble Non-Stick Finish', cap: 'Kadai 24cm, Fry Pan 24cm, Saucepan 18cm', ind: 'Ergonomic Soft Touch Cool Grip Handles', type: 'Cookware Set', war: '2 Years Warranty', featured: false, best: false },
  { brand: 'Bajaj', name: 'Bajaj Popular 1000W Light Weight Dry Iron with Non-Stick Coated Soleplate', price: 699, mrp: 1075, mat: 'Cast Aluminum Soleplate with Thermal Fuse', cap: '1000 Watts Fast Heating', ind: '360 Degree Swivel Cord with Fabric Selector Knob', type: 'Electric Dry Iron', war: '2 Years Comprehensive Warranty', featured: false, best: true },
  { brand: 'Philips', name: 'Philips HD9306/06 1.5L Stainless Steel Electric Kettle (1800W)', price: 2199, mrp: 3095, mat: 'Food Grade SUS304 Stainless Steel Body', cap: '1.5 Litres 1800 Watts Fast Boiling', ind: 'Steam Sensor with Strix Thermostat Controller', type: 'Electric Kettle', war: '2 Years Global Warranty', featured: false, best: true },
  { brand: 'Prestige', name: 'Prestige Omega Select Plus Non-Stick Round Omni Tawa (28 cm)', price: 999, mrp: 1540, mat: 'Scratch & Abrasion Resistant 3-Layer Coating', cap: '28 cm Diameter Flat Tawa', ind: 'Gas Stovetop Non-Stick Surface', type: 'Omni Tawa', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Hawkins', name: 'Hawkins Futura Hard Anodized Saute Pan with Stainless Steel Lid (3.25L)', price: 2299, mrp: 2750, mat: 'Hard Anodized Aluminum 4.06 mm Thickness', cap: '3.25 Litres Saute Pan', ind: 'Stay-Cool Rosewood Handle', type: 'Saute Pan', war: '5 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Milton', name: 'Milton Vitro Plastic Airtight Kitchen Storage Jars Set of 18 (Pet Jars)', price: 799, mrp: 1290, mat: '100% BPA Free Food Grade Transparent Pet Plastic', cap: 'Set of 18 (6x 300ml, 6x 650ml, 6x 1200ml)', ind: 'Easy-Grip Ribbed Design with Threaded Caps', type: 'Kitchen Storage Jars', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Borosil', name: 'Borosil Vision Classic Transparent Tea Coffee Glasses (Set of 6, 295 ml)', price: 549, mrp: 795, mat: '100% Pure Lightweight Borosilicate Glass', cap: 'Set of 6 x 295 ml Tumblers', ind: 'Flame Proof & Microwave Safe', type: 'Glassware Drinkware', war: 'Lifetime Warranty against Thermal Cloudiness', featured: false, best: true },
  { brand: 'Pigeon', name: 'Pigeon Special Stainless Steel Gas Stove with 2 Brass Burners', price: 1899, mrp: 3995, mat: 'Corrosion-Resistant Heavy Stainless Steel Body', cap: '2 High Efficiency Tri-Pin Brass Burners', ind: 'Spill-Proof Tray with Nylon Knobs', type: 'Gas Stove Cooktop', war: '2 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Cello', name: 'Cello Puro Steel-X Benz Stainless Steel Insulated Water Jug (5 Litres)', price: 1299, mrp: 1899, mat: 'Double Wall Insulated Food Grade Steel Interior', cap: '5 Litres with Leak-Proof Dispenser Tap', ind: 'Keeps Water Cold for Long Outdoor Hours', type: 'Water Dispenser Jug', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Wonderchef', name: 'Wonderchef Regalia Espresso Coffee Maker 15 Bar with Milk Frother', price: 6999, mrp: 11000, mat: 'Die-Cast Aluminum Boiler with Stainless Steel Accents', cap: '15 Bar Italian Pressure Pump', ind: 'Steamer Wand for Cappuccinos & Lattes', type: 'Espresso Coffee Machine', war: '2 Years Warranty', featured: true, best: false },
  { brand: 'Tefal', name: 'Tefal OptiGrill Elite Smart Electric Indoor Grill with Automatic Sensor', price: 14999, mrp: 19999, mat: 'Die-Cast Aluminum Non-Stick Plates (Dishwasher Safe)', cap: '2000 Watts Power', ind: 'Measures Meat Thickness & Adjusts Cooking Cycle', type: 'Electric Indoor Grill', war: '2 Years International Warranty', featured: false, best: false },
  { brand: 'Bajaj', name: 'Bajaj GX-1 500W Mixer Grinder with 3 Durable Stainless Steel Jars', price: 1899, mrp: 3500, mat: 'Shockproof ABS Body with Super Sharp SS Blades', cap: '500 Watts Motor with 3 Speeds', ind: 'Motor Overload Protection Feature', type: 'Mixer Grinder', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Prestige', name: 'Prestige Sandwich Maker with Fixed Non-Stick Grill Plates (PGMFB 800W)', price: 1299, mrp: 1895, mat: 'Non-Stick Coated Die-Cast Toasting Plates', cap: '800 Watts Fast Toasting', ind: 'Power & Ready Indicator Lights with Heat Resistant Body', type: 'Sandwich Toaster Grill', war: '1 Year Manufacturer Warranty', featured: false, best: true },
  { brand: 'Milton', name: 'Milton Smart Eco Stainless Steel Tiffin Box with 3 Containers (Yellow)', price: 799, mrp: 1195, mat: 'Outer Insulated Bag with Inner Steel Containers', cap: 'Set of 3 x 280ml Leak-Proof Tiffin Tins', ind: 'Washable Designer Fabric Thermal Jacket', type: 'Tiffin Lunch Box', war: '1 Year Warranty', featured: false, best: false },
  { brand: 'Philips', name: 'Philips Viva Collection HR1863/20 800W QuickClean Juicer with XL Feeding Tube', price: 8499, mrp: 11995, mat: 'Anodized Aluminum Surface with Polished Sieve', cap: '2 Litres Pulp Container with 800W Motor', ind: 'Extracts Whole Fruits Without Pre-Cutting', type: 'Cold Centrifugal Juicer', war: '2 Years Global Warranty', featured: false, best: false },
  { brand: 'Hawkins', name: 'Hawkins Futura Hard Anodized Deep Fry Kadai (2.5 Litre with Lid)', price: 1850, mrp: 2200, mat: 'Hard Anodized 3.25 mm Heavy Gauge Base', cap: '2.5 Litres Capacity', ind: 'Gas Stovetop Deep Frying Kadai', type: 'Deep Fry Kadai', war: '5 Years Manufacturer Warranty', featured: false, best: false },
  { brand: 'Borosil', name: 'Borosil Chef Delite 300W Twin Blade Electric Food Chopper (600 ml)', price: 1699, mrp: 2390, mat: 'Dual Stainless Steel Blades with Pure Copper Motor', cap: '600 ml Durable Plastic Bowl', ind: 'Chops Onions, Garlic & Nuts in 10 Seconds', type: 'Electric Food Chopper', war: '2 Years Warranty on Motor', featured: false, best: true },
]

export const generateKitchen = (categoryId) => {
  return kitchenTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-KIT-${num}`
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
      stock: 18 + ((index * 7) % 85),
      rating: +(4.1 + ((index * 2) % 9) * 0.1).toFixed(1),
      reviewCount: 40 + ((index * 71) % 2900),
      images: [img1, img2],
      highlights: [
        `Cookware / Kitchen Type: ${item.type}`,
        `Material: ${item.mat}`,
        `Capacity: ${item.cap}`,
        item.ind,
        item.war,
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Product Type', value: item.type },
        { group: 'Material & Construction', name: 'Primary Material', value: item.mat },
        { group: 'Capacity & Dimensions', name: 'Capacity / Set Size', value: item.cap },
        { group: 'Features & Compatibility', name: 'Compatibility', value: item.ind },
        { group: 'Warranty', name: 'Warranty Details', value: item.war },
      ],
      warranty: item.war,
      tags: ['kitchen', 'home and kitchen', 'cookware', item.brand.toLowerCase(), item.type.toLowerCase(), 'utensils'],
      description: `Elevate your culinary creations with the premium ${item.name}. Built with ${item.mat} to ensure uniform heat conduction, durability, and healthy everyday cooking for Indian families.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
