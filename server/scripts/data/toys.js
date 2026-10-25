import { imagePools } from '../productData.js'

const imgs = imagePools.toys

const toysTemplates = [
  { brand: 'LEGO', name: 'LEGO Classic Medium Creative Brick Box Building Toy Set (484 Pcs)', price: 2999, mrp: 3499, age: '4+ Years', type: 'Building Bricks', skill: 'Creativity & Fine Motor Skills', safe: 'Non-Toxic ABS Plastic Standard', featured: true, best: true },
  { brand: 'Hot Wheels', name: 'Hot Wheels 5-Car Die-Cast Vehicle Gift Pack (1:64 Scale)', price: 699, mrp: 899, age: '3+ Years', type: 'Die-Cast Cars', skill: 'Imaginative Play & Coordination', safe: 'Smooth Rolling Wheels & Durable Metal', featured: true, best: true },
  { brand: 'Barbie', name: 'Barbie Fashionistas Doll with Floral Print Dress and Sneakers', price: 649, mrp: 899, age: '3+ Years', type: 'Fashion Doll', skill: 'Social & Emotional Storytelling', safe: 'BPA-Free Child Safe Vinyl', featured: true, best: true },
  { brand: 'Fisher-Price', name: 'Fisher-Price Kick & Play Piano Baby Gym with Musical Activity Mat', price: 2499, mrp: 3299, age: '0-36 Months', type: 'Infant Activity Gym', skill: 'Sensory Development & Motor Skills', safe: 'Ultra-Soft Washable Fabric & Safe Mirror', featured: true, best: true },
  { brand: 'Hasbro', name: 'Hasbro Gaming Monopoly India Edition Classic Family Board Game', price: 999, mrp: 1299, age: '8+ Years', type: 'Board Game', skill: 'Financial Literacy & Strategic Thinking', safe: 'High Quality Cardboard & Metal Tokens', featured: true, best: true },
  { brand: 'Funskool', name: 'Funskool Giggles Stacking Barrels Early Learning Toy (Set of 5)', price: 249, mrp: 399, age: '12+ Months', type: 'Stacking Toy', skill: 'Color Recognition & Size Perception', safe: 'Curved Edges 100% Non-Toxic Plastic', featured: false, best: true },
  { brand: 'Nerf', name: 'Nerf Elite 2.0 Commander RD-6 Dart Blaster with 12 Official Darts', price: 999, mrp: 1499, age: '8+ Years', type: 'Dart Blaster', skill: 'Target Aiming & Active Outdoor Play', safe: 'Soft Foam Safety Darts with Hollow Tips', featured: true, best: true },
  { brand: 'Shumee', name: 'Shumee Wooden Activity Triangle 5-in-1 Sensory Toddler Toy', price: 1499, mrp: 2199, age: '1-3 Years', type: 'Wooden Educational Toy', skill: 'Cognitive Exploration & Hand-Eye Coordination', safe: '100% Natural Neem Wood & Organic Paints', featured: false, best: false },
  { brand: 'LEGO', name: 'LEGO City Fire Rescue Motorcycle and Fireman Minifigure (60319)', price: 899, mrp: 1199, age: '5+ Years', type: 'Building Set', skill: 'Logical Construction & Spatial Awareness', safe: 'Safety Tested ABS Materials', featured: false, best: false },
  { brand: 'Hot Wheels', name: 'Hot Wheels Track Builder Unlimited Straight Track Pack (12ft)', price: 799, mrp: 1099, age: '4+ Years', type: 'Track Set', skill: 'Physics Concepts & Creative Engineering', safe: 'Snap-Fit Flexible Plastic Connectors', featured: false, best: false },
  { brand: 'Hasbro', name: 'Hasbro Gaming Jenga Classic Hardwood Block Tumbling Tower Game', price: 899, mrp: 1199, age: '6+ Years', type: 'Tabletop Game', skill: 'Manual Dexterity, Patience & Balance', safe: 'Precision Crafted Genuine Hardwood', featured: false, best: true },
  { brand: 'Fisher-Price', name: 'Fisher-Price Rock-a-Stack Classic Colorful Ring Stacker Toy', price: 299, mrp: 499, age: '6+ Months', type: 'Stacking Rings', skill: 'Grasping & Hand-Eye Coordination', safe: 'Shiny Swirl Rings with Rattling Beads', featured: false, best: true },
  { brand: 'Play-Doh', name: 'Play-Doh Starter Set with 4 Color Cans and 9 Fun Cutters', price: 449, mrp: 649, age: '3+ Years', type: 'Modeling Clay', skill: 'Sensory Tactile Exploration & Art', safe: 'Non-Toxic Wheat-Based Compound', featured: false, best: true },
  { brand: 'Mirana', name: 'Mirana USB Rechargeable High-Speed 4WD Stunt Remote Control RC Car', price: 1499, mrp: 2499, age: '6+ Years', type: 'RC Car', skill: 'Spatial Navigation & Reflexes', safe: 'Shockproof Rubber Wheels & Impact Bumper', featured: true, best: false },
  { brand: 'Barbie', name: 'Barbie Careers Doctor Doll with Stethoscope and Medical Coat', price: 799, mrp: 1099, age: '3+ Years', type: 'Fashion Doll', skill: 'Role-Playing & Empathy Building', safe: 'Certified Safe Materials', featured: false, best: false },
  { brand: 'Funskool', name: 'Funskool Fundough Fun Pack 12 Vibrant Dough Tubs (Total 600g)', price: 349, mrp: 499, age: '3+ Years', type: 'Dough Play', skill: 'Creative Sculpting & Color Mixing', safe: 'Safe, Clean & Fragrance Free Formula', featured: false, best: false },
  { brand: 'Hasbro', name: 'Hasbro Gaming Connect 4 Classic Grid Game for Kids & Adults', price: 549, mrp: 799, age: '6+ Years', type: 'Strategy Game', skill: 'Forward Planning & Pattern Recognition', safe: 'Smooth Gliding Plastic Discs & Sturdy Grid', featured: false, best: true },
  { brand: 'LEGO', name: 'LEGO Creator 3in1 Mighty Dinosaurs T-Rex Toy Set (31058, 174 Pcs)', price: 1399, mrp: 1799, age: '7-12 Years', type: 'Building Set', skill: 'STEM Engineering & Creativity', safe: 'Official LEGO Quality Guarantee', featured: false, best: true },
  { brand: 'Fisher-Price', name: 'Fisher-Price Laugh & Learn Smart Stages Puppy Musical Plush', price: 1899, mrp: 2499, age: '6-36 Months', type: 'Interactive Plush', skill: 'Early Vocabulary, Alphabet & Numbers', safe: '75+ Songs & Phrases with Soft Huggable Fabric', featured: true, best: false },
  { brand: 'Smartivity', name: 'Smartivity DIY Hydraulic Crane STEM Mechanical Educational Toy Kit', price: 699, mrp: 999, age: '8+ Years', type: 'STEM Toy', skill: 'Hydraulics Principles & Problem Solving', safe: 'Eco-Friendly Re-Engineered Laser Cut Pine Wood', featured: false, best: true },
  { brand: 'Hot Wheels', name: 'Hot Wheels Monster Trucks 1:24 Scale Mega-Wrex Vehicle', price: 1199, mrp: 1599, age: '3+ Years', type: 'Monster Truck', skill: 'Action Play & Vehicle Physics', safe: 'Giant Oversized Wheels with Die-Cast Body', featured: false, best: false },
  { brand: 'Nerf', name: 'Nerf Super Soaker Wave Spray Water Blaster for Summer Play', price: 899, mrp: 1299, age: '6+ Years', type: 'Water Blaster', skill: 'Outdoor Fitness & Social Fun', safe: 'Pump-to-Fire Mechanism with Wave Stream', featured: false, best: false },
  { brand: 'Skillmatics', name: 'Skillmatics Guess in 10 Countries of the World Trivia Card Game', price: 349, mrp: 499, age: '8+ Years', type: 'Card Game', skill: 'Global Geography & Critical Thinking', safe: '50 Game Cards with Clue Guiding System', featured: false, best: true },
  { brand: 'Funskool', name: 'Funskool Battleship Classic Naval Combat Naval Strategy Game', price: 699, mrp: 999, age: '7+ Years', type: 'Strategy Game', skill: 'Deductive Reasoning & Concentration', safe: 'Portable Folding Grids & Locking Pegs', featured: false, best: false },
  { brand: 'Shumee', name: 'Shumee Wooden Balancing Animal Blocks for Toddlers (Set of 12)', price: 699, mrp: 999, age: '2+ Years', type: 'Wooden Blocks', skill: 'Fine Motor Control & Patience', safe: 'Water-Based Lead-Free Non-Toxic Dyes', featured: false, best: false },
  { brand: 'Barbie', name: 'Barbie Color Reveal Mermaid Doll with 7 Surprises (Water Activated)', price: 1299, mrp: 1699, age: '3+ Years', type: 'Surprise Doll', skill: 'Sensory Discovery & Curiosity', safe: 'Warm Water Color Transformation Mechanism', featured: false, best: false },
  { brand: 'LEGO', name: 'LEGO Friends Heartlake City Vet Clinic Pet Animal Ambulance (41694)', price: 899, mrp: 1199, age: '4+ Years', type: 'Building Set', skill: 'Empathy, Caring for Animals & Storytelling', safe: 'Starter Brick Base for Fast Building', featured: false, best: false },
  { brand: 'Fisher-Price', name: 'Fisher-Price Chatter Telephone Pull-Along Toy with Ringing Bell', price: 599, mrp: 899, age: '12+ Months', type: 'Pull-Along Toy', skill: 'Gross Motor Walking & Dialing Fun', safe: 'Spinning Eyes & Rolling Wheels with Cord', featured: false, best: true },
  { brand: 'Smartivity', name: 'Smartivity Pinball Machine DIY Wooden Mechanical Game Kit', price: 999, mrp: 1499, age: '8+ Years', type: 'STEM Toy', skill: 'Levers, Momentum & Mechanical Energy', safe: 'No Glue or Tools Needed Elastic Assembly', featured: false, best: false },
  { brand: 'Hasbro', name: 'Hasbro Gaming Clue The Classic Mystery Board Game (Modern Edition)', price: 1199, mrp: 1599, age: '8+ Years', type: 'Mystery Game', skill: 'Logic Investigation & Deduction', safe: 'Detailed Character Movers & Weapon Tokens', featured: false, best: false },
  { brand: 'Hot Wheels', name: 'Hot Wheels City Downtown Ice Cream Swirl Playset with 1 Car', price: 1499, mrp: 1999, age: '4+ Years', type: 'Playset', skill: 'Imaginative City Track Building', safe: 'Connects with Other Hot Wheels City Sets', featured: false, best: false },
  { brand: 'Play-Doh', name: 'Play-Doh Kitchen Creations Magical Mixer Pretend Baking Set', price: 1199, mrp: 1699, age: '3+ Years', type: 'Pretend Play', skill: 'Culinary Pretend Play & Sensory Motor', safe: 'Child Safe Spinning Mixer & Stampers', featured: false, best: false },
  { brand: 'Funskool', name: 'Funskool Handy Crafts Origami Animal Paper Folding Art Kit', price: 229, mrp: 349, age: '6+ Years', type: 'Art & Craft', skill: 'Spatial Geometry & Origami Patience', safe: '60 Vibrant Printed Folding Sheets with Book', featured: false, best: false },
  { brand: 'Skillmatics', name: 'Skillmatics Educational Flash Cards for Preschoolers (Alphabet & Animals)', price: 299, mrp: 449, age: '18 Months+', type: 'Flash Cards', skill: 'Early Phonics & Vocabulary Recall', safe: 'Thick Laminated Tear-Resistant Cards', featured: false, best: true },
  { brand: 'Mirana', name: 'Mirana Interactive RC Hover Soccer Ball with LED Lights & Foam Bumper', price: 599, mrp: 999, age: '3+ Years', type: 'Indoor Active Toy', skill: 'Indoor Soccer Fun & Hand-Foot Reflexes', safe: 'Padded Foam Bumper Protects Furniture & Walls', featured: false, best: false },
  { brand: 'Barbie', name: 'Barbie Malibu Convertible Sports Car Vehicle (Sparkling Pink)', price: 1999, mrp: 2799, age: '3+ Years', type: 'Doll Vehicle', skill: 'Imaginative Road Trip Adventures', safe: 'Rolling Wheels with Seatbelts for 2 Dolls', featured: false, best: false },
  { brand: 'LEGO', name: 'LEGO DUPLO My First Number Train Learn to Count (10954, 23 Pcs)', price: 1699, mrp: 2199, age: '18 Months+', type: 'Preschool Building', skill: 'Number Recognition & Sorting Skills', safe: 'Chunky Toddler-Safe Bricks with Smooth Corners', featured: true, best: true },
  { brand: 'Fisher-Price', name: 'Fisher-Price Deluxe Kick & Play Piano Replacement Gym Soft Mat', price: 999, mrp: 1499, age: '0+ Months', type: 'Baby Mat', skill: 'Tummy Time & Gross Motor Strength', safe: 'Machine Washable Breathable Fabric', featured: false, best: false },
  { brand: 'Shumee', name: 'Shumee Wooden Rainbow Stacking Arches Open-Ended Waldorf Toy', price: 999, mrp: 1499, age: '2+ Years', type: 'Wooden Toy', skill: 'Balance, Structural Architecture & Art', safe: 'Sustainably Harvested Wood with Organic Polish', featured: false, best: false },
  { brand: 'Hasbro', name: 'Hasbro Gaming Operation Classic Skill Electronic Board Game', price: 1499, mrp: 1999, age: '6+ Years', type: 'Electronic Game', skill: 'Steadiness of Hand & Fine Motor Nerve', safe: 'Buzzer Sounds with Glowing Red Nose', featured: false, best: false },
  { brand: 'Hot Wheels', name: 'Hot Wheels Action Spiral Speed Crash Motorized Track Set', price: 3499, mrp: 4999, age: '5+ Years', type: 'Motorized Track', skill: 'High-Speed Physics & Thrill Coordination', safe: 'Battery-Powered Booster with Safe Catch Zones', featured: true, best: false },
  { brand: 'Nerf', name: 'Nerf Elite Tactical Vest Gear Kit with Extra Dart Storage Pockets', price: 699, mrp: 1199, age: '8+ Years', type: 'Outdoor Gear', skill: 'Outdoor Roleplay & Tactical Agility', safe: 'Adjustable Straps with Breathable Mesh', featured: false, best: false },
  { brand: 'Smartivity', name: 'Smartivity Globe Trotters AR Augmented Reality Earth Globe Kit', price: 1299, mrp: 1899, age: '6+ Years', type: 'AR Learning Kit', skill: 'World Geography, Continents & Wildlife', safe: 'Eco-Wood Puzzle with Free Mobile App Scan', featured: false, best: true },
  { brand: 'Skillmatics', name: 'Skillmatics Write & Wipe Activity Mats for Kids (Animals & Math)', price: 449, mrp: 699, age: '3-6 Years', type: 'Reusable Learning', skill: 'Early Math, Tracing & Logic Patterns', safe: 'Includes 6 Double-Sided Reusable Mats & Pens', featured: false, best: true },
  { brand: 'Play-Doh', name: 'Play-Doh Wheels Firetruck Toy with Swirling Water Compound', price: 1299, mrp: 1799, age: '3+ Years', type: 'Vehicle Playset', skill: 'Imaginative Firefighter Rescue Missions', safe: 'Hydro-Extruder Cannon with Non-Toxic Dough', featured: false, best: false },
  { brand: 'Funskool', name: 'Funskool Chain Letters Scrabble-Style Spelling Word Game', price: 349, mrp: 499, age: '7+ Years', type: 'Word Game', skill: 'Vocabulary Expansion & Spelling Speed', safe: 'Durable Interlocking Plastic Letter Tiles', featured: false, best: false },
  { brand: 'Shumee', name: 'Shumee Wooden Pull-Along Elephant Toy with Rolling Wheels', price: 499, mrp: 749, age: '12 Months+', type: 'Pull-Along Toy', skill: 'Walking Encouragement & Balance', safe: 'Natural Ivory Wood with Non-Toxic Polish', featured: false, best: false },
  { brand: 'Hasbro', name: 'Hasbro Gaming Twister Ultimate Classic Floor Game with Spinner', price: 999, mrp: 1499, age: '6+ Years', type: 'Party Game', skill: 'Body Flexibility, Balance & Active Fun', safe: 'Extra-Large Vinyl Floor Mat with Bold Dots', featured: false, best: true },
  { brand: 'LEGO', name: 'LEGO Marvel Spider-Man Web Spinner Motorcycle (76260, 66 Pcs)', price: 899, mrp: 1199, age: '6+ Years', type: 'Super Hero Toy', skill: 'Imaginative Marvel Adventures', safe: 'Authentic Spider-Man & Doc Ock Minifigures', featured: false, best: false },
  { brand: 'Fisher-Price', name: 'Fisher-Price Brilliant Basics Baby First Blocks with Storage Bucket', price: 499, mrp: 749, age: '6+ Months', type: 'Shape Sorter', skill: 'Shape Recognition & Sorting Problem Solving', safe: '10 Bright Chunky Blocks with Easy-Carry Handle', featured: false, best: true },
  { brand: 'Smartivity', name: 'Smartivity Smart Astronaut Rocket Launcher STEM Toy Kit', price: 799, mrp: 1199, age: '6+ Years', type: 'STEM Toy', skill: 'Gravity, Propulsion & Trajectory Science', safe: 'Soft Foam Rocket with Rubber Band Launcher', featured: false, best: false },
  { brand: 'Mirana', name: 'Mirana App-Controlled Smart Robotic Puppy with Tail Wag & Bark', price: 2199, mrp: 3499, age: '4+ Years', type: 'Smart Robotic Pet', skill: 'Early Coding Logic & Empathy for Pets', safe: 'Smooth Edges with Rechargeable USB Battery', featured: true, best: false },
]

