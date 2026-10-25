import { imagePools } from '../productData.js'

const imgs = imagePools.appliances

const applianceTemplates = [
  { brand: 'LG', name: 'LG 55-inch 4K Ultra HD Smart OLED TV (OLED55C3PSA)', price: 119990, mrp: 169990, type: 'Smart TV', cap: '55 Inch (139 cm)', star: '5 Star Energy Rating', power: 'Self-Lighting OLED Pixels with α9 AI 4K Gen6', war: '3 Years Comprehensive Warranty on Panel', featured: true, best: true },
  { brand: 'Samsung', name: 'Samsung 65-inch Neo QLED 4K Smart TV (QA65QN85C)', price: 139990, mrp: 189990, type: 'Smart TV', cap: '65 Inch (163 cm)', star: '4 Star Energy Rating', power: 'Quantum Matrix Tech with Neural Quantum Processor 4K', war: '3 Years Comprehensive Warranty', featured: true, best: true },
  { brand: 'Whirlpool', name: 'Whirlpool 265L 3-Star Inverter Frost-Free Double Door Refrigerator', price: 26990, mrp: 34990, type: 'Refrigerator', cap: '265 Litres Double Door', star: '3 Star BEE Rating', power: 'IntelliSense Inverter Technology with Microblock', war: '10 Years Warranty on Compressor, 1 Year Comprehensive', featured: false, best: true },
  { brand: 'IFB', name: 'IFB 8kg 5-Star AI Powered Front Load Washing Machine (Senator Smart)', price: 36990, mrp: 44990, type: 'Washing Machine', cap: '8 Kg Capacity', star: '5 Star BEE Rating', power: 'AI Powered Neural Network with 3D Warm Soak', war: '4 Years Machine Warranty + 10 Years Motor Warranty', featured: true, best: true },
  { brand: 'Bosch', name: 'Bosch 13-Place Settings Free-Standing Dishwasher (SMS66GI01I)', price: 42990, mrp: 51990, type: 'Dishwasher', cap: '13 Place Settings', star: 'A++ European Energy Efficiency', power: 'EcoSilence Drive Motor with Intensive Kadhai 70°C', war: '2 Years Comprehensive + 10 Years Rust-Through Warranty', featured: false, best: false },
  { brand: 'Voltas', name: 'Voltas 1.5 Ton 5-Star Adjustable Inverter Split AC (185V Vectra Elegance)', price: 37990, mrp: 73990, type: 'Air Conditioner', cap: '1.5 Ton (5050 W)', star: '5 Star BEE Rating', power: '4-in-1 Adjustable Modes with 100% Copper Condenser', war: '1 Year Comprehensive + 10 Years on Inverter Compressor', featured: true, best: true },
  { brand: 'Daikin', name: 'Daikin 1.5 Ton 5-Star Inverter Split AC (MTKM50U)', price: 44990, mrp: 67200, type: 'Air Conditioner', cap: '1.5 Ton (5280 W)', star: '5 Star BEE Rating', power: 'Patented Streamer Discharge with PM 2.5 Filter', war: '1 Year Comprehensive + 5 Years PCB + 10 Years Compressor', featured: false, best: true },
  { brand: 'Haier', name: 'Haier 531L Inverter Frost-Free Side-by-Side Refrigerator (Black Glass)', price: 59990, mrp: 99990, type: 'Refrigerator', cap: '531 Litres Side by Side', star: 'Expert Inverter Technology', power: 'Auto Defrost with Deo Fresh Triple Inverter', war: '10 Years Warranty on Compressor', featured: true, best: false },
  { brand: 'Panasonic', name: 'Panasonic 27L Convection Microwave Oven with 360° Heat Wrap', price: 12990, mrp: 16990, type: 'Microwave Oven', cap: '27 Litres Convection', star: 'Zero Oil Cooking Modes', power: '101 Auto Cook Menus with Glass Turntable', war: '1 Year on Product + 5 Years on Magnetron', featured: false, best: false },
  { brand: 'Godrej', name: 'Godrej 180L 4-Star Direct-Cool Single Door Refrigerator (Aqua Wine)', price: 14990, mrp: 19990, type: 'Refrigerator', cap: '180 Litres Single Door', star: '4 Star BEE Rating', power: 'Advanced Inverter Compressor with Turbo Cooling', war: '10 Years Compressor Warranty', featured: false, best: true },
  { brand: 'LG', name: 'LG 7kg 5-Star Smart Inverter Fully-Automatic Top Load Washing Machine', price: 17990, mrp: 24990, type: 'Washing Machine', cap: '7 Kg Top Load', star: '5 Star BEE Rating', power: 'Smart Inverter Motor with TurboDrum Technology', war: '10 Years Motor Warranty + 2 Years Comprehensive', featured: false, best: true },
  { brand: 'Samsung', name: 'Samsung 43-inch Crystal 4K Vivid Pro Ultra HD Smart LED TV', price: 28990, mrp: 44900, type: 'Smart TV', cap: '43 Inch (108 cm)', star: '3 Star Energy Rating', power: 'Crystal Processor 4K with PurColor & HDR 10+', war: '2 Years Comprehensive Warranty on Panel', featured: false, best: true },
  { brand: 'Whirlpool', name: 'Whirlpool 7.5kg 5-Star Semi-Automatic Top Load Washing Machine (Grey)', price: 10490, mrp: 14450, type: 'Washing Machine', cap: '7.5 Kg Semi-Automatic', star: '5 Star Energy Rating', power: 'SuperSoak Technology with TurboScrub Station', war: '5 Years Warranty on Wash Motor', featured: false, best: false },
  { brand: 'LG', name: 'LG 1.5 Ton 5-Star AI DUAL Inverter Split AC (TS-Q19YNZE)', price: 46490, mrp: 85990, type: 'Air Conditioner', cap: '1.5 Ton (5000 W)', star: '5 Star BEE Rating', power: 'AI Convertible 6-in-1 Cooling with Ocean Black Protection', war: '10 Years on Compressor + 5 Years on PCB', featured: false, best: true },
  { brand: 'Bosch', name: 'Bosch 7kg 5-Star Inverter Touch Front Load Washing Machine', price: 29990, mrp: 41990, type: 'Washing Machine', cap: '7 Kg Front Load', star: '5 Star BEE Rating', power: 'EcoSilence Drive with Anti-Tangle & Anti-Vibration Design', war: '2 Years Comprehensive + 12 Years Motor Warranty', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung 236L 3-Star Digital Inverter Frost-Free Double Door Refrigerator', price: 24490, mrp: 31990, type: 'Refrigerator', cap: '236 Litres Double Door', star: '3 Star BEE Rating', power: 'Digital Inverter with All-Around Cooling & Coolpack', war: '20 Years Warranty on Digital Inverter Compressor', featured: false, best: true },
  { brand: 'Panasonic', name: 'Panasonic 55-inch 4K Ultra HD Smart LED Google TV (TH-55MX660DX)', price: 39990, mrp: 63990, type: 'Smart TV', cap: '55 Inch (139 cm)', star: 'Google TV Platform', power: '4K Color Engine with Dolby Audio and Vivid Digital Pro', war: '1 Year Comprehensive Warranty', featured: false, best: false },
  { brand: 'IFB', name: 'IFB 30L Convection Microwave Oven with Rotisserie (30BRC2)', price: 15490, mrp: 19990, type: 'Microwave Oven', cap: '30 Litres Convection', star: 'Stainless Steel Cavity', power: '101 Cooking Menus with Motorized Rotisserie & Fermentation', war: '1 Year Machine + 3 Years Magnetron Warranty', featured: false, best: false },
  { brand: 'Haier', name: 'Haier 190L 4-Star Direct Cool Single Door Refrigerator (Marine Peony)', price: 15490, mrp: 21990, type: 'Refrigerator', cap: '190 Litres Single Door', star: '4 Star BEE Rating', power: '1 Hour Icing Technology with Toughened Glass Shelves', war: '10 Years Warranty on Compressor', featured: false, best: false },
  { brand: 'Voltas', name: 'Voltas Beko 8 Place Table Top Dishwasher (DT8S Silver)', price: 18990, mrp: 28990, type: 'Table Top Dishwasher', cap: '8 Place Settings Compact', star: 'A+ Energy Efficiency', power: '6 Wash Programs with Clean & Shine Feature', war: '2 Years Comprehensive + 5 Years Motor Warranty', featured: false, best: true },
  { brand: 'Daikin', name: 'Daikin 1 Ton 3-Star Fixed Speed Split AC (FTL35U)', price: 32990, mrp: 48200, type: 'Air Conditioner', cap: '1.0 Ton (3500 W)', star: '3 Star BEE Rating', power: 'Coanda Airflow with PM 2.5 Filter & Copper Condenser', war: '1 Year Comprehensive + 5 Years on Compressor', featured: false, best: false },
  { brand: 'Godrej', name: 'Godrej 223L 3-Star Nano Shield Inverter Frost Free Double Door Refrigerator', price: 22990, mrp: 29990, type: 'Refrigerator', cap: '223 Litres Double Door', star: '3 Star BEE Rating', power: 'Nano Shield Disinfection Technology with Inverter Compressor', war: '10 Years Compressor Warranty', featured: false, best: false },
  { brand: 'LG', name: 'LG 28L Convection Microwave Oven with Charcoal Lighting Heater (MJ2886BFUM)', price: 21990, mrp: 29990, type: 'Microwave Oven', cap: '28 Litres Convection', star: 'Diet Fry Technology', power: 'Charcoal Lighting Heater with 360 Auto Cook Menus', war: '1 Year on Product + 10 Years on Charcoal Heater', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung 50-inch The Frame QLED 4K Smart TV with Art Mode', price: 69990, mrp: 99900, type: 'Designer QLED TV', cap: '50 Inch (125 cm)', star: 'Customizable Magnetic Bezel', power: 'Matte Display with 100% Color Volume by Quantum Dot', war: '3 Years Comprehensive Warranty', featured: true, best: false },
  { brand: 'Whirlpool', name: 'Whirlpool 7kg 5-Star Stainwash Pro Fully Automatic Top Load Machine', price: 15990, mrp: 21850, type: 'Washing Machine', cap: '7 Kg Top Load', star: '5 Star BEE Rating', power: 'Spiro Wash Action with In-built Heater (Removes 48h Stains)', war: '10 Years Motor Warranty', featured: false, best: true },
  { brand: 'Bosch', name: 'Bosch Serie 4 8kg Inverter Fully Automatic Front Load Washing Machine', price: 34990, mrp: 48990, type: 'Washing Machine', cap: '8 Kg Front Load', star: '5 Star BEE Rating', power: 'SpeedPerfect 65% Less Time Wash with Reload Function', war: '2 Years Comprehensive + 12 Years Motor Warranty', featured: false, best: false },
  { brand: 'Voltas', name: 'Voltas 2 Ton 3-Star Inverter Split AC (243V Vectra Prism)', price: 46990, mrp: 86990, type: 'Air Conditioner', cap: '2.0 Ton (6200 W)', star: '3 Star BEE Rating', power: 'High Ambient Cooling up to 52°C with Copper Condenser', war: '1 Year Comprehensive + 10 Years Compressor', featured: false, best: false },
  { brand: 'LG', name: 'LG 322L 3-Star Smart Inverter Frost-Free Double Door Refrigerator (Shiny Steel)', price: 35990, mrp: 47990, type: 'Refrigerator', cap: '322 Litres Double Door', star: '3 Star BEE Rating', power: 'Door Cooling+ with Multi Air Flow and Smart Diagnosis', war: '10 Years Smart Inverter Compressor Warranty', featured: false, best: true },
  { brand: 'Panasonic', name: 'Panasonic 65-inch 4K Ultra HD Smart LED Google TV with Dolby Vision', price: 54990, mrp: 84990, type: 'Smart TV', cap: '65 Inch (164 cm)', star: 'Google TV System', power: 'Dolby Vision & Atmos with 20W Built-In Speakers', war: '2 Years Comprehensive Warranty', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung 32-inch HD Ready Smart LED TV (UA32T4380AKXXL)', price: 13990, mrp: 18900, type: 'Smart TV', cap: '32 Inch (80 cm)', star: '4 Star Energy Rating', power: 'Hyper Real Engine with Ultra Clean View and Contrast Enhancer', war: '1 Year Comprehensive + 1 Year Additional on Panel', featured: false, best: true },
  { brand: 'IFB', name: 'IFB 6.5kg 5-Star Fully-Automatic Top Load Washing Machine (Aqua Conserve)', price: 16990, mrp: 21490, type: 'Washing Machine', cap: '6.5 Kg Top Load', star: '5 Star BEE Rating', power: 'Aqua Energie Water Softener with Deep Clean Bi-axial Action', war: '4 Years Machine + 10 Years Motor Warranty', featured: false, best: false },
  { brand: 'Haier', name: 'Haier 1.5 Ton 3-Star Triple Inverter Split AC (HSU18T-NMW3B)', price: 32990, mrp: 61000, type: 'Air Conditioner', cap: '1.5 Ton (5000 W)', star: '3 Star BEE Rating', power: 'Frost Self-Clean in 21 mins with 54°C Extreme Cooling', war: '5 Years Comprehensive + 12 Years Compressor', featured: false, best: false },
  { brand: 'Godrej', name: 'Godrej 255L 2-Star Frost Free Double Door Refrigerator (Fossil Steel)', price: 21990, mrp: 28990, type: 'Refrigerator', cap: '255 Litres Double Door', star: '2 Star BEE Rating', power: 'Multi Inverter Technology with Farm Fresh Crisper', war: '10 Years Compressor Warranty', featured: false, best: false },
  { brand: 'Whirlpool', name: 'Whirlpool 20L Solo Microwave Oven with 5 Power Levels (Magicook)', price: 5990, mrp: 8250, type: 'Solo Microwave Oven', cap: '20 Litres Solo', star: 'Energy Efficient Magnetron', power: 'Auto Cook Menus with Defrost & Express Heat', war: '1 Year on Product + 5 Years on Magnetron', featured: false, best: true },
  { brand: 'LG', name: 'LG 655L Frost-Free Inverter Side-by-Side Refrigerator with Water Dispenser', price: 84990, mrp: 124990, type: 'Side by Side Refrigerator', cap: '655 Litres Capacity', star: 'Smart Inverter Compressor', power: 'Multi Air Flow with Express Freeze & External LED Display', war: '10 Years Compressor Warranty', featured: true, best: false },
  { brand: 'Bosch', name: 'Bosch 9kg 5-Star Series 6 Inverter Front Load Washing Machine', price: 41990, mrp: 57990, type: 'Washing Machine', cap: '9 Kg Front Load', star: '5 Star BEE Rating', power: 'ActiveWater Plus with 1400 RPM High Spin Speed', war: '2 Years Comprehensive + 12 Years Motor Warranty', featured: false, best: true },
  { brand: 'Daikin', name: 'Daikin 1.8 Ton 3-Star Inverter Split AC (FTKL60U)', price: 52990, mrp: 74900, type: 'Air Conditioner', cap: '1.8 Ton (6000 W)', star: '3 Star BEE Rating', power: 'Dual Flap Coanda Airflow with Heavy Duty Rotary Compressor', war: '1 Year Comprehensive + 10 Years on Compressor', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung 28L Convection Microwave Oven with Slim Fry (MC28A5145VK)', price: 14490, mrp: 18990, type: 'Microwave Oven', cap: '28 Litres Convection', star: 'Ceramic Enamel Cavity (99.9% Anti-bacterial)', power: 'Slim Fry Tech (Fry without Deep Oil) + Tandoor Feature', war: '1 Year Comprehensive + 10 Years on Cavity', featured: false, best: true },
  { brand: 'Voltas', name: 'Voltas 1 Ton 3-Star Inverter Split AC (123V Vectra Platina)', price: 29990, mrp: 58990, type: 'Air Conditioner', cap: '1.0 Ton (3400 W)', star: '3 Star BEE Rating', power: 'Superdry Mode for High Humidity Monsoons', war: '1 Year Comprehensive + 10 Years Compressor', featured: false, best: false },
  { brand: 'LG', name: 'LG 43-inch 4K Ultra HD Smart LED TV (43UR7500PSC)', price: 31990, mrp: 49990, type: 'Smart TV', cap: '43 Inch (108 cm)', star: 'WebOS 23 with AI ThinQ', power: 'α5 AI Processor 4K Gen6 with 4K Upscaling & HDR10', war: '1 Year Comprehensive + 2 Years on Panel', featured: false, best: true },
  { brand: 'Panasonic', name: 'Panasonic 7kg 5-Star Fully-Automatic Top Load Washing Machine', price: 16490, mrp: 22000, type: 'Washing Machine', cap: '7 Kg Top Load', star: '5 Star BEE Rating', power: 'Aquabeat Agitator with 8 Specialized Wash Cycles', war: '10 Years Motor Warranty', featured: false, best: false },
  { brand: 'Haier', name: 'Haier 325L 3-Star Triple Inverter Frost Free Double Door Refrigerator', price: 32990, mrp: 46990, type: 'Refrigerator', cap: '325 Litres Double Door', star: '3 Star BEE Rating', power: '14-in-1 Convertible Modes with Bottom Mounted Freezer', war: '10 Years Warranty on Compressor', featured: false, best: false },
  { brand: 'IFB', name: 'IFB 24L Solo Microwave Oven with Speed Defrost (24S1)', price: 7490, mrp: 9990, type: 'Solo Microwave Oven', cap: '24 Litres Solo', star: 'Standard Microwave', power: 'Jog Dial Control with 60 Auto Cook Menus', war: '1 Year on Product + 3 Years on Magnetron', featured: false, best: false },
  { brand: 'Godrej', name: 'Godrej 1.5 Ton 5-Star 5-in-1 Convertible Inverter Split AC', price: 36990, mrp: 54900, type: 'Air Conditioner', cap: '1.5 Ton (5100 W)', star: '5 Star BEE Rating', power: '100% Copper with Blue Fin Anti-Corrosion Coating', war: '1 Year Comprehensive + 10 Years Compressor', featured: false, best: false },
  { brand: 'Whirlpool', name: 'Whirlpool 192L 3-Star Direct-Cool Single Door Refrigerator (Sapphire Blue)', price: 14490, mrp: 18450, type: 'Refrigerator', cap: '192 Litres Single Door', star: '3 Star BEE Rating', power: 'Insulated Capillary Tech with Auto-Connect to Home Inverter', war: '10 Years Compressor Warranty', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung 55-inch Crystal 4K Vivid Ultra HD Smart LED TV (55DUE7700)', price: 44990, mrp: 68900, type: 'Smart TV', cap: '55 Inch (138 cm)', star: 'Tizen OS with SmartThings', power: 'Crystal Processor 4K with Motion Xcelerator and Q-Symphony', war: '2 Years Comprehensive Warranty on Panel', featured: false, best: true },
  { brand: 'Bosch', name: 'Bosch 14-Place Settings Built-In Dishwasher with VarioDrawer (SMV46KX01E)', price: 54990, mrp: 68990, type: 'Built-in Dishwasher', cap: '14 Place Settings', star: 'A+++ Energy Efficiency', power: 'HygienePlus Option with AquaStop Leak Protection', war: '2 Years Comprehensive + 10 Years Cavity Rust Warranty', featured: false, best: false },
  { brand: 'LG', name: 'LG 1.0 Ton 5-Star AI DUAL Inverter Split AC (TS-Q13YNZE)', price: 37990, mrp: 68990, type: 'Air Conditioner', cap: '1.0 Ton (3450 W)', star: '5 Star BEE Rating', power: 'AI Convertible 6-in-1 with HD Filter with Anti-Virus', war: '10 Years on Compressor + 5 Years on PCB', featured: false, best: false },
  { brand: 'Panasonic', name: 'Panasonic 23L Convection Microwave Oven with 360° Heat Wrap', price: 10490, mrp: 13990, type: 'Microwave Oven', cap: '23 Litres Convection', star: 'Compact Countertop', power: '61 Auto Cook Menus with Glass Turntable 285mm', war: '1 Year Comprehensive Warranty', featured: false, best: false },
  { brand: 'Haier', name: 'Haier 7.5kg 5-Star Fully-Automatic Top Load Washing Machine', price: 14990, mrp: 22990, type: 'Washing Machine', cap: '7.5 Kg Top Load', star: '5 Star BEE Rating', power: 'Ocean Wave Drum with Near Zero Pressure Technology', war: '10 Years Motor Warranty', featured: false, best: false },
]

export const generateAppliances = (categoryId) => {
  return applianceTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-APP-${num}`
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
      stock: 8 + ((index * 4) % 35),
      rating: +(4.2 + ((index * 2) % 8) * 0.1).toFixed(1),
      reviewCount: 30 + ((index * 48) % 1900),
      images: [img1, img2],
      highlights: [
        `Appliance Type: ${item.type}`,
        `Capacity / Size: ${item.cap}`,
        item.star,
        item.power,
        item.war,
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Appliance Category', value: item.type },
        { group: 'Capacity & Size', name: 'Rated Capacity', value: item.cap },
        { group: 'Energy & Performance', name: 'Energy Rating', value: item.star },
        { group: 'Technology & Features', name: 'Key Innovation', value: item.power },
        { group: 'Warranty', name: 'Manufacturer Coverage', value: item.war },
      ],
      warranty: item.war,
      tags: ['appliance', 'home appliances', item.type.toLowerCase(), item.brand.toLowerCase(), 'electronics'],
      description: `Transform your home living with the energy-efficient ${item.name}. Packed with ${item.power}, durable build quality, and backed by a comprehensive ${item.war}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
