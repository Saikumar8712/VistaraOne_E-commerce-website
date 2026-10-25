import { imagePools } from '../productData.js'

const imgs = imagePools.laptops

const laptopTemplates = [
  { brand: 'Apple', name: 'Apple MacBook Air M3 (13.6-inch, 16GB, 512GB SSD, Midnight)', price: 134900, mrp: 139900, cpu: 'Apple M3 Chip (8-Core CPU, 10-Core GPU)', ram: '16 GB Unified Memory', ssd: '512 GB SSD', disp: '13.6 Inch Liquid Retina Display', os: 'macOS Sonoma', gpu: 'Integrated 10-Core GPU', featured: true, best: true },
  { brand: 'Apple', name: 'Apple MacBook Pro 14 M3 Pro (18GB, 512GB SSD, Space Black)', price: 199900, mrp: 209900, cpu: 'Apple M3 Pro (11-Core CPU, 14-Core GPU)', ram: '18 GB Unified Memory', ssd: '512 GB SSD', disp: '14.2 Inch Liquid Retina XDR 120Hz ProMotion', os: 'macOS Sonoma', gpu: 'Integrated 14-Core GPU', featured: true, best: true },
  { brand: 'Dell', name: 'Dell XPS 13 Plus 9320 (Intel Core Ultra 7, 16GB, 1TB SSD)', price: 154990, mrp: 169990, cpu: 'Intel Core Ultra 7 155H (16 Cores, up to 4.8 GHz)', ram: '16 GB LPDDR5x', ssd: '1 TB PCIe NVMe SSD', disp: '13.4 Inch 3.5K OLED Touch Display', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: true, best: false },
  { brand: 'HP', name: 'HP Spectre x360 2-in-1 14 (Intel Core Ultra 7, 32GB, 1TB SSD)', price: 164990, mrp: 179990, cpu: 'Intel Core Ultra 7 155H with Intel AI Boost NPU', ram: '32 GB LPDDR5x', ssd: '1 TB Gen4 NVMe M.2 SSD', disp: '14 Inch 2.8K 120Hz OLED Touchscreen', os: 'Windows 11 Home + MS Office', gpu: 'Intel Arc Graphics', featured: true, best: true },
  { brand: 'Lenovo', name: 'Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7, 16GB, 512GB SSD)', price: 174990, mrp: 189990, cpu: 'Intel Core Ultra 7 155U with vPro Enterprise', ram: '16 GB LPDDR5x', ssd: '512 GB PCIe 4.0 NVMe SSD', disp: '14 Inch WUXGA IPS Anti-Glare 400 nits', os: 'Windows 11 Pro 64-bit', gpu: 'Intel Graphics', featured: false, best: true },
  { brand: 'ASUS', name: 'ASUS ROG Zephyrus G14 (AMD Ryzen 9, RTX 4070, 16GB, 1TB SSD)', price: 179990, mrp: 199990, cpu: 'AMD Ryzen 9 8945HS (8 Cores, 16 Threads, 5.2 GHz)', ram: '16 GB LPDDR5X', ssd: '1 TB M.2 NVMe PCIe 4.0 SSD', disp: '14 Inch 3K 120Hz OLED ROG Nebula Display', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6', featured: true, best: true },
  { brand: 'Acer', name: 'Acer Predator Helios 16 (Intel Core i9 14th Gen, RTX 4080, 32GB, 1TB)', price: 219990, mrp: 249990, cpu: 'Intel Core i9-14900HX (24 Cores, 32 Threads)', ram: '32 GB DDR5 5600MHz', ssd: '1 TB PCIe Gen4 NVMe SSD', disp: '16 Inch WQXGA 240Hz IPS Display', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4080 12GB GDDR6', featured: false, best: false },
  { brand: 'Apple', name: 'Apple MacBook Air M2 (15.3-inch, 8GB, 256GB SSD, Starlight)', price: 104900, mrp: 119900, cpu: 'Apple M2 Chip (8-Core CPU, 10-Core GPU)', ram: '8 GB Unified Memory', ssd: '256 GB SSD', disp: '15.3 Inch Liquid Retina Display', os: 'macOS Sonoma', gpu: 'Integrated 10-Core GPU', featured: false, best: true },
  { brand: 'Dell', name: 'Dell Inspiron 15 3520 (Intel Core i5 12th Gen, 16GB, 512GB SSD)', price: 47990, mrp: 61990, cpu: 'Intel Core i5-1235U 12th Gen (10 Cores, up to 4.4 GHz)', ram: '16 GB DDR4 2666MHz', ssd: '512 GB M.2 PCIe NVMe SSD', disp: '15.6 Inch FHD 120Hz WVA Anti-Glare', os: 'Windows 11 Home + MS Office', gpu: 'Intel Iris Xe Graphics', featured: false, best: true },
  { brand: 'HP', name: 'HP Pavilion 14 (Intel Core i5 13th Gen, 16GB, 512GB SSD, Silver)', price: 62990, mrp: 74990, cpu: 'Intel Core i5-1335U 13th Gen (10 Cores, 12 Threads)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB PCIe NVMe M.2 SSD', disp: '14 Inch FHD IPS Micro-Edge Anti-Glare', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: true },
  { brand: 'Lenovo', name: 'Lenovo IdeaPad Slim 3 (Intel Core i3 12th Gen, 8GB, 512GB SSD)', price: 34990, mrp: 49990, cpu: 'Intel Core i3-1215U 12th Gen (6 Cores, 8 Threads)', ram: '8 GB DDR4 3200MHz', ssd: '512 GB SSD M.2 2242 PCIe', disp: '15.6 Inch FHD TN Anti-Glare 250 nits', os: 'Windows 11 Home', gpu: 'Intel UHD Graphics', featured: false, best: false },
  { brand: 'ASUS', name: 'ASUS Vivobook 15 (AMD Ryzen 7 7730U, 16GB, 512GB SSD, Quiet Blue)', price: 54990, mrp: 72990, cpu: 'AMD Ryzen 7 7730U (8 Cores, 16 Threads, 4.5 GHz)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB M.2 NVMe PCIe 3.0 SSD', disp: '15.6 Inch FHD 60Hz Anti-Glare Display', os: 'Windows 11 Home', gpu: 'AMD Radeon Graphics', featured: false, best: false },
  { brand: 'MSI', name: 'MSI Katana 15 Gaming Laptop (Intel Core i7 13th Gen, RTX 4060, 16GB)', price: 99990, mrp: 124990, cpu: 'Intel Core i7-13620H 13th Gen (10 Cores, 16 Threads)', ram: '16 GB DDR5 5200MHz', ssd: '1 TB NVMe PCIe Gen4 SSD', disp: '15.6 Inch FHD 144Hz IPS-Level Display', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6', featured: false, best: true },
  { brand: 'Samsung', name: 'Samsung Galaxy Book4 Pro (Intel Core Ultra 5, 16GB, 512GB SSD)', price: 119990, mrp: 139990, cpu: 'Intel Core Ultra 5 125H with Intel AI Boost', ram: '16 GB LPDDR5X', ssd: '512 GB NVMe SSD', disp: '14 Inch 3K 120Hz Dynamic AMOLED 2X Touch', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: false, best: false },
  { brand: 'Microsoft', name: 'Microsoft Surface Laptop 5 (Intel Core i5 12th Gen, 8GB, 256GB SSD)', price: 89990, mrp: 107990, cpu: 'Intel Core i5-1235U 12th Gen (10 Cores)', ram: '8 GB LPDDR5x', ssd: '256 GB Removable SSD', disp: '13.5 Inch PixelSense Touchscreen 2256 x 1504', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'LG', name: 'LG Gram 16 Ultra-Lightweight (Intel Core Ultra 7, 16GB, 1TB SSD)', price: 139990, mrp: 169990, cpu: 'Intel Core Ultra 7 155H (16 Cores, 22 Threads)', ram: '16 GB LPDDR5X 7467MHz', ssd: '1 TB NVMe Gen4 M.2 SSD', disp: '16 Inch WQXGA 2560x1600 IPS Anti-Glare', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: false, best: false },
  { brand: 'ASUS', name: 'ASUS TUF Gaming F15 (Intel Core i5 11th Gen, RTX 3050, 16GB, 512GB)', price: 56990, mrp: 74990, cpu: 'Intel Core i5-11400H 11th Gen (6 Cores, 12 Threads)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB PCIe 3.0 NVMe SSD', disp: '15.6 Inch FHD 144Hz vIPS Anti-Glare', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 3050 4GB GDDR6', featured: false, best: true },
  { brand: 'HP', name: 'HP Victus Gaming Laptop (AMD Ryzen 5 5600H, RTX 3050, 16GB, 512GB)', price: 58990, mrp: 76990, cpu: 'AMD Ryzen 5 5600H (6 Cores, 12 Threads, 4.2 GHz)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB PCIe Gen4 NVMe TLC M.2 SSD', disp: '15.6 Inch FHD 144Hz IPS Micro-Edge 250 nits', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 3050 4GB GDDR6', featured: false, best: true },
  { brand: 'Lenovo', name: 'Lenovo Legion Slim 5 (AMD Ryzen 7 7840HS, RTX 4060, 16GB, 1TB SSD)', price: 114990, mrp: 139990, cpu: 'AMD Ryzen 7 7840HS (8 Cores, 16 Threads, 5.1 GHz)', ram: '16 GB DDR5 5600MHz', ssd: '1 TB SSD M.2 2280 PCIe 4.0', disp: '16 Inch WQXGA 165Hz IPS 350 nits 100% sRGB', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6', featured: true, best: true },
  { brand: 'Acer', name: 'Acer Aspire 5 Slim (Intel Core i5 13th Gen, 16GB, 512GB SSD)', price: 49990, mrp: 64990, cpu: 'Intel Core i5-1335U 13th Gen (10 Cores, up to 4.6 GHz)', ram: '16 GB LPDDR5', ssd: '512 GB PCIe Gen4 NVMe SSD', disp: '15.6 Inch FHD ComfyView LED-Backlit TFT', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'Dell', name: 'Dell G15 5530 Gaming (Intel Core i7 13th Gen, RTX 4050, 16GB, 1TB)', price: 94990, mrp: 119990, cpu: 'Intel Core i7-13650HX 13th Gen (14 Cores, 24MB Cache)', ram: '16 GB DDR5 4800MHz', ssd: '1 TB PCIe NVMe M.2 SSD', disp: '15.6 Inch FHD 120Hz 250 nits WVA Anti-Glare', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6', featured: false, best: false },
  { brand: 'HP', name: 'HP Envy x360 15 2-in-1 (Intel Core i7 13th Gen, 16GB, 1TB SSD)', price: 109990, mrp: 129990, cpu: 'Intel Core i7-1355U 13th Gen (10 Cores, up to 5.0 GHz)', ram: '16 GB LPDDR5 5200MHz', ssd: '1 TB PCIe NVMe M.2 SSD', disp: '15.6 Inch FHD OLED Touchscreen Display', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'Lenovo', name: 'Lenovo Yoga Slim 7x Copilot+ PC (Snapdragon X Elite, 16GB, 1TB SSD)', price: 149990, mrp: 169990, cpu: 'Qualcomm Snapdragon X Elite X1E-78-100 12-Core NPU 45TOPS', ram: '16 GB LPDDR5X 8448MHz', ssd: '1 TB SSD M.2 2242 PCIe 4.0', disp: '14.5 Inch 3K 90Hz OLED 1000 nits Peak PureSight', os: 'Windows 11 Home with AI Copilot+', gpu: 'Qualcomm Adreno GPU', featured: true, best: false },
  { brand: 'ASUS', name: 'ASUS Zenbook 14 OLED (Intel Core Ultra 7, 16GB, 1TB SSD, Ponder Blue)', price: 109990, mrp: 124990, cpu: 'Intel Core Ultra 7 155H with Intel Arc Graphics', ram: '16 GB LPDDR5X 7467MHz', ssd: '1 TB M.2 NVMe PCIe 4.0 SSD', disp: '14 Inch 3K 120Hz OLED 16:10 400 nits', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: false, best: true },
  { brand: 'MSI', name: 'MSI Stealth 14 Studio (Intel Core i7 13th Gen, RTX 4060, 16GB, 1TB)', price: 149990, mrp: 179990, cpu: 'Intel Core i7-13700H 13th Gen (14 Cores, 20 Threads)', ram: '16 GB DDR5 5200MHz', ssd: '1 TB NVMe PCIe Gen4 SSD', disp: '14 Inch QHD+ 240Hz 100% DCI-P3 IPS Display', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6', featured: false, best: false },
  { brand: 'Acer', name: 'Acer Swift Go 14 OLED (Intel Core Ultra 5, 16GB, 512GB SSD)', price: 79990, mrp: 94990, cpu: 'Intel Core Ultra 5 125H with AI Acceleration', ram: '16 GB LPDDR5X', ssd: '512 GB PCIe Gen4 NVMe SSD', disp: '14 Inch 2.8K 90Hz CineCrystal OLED Display', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: false, best: false },
  { brand: 'Apple', name: 'Apple MacBook Pro 16 M3 Max (36GB, 1TB SSD, Space Black)', price: 349900, mrp: 369900, cpu: 'Apple M3 Max (14-Core CPU, 30-Core GPU)', ram: '36 GB Unified Memory', ssd: '1 TB SSD', disp: '16.2 Inch Liquid Retina XDR 120Hz ProMotion', os: 'macOS Sonoma', gpu: 'Integrated 30-Core GPU', featured: true, best: false },
  { brand: 'Dell', name: 'Dell Alienware m16 R2 (Intel Core Ultra 7, RTX 4070, 32GB, 1TB)', price: 209990, mrp: 239990, cpu: 'Intel Core Ultra 7 155H (16 Cores, 22 Threads)', ram: '32 GB DDR5 5600MHz', ssd: '1 TB PCIe NVMe M.2 SSD', disp: '16 Inch QHD+ 240Hz 3ms ComfortView Plus', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6', featured: false, best: false },
  { brand: 'HP', name: 'HP 15s (Intel Core i3 12th Gen, 8GB, 512GB SSD, Natural Silver)', price: 36990, mrp: 48990, cpu: 'Intel Core i3-1215U 12th Gen (6 Cores, up to 4.4 GHz)', ram: '8 GB DDR4 3200MHz', ssd: '512 GB PCIe NVMe M.2 SSD', disp: '15.6 Inch FHD Micro-Edge Anti-Glare 250 nits', os: 'Windows 11 Home', gpu: 'Intel UHD Graphics', featured: false, best: false },
  { brand: 'Lenovo', name: 'Lenovo ThinkBook 15 (AMD Ryzen 5 7530U, 16GB, 512GB SSD, Win 11 Pro)', price: 49990, mrp: 68990, cpu: 'AMD Ryzen 5 7530U (6 Cores, 12 Threads, 4.5 GHz)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB SSD M.2 PCIe NVMe', disp: '15.6 Inch FHD IPS Anti-Glare 300 nits', os: 'Windows 11 Pro', gpu: 'AMD Radeon Graphics', featured: false, best: false },
  { brand: 'ASUS', name: 'ASUS Chromebook CX1 (Intel Celeron N4500, 4GB, 64GB eMMC, 14-inch)', price: 17990, mrp: 25990, cpu: 'Intel Celeron N4500 Dual Core Processor', ram: '4 GB LPDDR4X', ssd: '64 GB eMMC 5.1 Storage', disp: '14 Inch HD Anti-Glare 220 nits Display', os: 'ChromeOS', gpu: 'Intel UHD Graphics', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy Book4 360 (Intel Core 5 120U, 16GB, 512GB SSD, S-Pen)', price: 104990, mrp: 124990, cpu: 'Intel Core 5 120U Processor (10 Cores, 12MB Cache)', ram: '16 GB LPDDR5', ssd: '512 GB NVMe SSD', disp: '15.6 Inch FHD Super AMOLED Touchscreen + S-Pen', os: 'Windows 11 Home', gpu: 'Intel Graphics', featured: false, best: false },
  { brand: 'Acer', name: 'Acer Nitro V 15 Gaming (Intel Core i5 13th Gen, RTX 4050, 16GB, 512GB)', price: 69990, mrp: 86990, cpu: 'Intel Core i5-13420H 13th Gen (8 Cores, 12 Threads)', ram: '16 GB DDR5 5200MHz', ssd: '512 GB PCIe Gen4 NVMe SSD', disp: '15.6 Inch FHD 144Hz IPS Display', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6', featured: false, best: true },
  { brand: 'Dell', name: 'Dell Vostro 3520 Business Laptop (Intel Core i5 12th Gen, 8GB, 512GB SSD)', price: 44990, mrp: 57990, cpu: 'Intel Core i5-1235U 12th Gen (10 Cores, 12MB Cache)', ram: '8 GB DDR4 2666MHz', ssd: '512 GB M.2 PCIe NVMe SSD', disp: '15.6 Inch FHD 120Hz WVA Display', os: 'Windows 11 Home', gpu: 'Intel UHD Graphics', featured: false, best: false },
  { brand: 'HP', name: 'HP Omen 16 (Intel Core i7 14th Gen, RTX 4070, 32GB, 1TB SSD)', price: 159990, mrp: 184990, cpu: 'Intel Core i7-14700HX (20 Cores, 28 Threads)', ram: '32 GB DDR5 5600MHz', ssd: '1 TB PCIe Gen4 NVMe TLC M.2 SSD', disp: '16.1 Inch QHD 240Hz IPS 300 nits 100% sRGB', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6', featured: false, best: true },
  { brand: 'Lenovo', name: 'Lenovo LOQ 15 (Intel Core i5 13th Gen, RTX 3050, 16GB, 512GB SSD)', price: 66990, mrp: 84990, cpu: 'Intel Core i5-13450HX (10 Cores, 16 Threads)', ram: '16 GB DDR5 4800MHz', ssd: '512 GB SSD M.2 2242 PCIe 4.0', disp: '15.6 Inch FHD 144Hz G-SYNC 300 nits 100% sRGB', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 3050 6GB GDDR6', featured: false, best: true },
  { brand: 'ASUS', name: 'ASUS Vivobook Go 14 (AMD Ryzen 3 7320U, 8GB, 512GB SSD, Mixed Black)', price: 32990, mrp: 44990, cpu: 'AMD Ryzen 3 7320U (4 Cores, 8 Threads, 4.1 GHz)', ram: '8 GB LPDDR5 5500MHz', ssd: '512 GB M.2 NVMe PCIe 3.0 SSD', disp: '14 Inch FHD 60Hz Anti-Glare Display', os: 'Windows 11 Home', gpu: 'AMD Radeon Graphics', featured: false, best: false },
  { brand: 'MSI', name: 'MSI Modern 14 (Intel Core i5 12th Gen, 16GB, 512GB SSD, Classic Black)', price: 44990, mrp: 62990, cpu: 'Intel Core i5-1235U 12th Gen (10 Cores, 12 Threads)', ram: '16 GB DDR4 3200MHz', ssd: '512 GB NVMe PCIe Gen3 SSD', disp: '14 Inch FHD IPS-Level 60Hz 300 nits', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'Microsoft', name: 'Microsoft Surface Pro 9 2-in-1 (Intel Core i7, 16GB, 256GB SSD, Graphite)', price: 139990, mrp: 154990, cpu: 'Intel Core i7-1255U 12th Gen Evo Platform', ram: '16 GB LPDDR5', ssd: '256 GB Removable SSD', disp: '13 Inch PixelSense Flow Display 120Hz', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'LG', name: 'LG Gram 17 Lightweight (Intel Core Ultra 7, 16GB, 1TB SSD, WQXGA)', price: 149990, mrp: 179990, cpu: 'Intel Core Ultra 7 155H with Intel Arc Graphics', ram: '16 GB LPDDR5X 7467MHz', ssd: '1 TB NVMe Gen4 SSD', disp: '17 Inch WQXGA 2560x1600 IPS Anti-Glare 99% DCI-P3', os: 'Windows 11 Home', gpu: 'Intel Arc Graphics', featured: false, best: false },
  { brand: 'Apple', name: 'Apple Mac Mini M2 Desktop (8GB Unified Memory, 256GB SSD, Silver)', price: 54900, mrp: 59900, cpu: 'Apple M2 Chip (8-Core CPU, 10-Core GPU)', ram: '8 GB Unified Memory', ssd: '256 GB SSD Storage', disp: 'Supports up to Two External Displays', os: 'macOS Sonoma', gpu: 'Integrated 10-Core GPU', featured: false, best: true },
  { brand: 'HP', name: 'HP EliteBook 840 G10 (Intel Core i7 13th Gen, 16GB, 512GB SSD, Win 11 Pro)', price: 119990, mrp: 144990, cpu: 'Intel Core i7-1365U vPro (10 Cores, 12MB Cache)', ram: '16 GB DDR5 5200MHz', ssd: '512 GB PCIe NVMe M.2 SSD', disp: '14 Inch WUXGA 1920x1200 IPS Anti-Glare 400 nits', os: 'Windows 11 Pro', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'Dell', name: 'Dell Inspiron 14 2-in-1 (AMD Ryzen 7 7730U, 16GB, 512GB SSD, Touch)', price: 68990, mrp: 86990, cpu: 'AMD Ryzen 7 7730U (8 Cores, 16 Threads, 4.5 GHz)', ram: '16 GB LPDDR4x 4266MHz', ssd: '512 GB M.2 PCIe NVMe SSD', disp: '14 Inch FHD+ 1920x1200 Touch Display with Active Pen', os: 'Windows 11 Home', gpu: 'AMD Radeon Graphics', featured: false, best: false },
  { brand: 'Lenovo', name: 'Lenovo IdeaPad Gaming 3 (AMD Ryzen 5 5500H, GTX 1650, 8GB, 512GB SSD)', price: 46990, mrp: 69990, cpu: 'AMD Ryzen 5 5500H (4 Cores, 8 Threads, 4.2 GHz)', ram: '8 GB DDR4 3200MHz', ssd: '512 GB SSD M.2 PCIe NVMe', disp: '15.6 Inch FHD 144Hz IPS 250 nits', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce GTX 1650 4GB GDDR6', featured: false, best: false },
  { brand: 'Acer', name: 'Acer Extensa 15 (Intel Core i3 11th Gen, 8GB, 512GB SSD, Charcoal Black)', price: 29990, mrp: 41990, cpu: 'Intel Core i3-1115G4 Dual Core up to 4.1 GHz', ram: '8 GB DDR4 3200MHz', ssd: '512 GB PCIe Gen3 NVMe SSD', disp: '15.6 Inch FHD High-Brightness Acer ComfyView', os: 'Windows 11 Home', gpu: 'Intel UHD Graphics', featured: false, best: false },
  { brand: 'ASUS', name: 'ASUS Zenbook Pro 14 Duo OLED (Dual Screen, Intel Core i9, RTX 4070)', price: 239990, mrp: 269990, cpu: 'Intel Core i9-13900H 13th Gen (14 Cores, 20 Threads)', ram: '32 GB LPDDR5', ssd: '1 TB M.2 NVMe PCIe 4.0 SSD', disp: '14.5 Inch 2.8K 120Hz OLED + 12.7 Inch ScreenPad Plus', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6', featured: false, best: false },
  { brand: 'Samsung', name: 'Samsung Galaxy Book3 (Intel Core i5 13th Gen, 16GB, 512GB SSD)', price: 64990, mrp: 79990, cpu: 'Intel Core i5-1335U 13th Gen (10 Cores, 12MB Cache)', ram: '16 GB LPDDR4x', ssd: '512 GB NVMe SSD', disp: '15.6 Inch FHD Anti-Glare Display 300 nits', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'HP', name: 'HP Pavilion Plus 14 (AMD Ryzen 7 7840U, 16GB, 1TB SSD, 2.8K OLED)', price: 79990, mrp: 96990, cpu: 'AMD Ryzen 7 7840U with Radeon 780M Graphics', ram: '16 GB LPDDR5x 6400MHz', ssd: '1 TB PCIe Gen4 NVMe M.2 SSD', disp: '14 Inch 2.8K 120Hz OLED BrightView 500 nits HDR', os: 'Windows 11 Home', gpu: 'AMD Radeon 780M Graphics', featured: false, best: true },
  { brand: 'Lenovo', name: 'Lenovo IdeaPad Flex 5 (Intel Core i5 12th Gen, 16GB, 512GB SSD, Stylus)', price: 63990, mrp: 82990, cpu: 'Intel Core i5-1235U 12th Gen (10 Cores, 12 Threads)', ram: '16 GB LPDDR4x 4266MHz', ssd: '512 GB SSD M.2 PCIe NVMe', disp: '14 Inch WUXGA IPS Touchscreen with Lenovo Digital Pen', os: 'Windows 11 Home', gpu: 'Intel Iris Xe Graphics', featured: false, best: false },
  { brand: 'ASUS', name: 'ASUS ROG Strix SCAR 16 (Intel Core i9 14th Gen, RTX 4080, 32GB, 2TB)', price: 289990, mrp: 319990, cpu: 'Intel Core i9-14900HX (24 Cores, 32 Threads)', ram: '32 GB DDR5 5600MHz', ssd: '2 TB PCIe 4.0 NVMe M.2 Performance SSD', disp: '16 Inch 2.5K 240Hz ROG Nebula HDR Mini LED', os: 'Windows 11 Home', gpu: 'NVIDIA GeForce RTX 4080 12GB GDDR6', featured: true, best: false },
]

export const generateLaptops = (categoryId) => {
  return laptopTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-LAP-${num}`
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
      stock: 10 + ((index * 5) % 50),
      rating: +(4.2 + ((index * 2) % 8) * 0.1).toFixed(1),
      reviewCount: 30 + ((index * 61) % 1800),
      images: [img1, img2],
      highlights: [
        item.cpu,
        `${item.ram} | ${item.ssd}`,
        item.disp,
        item.gpu,
        item.os,
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Model Name', value: item.name.split(' (')[0] },
        { group: 'Processor & Memory', name: 'Processor', value: item.cpu },
        { group: 'Processor & Memory', name: 'RAM', value: item.ram },
        { group: 'Storage', name: 'SSD Capacity', value: item.ssd },
        { group: 'Display & Graphics', name: 'Display Size & Resolution', value: item.disp },
        { group: 'Display & Graphics', name: 'Dedicated Graphics', value: item.gpu },
        { group: 'Operating System', name: 'OS', value: item.os },
        { group: 'Connectivity', name: 'Wireless', value: 'Wi-Fi 6E / Wi-Fi 7, Bluetooth 5.3' },
      ],
      warranty: '1 Year Onsite / Manufacturer Brand Warranty',
      tags: ['laptop', 'computer', 'notebook', item.brand.toLowerCase(), 'pc', 'workstation', 'gaming'],
      description: `Power through intensive multitasking, professional coding, design workflows, and immersive entertainment with the ${item.name}. Packed with a high-performance ${item.cpu}, stunning ${item.disp}, and ${item.ram}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
