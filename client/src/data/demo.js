// DEMO DATA ONLY — shown when the API/database is unreachable.
// All images are fetched live from Unsplash CDN — nothing is downloaded locally.
const U = id => `https://images.unsplash.com/${id}?w=400&h=400&fit=crop&auto=format&q=80`

export const demoCategories = [
 { _id:'c1', name:'Fresh Market', slug:'fresh-market', icon:'Apple' },
 { _id:'c2', name:'Electronics & Gadgets', slug:'electronics', icon:'Smartphone' },
 { _id:'c3', name:'Fashion & Lifestyle', slug:'fashion', icon:'Shirt' },
 { _id:'c4', name:'Groceries & Daily Needs', slug:'groceries', icon:'ShoppingBasket' },
 { _id:'c5', name:'Toys, Kids & Baby', slug:'toys', icon:'Blocks' },
 { _id:'c6', name:'Home & Kitchen', slug:'home-kitchen', icon:'CookingPot' },
 { _id:'c7', name:'Books & Stationery', slug:'books', icon:'BookOpen' },
 { _id:'c8', name:'Sports & Outdoors', slug:'sports', icon:'Dumbbell' },
 { _id:'c9', name:'Beauty & Pets', slug:'beauty-pets', icon:'Sparkles' }]

const mk = (i,name,brand,cat,price,op,rating,rc,imgId,stock) => ({
  _id:'d'+i, name, brand, category:cat, price, originalPrice:op||undefined,
  rating, reviewCount:rc, image:U(imgId), stock:stock||25, demo:true })

