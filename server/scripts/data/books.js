import { imagePools } from '../productData.js'

const imgs = imagePools.books

const booksTemplates = [
  { brand: 'Penguin Random House', name: 'Atomic Habits by James Clear (Paperback, Deluxe Edition)', price: 499, mrp: 799, author: 'James Clear', genre: 'Self-Help / Productivity', pages: '320 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Harriman House', name: 'The Psychology of Money by Morgan Housel (Paperback)', price: 349, mrp: 499, author: 'Morgan Housel', genre: 'Personal Finance & Wealth', pages: '256 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'HarperCollins', name: 'Ikigai: The Japanese Secret to a Long and Happy Life', price: 399, mrp: 599, author: 'Héctor García & Francesc Miralles', genre: 'Philosophy & Mindfulness', pages: '208 Pages', bind: 'Hardcover', featured: true, best: true },
  { brand: 'Plata Publishing', name: 'Rich Dad Poor Dad by Robert T. Kiyosaki (25th Anniversary)', price: 389, mrp: 550, author: 'Robert T. Kiyosaki', genre: 'Financial Education', pages: '336 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Vintage Books', name: 'Sapiens: A Brief History of Humankind by Yuval Noah Harari', price: 499, mrp: 699, author: 'Yuval Noah Harari', genre: 'History & Anthropology', pages: '498 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Classmate', name: 'Classmate Pulse 6-Subject Spiral Bound Notebook (300 Pages)', price: 189, mrp: 250, author: 'Classmate ITC', genre: 'Stationery Notebook', pages: '300 Pages (Single Line)', bind: 'Spiral Bound', featured: false, best: true },
  { brand: 'Parker', name: 'Parker Classic Gold Trim Ballpoint Pen (Refillable Blue Ink)', price: 349, mrp: 450, author: 'Parker Pen Company', genre: 'Writing Instruments', pages: 'Stainless Steel Body', bind: 'Gift Box Packing', featured: true, best: true },
  { brand: 'Bloomsbury', name: 'Harry Potter and the Philosopher Stone (25th Anniversary Edition)', price: 449, mrp: 650, author: 'J.K. Rowling', genre: 'Fantasy Fiction', pages: '352 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Faber-Castell', name: 'Faber-Castell Connector Sketch Pens (Set of 25 Vibrant Shades)', price: 199, mrp: 280, author: 'Faber-Castell', genre: 'Art Supplies', pages: '25 Connector Pens', bind: 'Clip Box Case', featured: false, best: true },
  { brand: 'Westland', name: 'Do Epic Shit by Ankur Warikoo (Paperback Edition)', price: 299, mrp: 399, author: 'Ankur Warikoo', genre: 'Life & Career Reflections', pages: '312 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Classmate', name: 'Classmate Interleaved Hardcover Project Record Book (180 Pages)', price: 119, mrp: 160, author: 'Classmate ITC', genre: 'School Stationery', pages: '180 Pages (Ozone Treated)', bind: 'Hard Bound', featured: false, best: false },
  { brand: 'Camlin', name: 'Camlin Kokuyo Artist Water Colors Tubes (Set of 24 Shades)', price: 349, mrp: 480, author: 'Kokuyo Camlin', genre: 'Fine Arts Paint', pages: '24 Tubes (5ml each)', bind: 'Box Pack', featured: false, best: true },
  { brand: 'Simon & Schuster', name: 'Think and Grow Rich by Napoleon Hill (Original 1937 Classic)', price: 199, mrp: 299, author: 'Napoleon Hill', genre: 'Success & Mindset', pages: '288 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Cross', name: 'Cross Calais Matte Black Chrome Fountain Pen with Medium Nib', price: 2499, mrp: 3500, author: 'A.T. Cross', genre: 'Luxury Writing', pages: 'Stainless Steel Medium Nib', bind: 'Premium Gift Case', featured: true, best: false },
  { brand: 'HarperCollins', name: 'The Alchemist by Paulo Coelho (International Bestseller)', price: 299, mrp: 399, author: 'Paulo Coelho', genre: 'Inspirational Fiction', pages: '197 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Doms', name: 'Doms Groove Mathematical Drawing Instruments Geometry Box', price: 149, mrp: 200, author: 'DOMS Industries', genre: 'Math Geometry Tools', pages: 'Die-Cast Metal Compass & Divider', bind: 'Tin Box Packaging', featured: false, best: true },
  { brand: 'Penguin', name: 'Thinking, Fast and Slow by Daniel Kahneman (Nobel Prize Winner)', price: 549, mrp: 799, author: 'Daniel Kahneman', genre: 'Behavioral Psychology', pages: '512 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Paperkraft', name: 'Paperkraft Hardcover Ceramic Coated Leather Notebook (192 Pages)', price: 399, mrp: 550, author: 'Paperkraft ITC', genre: 'Executive Journal', pages: '192 Ruled Pages (80 GSM)', bind: 'Hardcover Leatherette', featured: false, best: false },
  { brand: 'Uni-ball', name: 'Uni-ball Eye UB-150 Rollerball Pens 0.5mm (Blue, Pack of 5)', price: 349, mrp: 450, author: 'Mitsubishi Pencil Co.', genre: 'Rollerball Pens', pages: 'Super Ink Water & Fade Proof', bind: 'Pack of 5 Pens', featured: false, best: true },
  { brand: 'Rupa Publications', name: 'Wings of Fire: An Autobiography of A.P.J. Abdul Kalam', price: 279, mrp: 395, author: 'A.P.J. Abdul Kalam', genre: 'Autobiography / Motivation', pages: '180 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Staedtler', name: 'Staedtler Mars Lumograph Drawing Pencils Set (12 Degrees: 8B to 2H)', price: 799, mrp: 1100, author: 'Staedtler Germany', genre: 'Graphite Sketching', pages: 'Break-Resistant Super-Bonded Lead', bind: 'Metal Tin Box', featured: true, best: false },
  { brand: 'Penguin', name: 'Deep Work by Cal Newport (Rules for Focused Success)', price: 449, mrp: 650, author: 'Cal Newport', genre: 'Work Productivity', pages: '304 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Brustro', name: 'Brustro Artists Wiro Bound Sketchbook (A4 Size, 160 GSM, 60 Sheets)', price: 399, mrp: 599, author: 'Brustro Creative', genre: 'Artist Sketchbook', pages: '60 Sheets / 120 Pages (160 GSM)', bind: 'Twin Wire Bound', featured: false, best: true },
  { brand: 'Pan Macmillan', name: 'The 5 AM Club by Robin Sharma (Own Your Morning, Elevate Your Life)', price: 349, mrp: 499, author: 'Robin Sharma', genre: 'Personal Mastery', pages: '336 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Pilot', name: 'Pilot V5 Liquid Ink Rollerball Pen with Extra Fine Nib (Blue, Pack of 3)', price: 180, mrp: 210, author: 'Pilot Corporation', genre: 'Fine Point Pens', pages: 'Pure Liquid Ink with Hi-Tecpoint 0.5mm', bind: 'Pack of 3 Pens', featured: false, best: true },
  { brand: 'HarperCollins', name: 'Man’s Search for Meaning by Viktor E. Frankl', price: 249, mrp: 350, author: 'Viktor E. Frankl', genre: 'Psychology & Existentialism', pages: '184 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Kokuyo', name: 'Kokuyo Campus Twin Ring Ruled Notebook (B5 Size, 50 Sheets)', price: 199, mrp: 280, author: 'Kokuyo Japan', genre: 'Japanese Stationery', pages: '100 Pages Silky Smooth Paper', bind: 'Twin Ring Binding', featured: false, best: false },
  { brand: 'Camel', name: 'Camel Heavy Body Artist Acrylic Color Set (12 Shades x 20ml)', price: 449, mrp: 600, author: 'Kokuyo Camlin', genre: 'Acrylic Painting', pages: '12 Rich Pigment Tubes (20ml)', bind: 'Cardboard Box Pack', featured: false, best: false },
  { brand: 'Portfolio', name: 'Good to Great by Jim Collins (Why Some Companies Make the Leap)', price: 599, mrp: 850, author: 'Jim Collins', genre: 'Business Management', pages: '320 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Classmate', name: 'Classmate Long Ruled Notebook (Pack of 6, 172 Pages Each)', price: 349, mrp: 450, author: 'Classmate ITC', genre: 'School Notebooks', pages: '172 Pages Per Book (Pack of 6)', bind: 'Soft Cover Centre Stapled', featured: false, best: true },
  { brand: 'Schneider', name: 'Schneider Slider Memo XB Ballpoint Pen with Viscoglide Tech (Blue)', price: 199, mrp: 275, author: 'Schneider Germany', genre: 'Ergonomic Pens', pages: 'Extra Broad Smooth XB Tip', bind: 'Single Pen Carded', featured: false, best: false },
  { brand: 'Hay House', name: 'You Can Heal Your Life by Louise L. Hay (Full Color Gift Edition)', price: 399, mrp: 550, author: 'Louise L. Hay', genre: 'Self-Healing & Mindset', pages: '272 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Moleskine', name: 'Moleskine Classic Hardcover Ruled Journal (Large 5 x 8.25 Inch, Black)', price: 1899, mrp: 2499, author: 'Moleskine Italy', genre: 'Luxury Journal', pages: '240 Acid-Free Ivory Pages (70 GSM)', bind: 'Hardcover with Elastic Band', featured: true, best: false },
  { brand: 'Ebury Press', name: 'Can’t Hurt Me: Master Your Mind and Defy the Odds by David Goggins', price: 499, mrp: 750, author: 'David Goggins', genre: 'Memoir & Mental Toughness', pages: '368 Pages', bind: 'Paperback', featured: true, best: true },
  { brand: 'Luxor', name: 'Luxor Highlighters Assorted Pastel Colors (Pack of 5 Shades)', price: 149, mrp: 200, author: 'Luxor Writing Products', genre: 'Pastel Highlighters', pages: 'Chisel Tip 1-4mm Line Width', bind: 'Pouch Pack of 5', featured: false, best: true },
  { brand: 'Penguin', name: 'Meditations by Marcus Aurelius (Gregory Hays Modern Translation)', price: 299, mrp: 450, author: 'Marcus Aurelius', genre: 'Stoic Philosophy', pages: '256 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Canson', name: 'Canson XL Mix Media Spiral Pad (A4 Size, 300 GSM, 30 Sheets)', price: 799, mrp: 1100, author: 'Canson France', genre: 'Heavy Watercolor Paper', pages: '30 Sheets Heavy Texture (300 GSM)', bind: 'Micro-Perforated Wire Bound', featured: false, best: false },
  { brand: 'Crown', name: 'The Lean Startup by Eric Ries (How Constant Innovation Drives Success)', price: 549, mrp: 799, author: 'Eric Ries', genre: 'Entrepreneurship & Tech', pages: '336 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Lamy', name: 'Lamy Safari Fountain Pen Charcoal Black with Ergonomic Grip (Fine Nib)', price: 2490, mrp: 3200, author: 'Lamy Germany', genre: 'German Fountain Pen', pages: 'Sturdy ABS Plastic with Chrome Clip', bind: 'Designer Box with Ink Cartridge', featured: true, best: false },
  { brand: 'Penguin', name: 'Zero to One by Peter Thiel (Notes on Startups and Future)', price: 399, mrp: 599, author: 'Peter Thiel & Blake Masters', genre: 'Venture Capital & Startups', pages: '224 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Brustro', name: 'Brustro Fine Tip Technical Fineliner Pens (Set of 6 Assorted Nibs)', price: 449, mrp: 650, author: 'Brustro Creative', genre: 'Technical Drawing', pages: 'Pigment Waterproof Archival Ink (0.05mm - 0.8mm)', bind: 'Snap Plastic Case', featured: false, best: true },
  { brand: 'HarperCollins', name: 'Gitanjali by Rabindranath Tagore (Nobel Prize Poetry Edition)', price: 199, mrp: 299, author: 'Rabindranath Tagore', genre: 'Indian Poetry & Literature', pages: '144 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Tombow', name: 'Tombow MONO Zero Precision Elastomer Eraser Pen (Round 2.3mm)', price: 349, mrp: 499, author: 'Tombow Japan', genre: 'Detail Eraser Tool', pages: 'Ultra-Fine 2.3mm Retractable Eraser', bind: 'Refillable Pen Body', featured: false, best: false },
  { brand: 'Rider', name: 'The Power of Your Subconscious Mind by Joseph Murphy', price: 199, mrp: 299, author: 'Dr. Joseph Murphy', genre: 'Mind Power & Healing', pages: '312 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Paperkraft', name: 'Paperkraft Expressions Calligraphy Pen Set with 3 Nibs & Ink Cartridges', price: 699, mrp: 999, author: 'Paperkraft ITC', genre: 'Calligraphy Set', pages: '3 Italic Nibs (1.1mm, 1.5mm, 1.9mm) + 6 Color Cartridges', bind: 'Collector Metal Tin', featured: false, best: false },
  { brand: 'Random House', name: 'Rework by Jason Fried & David Heinemeier Hansson', price: 449, mrp: 650, author: 'Jason Fried & DHH', genre: 'Business & Remote Work', pages: '288 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Classmate', name: 'Classmate Octane Neon Gel Pens (Pack of 5 Assorted Colors)', price: 99, mrp: 125, author: 'Classmate ITC', genre: 'Neon Gel Pens', pages: 'Waterproof Japanese Quick-Dry Ink', bind: 'Carded Pack of 5', featured: false, best: true },
  { brand: 'Vintage', name: '1984 by George Orwell (Authoritative Centenary Edition)', price: 249, mrp: 350, author: 'George Orwell', genre: 'Classic Dystopian Fiction', pages: '328 Pages', bind: 'Paperback', featured: false, best: false },
  { brand: 'Derwent', name: 'Derwent Academy Colored Pencils Tin (Set of 24 Creamy Colors)', price: 899, mrp: 1299, author: 'Derwent UK', genre: 'Fine Art Coloring', pages: 'Natural Wood Barrel with Round 3.3mm Core', bind: 'Embossed Metal Tin', featured: false, best: false },
  { brand: 'Jaico', name: 'The Monk Who Sold His Ferrari by Robin Sharma', price: 249, mrp: 350, author: 'Robin Sharma', genre: 'Spiritual Fable & Fulfilling Life', pages: '220 Pages', bind: 'Paperback', featured: false, best: true },
  { brand: 'Camlin', name: 'Camlin Kokuyo Canvas Board 10x12 Inch (Triple Primed, Pack of 2)', price: 199, mrp: 280, author: 'Kokuyo Camlin', genre: 'Art Canvas Board', pages: '100% Cotton Canvas (Acid-Free)', bind: 'Shrink Wrapped Pair', featured: false, best: false },
  { brand: 'Penguin', name: 'Start with Why by Simon Sinek (How Great Leaders Inspire)', price: 449, mrp: 650, author: 'Simon Sinek', genre: 'Leadership & Motivation', pages: '256 Pages', bind: 'Paperback', featured: false, best: false },
]

export const generateBooks = (categoryId) => {
  return booksTemplates.map((item, index) => {
    const num = String(index + 1).padStart(3, '0')
    const sku = `VO-BOOK-${num}`
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
      stock: 20 + ((index * 5) % 45),
      rating: +(4.5 + ((index * 2) % 5) * 0.1).toFixed(1),
      reviewCount: 80 + ((index * 52) % 2500),
      images: [img1, img2],
      highlights: [
        `Author / Creator: ${item.author}`,
        `Genre / Product Class: ${item.genre}`,
        `Format & Binding: ${item.bind}`,
        `Length / Material: ${item.pages}`,
        'Guaranteed authentic edition packed in protective shrink-wrap',
      ],
      specifications: [
        { group: 'General', name: 'Brand / Publisher', value: item.brand },
        { group: 'General', name: 'Author / Creator', value: item.author },
        { group: 'Content Details', name: 'Genre / Type', value: item.genre },
        { group: 'Physical Characteristics', name: 'Binding / Body', value: item.bind },
        { group: 'Volume & Specs', name: 'Pages / Spec', value: item.pages },
      ],
      warranty: '100% Genuine Publisher Edition with Free Transit Damage Replacement',
      tags: ['books', 'stationery', 'reading', 'novel', 'education', item.genre.toLowerCase(), item.brand.toLowerCase()],
      description: `Expand your horizons and enrich your everyday intellect with ${item.name}. Authored/crafted by ${item.author}, featuring ${item.pages} with durable ${item.bind}.`,
      isFeatured: item.featured,
      isBestseller: item.best,
      isDemo: true,
      isActive: true,
    }
  })
}
