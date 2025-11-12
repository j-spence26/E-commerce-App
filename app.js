const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.get('/', (req, res) => {
  res.send('Server is running! Go to /users or /auth');
});

// Middleware to parse JSON
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/login', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
