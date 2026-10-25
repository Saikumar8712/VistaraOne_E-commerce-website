import { imagePools } from '../productData.js'

const imgs = imagePools.electronics

const audioAndGadgetTemplates = [
  { brand: 'Sony', name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)', price: 29990, mrp: 34990, type: 'Over-Ear Headphones', bat: '30 Hours Battery with Quick Charge', anc: 'Auto NC Optimizer with Integrated Processor V1', conn: 'Bluetooth 5.2, Multipoint, LDAC', featured: true, best: true },
  { brand: 'Bose', name: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones', price: 35900, mrp: 39900, type: 'Over-Ear Headphones', bat: '24 Hours Playtime', anc: 'CustomTune Technology & World-Class Active Noise Cancelling', conn: 'Bluetooth 5.3 with Snapdragon Sound', featured: true, best: true },
  { brand: 'Apple', name: 'Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)', price: 23900, mrp: 24900, type: 'True Wireless Earbuds', bat: '30 Hours Total with Charging Case', anc: 'Up to 2x more Active Noise Cancellation with H2 Chip', conn: 'Bluetooth 5.3, Apple H2 Chip', featured: true, best: true },
  { brand: 'JBL', name: 'JBL Charge 5 Portable Waterproof Bluetooth Speaker (Squad Green)', price: 14999, mrp: 18999, type: 'Portable Bluetooth Speaker', bat: '20 Hours of Playtime with Built-in Powerbank', anc: 'IP67 Waterproof and Dustproof', conn: 'Bluetooth 5.1 with JBL PartyBoost', featured: false, best: true },
  { brand: 'Sony', name: 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)', price: 24990, mrp: 29990, type: 'True Wireless Earbuds', bat: '24 Hours Battery with Wireless Case', anc: 'Dynamic Driver X & Dual Feedback Microphones', conn: 'Bluetooth 5.3, LDAC, Hi-Res Audio Wireless', featured: false, best: false },
  { brand: 'Marshall', name: 'Marshall Emberton II Portable Bluetooth Speaker (Black and Brass)', price: 17499, mrp: 19999, type: 'Portable Bluetooth Speaker', bat: '30+ Hours of Portable Playtime', anc: 'IP67 Dust- and Water-Resistant', conn: 'Bluetooth 5.1 with Stack Mode', featured: true, best: true },
  { brand: 'Sennheiser', name: 'Sennheiser Momentum 4 Wireless Adaptive ANC Headphones (White)', price: 27990, mrp: 34990, type: 'Over-Ear Headphones', bat: 'Incredible 60-Hour Battery Life', anc: 'Adaptive Noise Cancellation with Transparency Mode', conn: 'Bluetooth 5.2, aptX Adaptive', featured: false, best: false },
  { brand: 'boAt', name: 'boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds (Bold Black)', price: 1299, mrp: 4490, type: 'TWS Earbuds', bat: '42 Hours Playback with ASAP Charge', anc: 'ENx Environmental Noise Cancellation', conn: 'Bluetooth 5.1, BEAST Mode 80ms Low Latency', featured: false, best: true },
  { brand: 'Anker', name: 'Anker 737 Power Bank (PowerCore 24K 140W 3-Port Portable Charger)', price: 12999, mrp: 16999, type: 'High-Power Power Bank', bat: '24,000 mAh Ultra-High Capacity', anc: 'Smart Digital Display with Power Delivery 3.1', conn: '2x USB-C (140W), 1x USB-A (18W)', featured: true, best: false },
  { brand: 'SanDisk', name: 'SanDisk Extreme 1TB Portable External NVMe SSD (Up to 1050MB/s)', price: 9499, mrp: 18000, type: 'External Solid State Drive', bat: 'USB Bus-Powered', anc: '2-Meter Drop Protection and IP55 Water Resistance', conn: 'USB 3.2 Gen 2 Type-C', featured: false, best: true },
  { brand: 'Logitech', name: 'Logitech MX Master 3S Performance Wireless Mouse (Graphite)', price: 8995, mrp: 10995, type: 'Ergonomic Wireless Mouse', bat: '70 Days on Full Charge, USB-C Quick Recharge', anc: 'Quiet Clicks & 8000 DPI Any-Surface Tracking', conn: 'Bluetooth Low Energy & Logi Bolt USB Receiver', featured: true, best: true },
  { brand: 'Logitech', name: 'Logitech MX Mechanical Wireless Illuminated Keyboard (Tactile Quiet)', price: 13995, mrp: 16995, type: 'Wireless Mechanical Keyboard', bat: 'Up to 10 Months with Backlighting Off', anc: 'Smart Illumination with Hand Proximity Sensors', conn: 'Bluetooth & Logi Bolt Wireless', featured: false, best: false },
  { brand: 'boAt', name: 'boAt Stone 1200 14W Bluetooth Speaker with RGB LED Lights', price: 3499, mrp: 6990, type: 'Bluetooth Party Speaker', bat: '9 Hours Playtime with 3600mAh Battery', anc: 'IPX7 Water Resistance', conn: 'Bluetooth v5.0, AUX, USB, FM', featured: false, best: false },
  { brand: 'JBL', name: 'JBL Tune 770NC Wireless Over-Ear NC Headphones (Blue)', price: 5999, mrp: 9999, type: 'Over-Ear Headphones', bat: 'Up to 70 Hours Battery Life', anc: 'Adaptive Noise Cancelling with Smart Ambient', conn: 'Bluetooth 5.3 with Multi-Point Connection', featured: false, best: true },
  { brand: 'Sony', name: 'Sony SRS-XB100 Wireless Extra Bass Ultra-Portable Speaker (Black)', price: 3990, mrp: 4990, type: 'Mini Bluetooth Speaker', bat: 'Up to 16 Hours Battery Life with Indicator', anc: 'IP67 Waterproof and Dustproof with UV Coating', conn: 'Bluetooth 5.3, USB Type-C', featured: false, best: false },
  { brand: 'OnePlus', name: 'OnePlus Buds Pro 2 TWS Earbuds with Spatial Audio (Obsidian Black)', price: 9999, mrp: 13999, type: 'TWS Earbuds', bat: '39 Hours Playback with Warp Charge', anc: 'Smart Adaptive Noise Cancellation up to 48dB', conn: 'Bluetooth 5.3, LHDC 4.0 Lossless', featured: false, best: false },
  { brand: 'Realme', name: 'Realme Buds Air 5 Pro with Coaxial Dual Drivers (Sunrise Beige)', price: 4499, mrp: 7999, type: 'TWS Earbuds', bat: '40 Hours Playback with Fast Charging', anc: '50dB Active Noise Cancellation', conn: 'Bluetooth 5.3, LDAC Hi-Res Audio', featured: false, best: false },
  { brand: 'Portronics', name: 'Portronics Power Plate 7 with 6 AC Sockets & 4 USB Ports', price: 1199, mrp: 2499, type: 'Surge Protector Extension Board', bat: '2500W Max Load with Surge Protection', anc: 'Fire-Resistant Body and Child Safety Shutter', conn: '3-Meter Heavy-Duty Cord', featured: false, best: false },
  { brand: 'Anker', name: 'Anker Nano II 65W GaN II PPS 3-Port Fast Wall Charger', price: 3499, mrp: 4999, type: 'USB-C Wall Charger', bat: 'High Efficiency GaN II Technology', anc: 'ActiveShield 2.0 Dynamic Temperature Sensor', conn: '2x USB-C, 1x USB-A (Supports Laptops & Phones)', featured: false, best: true },
  { brand: 'SanDisk', name: 'SanDisk Ultra Dual Drive Luxe Type-C 128GB Metal Flash Drive', price: 1199, mrp: 2100, type: 'Dual USB Flash Drive', bat: 'Solid Metal Swivel Design', anc: 'Up to 150MB/s Read Speeds', conn: 'Reversible USB Type-C and Traditional Type-A', featured: false, best: false },
  { brand: 'Portronics', name: 'Portronics Kronos Y1 Smartwatch with Bluetooth Calling (Black)', price: 1799, mrp: 3999, type: 'Smart Watch', bat: 'Up to 7 Days Battery on Typical Usage', anc: 'IP67 Water and Sweat Resistance', conn: 'Bluetooth 5.0 Calling with HD Mic', featured: false, best: false },
  { brand: 'Sony', name: 'Sony HT-S20R 5.1ch Dolby Digital Soundbar with Subwoofer (400W)', price: 15990, mrp: 19990, type: '5.1 Home Theatre Soundbar', bat: '400W Total Power Output with Wired Subwoofer', anc: 'Dolby Digital Surround Sound Architecture', conn: 'HDMI ARC, Optical, USB, Bluetooth', featured: true, best: true },
  { brand: 'JBL', name: 'JBL Cinema SB271 2.1 Channel Soundbar with Wireless Subwoofer (220W)', price: 11999, mrp: 16999, type: 'Soundbar with Wireless Sub', bat: '220W Powerful System Sound Output', anc: 'Dedicated Voice Mode for Dialogue Clarity', conn: 'HDMI ARC, Optical, Bluetooth 5.1', featured: false, best: false },
  { brand: 'Bose', name: 'Bose SoundLink Flex Bluetooth Portable Outdoor Speaker (Stone Blue)', price: 13900, mrp: 15900, type: 'Outdoor Portable Speaker', bat: '12 Hours Playtime per Charge', anc: 'PositionIQ Technology and IP67 Waterproof', conn: 'Bluetooth 4.2 with Bose Connect App', featured: false, best: false },
  { brand: 'boAt', name: 'boAt PartyPal 50 20W Bluetooth Speaker with RGB Party Lights', price: 2999, mrp: 6990, type: 'Party Boombox Speaker', bat: 'Up to 4.5 Hours with Bass-Boosting Drivers', anc: 'Karaoke Ready with Microphone Jack', conn: 'Bluetooth v5.1, AUX, USB, TF Card', featured: false, best: false },
  { brand: 'Sennheiser', name: 'Sennheiser HD 450SE Bluetooth 5.0 Wireless Headphones (Black)', price: 7990, mrp: 14990, type: 'Over-Ear Headphones', bat: '30-Hour Battery Life with USB-C Fast Charging', anc: 'Active Noise Cancellation with Alexa Built-in', conn: 'Bluetooth 5.0 with AAC and aptX Low Latency', featured: false, best: false },
  { brand: 'Marshall', name: 'Marshall Acton III Bluetooth Home Speaker (Black)', price: 27999, mrp: 31999, type: 'Home Audio Speaker', bat: 'AC Mains Powered High Fidelity Sound', anc: 'Dynamic Loudness and Room-Filling Stereo Field', conn: 'Bluetooth 5.2, 3.5mm Aux Input', featured: false, best: false },
  { brand: 'Logitech', name: 'Logitech Brio 500 Full HD 1080p Webcam with Auto-Framing (Rose)', price: 9995, mrp: 12995, type: 'Streaming Webcam', bat: 'USB-C Plug and Play', anc: 'Dual Noise-Reducing Beamforming Microphones', conn: 'USB-C 3.0 with Integrated Privacy Shutter', featured: false, best: false },
  { brand: 'Anker', name: 'Anker Soundcore 2 Portable Bluetooth Speaker with 12W Stereo Sound', price: 2999, mrp: 4499, type: 'Bluetooth Speaker', bat: '24-Hour (500-Song) Playtime with BassUp', anc: 'IPX7 Waterproof Protection', conn: 'Bluetooth 5.0 with Wireless Stereo Pairing', featured: false, best: false },
  { brand: 'SanDisk', name: 'SanDisk Ultra microSDXC 256GB Class 10 Memory Card with Adapter', price: 1699, mrp: 4200, type: 'MicroSD Memory Card', bat: 'Shockproof, Temperature-Proof, Waterproof', anc: 'A1 Rated for Faster Mobile App Performance', conn: 'UHS-I Speed Class U1 (Up to 150MB/s)', featured: false, best: true },
  { brand: 'Portronics', name: 'Portronics SoundDrum 1 10W TWS Portable Bluetooth Speaker (Blue)', price: 999, mrp: 2499, type: 'Mini TWS Speaker', bat: '5-6 Hours Playtime with 2000mAh Battery', anc: 'True Wireless Stereo TWS Pairing Support', conn: 'Bluetooth 5.0, Type-C Charging', featured: false, best: false },
  { brand: 'boAt', name: 'boAt Bassheads 100 in-Ear Wired Earphones with Mic (Furious Red)', price: 349, mrp: 999, type: 'Wired Earphones', bat: 'Tangle-Free Cable with 3.5mm Gold Plated Jack', anc: '10mm Dynamic Drivers with Super Extra Bass', conn: '3.5 mm Audio Jack with Inline Microphone', featured: false, best: true },
  { brand: 'JBL', name: 'JBL Go 3 Ultra-Portable Waterproof Bluetooth Speaker (Squad)', price: 2999, mrp: 3999, type: 'Pocket Bluetooth Speaker', bat: '5 Hours of Playtime with Rich JBL Pro Sound', anc: 'IP67 Waterproof and Dustproof with Integrated Loop', conn: 'Bluetooth 5.1 with USB-C Charging', featured: false, best: true },
  { brand: 'Sony', name: 'Sony MDR-ZX110A Wired On-Ear Headphones (White)', price: 990, mrp: 1390, type: 'On-Ear Wired Headphones', bat: 'Swivel Folding Design for Easy Portability', anc: '30mm Dynamic Drivers for Balanced Acoustic Sound', conn: '3.5mm Gold Plated Stereo Mini Plug (1.2m Cable)', featured: false, best: false },
  { brand: 'OnePlus', name: 'OnePlus Bullets Wireless Z2 Bluetooth in-Ear Neckband (Acoustic Red)', price: 1799, mrp: 2299, type: 'Wireless Neckband', bat: '30 Hours Battery with 10-Min Fast Charge for 20 Hours', anc: 'Anti-distortion Audio Technology & 12.4mm Drivers', conn: 'Bluetooth v5.0, IP55 Water & Sweat Resistance', featured: false, best: true },
  { brand: 'Realme', name: 'Realme Buds Wireless 3 in-Ear Bluetooth Neckband (Bass Yellow)', price: 1699, mrp: 2999, type: 'Wireless Neckband', bat: '40 Hours Total Playback Time', anc: '30dB Active Noise Cancellation & 360 Spatial Audio', conn: 'Bluetooth 5.3, 13.6mm Dynamic Bass Drivers', featured: false, best: false },
  { brand: 'Logitech', name: 'Logitech K380 Multi-Device Bluetooth Wireless Keyboard (Off-White)', price: 2895, mrp: 3495, type: 'Multi-Device Keyboard', bat: '2 Years Battery Life with 2x AAA Batteries', anc: 'Compact Layout with Comfortable Scoop Keys', conn: 'Bluetooth Easy-Switch for up to 3 Devices', featured: false, best: false },
  { brand: 'Anker', name: 'Anker Powerline+ II Lightning to USB-C Cable (6ft, MFi Certified)', price: 1499, mrp: 2199, type: 'Fast Charging Cable', bat: 'Double-Braided Nylon Cable withstands 30,000 Bends', anc: 'Apple MFi Certified with Ultra-Durable Connectors', conn: 'Lightning to USB-C Power Delivery Compatible', featured: false, best: false },
  { brand: 'Portronics', name: 'Portronics Toad One Bluetooth Optical Mouse with Rechargeable Battery', price: 549, mrp: 1299, type: 'Optical Mouse', bat: 'Rechargeable with Type-C Port (Up to 30 Days)', anc: 'Silent Click Buttons with Adjustable DPI up to 1600', conn: 'Dual Mode: Bluetooth 5.3 + 2.4GHz Wireless Dongle', featured: false, best: false },
  { brand: 'SanDisk', name: 'SanDisk 64GB Cruzer Blade USB 2.0 Flash Drive (Black/Red)', price: 349, mrp: 650, type: 'USB Flash Drive', bat: 'Compact, Featherlight Design', anc: 'SanDisk SecureAccess Software with 128-bit Encryption', conn: 'Standard USB 2.0 Type-A', featured: false, best: true },
  { brand: 'boAt', name: 'boAt Wave Call 2 Smartwatch with 1.83-inch HD Display (Active Black)', price: 1299, mrp: 6990, type: 'Smartwatch', bat: 'Up to 5 Days Battery Life with Bluetooth Calling', anc: '700+ Active Modes & Watch Face Studio', conn: 'Bluetooth 5.2 Calling with Dial Pad', featured: false, best: false },
  { brand: 'JBL', name: 'JBL Wave Beam True Wireless in-Ear Earbuds with Deep Bass (White)', price: 2999, mrp: 4999, type: 'TWS Earbuds', bat: '32 Hours Total Playback (8h earbuds + 24h case)', anc: 'Smart Ambient & TalkThru Technology', conn: 'Bluetooth 5.2, IP54 Water and Dust Resistant', featured: false, best: false },
  { brand: 'Sony', name: 'Sony WI-C100 Wireless in-Ear Bluetooth Headphones (Blue)', price: 1699, mrp: 2790, type: 'Wireless Neckband', bat: '25 Hours Battery Life with DSEE Audio Restoration', anc: 'IPX4 Splash-Proof and Sweat-Proof Design', conn: 'Bluetooth 5.0 with Sony Headphones Connect App', featured: false, best: false },
  { brand: 'Marshall', name: 'Marshall Willen Portable Bluetooth Speaker (Cream)', price: 9999, mrp: 11999, type: 'Mini Rugged Speaker', bat: '15+ Hours of Portable Playtime', anc: 'IP67 Dust and Water Resistance with Fastening Strap', conn: 'Bluetooth 5.1 with Built-in Microphone for Calls', featured: false, best: false },
  { brand: 'Sennheiser', name: 'Sennheiser IE 200 in-Ear Audiophile Wired Earphones', price: 9990, mrp: 14990, type: 'Audiophile Earphones', bat: 'Gold-Plated MMCX Connectors with Braided Cable', anc: '7mm TrueResponse Transducers with Dual-Tuning Feature', conn: '3.5mm Angled Stereo Connector', featured: false, best: false },
  { brand: 'Portronics', name: 'Portronics Dash 12 60W Wireless Bluetooth Boombox Speaker', price: 3999, mrp: 7999, type: 'Karaoke Party Speaker', bat: 'Up to 6 Hours with Wireless VHF Microphone', anc: 'Built-in RGB Lighting with Multiple EQ Modes', conn: 'Bluetooth 5.0, USB, AUX, Micro SD', featured: false, best: false },
  { brand: 'Anker', name: 'Anker 310 USB-C to USB-C 60W Fast Charging Braided Cable (3ft)', price: 699, mrp: 999, type: 'USB-C Cable', bat: 'Supports Power Delivery Fast Charging up to 60W', anc: 'Tested to Withstand 10,000+ Bends', conn: 'USB-C to USB-C 2.0 480Mbps Data Transfer', featured: false, best: false },
  { brand: 'Logitech', name: 'Logitech H111 Stereo Wired Headset with Noise-Cancelling Mic', price: 745, mrp: 995, type: 'Office Headset', bat: 'Lightweight Over-the-Head Band with Foam Ear Cups', anc: 'Rotating Noise-Cancelling Microphone', conn: 'Standard 3.5mm Audio In / Out Jack', featured: false, best: false },
  { brand: 'Realme', name: 'Realme 10000mAh 12W Power Bank 2 (Yellow)', price: 999, mrp: 1699, type: 'Portable Power Bank', bat: '10,000 mAh High-Density Lithium-Polymer', anc: '14-Layer Circuit Protection against Overheating', conn: 'Dual USB-A Output with 1x Micro-USB & Type-C Input', featured: false, best: false },
  { brand: 'Sony', name: 'Sony PlayStation DualSense Wireless Controller (Midnight Black)', price: 5490, mrp: 6390, type: 'Gaming Controller', bat: 'Built-in Rechargeable Battery with USB Type-C', anc: 'Haptic Feedback and Dynamic Adaptive Triggers', conn: 'Bluetooth Wireless / USB-C Wired Connection', featured: true, best: true },
]

export const generateElectronics = (categoryId) => {
  return audioAndGadgetTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-ELE-${num}`
    const slug = `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${sku.toLowerCase()}`
    const img1 = imgs[index % imgs.length]
    const img2 = imgs[(index + 4) % imgs.length]

    return {
      name: item.name,
      slug,
      sku,
      brand: item.brand,
      category: categoryId,
      price: item.price,
      originalPrice: item.mrp,
      stock: 20 + ((index * 9) % 80),
      rating: +(4.0 + ((index * 2) % 10) * 0.1).toFixed(1),
      reviewCount: 40 + ((index * 83) % 3500),
      images: [img1, img2],
      highlights: [
        `Category: ${item.type}`,
        item.bat,
        item.anc,
        item.conn,
        'Original Brand Warranty Included',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Product Type', value: item.type },
        { group: 'Power & Battery', name: 'Battery / Power Details', value: item.bat },
        { group: 'Audio & Features', name: 'Special Feature / Sound', value: item.anc },
        { group: 'Connectivity', name: 'Interface & Connectivity', value: item.conn },
      ],
      warranty: '1 Year Manufacturer Warranty',
      tags: ['electronics', 'gadgets', 'audio', item.brand.toLowerCase(), 'accessories', 'headphones', 'bluetooth'],
      description: `Elevate your digital lifestyle with the genuine ${item.name}. Engineered for clarity, longevity, and effortless setup across all your smartphones, laptops, and tablets.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
