import { imagePools } from '../productData.js'

const imgs = imagePools.mobiles

const mobileTemplates = [
  { brand: 'Samsung', name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)', price: 129999, mrp: 134999, ram: '12 GB', storage: '256 GB', disp: '6.8 Inch QHD+ AMOLED 120Hz', bat: '5000 mAh', cam: '200MP + 50MP + 12MP + 10MP | 12MP Front', soc: 'Snapdragon 8 Gen 3', featured: true, best: true },
  { brand: 'Apple', name: 'Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)', price: 154990, mrp: 159900, ram: '8 GB', storage: '256 GB', disp: '6.7 Inch Super Retina XDR OLED', bat: '4422 mAh', cam: '48MP + 12MP + 12MP | 12MP TrueDepth', soc: 'A17 Pro Chip', featured: true, best: true },
  { brand: 'OnePlus', name: 'OnePlus 12 5G (Flowy Emerald, 512 GB)', price: 69999, mrp: 74999, ram: '16 GB', storage: '512 GB', disp: '6.82 Inch 2K ProXDR 120Hz', bat: '5400 mAh 100W SUPERVOOC', cam: '50MP + 48MP + 64MP Hasselblad', soc: 'Snapdragon 8 Gen 3', featured: true, best: true },
  { brand: 'Google', name: 'Google Pixel 8 Pro (Bay Blue, 128 GB)', price: 98999, mrp: 106999, ram: '12 GB', storage: '128 GB', disp: '6.7 Inch Super Actua OLED', bat: '5050 mAh 30W Fast Charge', cam: '50MP + 48MP + 48MP | 10.5MP Front', soc: 'Google Tensor G3', featured: true, best: false },
  { brand: 'Xiaomi', name: 'Xiaomi 14 Ultra 5G (Black, 512 GB)', price: 99999, mrp: 119999, ram: '16 GB', storage: '512 GB', disp: '6.73 Inch WQHD+ LTPO AMOLED', bat: '5000 mAh 90W HyperCharge', cam: '50MP Quad Leica Camera System', soc: 'Snapdragon 8 Gen 3', featured: true, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy S24 Plus 5G (Cobalt Violet, 256 GB)', price: 99999, mrp: 109999, ram: '12 GB', storage: '256 GB', disp: '6.7 Inch QHD+ Dynamic AMOLED 2X', bat: '4900 mAh', cam: '50MP + 12MP + 10MP | 12MP Front', soc: 'Exynos 2400 Deca-Core', featured: false, best: true },
  { brand: 'Apple', name: 'Apple iPhone 15 (Black, 128 GB)', price: 71999, mrp: 79900, ram: '6 GB', storage: '128 GB', disp: '6.1 Inch Super Retina XDR', bat: '3349 mAh', cam: '48MP + 12MP | 12MP Front', soc: 'A16 Bionic Chip', featured: true, best: true },
  { brand: 'OnePlus', name: 'OnePlus 12R 5G (Cool Blue, 256 GB)', price: 42999, mrp: 45999, ram: '16 GB', storage: '256 GB', disp: '6.78 Inch 1.5K AMOLED 120Hz', bat: '5500 mAh 100W SUPERVOOC', cam: '50MP Sony IMX890 + 8MP + 2MP', soc: 'Snapdragon 8 Gen 2', featured: false, best: true },
  { brand: 'Nothing', name: 'Nothing Phone (2) (Dark Grey, 256 GB)', price: 36999, mrp: 49999, ram: '12 GB', storage: '256 GB', disp: '6.7 Inch LTPO OLED 120Hz', bat: '4700 mAh 45W Charge', cam: '50MP Sony IMX890 + 50MP Ultra-Wide', soc: 'Snapdragon 8+ Gen 1', featured: false, best: false },
  { brand: 'Vivo', name: 'Vivo X100 Pro 5G (Asteroid Black, 512 GB)', price: 89999, mrp: 99999, ram: '16 GB', storage: '512 GB', disp: '6.78 Inch 1.5K LTPO AMOLED', bat: '5400 mAh 100W FlashCharge', cam: '50MP 1-inch ZEISS APO Telephoto', soc: 'Dimensity 9300 Flagship', featured: false, best: false },
  { brand: 'iQOO', name: 'iQOO 12 5G (Legend Edition, 256 GB)', price: 52999, mrp: 59999, ram: '12 GB', storage: '256 GB', disp: '6.78 Inch 144Hz LTPO AMOLED', bat: '5000 mAh 120W FlashCharge', cam: '50MP + 50MP + 64MP Periscope', soc: 'Snapdragon 8 Gen 3', featured: false, best: true },
  { brand: 'Motorola', name: 'Motorola Edge 50 Pro (Luxe Lavender, 256 GB)', price: 31999, mrp: 36999, ram: '12 GB', storage: '256 GB', disp: '6.7 Inch 1.5K 144Hz pOLED', bat: '4500 mAh 125W TurboPower', cam: '50MP OIS + 13MP + 10MP Telephoto', soc: 'Snapdragon 7 Gen 3', featured: false, best: false },
  { brand: 'Realme', name: 'Realme 12 Pro+ 5G (Submarine Blue, 256 GB)', price: 29999, mrp: 34999, ram: '12 GB', storage: '256 GB', disp: '6.7 Inch 120Hz Curved Vision OLED', bat: '5000 mAh 67W SUPERVOOC', cam: '64MP Periscope Portrait + 50MP Sony', soc: 'Snapdragon 7s Gen 2', featured: false, best: false },
  { brand: 'Xiaomi', name: 'Redmi Note 13 Pro+ 5G (Fusion Purple, 256 GB)', price: 30999, mrp: 35999, ram: '12 GB', storage: '256 GB', disp: '6.67 Inch 1.5K Curved 120Hz AMOLED', bat: '5000 mAh 120W HyperCharge', cam: '200MP OIS Ultra-Clear Camera', soc: 'Dimensity 7200-Ultra', featured: false, best: true },
  { brand: 'Apple', name: 'Apple iPhone 14 (Starlight, 128 GB)', price: 58999, mrp: 69900, ram: '6 GB', storage: '128 GB', disp: '6.1 Inch Super Retina XDR', bat: '3279 mAh', cam: '12MP Dual Camera System', soc: 'A15 Bionic Chip', featured: false, best: true },
  { brand: 'Samsung', name: 'Samsung Galaxy A55 5G (Awesome Iceblue, 128 GB)', price: 39999, mrp: 42999, ram: '8 GB', storage: '128 GB', disp: '6.6 Inch Super AMOLED 120Hz', bat: '5000 mAh 25W Fast Charge', cam: '50MP OIS + 12MP + 5MP', soc: 'Exynos 1480 Octa-Core', featured: false, best: false },
  { brand: 'OnePlus', name: 'OnePlus Nord 4 5G (Mercurial Silver, 256 GB)', price: 32999, mrp: 35999, ram: '12 GB', storage: '256 GB', disp: '6.74 Inch 1.5K AMOLED 120Hz', bat: '5500 mAh 100W SUPERVOOC', cam: '50MP Sony LYT-600 OIS + 8MP', soc: 'Snapdragon 7+ Gen 3', featured: false, best: true },
  { brand: 'Google', name: 'Google Pixel 7a (Charcoal, 128 GB)', price: 36999, mrp: 43999, ram: '8 GB', storage: '128 GB', disp: '6.1 Inch Smooth Display 90Hz OLED', bat: '4385 mAh Fast Charge', cam: '64MP Quad Bayer + 13MP Ultra-Wide', soc: 'Google Tensor G2', featured: false, best: false },
  { brand: 'Vivo', name: 'Vivo V30 Pro 5G (Andaman Blue, 256 GB)', price: 41999, mrp: 46999, ram: '12 GB', storage: '256 GB', disp: '6.78 Inch 1.5K 120Hz 3D Curved AMOLED', bat: '5000 mAh 80W FlashCharge', cam: '50MP ZEISS Professional Portrait', soc: 'Dimensity 8200 5G', featured: false, best: false },
  { brand: 'Motorola', name: 'Motorola Razr 40 Ultra (Infinite Black, 256 GB)', price: 69999, mrp: 89999, ram: '8 GB', storage: '256 GB', disp: '6.9 Inch Foldable LTPO pOLED 165Hz', bat: '3800 mAh 33W TurboPower', cam: '12MP OIS + 13MP Ultra-Wide', soc: 'Snapdragon 8+ Gen 1', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy Z Fold 5 5G (Icy Blue, 512 GB)', price: 164999, mrp: 169999, ram: '12 GB', storage: '512 GB', disp: '7.6 Inch QXGA+ Dynamic AMOLED 2X', bat: '4400 mAh Dual Battery', cam: '50MP + 12MP + 10MP Telephoto', soc: 'Snapdragon 8 Gen 2 for Galaxy', featured: true, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy Z Flip 5 5G (Mint, 256 GB)', price: 89999, mrp: 99999, ram: '8 GB', storage: '256 GB', disp: '6.7 Inch FHD+ Foldable AMOLED 120Hz', bat: '3700 mAh Fast Wireless', cam: '12MP Dual OIS Camera', soc: 'Snapdragon 8 Gen 2 for Galaxy', featured: false, best: false },
  { brand: 'POCO', name: 'POCO X6 Pro 5G (Racing Yellow, 256 GB)', price: 23999, mrp: 28999, ram: '8 GB', storage: '256 GB', disp: '6.67 Inch 1.5K Flow AMOLED 120Hz', bat: '5000 mAh 67W Turbo Charge', cam: '64MP OIS Triple Camera', soc: 'Dimensity 8300-Ultra', featured: false, best: true },
  { brand: 'Realme', name: 'Realme Narzo 70 Pro 5G (Glass Green, 128 GB)', price: 18999, mrp: 21999, ram: '8 GB', storage: '128 GB', disp: '6.67 Inch 120Hz AMOLED', bat: '5000 mAh 67W SUPERVOOC', cam: '50MP Flagship Sony IMX890 OIS', soc: 'Dimensity 7050 5G', featured: false, best: false },
  { brand: 'iQOO', name: 'iQOO Neo 9 Pro 5G (Fiery Red, 256 GB)', price: 36999, mrp: 41999, ram: '8 GB', storage: '256 GB', disp: '6.78 Inch 1.5K 144Hz LTPO AMOLED', bat: '5160 mAh 120W FlashCharge', cam: '50MP Sony IMX920 + 8MP', soc: 'Snapdragon 8 Gen 2', featured: false, best: true },
  { brand: 'Motorola', name: 'Motorola Edge 40 Neo (Caneel Bay, 128 GB)', price: 22999, mrp: 27999, ram: '8 GB', storage: '128 GB', disp: '6.55 Inch 144Hz 3D Curved pOLED', bat: '5000 mAh 68W TurboPower', cam: '50MP OIS + 13MP Macro Vision', soc: 'Dimensity 7030 Octa-Core', featured: false, best: false },
  { brand: 'Nothing', name: 'Nothing Phone (2a) (Milk White, 128 GB)', price: 23999, mrp: 25999, ram: '8 GB', storage: '128 GB', disp: '6.7 Inch Flexible AMOLED 120Hz', bat: '5000 mAh 45W Fast Charging', cam: '50MP OIS + 50MP Ultra-Wide', soc: 'Dimensity 7200 Pro', featured: false, best: true },
  { brand: 'Samsung', name: 'Samsung Galaxy S23 FE 5G (Graphite, 128 GB)', price: 44999, mrp: 59999, ram: '8 GB', storage: '128 GB', disp: '6.4 Inch Dynamic AMOLED 2X 120Hz', bat: '4500 mAh Fast Charge', cam: '50MP + 12MP + 8MP 3x Optical', soc: 'Exynos 2200 Octa-Core', featured: false, best: false },
  { brand: 'Apple', name: 'Apple iPhone 13 (Midnight Blue, 128 GB)', price: 48999, mrp: 59900, ram: '4 GB', storage: '128 GB', disp: '6.1 Inch Super Retina XDR', bat: '3227 mAh', cam: '12MP Dual Optical Sensor-Shift', soc: 'A15 Bionic Chip', featured: false, best: true },
  { brand: 'Xiaomi', name: 'Redmi 13C 5G (Startrail Green, 128 GB)', price: 10499, mrp: 13999, ram: '4 GB', storage: '128 GB', disp: '6.74 Inch 90Hz Dot Drop Display', bat: '5000 mAh 18W Fast Charge', cam: '50MP AI Dual Camera', soc: 'Dimensity 6100+ 5G', featured: false, best: false },
  { brand: 'Vivo', name: 'Vivo T3 5G (Cosmic Blue, 128 GB)', price: 19999, mrp: 22999, ram: '8 GB', storage: '128 GB', disp: '6.67 Inch 120Hz Ultra Vision AMOLED', bat: '5000 mAh 44W FlashCharge', cam: '50MP Sony IMX882 OIS Camera', soc: 'Dimensity 7200 5G', featured: false, best: false },
  { brand: 'Realme', name: 'Realme C67 5G (Sunny Oasis, 128 GB)', price: 11999, mrp: 14999, ram: '4 GB', storage: '128 GB', disp: '6.72 Inch 120Hz Ultra Smooth Display', bat: '5000 mAh 33W SUPERVOOC', cam: '50MP AI Camera', soc: 'Dimensity 6100+ 6nm', featured: false, best: false },
  { brand: 'POCO', name: 'POCO M6 Pro 5G (Power Black, 128 GB)', price: 11499, mrp: 14999, ram: '6 GB', storage: '128 GB', disp: '6.79 Inch 90Hz FHD+ Display', bat: '5000 mAh 18W Charge', cam: '50MP AI Dual Camera', soc: 'Snapdragon 4 Gen 2', featured: false, best: false },
  { brand: 'Motorola', name: 'Motorola G84 5G (Viva Magenta, 256 GB)', price: 18999, mrp: 22999, ram: '12 GB', storage: '256 GB', disp: '6.55 Inch 120Hz 10-bit pOLED', bat: '5000 mAh 30W TurboPower', cam: '50MP OIS + 8MP Ultra-Wide', soc: 'Snapdragon 695 5G', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy M34 5G (Prism Silver, 128 GB)', price: 15999, mrp: 24499, ram: '6 GB', storage: '128 GB', disp: '6.5 Inch 120Hz Super AMOLED', bat: '6000 mAh Monster Battery', cam: '50MP No Shake OIS Camera', soc: 'Exynos 1280 5nm', featured: false, best: true },
  { brand: 'OnePlus', name: 'OnePlus Nord CE 4 Lite 5G (Super Silver, 128 GB)', price: 19999, mrp: 20999, ram: '8 GB', storage: '128 GB', disp: '6.67 Inch 120Hz AMOLED 2100 nits', bat: '5500 mAh 80W SUPERVOOC', cam: '50MP Sony LYT-600 OIS', soc: 'Snapdragon 695 5G', featured: false, best: false },
  { brand: 'iQOO', name: 'iQOO Z9 5G (Brushed Green, 128 GB)', price: 19999, mrp: 24999, ram: '8 GB', storage: '128 GB', disp: '6.67 Inch 120Hz AMOLED Display', bat: '5000 mAh 44W FlashCharge', cam: '50MP Sony IMX882 OIS', soc: 'Dimensity 7200 4nm', featured: false, best: false },
  { brand: 'Realme', name: 'Realme 12x 5G (Twilight Purple, 128 GB)', price: 12999, mrp: 16999, ram: '6 GB', storage: '128 GB', disp: '6.72 Inch 120Hz Eye Comfort Display', bat: '5000 mAh 45W SUPERVOOC', cam: '50MP AI Camera', soc: 'Dimensity 6100+ 5G', featured: false, best: false },
  { brand: 'Vivo', name: 'Vivo Y200e 5G (Saffron Delight, 128 GB)', price: 20999, mrp: 25999, ram: '8 GB', storage: '128 GB', disp: '6.67 Inch 120Hz Ultra Vision AMOLED', bat: '5000 mAh 44W FlashCharge', cam: '50MP Portrait + 2MP Bokeh', soc: 'Snapdragon 4 Gen 2 4nm', featured: false, best: false },
  { brand: 'Lava', name: 'Lava Agni 2 5G (Glass Viridian, 256 GB)', price: 17999, mrp: 25999, ram: '8 GB', storage: '256 GB', disp: '6.78 Inch 120Hz Curved AMOLED', bat: '4700 mAh 66W SuperFast', cam: '50MP Quad Camera System', soc: 'Dimensity 7050 Octa-Core', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy A35 5G (Awesome Navy, 128 GB)', price: 27999, mrp: 33999, ram: '8 GB', storage: '128 GB', disp: '6.6 Inch Super AMOLED 120Hz', bat: '5000 mAh 25W Fast Charge', cam: '50MP OIS Triple Camera', soc: 'Exynos 1380 Octa-Core', featured: false, best: false },
  { brand: 'Xiaomi', name: 'Redmi Note 13 5G (Prism Gold, 128 GB)', price: 16999, mrp: 20999, ram: '6 GB', storage: '128 GB', disp: '6.67 Inch 120Hz Super-Slim AMOLED', bat: '5000 mAh 33W Fast Charge', cam: '108MP 3X In-Sensor Zoom', soc: 'Dimensity 6080 5G', featured: false, best: false },
  { brand: 'Apple', name: 'Apple iPhone 15 Plus (Pink, 128 GB)', price: 81999, mrp: 89900, ram: '6 GB', storage: '128 GB', disp: '6.7 Inch Super Retina XDR', bat: '4383 mAh All-Day Battery', cam: '48MP + 12MP Dual Camera', soc: 'A16 Bionic Chip', featured: false, best: false },
  { brand: 'Google', name: 'Google Pixel 8 (Hazel, 128 GB)', price: 71999, mrp: 75999, ram: '8 GB', storage: '128 GB', disp: '6.2 Inch Actua OLED 120Hz', bat: '4575 mAh 27W Fast Charge', cam: '50MP Octa PD + 12MP Ultra-Wide', soc: 'Google Tensor G3', featured: false, best: false },
  { brand: 'OnePlus', name: 'OnePlus Open Foldable 5G (Emerald Dusk, 512 GB)', price: 139999, mrp: 149999, ram: '16 GB', storage: '512 GB', disp: '7.82 Inch 2K Flexi-fluid AMOLED', bat: '4805 mAh 67W SUPERVOOC', cam: '48MP Sony LYT-T808 + 64MP 3X Periscope', soc: 'Snapdragon 8 Gen 2', featured: true, best: false },
  { brand: 'Motorola', name: 'Motorola G54 5G (Pearl Blue, 128 GB)', price: 13999, mrp: 17999, ram: '8 GB', storage: '128 GB', disp: '6.5 Inch 120Hz FHD+ Display', bat: '6000 mAh TurboPower 33W', cam: '50MP OIS Quad Pixel', soc: 'Dimensity 7020 5G', featured: false, best: false },
  { brand: 'POCO', name: 'POCO F6 5G (Titanium Black, 256 GB)', price: 29999, mrp: 33999, ram: '8 GB', storage: '256 GB', disp: '6.67 Inch 1.5K 120Hz CrystalRes AMOLED', bat: '5000 mAh 90W Turbo Charge', cam: '50MP Sony IMX882 OIS', soc: 'Snapdragon 8s Gen 3', featured: false, best: true },
  { brand: 'Vivo', name: 'Vivo V29 5G (Himalayan Blue, 128 GB)', price: 31999, mrp: 37999, ram: '8 GB', storage: '128 GB', disp: '6.78 Inch 1.5K 120Hz 3D Curved Display', bat: '4600 mAh 80W FlashCharge', cam: '50MP OIS Night Camera with Aura Light', soc: 'Snapdragon 778G 5G', featured: false, best: false },
  { brand: 'Realme', name: 'Realme GT 6T 5G (Razor Green, 256 GB)', price: 32999, mrp: 35999, ram: '8 GB', storage: '256 GB', disp: '6.78 Inch 120Hz 8T LTPO AMOLED 6000 nits', bat: '5500 mAh 120W SUPERVOOC', cam: '50MP Sony OIS Camera', soc: 'Snapdragon 7+ Gen 3', featured: false, best: true },
  { brand: 'Samsung', name: 'Samsung Galaxy F54 5G (Meteor Blue, 256 GB)', price: 22999, mrp: 35999, ram: '8 GB', storage: '256 GB', disp: '6.7 Inch 120Hz FHD+ Super AMOLED+', bat: '6000 mAh Super Battery', cam: '108MP No Shake OIS Camera', soc: 'Exynos 1380 Octa-Core', featured: false, best: false },
]

export const generateMobiles = (categoryId) => {
  return mobileTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-MOB-${num}`
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
      stock: 15 + ((index * 7) % 70),
      rating: +(4.1 + ((index * 3) % 9) * 0.1).toFixed(1),
      reviewCount: 45 + ((index * 73) % 2800),
      images: [img1, img2],
      highlights: [
        `${item.ram} RAM | ${item.storage} Internal Storage`,
        item.disp,
        item.cam,
        item.bat,
        item.soc,
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Model Name', value: item.name.split(' (')[0] },
        { group: 'General', name: 'SIM Type', value: 'Dual SIM (nano+nano / eSIM)' },
        { group: 'Display', name: 'Display Size & Type', value: item.disp },
        { group: 'Memory & Storage', name: 'RAM', value: item.ram },
        { group: 'Memory & Storage', name: 'Internal Storage', value: item.storage },
        { group: 'Camera', name: 'Primary Camera System', value: item.cam },
        { group: 'Battery & Power', name: 'Battery Capacity', value: item.bat },
        { group: 'Processor', name: 'Chipset Processor', value: item.soc },
        { group: 'Connectivity', name: 'Network Support', value: '5G, 4G VoLTE, Wi-Fi 6, Bluetooth 5.3' },
      ],
      warranty: '1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories',
      tags: ['mobile', 'smartphone', '5g', item.brand.toLowerCase(), 'phone', 'android', 'flagship'],
      description: `Experience cutting-edge smartphone technology with the ${item.name}. Featuring a vivid ${item.disp}, blazing fast ${item.soc}, and professional-grade ${item.cam} for all-day performance and photography.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
