const express = require('express');
const pool = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
});

router.get('/:category_id', async (req, res) => {
    const { category_id } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Products WHERE category_id = $1', [category_id]);
        
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No products found for this catgeory' })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'})
    }
});

router.post('/', async (req, res) => {
    const { name, description, price, stock_quantity, category_id, image } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Products (name, description, price, stock_quantity, category_id, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, price, stock_quantity, category_id, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err) 
        res.status(500).json({ error: 'Server error' });
    }
});




module.exports = router;