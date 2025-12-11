Here is the same README with **no emojis** and a clean, professional tone.

---

# E-Commerce App

A full-stack e-commerce application featuring secure authentication, product browsing, cart management, orders, payments, and user reviews.
Built with React, Node.js, Express, and PostgreSQL, with Stripe for payments and Google OAuth for quick login.

---

## Features

### Authentication

* Local user registration and login
* Google OAuth login (passport-google-oidc)
* Secure session handling using express-session
* Password hashing with bcrypt

### Storefront

* View all products
* Product images, names, descriptions, and pricing
* User-submitted product reviews

### Cart and Checkout

* Add or remove items from the cart
* Cart persists across sessions
* Order summary and order history
* Stripe Checkout integration

### Orders

* Create orders after successful payment
* Orders linked to authenticated users
* Accessible order history

---

## Tech Stack

### Frontend

* React
* React Router
* Context API (Auth, Cart)

### Backend

* Node.js and Express
* Passport & Google OAuth
* Stripe
* PostgreSQL (via pg)

### Other

* dotenv
* CORS
* express-session

---

## Project Structure

```
e-commerce-app/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── routes/                # Express route handlers
├── db/                    # SQL queries and database pool
├── server.js              # Main server entry point
├── package.json
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/j-spence26/E-commerce-App
cd E-commerce-App
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

---

## Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL=postgres://username:password@localhost:5432/ecommerce
SESSION_SECRET=your-secret
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-webhook-secret
CLIENT_URL=http://localhost:3000
```

---

## Running the App

### Start the backend

```bash
npm start
```

### Start the frontend

```bash
cd client
npm start
```

Backend runs at: `http://localhost:3001`
Frontend runs at: `http://localhost:3000`

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Local login   |
| GET    | `/auth/google`   | Google OAuth  |
| GET    | `/auth/logout`   | Logout        |

### Products

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/products`     | Get all products     |
| GET    | `/products/:id` | Get a single product |

### Cart

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| GET    | `/cart`            | Get user cart  |
| POST   | `/cart/:productId` | Add product    |
| DELETE | `/cart/:productId` | Remove product |

### Orders

| Method | Endpoint  | Description     |
| ------ | --------- | --------------- |
| GET    | `/orders` | Get user orders |
| POST   | `/orders` | Create order    |

### Stripe

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/create-checkout-session` | Create Stripe session |

---

