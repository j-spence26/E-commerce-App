E‑commerce API

A Node.js + Express REST API for managing users, authentication, products, shopping carts, and orders, backed by PostgreSQL.

Features

Authentication & users: Registration, login, and user listing.

Products: List all products, filter by category, add new products.

Cart: Create carts, add items, view cart contents, checkout to create orders.

Orders: List all orders and get order details by ID.

Project structure

project-root/
│
├── server.js            # Entry point (Express app setup)
├── db/
│   └── db.js            # PostgreSQL connection pool
└── routes/
    ├── auth.js          # Authentication routes
    ├── users.js         # User management routes
    ├── products.js      # Product CRUD routes
    ├── cart.js          # Cart + checkout routes
    └── order.js         # Order routes

Installation

Clone the repository:

git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api

Install dependencies:

npm install

Configure environment variables: Create a .env file.

PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/yourdb

Start the server:

npm start

API endpoints

Root

GET /: Health check. Returns “Server is running! Go to /users or /auth”.

Users and auth

POST /auth/register: Register a new user.

POST /auth/login: Login a user. Also mounted at /login.

GET /users: Get all users.

Products

GET /products: Get all products.

GET /products/:category_id: Get products by category ID.

POST /products: Add a new product.

Body:

name (string)

description (string)

price (number)

stock_quantity (number)

category_id (number)

image (string URL)

Cart

POST /cart: Create a cart for a customer.

Body: customer_id (number)

POST /cart/:cart_id: Add product to cart.

Body: product_id (number, required), quantity (number, default 1)

GET /cart/:cart_id: View cart and items (name, price, quantity).

POST /cart/:cart_id/checkout: Checkout cart and create an order with total.

Orders

GET /order: Get all orders.

GET /order/:order_id: Get order by ID.

Tech stack

Node.js and Express

PostgreSQL via pg pool

RESTful API design

Database notes

Tables expected: Users, Products, Cart, cart_items, Orders.

Checkout flow: Sums price × quantity for all cart items, stores total in Orders.total_amount.

Implementation notes

Error handling: JSON responses with appropriate status codes (400, 404, 500).

Routing tip: In GET /products/:category_id, read the param from req.params.category_id (not req.body) to match the URL parameter.

License

MIT License — free to use and adapt.