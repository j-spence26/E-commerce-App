const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db'); // PostgreSQL pool
const router = express.Router();

// New user registration
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO Customers (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING customer_id
    `;

    const result = await pool.query(query, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({
      message: 'User registered',
      customer_id: result.rows[0].customer_id,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Email might already exist or server error' });
  }
});

// Login
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

    res.json({
      message: 'Login successful',
      customer_id: user.customer_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
