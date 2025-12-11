import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import Stripe from 'stripe';

import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import usersRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import pool from './db/db.js';
import initPassport from './routes/passport.js';
import reviewRoutes from './routes/reviews.js';

const app = express();

initPassport(pool);


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


app.use(express.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.send('Server is running!'));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/reviews', reviewRoutes);

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
