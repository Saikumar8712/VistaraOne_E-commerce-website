# VistaraOne — One Destination. Everything You Need.

An Indian marketplace e-commerce platform engineered with React (Vite), Tailwind CSS v3, Express, and MongoDB. Inspired by Flipkart and Amazon India, VistaraOne delivers server-authoritative shopping flows, real-time inventory deduction, persistent session carts, role-based admin controls, festival promotional campaigns, and verified customer reviews.

---

## 🎨 Visual Identity & Architecture

- **Color Palette**: Signature Deep Navy (`#101827` / `#0b111e`) with Electric Lime accents (`#B8F36B`).
- **Icons & Motion**: Lucide React icons with fluid micro-interactions and Framer Motion spring transitions.
- **Resilient Dual Database**: Automated fallback from MongoDB Atlas cloud to local MongoDB (`mongodb://127.0.0.1:27017/vistaraone`) if cloud network IP whitelist restrictions are encountered.
- **Server-Authoritative Pricing & Stock**: Prevents client-side price tampering by fetching live prices and MRP directly from MongoDB during cart operations and checkout.
- **Seamless Session Merging**: Guest shoppers (`x-guest-id`) have their cart and wishlist automatically merged into their MongoDB account upon registration or login.

---

## 🔑 Pre-Seeded Default Credentials

| Role | Email | Password | Pre-configured Data |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@vistaraone.com` | `admin123` | Full access to `/admin` Command Center, Inventory & Order Fulfillment |
| **Verified Customer** | `customer@vistaraone.com` | `cust123` | Saved Gurugram address, pre-seeded verified orders & reviews |

---

## 🎟️ Active Festival Coupon Codes

Test coupon validation during checkout or in the shopping cart:

| Coupon Code | Discount Type | Min Cart Value | Maximum Cap | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`FESTIVAL20`** | 20% Percentage | ₹1,000 | ₹2,000 | Grand Festive Sale: 20% instant discount |
| **`WELCOME100`** | Flat ₹100 | ₹499 | None | New customer welcome gift on first order |
| **`DIWALI500`** | Flat ₹500 | ₹2,500 | None | Super savings on electronics and appliances |

---

## 🚀 Quick Setup & Startup (PowerShell)

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v25.2.1)
- **MongoDB** (Local MongoDB Community Service running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Backend Setup
```powershell
cd server
npm install

# Verify environment variables
copy .env.example .env

# Seed full Indian marketplace catalog (Categories, Initial Sample Data, Users, Coupons, Reviews)
npm run seed

# Seed high-density production catalog (50+ unique products per category, 500+ items total)
npm run seed:products

# Start Express Backend Server on http://localhost:5000
npm run dev
```

### Environment Variables (`server/.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `MONGODB_URI` / `MONGO_URI` | Primary MongoDB Atlas or cloud connection URI | `mongodb+srv://...` |
| `LOCAL_MONGO_URI` | Local MongoDB fallback connection URI | `mongodb://127.0.0.1:27017/vistaraone` |
| `PORT` | Express HTTP server port | `5000` |
| `JWT_SECRET` | Secret key for JSON Web Tokens | Required in production |
| `CLIENT_URL` | Frontend origin for CORS whitelist | `http://localhost:5173` |

### 3. Frontend Setup
In a new terminal window:
```powershell
cd client
npm install

# Start Vite Development Server on http://localhost:5173
npm run dev

# Or build production bundle
npm run build
```

---

## 🧪 Automated End-to-End Test Suite

Run the comprehensive 30-case integration and security test suite:
```powershell
cd server
node test-api.js
```

### Test Coverage (30/30 Passing):
1. **Health Check**: `/api/health` system availability.
2. **Catalog Queries**: Dynamic brand, rating, and category pagination.
3. **Cart Operations**: Initial empty cart, adding items, live stock limits, quantity updates, and removal.
4. **Wishlist**: Persistence and toggle state.
5. **Authentication**: Bcrypt password hashing, JWT generation, duplicate email rejection, invalid credentials rejection, and protected `/api/auth/me`.
6. **Addresses**: Adding and deleting customer delivery addresses.
7. **Order Placement**: Live inventory deduction, unique order number generation (`VO-YYYY-XXXXXX`), and payment status.
8. **Order Management**: Customer order history and order cancellation with automatic stock replenishment.
9. **Festival Campaigns**: Server-side coupon verification, discount thresholds, and active campaign banner endpoints.
10. **Admin Portal**: Admin authentication check, analytics dashboard statistics, product inline stock/price updates, and order fulfillment status updates.
11. **Verified Reviews**: Star ratings breakdown (1–5 stars) and verified purchase reviews.

