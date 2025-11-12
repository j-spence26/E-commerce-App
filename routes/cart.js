const express = require('express');
const pool = require('../db/db');
const router = express.Router();
const app = express();

router.post('/', async (req, res) => {
    const { customer_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO Cart (customer_id) VALUES ($1) RETURNING *', [customer_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    const { product_id, quantity } = req.body;

    
    if (!product_id) {
        return res.status(400).json({ error: 'product_id is required' });
    }
    try {
        const result = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cart_id, product_id, quantity || 1]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Cart WHERE cart_id = $1', [cart_id]);
        if (result.rows.length === 0 ) {
            return res.status(404).json({ error: 'Cart not found '});
        }

        const items = await pool.query(
            `SELECT p.name, p.price, ci.quantity
            FROM cart_items ci
            JOIN Products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = $1`,
            [cart_id]
            );

    res.json({
      cart: result.rows[0],
      items: items.rows
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error '});
    }
});

router.post('/:cart_id/checkout', async (req, res) => {
    const { cart_id } = req.params;
    
    try {
        const cart = await pool.query('SELECT * FROM Cart WHERE cart_id = $1', [cart_id]);
        if (cart.rows.length === 0) {
            return res.status(404).json({ error: 'Cart not found'})
        }

         const items = await pool.query(
            `SELECT ci.product_id, ci.quantity, p.price
            FROM cart_items ci
            JOIN Products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = $1`,
            [cart_id]
            );

        if (items.rows.length === 0 ) {
            return res.status(400).json({ error: 'Cart is empty '})
        }

        const total = items.rows.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const order = await pool.query('INSERT INTO Orders (customer_id, total_amount) VALUES ($1, $2) RETURNING *', [cart.rows[0].customer_id, total]);
        res.json({
            message: 'Checkout successful',
            order: order.rows[0]
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error.'})
    }
});


module.exports = router;