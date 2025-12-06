const express = require('express');
const pool = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
});

router.get('/:order_id', async (req, res) => {
    const { order_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [order_id]);

        if (result.rows.length === 0 ) {
            return res.status(404).json({ message: 'No orders found for the given order ID.'})
        }

        res.json(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error : 'Server error '})
    }
});

router.get('/:customer_id', async (req, res) => {
    const { customer_id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM orders WHERE customer_id = $1', [customer_id]);

        if (result.rows.length === 0 ) {
            return res.status(404).json({ message: 'No previous orders'})
        }

        res.json(result.rows)
    } catch (err) {
        console.log(err);
         res.status(500).json({ error : 'Server error '})
    }
})

module.exports = router;