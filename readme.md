<div align="center">

# 🛒 E-Commerce App

**A full-stack MERN e-commerce platform with a customer storefront and a powerful admin dashboard.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API](#-api-reference) • [Roadmap](#-roadmap)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Product Filters](#-product-filters)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About

This project is a complete online shopping platform. Customers can browse, filter, search, review and buy products, while admins manage the catalog and orders from a dedicated dashboard.

It demonstrates:
- Role-based authentication (user and admin)
- Global state management with Redux Toolkit
- A config-driven filter system
- REST API design with Express and Mongoose
- A modern UI built with Tailwind CSS v4 and shadcn/ui

---

## 📸 Screenshots

> Add your own screenshots to a `/screenshots` folder and update the paths below.

| Home | Product Listing |
| :---: | :---: |
| ![Home](./screenshots/home.png) | ![Listing](./screenshots/listing.png) |

| Product Details | Cart |
| :---: | :---: |
| ![Details](./screenshots/details.png) | ![Cart](./screenshots/cart.png) |

| Checkout | Admin Dashboard |
| :---: | :---: |
| ![Checkout](./screenshots/checkout.png) | ![Admin](./screenshots/admin.png) |

---

## ✨ Features

### 🛍️ Customer Storefront
| Feature | Description |
| --- | --- |
| **Home page** | Banners, featured products and category shortcuts |
| **Product listing** | Grid view with sorting and multi-filter sidebar |
| **Advanced filters** | Category, brand, price range, rating, discount, size, color, availability |
| **Product details** | Dialog with images, description, price and reviews |
| **Search** | Keyword search with instant results |
| **Cart** | Add, remove and update quantities with a live total |
| **Checkout** | Address selection and order placement |
| **Account** | Profile, saved addresses and order history |
| **Reviews** | Star ratings and written reviews on purchased products |

### 🔧 Admin Dashboard
| Feature | Description |
| --- | --- |
| **Product management** | Create, edit, delete and list products |
| **Image upload** | Upload product images from the admin form |
| **Order management** | View all orders and update their status |
| **Sidebar layout** | Dedicated admin navigation and header |

### 🔐 Authentication and Security
- Sign up and sign in with validation
- Role-based protected routes (admin and user)
- Persistent sessions
- Toast notifications for success and error feedback

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
| --- | --- |
| React 19 | UI library |
| Vite (rolldown-vite) | Fast dev server and bundler |
| Redux Toolkit + React Redux | Global state management |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui + Radix UI | Accessible UI components (dialog, select, label) |
| Axios | HTTP client |
| Sonner | Toast notifications |
| Lucide React | Icons |
| next-themes | Theme support |

### Backend
| Technology | Purpose |
| --- | --- |
| Node.js + Express | Server and REST API |
| MongoDB Atlas + Mongoose | Database and ODM |
| dotenv | Environment configuration |
| nodemon | Auto-restart in development |

---

## 📁 Project Structure

```
E_Commerce_App/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin-view/      # Admin header, sidebar, product tiles
│   │   │   ├── shopping-view/   # Header, product tile, cart, filters
│   │   │   ├── common/          # Shared form, route guards
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── admin-view/      # Dashboard, products, orders
│   │   │   ├── shopping-view/   # Home, listing, checkout, account, search
│   │   │   └── auth/            # Sign in, sign up
│   │   ├── store/               # Redux slices (auth, products, cart, ...)
│   │   ├── config/              # Filter options, form controls
│   │   └── App.jsx
│   └── package.json
│
└── server/                      # Express backend
    ├── controllers/             # Request handlers
    ├── models/                  # Mongoose schemas
    ├── routes/                  # API routes
    ├── db/                      # Database connection
    ├── server.js                # Entry point
    └── .env                     # Environment variables (not committed)
```

> Adjust folder names to match your actual project.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB install)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/E_Commerce_App.git
cd E_Commerce_App
```

### 2. Set up the backend
```bash
cd server
npm install
```
Create `server/.env` (see [Environment Variables](#-environment-variables)), then run:
```bash
npm run dev
```
You should see: `MongoDB connected` and `Server running on port 5000`.

### 3. Set up the frontend
```bash
cd client
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### Available scripts (client)
| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🔑 Environment Variables