export const generateToys = (categoryId) => {
  return toysTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-TOY-${num}`
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
      stock: 14 + ((index * 4) % 36),
      rating: +(4.4 + ((index * 2) % 6) * 0.1).toFixed(1),
      reviewCount: 65 + ((index * 43) % 1800),
      images: [img1, img2],
      highlights: [
        `Recommended Age: ${item.age}`,
        `Toy Category: ${item.type}`,
        `Developmental Skill: ${item.skill}`,
        `Child Safety: ${item.safe}`,
        '100% genuine certified BIS compliant toy with non-toxic materials',
      ],
      specifications: [
        { group: 'General', name: 'Brand', value: item.brand },
        { group: 'General', name: 'Recommended Age', value: item.age },
        { group: 'Learning & Play', name: 'Skill Focus', value: item.skill },
        { group: 'Safety & Quality', name: 'Safety Standards', value: item.safe },
        { group: 'Type', name: 'Toy Type', value: item.type },
      ],
      warranty: '100% Genuine BIS Certified Toy with 30-Day Manufacturing Warranty',
      tags: ['toys', 'kids', 'baby care', 'stem', 'games', item.type.toLowerCase(), item.brand.toLowerCase()],
      description: `Spark endless joy, imagination, and early developmental skills with the ${item.name}. Thoughtfully engineered for ${item.age} with ${item.safe} to ensure total peace of mind for parents.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