export const demoProducts = [
 // ── Fresh Market (1 - 12) ──
 mk(1,'Alphonso Mangoes (1 kg)','Farm Fresh','Fresh Market',249,349,4.5,128,'photo-1553279768-865429fa0078'),
 mk(2,'Red Delicious Apples (1 kg)','Nature Best','Fresh Market',199,249,4.3,95,'photo-1560806887-1e4cd0b6cbd6'),
 mk(3,'Organic Bananas (1 dozen)','Green Harvest','Fresh Market',59,79,4.6,210,'photo-1571771894821-ce9b6c11b08e'),
 mk(4,'Fresh Spinach Bundle (250g)','Farm Direct','Fresh Market',39,49,4.2,67,'photo-1576045057995-568f588f82fb'),
 mk(5,'Fresh Strawberries (500g)','BerryBurst','Fresh Market',229,299,4.7,184,'photo-1464965911861-746a04b4bca6'),
 mk(6,'Organic Valencia Oranges (1 kg)','CitrusGlow','Fresh Market',189,239,4.4,112,'photo-1547514701-42782101795e'),
 mk(7,'Fresh Green Grapes (500g)','VinePure','Fresh Market',149,199,4.3,88,'photo-1596363505729-4190a9506133'),
 mk(8,'Ripe Hass Avocados (Pack of 2)','GreenValley','Fresh Market',279,349,4.5,142,'photo-1523049673857-eb18f1d7b578'),
 mk(9,'Fresh Blueberries (125g)','BerryBurst','Fresh Market',249,329,4.6,98,'photo-1498557850523-fd3d118b962e'),
 mk(10,'Sweet Pineapples (1 piece)','TropicalPure','Fresh Market',99,149,4.3,76,'photo-1550258987-190a2d41a8ba'),
 mk(11,'Crisp Pomegranates (1 kg)','RubyFarm','Fresh Market',219,279,4.4,119,'photo-1615485290382-441e4d049cb5'),
 mk(12,'Fresh Kiwi Fruit (Pack of 3)','OrchardGold','Fresh Market',129,169,4.2,85,'photo-1585059895524-72359e06133a'),

 // ── Electronics & Gadgets (13 - 24) ──
 mk(13,'Wireless Over-Ear Headphones','SoundPro','Electronics & Gadgets',1999,2999,4.4,342,'photo-1505740420928-5e560c06d30e'),
 mk(14,'Smart Watch Pro Fitness','TechWear','Electronics & Gadgets',2499,3499,4.1,187,'photo-1523275335684-37898b6baf30'),
 mk(15,'Bluetooth Earbuds Mini','AudioMax','Electronics & Gadgets',999,1499,4.3,456,'photo-1590658268037-6bf12f032f55'),
 mk(16,'USB-C Fast Charger 30W','PowerUp','Electronics & Gadgets',499,699,4.5,89,'photo-1583863788434-e58a36330cf0'),
 mk(17,'Braided Charging Cable Set','FastLink','Electronics & Gadgets',249,349,4.4,142,'photo-1588508065123-287b28e013da'),
 mk(18,'Portable Wireless Speaker','BoomSound','Electronics & Gadgets',1299,1799,4.6,289,'photo-1608043152269-423dbba4e7e1'),
 mk(19,'Universal Phone Car Mount','GripPro','Electronics & Gadgets',199,299,4.2,96,'photo-1584438784894-089d6a62b8fa'),
 mk(20,'Wireless Optical Mouse','ClickPro','Electronics & Gadgets',349,499,4.3,167,'photo-1527864550417-7fd91fc51a46'),
 mk(21,'Multi-Port USB 3.0 Hub','NexHub','Electronics & Gadgets',449,599,4.5,123,'photo-1625842268584-8f3296236761'),
 mk(22,'Adjustable Laptop Stand Aluminum','ErgoDesk','Electronics & Gadgets',699,999,4.7,215,'photo-1527443224154-c4a3942d3acf'),
 mk(23,'Noise Cancelling Mic Headset','ClearVoice','Electronics & Gadgets',799,1099,4.3,94,'photo-1546435770-a3e426bf472b'),
 mk(24,'Selfie Ring Light with Tripod','GlowCam','Electronics & Gadgets',499,749,4.4,178,'photo-1516035069371-29a1b244cc32'),

 // ── Fashion & Lifestyle (25 - 36) ──
 mk(25,'Pure Cotton Kurta','StyleCraft','Fashion & Lifestyle',799,1199,4.2,156,'photo-1596755094514-f87e34085b2c'),
 mk(26,'Classic UV Sunglasses','ViewPoint','Fashion & Lifestyle',299,499,4.4,234,'photo-1572635196237-14b3f281503f'),
 mk(27,'Breathable Running Shoes','StrideMax','Fashion & Lifestyle',1999,2799,4.6,312,'photo-1542291026-7eec264c27ff'),
 mk(28,'Leather Slim Wallet','CraftLine','Fashion & Lifestyle',249,399,4.1,78,'photo-1627123424574-724758594e93'),
 mk(29,'Casual Cotton T-Shirt','UrbanWear','Fashion & Lifestyle',299,449,4.3,195,'photo-1521572267360-ee0c2909d518'),
 mk(30,'Classic Canvas Backpack','TrailGear','Fashion & Lifestyle',899,1299,4.5,167,'photo-1553062407-98eeb64c6a62'),
 mk(31,'Polarized Aviator Shades','RayStyle','Fashion & Lifestyle',249,399,4.2,143,'photo-1511499767150-a48a237f0083'),
 mk(32,'Woven Leather Belt','VogueFit','Fashion & Lifestyle',349,499,4.4,112,'photo-1624222247344-550fb60583dc'),
 mk(33,'Comfort Slip-On Loafers','StepEasy','Fashion & Lifestyle',899,1299,4.5,210,'photo-1560343090-f0409e92791a'),
 mk(34,'Ankle Cotton Socks (Pack of 5)','FootCare','Fashion & Lifestyle',199,299,4.6,340,'photo-1582966770380-4b2a8d5f3089'),
 mk(35,'Embroidered Silk Stole','DesiChic','Fashion & Lifestyle',449,699,4.3,88,'photo-1607522370275-f14206abe5d3'),
 mk(36,'Denim Jacket Unisex','IndigoBlue','Fashion & Lifestyle',1499,2199,4.5,165,'photo-1576995853123-5a10305d93c0'),

 // ── Groceries & Daily Needs (37 - 48) ──
 mk(37,'Royal Basmati Rice (5 kg)','Golden Grain','Groceries & Daily Needs',549,699,4.5,567,'photo-1586201375761-83865001e31c'),
 mk(38,'Cold Pressed Olive Oil (500ml)','Pure Press','Groceries & Daily Needs',299,399,4.3,123,'photo-1474979266404-7eaacdc50f4c'),
 mk(39,'Organic Raw Honey (500g)','Wild Harvest','Groceries & Daily Needs',249,349,4.7,289,'photo-1587049352846-4a222e784d38'),
 mk(40,'Mixed Dry Fruits & Nuts (500g)','NutriPack','Groceries & Daily Needs',299,429,4.4,198,'photo-1548036328-c9fa89d128fa'),
 mk(41,'Organic Green Tea (100 bags)','ZenLeaf','Groceries & Daily Needs',199,279,4.6,312,'photo-1564890369478-c89ca6d9cde9'),
 mk(42,'Whole Grain Rolled Oats (1 kg)','DailyGood','Groceries & Daily Needs',179,229,4.5,145,'photo-1586495777744-4413f21062fa'),
 mk(43,'Roasted California Almonds (250g)','CrunchPure','Groceries & Daily Needs',239,299,4.6,189,'photo-1508061253366-f7da158b6d46'),
 mk(44,'Chia Seeds Organic (250g)','SuperNutri','Groceries & Daily Needs',149,199,4.4,96,'photo-1514733670139-4d87a1941d55'),
 mk(45,'Organic Jaggery Powder (1 kg)','SweetEarth','Groceries & Daily Needs',129,169,4.5,182,'photo-1589301760014-d929f3979dbc'),
 mk(46,'Cold Pressed Mustard Oil (1L)','DesiGhar','Groceries & Daily Needs',189,249,4.3,214,'photo-1474979266404-7eaacdc50f4c'),
 mk(47,'Pure Kashmiri Saffron (1g)','KashmirKing','Groceries & Daily Needs',299,449,4.8,110,'photo-1596040033229-a9821ebd058d'),
 mk(48,'Whole Cashew Nuts (250g)','NutriPack','Groceries & Daily Needs',269,349,4.6,176,'photo-1509358271058-acd22cc93898'),

 // ── Toys, Kids & Baby (49 - 60) ──
 mk(49,'Creative Building Blocks (120 pcs)','BrickWorld','Toys, Kids & Baby',699,899,4.5,145,'photo-1596461404969-9ae70f2830c1'),
 mk(50,'High Speed RC Racing Car','SpeedKing','Toys, Kids & Baby',1299,1799,4.2,89,'photo-1581235707960-23b7e8d9d96c'),
 mk(51,'Plush Stuffed Teddy Bear','CuddlePals','Toys, Kids & Baby',249,349,4.8,267,'photo-1559715541-5daf8a0296d0'),
 mk(52,'Art & Coloring Kit (48 pcs)','CreativeMinds','Toys, Kids & Baby',229,329,4.3,112,'photo-1513364776144-60967b0f800f'),
 mk(53,'Wooden Puzzle Board Set','BrainyKid','Toys, Kids & Baby',199,299,4.7,178,'photo-1587654780291-39c9404d746b'),
 mk(54,'Baby Silicone Teether Set','SoftJoy','Toys, Kids & Baby',149,219,4.5,92,'photo-1515488042361-ee00e0ddd4e4'),
 mk(55,'Play Dough Modeling Kit (6 Colors)','FunColors','Toys, Kids & Baby',179,249,4.4,134,'photo-1596461404969-9ae70f2830c1'),
 mk(56,'Musical Xylophone for Toddlers','MelodyFun','Toys, Kids & Baby',299,429,4.6,187,'photo-1516627145497-ae6968895b74'),
 mk(57,'Die-Cast Metal Car Set (4 Pcs)','SpeedWheels','Toys, Kids & Baby',279,399,4.3,143,'photo-1581235707960-23b7e8d9d96c'),
 mk(58,'Baby Soft Cloth Books (Pack of 3)','TinyExplorer','Toys, Kids & Baby',249,349,4.7,210,'photo-1544716278-ca5e3f4abd8c'),
 mk(59,'Magnetic Alphabet & Number Tiles','LearnEasy','Toys, Kids & Baby',299,399,4.5,156,'photo-1587654780291-39c9404d746b'),
 mk(60,'Kids Water Splash Mat','SummerJoy','Toys, Kids & Baby',399,549,4.2,84,'photo-1515488042361-ee00e0ddd4e4'),

 // ── Home & Kitchen (61 - 72) ──
 mk(61,'Non-stick Frying Pan 24cm','KitchenPro','Home & Kitchen',699,999,4.4,234,'photo-1556909114-f6e7ad7d3136'),
 mk(62,'Insulated Stainless Steel Bottle (1L)','HydraFit','Home & Kitchen',299,449,4.6,189,'photo-1602143407151-7111542de6e8'),
 mk(63,'Microfiber Bed Sheet Set','DreamWeave','Home & Kitchen',799,1199,4.1,156,'photo-1522771739806-5bba53d77547'),
 mk(64,'LED Flexible Desk Lamp','BrightEdge','Home & Kitchen',249,399,4.3,98,'photo-1507473885765-e6ed057ab6fe'),
 mk(65,'Ceramic Coffee Mug Pair','ArtisanClay','Home & Kitchen',199,299,4.5,134,'photo-1514432324607-a09d9b4aefdd'),
 mk(66,'Aromatherapy Diffuser','MistCalm','Home & Kitchen',599,849,4.4,188,'photo-1608571423902-eed4a5ad8108'),
 mk(67,'Cotton Kitchen Towels (Set of 4)','CleanHome','Home & Kitchen',189,269,4.2,95,'photo-1584100936595-c0654b55a2e2'),
 mk(68,'Stainless Steel Kitchen Knife Set','ChefCut','Home & Kitchen',499,699,4.6,220,'photo-1593618998160-e34014e67546'),
 mk(69,'Glass Food Storage Jars (Pack of 3)','SealTight','Home & Kitchen',279,379,4.5,164,'photo-1584269600464-37b1b58a9fe7'),
 mk(70,'Cotton Cushion Covers (Pack of 5)','HomeDecor','Home & Kitchen',249,399,4.3,130,'photo-1584100936595-c0654b55a2e2'),
 mk(71,'Silicone Spatula & Whisk Set','BakeMaster','Home & Kitchen',199,289,4.4,115,'photo-1556909114-f6e7ad7d3136'),
 mk(72,'Bamboo Fiber Coasters (Set of 6)','EcoLiving','Home & Kitchen',149,219,4.7,89,'photo-1514432324607-a09d9b4aefdd'),

 // ── Books & Stationery (73 - 84) ──
 mk(73,'Inspirational Bestseller Novel','BookHaven','Books & Stationery',249,349,4.7,345,'photo-1544716278-ca5e3f4abd8c'),
 mk(74,'Premium Hardcover Notebook','WriteWell','Books & Stationery',199,299,4.4,167,'photo-1531346878377-a5be20888e57'),
 mk(75,'Fine Gel Ink Pen Set (Pack of 5)','PenCraft','Books & Stationery',149,219,4.2,78,'photo-1583485088034-697b5bc54ccd'),
 mk(76,'Heavyweight Drawing Pad (A4)','ArtistChoice','Books & Stationery',179,249,4.5,89,'photo-1513542789411-b6a5d4f31634'),
 mk(77,'Minimalist Desk Organizer','OfficeEase','Books & Stationery',299,399,4.3,103,'photo-1507842229451-79731c71edca'),
 mk(78,'Sticky Notes & Page Flags Pack','NoteNest','Books & Stationery',99,149,4.6,220,'photo-1586075010923-2dd4570fb338'),
 mk(79,'Watercolour Paint Set (24 Colors)','ColorWave','Books & Stationery',279,379,4.5,142,'photo-1513364776144-60967b0f800f'),
 mk(80,'Leatherette Executive Diary 2026','Classique','Books & Stationery',249,349,4.6,189,'photo-1531346878377-a5be20888e57'),
 mk(81,'Correction Tape & Eraser Combo','StationeryCo','Books & Stationery',89,129,4.2,94,'photo-1583485088034-697b5bc54ccd'),
 mk(82,'Calligraphy Pen Set with Ink','ScriptArt','Books & Stationery',299,449,4.7,112,'photo-1583485088034-697b5bc54ccd'),
 mk(83,'Stainless Steel Ruler & Geometry Kit','MeasurePro','Books & Stationery',119,169,4.4,85,'photo-1507842229451-79731c71edca'),
 mk(84,'A5 Bullet Journal Dotted Grid','DotPlanner','Books & Stationery',229,319,4.8,245,'photo-1531346878377-a5be20888e57'),

 // ── Sports & Outdoors (85 - 94) ──
 mk(85,'Anti-Slip Yoga Mat (6mm)','FlexFit','Sports & Outdoors',599,899,4.6,234,'photo-1601925260368-ae2f83cf8b7f'),
 mk(86,'PVC Dumbbell Pair (3kg each)','IronFist','Sports & Outdoors',499,699,4.3,167,'photo-1534438327276-14e5300c3a48'),
 mk(87,'Badminton Racket Set with Shuttle','SmashPro','Sports & Outdoors',399,599,4.4,123,'photo-1626224583764-f87db24ac4ea'),
 mk(88,'Sports Water Bottle with Infuser','ActiveHydro','Sports & Outdoors',229,329,4.5,89,'photo-1523362628745-0c100150b504'),
 mk(89,'Resistance Loop Bands (Set of 5)','FitBand','Sports & Outdoors',199,299,4.7,310,'photo-1598289431512-b97b0917affc'),
 mk(90,'High-Speed Skipping Rope','JumpPro','Sports & Outdoors',149,219,4.4,156,'photo-1591741535018-d042766c62eb'),
 mk(91,'Padded Gym Gloves Breathable','GripFlex','Sports & Outdoors',249,349,4.3,138,'photo-1534438327276-14e5300c3a48'),
 mk(92,'Sweat Headband & Wristband Set','AeroDry','Sports & Outdoors',129,179,4.5,92,'photo-1598289431512-b97b0917affc'),
 mk(93,'Sports Running Armband for Phone','JogMate','Sports & Outdoors',189,279,4.2,104,'photo-1584438784894-089d6a62b8fa'),
 mk(94,'Mini Foam Roller for Muscle Relief','RecoveryPro','Sports & Outdoors',299,449,4.6,145,'photo-1601925260368-ae2f83cf8b7f'),

 // ── Beauty & Pets (95 - 105) ──
 mk(95,'Vitamin C Face Glow Serum','GlowUp','Beauty & Pets',299,449,4.5,278,'photo-1556228578-0d85b1a4d571'),
 mk(96,'Luxury Eau De Parfum (50ml)','FragranceX','Beauty & Pets',799,1299,4.3,156,'photo-1541643600914-78b084683601'),
 mk(97,'Premium Pet Biscuits & Treats (500g)','PawNutrition','Beauty & Pets',199,279,4.6,189,'photo-1589924691995-400dc9ecc119'),
 mk(98,'Herbal Anti-Dandruff Shampoo (300ml)','SilkStrands','Beauty & Pets',249,349,4.2,134,'photo-1522337360788-8b13dee7a37e'),
 mk(99,'Gentle Foaming Face Wash (150ml)','DermaClear','Beauty & Pets',189,259,4.4,215,'photo-1556760544-74068565f05c'),
 mk(100,'Hydrating Sunscreen Gel SPF 50','SunShield','Beauty & Pets',279,399,4.6,342,'photo-1598440947619-2c35fc9aa908'),
 mk(101,'Chew Toy for Dogs Durable Bone','TailWag','Beauty & Pets',149,219,4.5,98,'photo-1576201836106-db1758fd1c97'),
 mk(102,'Aloe Vera Soothing Gel 99% Pure','NatureGlow','Beauty & Pets',169,229,4.6,198,'photo-1556228578-0d85b1a4d571'),
 mk(103,'Organic Lip Balm Trio Set','SoftPout','Beauty & Pets',129,179,4.4,140,'photo-1522337360788-8b13dee7a37e'),
 mk(104,'Cat Laser Pointer & Feather Wand','FelineJoy','Beauty & Pets',149,199,4.7,112,'photo-1576201836106-db1758fd1c97'),
 mk(105,'Rose Water Natural Facial Mist','PureBloom','Beauty & Pets',179,249,4.5,167,'photo-1598440947619-2c35fc9aa908')
]