### Server (`server/.env`)
| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `5000` | Port the API runs on |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce` | MongoDB connection string |
| `JWT_SECRET` | `a_long_random_string` | Secret used to sign tokens |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |

```env
PORT=5000
MONGODB_URI=mongodb+srv://myuser:MyPass123@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_long_random_string
CLIENT_URL=http://localhost:5173
```

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

---

## 📡 API Reference

> Example routes. Update them to match your backend.

### Auth
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/check-auth` | Verify the current session |

### Products (Shop)
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/shop/products` | List products (supports filter query params) |
| GET | `/api/shop/products/:id` | Get product details |
| GET | `/api/shop/search/:keyword` | Search products |

### Cart
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/shop/cart/:userId` | Get cart items |
| POST | `/api/shop/cart` | Add item to cart |
| PUT | `/api/shop/cart` | Update item quantity |
| DELETE | `/api/shop/cart/:userId/:productId` | Remove item |

### Orders, Address and Reviews
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/shop/order` | Create an order |
| GET | `/api/shop/order/list/:userId` | User order history |
| POST | `/api/shop/address` | Add an address |
| POST | `/api/shop/review` | Add a product review |

### Admin
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/admin/products` | Add a product |
| PUT | `/api/admin/products/:id` | Edit a product |
| DELETE | `/api/admin/products/:id` | Delete a product |
| GET | `/api/admin/orders` | List all orders |
| PUT | `/api/admin/orders/:id` | Update order status |

---

## 🎛️ Product Filters

Filters are **config-driven**. The sidebar is rendered from a single object, so adding a new filter needs no new UI code.

```js
export const filters = {
  ProductFilter: {
    category: {
      key: "category",
      label: "Category",
      type: "checkbox",
      options: [
        { label: "Electronics", value: "electronics" },
        { label: "Fashion", value: "fashion" },
      ],
    },
    price: {
      key: "price",
      label: "Price",
      type: "radio",
      options: [
        { label: "Under ₹500", value: "0-500" },
        { label: "₹500 - ₹1,000", value: "500-1000" },
      ],
    },
  },
};
```

Selected filters are sent to the API as query params:

```
GET /api/shop/products?category=electronics,fashion&minPrice=500&maxPrice=5000&sort=price_asc
```

---

## 🛠️ Troubleshooting

<details>
<summary><b>MongoParseError: Invalid scheme, expected connection string to start with "mongodb://"</b></summary>

The `MONGODB_URI` is missing, empty or malformed. Check that:
- The variable name in `.env` matches `process.env.MONGODB_URI` in your code
- There are no quotes or spaces around the value
- The string starts with `mongodb+srv://` or `mongodb://`
</details>

<details>
<summary><b>MongoServerError: bad auth : Authentication failed</b></summary>

The username or password is wrong. Check that:
- You are using the **Database Access** user, not your Atlas login
- `<password>` was replaced, including the angle brackets
- Special characters in the password are URL-encoded (`@` becomes `%40`, `#` becomes `%23`)
- Your IP address is allowed in **Network Access**
</details>

<details>
<summary><b>Changes in <code>.env</code> are not picked up</b></summary>

nodemon does not restart on `.env` changes by default. Type `rs` in the terminal or restart the server.
</details>

<details>
<summary><b>CORS errors in the browser</b></summary>

Make sure `CLIENT_URL` in the server `.env` matches the frontend URL exactly, and that CORS is configured with `credentials: true` if you use cookies.
</details>

---

## 🗺️ Roadmap

### 🤖 AI Features
- [ ] AI shopping assistant chatbot
- [ ] Natural language search (for example "black running shoes under ₹3000")
- [ ] Personalized recommendations
- [ ] AI-generated product descriptions for admins
- [ ] Review summarization (pros and cons)
- [ ] Visual search (find similar products from an image)
- [ ] AI size and fit advisor

### 🛒 Commerce
- [ ] Wishlist
- [ ] Coupons and promo codes
- [ ] Order tracking timeline
- [ ] Email notifications
- [ ] Multiple payment methods (UPI, cards, COD)
- [ ] Returns and refunds
- [ ] Product variants with per-variant stock
- [ ] Recently viewed products

### ⚙️ Platform
- [ ] Admin analytics dashboard (sales, revenue, top products)
- [ ] Low-stock alerts
- [ ] Pagination or infinite scroll
- [ ] Dark mode
- [ ] Unit and integration tests
- [ ] CI/CD and deployment (Vercel for client, Render for server)

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/sristhi-saha)
- LinkedIn : [your-profile](https://linkedin.com/in/sristhi-saha)

---

<div align="center">

⭐ If you found this project useful, please give it a star!

</div>