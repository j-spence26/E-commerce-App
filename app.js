const express = require('express');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cors = require("cors");

app.get('/', (req, res) => {
  res.send('Server is running! Go to /users or /auth');
});




app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/login', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