---

## 📡 API Endpoint Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Create customer account and merge guest cart.
- `POST /api/auth/login` — Sign in with email or phone number.
- `GET /api/auth/me` — Authenticated user profile (`protect`).
- `PUT /api/auth/profile` — Update name, phone, or password (`protect`).
- `POST /api/auth/addresses` — Add saved delivery address (`protect`).
- `DELETE /api/auth/addresses/:id` — Delete saved address (`protect`).

### Categories & Products (`/api/categories`, `/api/products`)
- `GET /api/categories` — List all marketplace categories with product counts.
- `GET /api/products` — Filter products by category, brand, price range, rating, and sort.
- `GET /api/products/search` — Search products across name, description, and tags.
- `GET /api/products/:id` — Detailed product view with variants and specifications.
- `GET /api/products/:id/similar` — Recommendations in the same category.

### Persistent Cart & Wishlist (`/api/cart`, `/api/wishlist`)
- `GET /api/cart` — Retrieve cart with live prices and free delivery threshold calculation.
- `POST /api/cart` — Add product/variant with stock verification.
- `PUT /api/cart/:itemId` — Update quantity with stock ceiling protection.
- `DELETE /api/cart/:itemId` — Remove item from cart.
- `DELETE /api/cart` — Clear entire cart after checkout.
- `GET /api/wishlist` — Retrieve customer/guest wishlist.
- `POST /api/wishlist/toggle` — Add or remove product from wishlist.

### Checkout & Orders (`/api/orders`)
- `POST /api/orders` — Create order, apply coupon, verify stock, deduct inventory (`protect`).
- `GET /api/orders/myorders` — Fetch authenticated user order history (`protect`).
- `GET /api/orders/:id` — Fetch single order details with tracking timeline (`protect`).
- `PUT /api/orders/:id/cancel` — Cancel order and automatically restore product stock (`protect`).

### Festival Campaigns & Coupons (`/api/campaigns`)
- `GET /api/campaigns` — Active promotional campaigns and banners.
- `POST /api/campaigns/validate-coupon` — Validate coupon code against cart subtotal.
- `POST /api/campaigns` — Admin: create new campaign (`protect`, `admin`).
- `PUT /api/campaigns/:id` — Admin: update campaign details (`protect`, `admin`).
- `DELETE /api/campaigns/:id` — Admin: delete campaign (`protect`, `admin`).

### Admin Command Center (`/api/admin`)
- `GET /api/admin/stats` — Revenue, order count, customer volume, and low stock count.
- `GET /api/admin/products` — Product inventory listing with search.
- `POST /api/admin/products` — Add new product to catalog.
- `PUT /api/admin/products/:id` — Inline stock, price, or details update.
- `DELETE /api/admin/products/:id` — Deactivate product from storefront.
- `GET /api/admin/orders` — Marketplace orders for fulfillment.
- `PUT /api/admin/orders/:id/status` — Advance order state (`Confirmed` -> `Shipped` -> `Delivered`).

### Customer Reviews (`/api/reviews`)
- `GET /api/reviews/product/:productId` — Paginated reviews and 5-star rating breakdown.
- `POST /api/reviews` — Submit verified customer review with rating and comment (`protect`).
- `DELETE /api/reviews/:id` — Delete review (`protect`, owner or admin).

---

## 🛡️ Security Features
- **Bcrypt Password Hashing**: Passwords are never stored in plaintext and never leaked in queries (`select: false`).
- **JWT Authentication**: Industry-standard JSON Web Tokens with 30-day expiry.
- **Helmet Security Headers**: Protection against cross-site scripting, MIME-sniffing, and clickjacking.
- **API Rate Limiting**: Global protection of 600 requests per 15 minutes per IP.
- **Price Tamper Resistance**: All cart computations, discounts, and order totals are calculated exclusively by the backend server.
