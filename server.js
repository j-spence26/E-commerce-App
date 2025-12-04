require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require("cors");
const passport = require('passport');

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');


const pool = require('./db/db');
const initPassport = require('./routes/passport');

const app = express();

initPassport(pool);

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());        
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
