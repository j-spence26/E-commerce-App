const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db'); 
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);


router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO Customers (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING customer_id, email;
    `;

    const result = await pool.query(query, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    const user = result.rows[0];

    req.session.user = {
      customer_id: user.customer_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    };

    
    res.status(201).json({
      message: "User registered",
      user: req.session.user
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Email might already exist or server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM Customers WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: 'Invalid email or password' });

    req.session.user = {
       customer_id: user.customer_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    };

    res.json({
      message: 'Login successful',
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
});


router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); 
      res.json({ message: 'Logout successful' });
    });
  } else {
    res.status(200).json({ message: 'No active session' });
  }
});




module.exports = router;
