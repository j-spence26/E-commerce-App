import express from "express";
import pool from "../db/db.js";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT customer_id, first_name, last_name, email FROM Customers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT customer_id, first_name, last_name, email FROM Customers WHERE customer_id = $1', [user_id]);
    if (result.rows.length === 0 ) {
        return res.status(404).json({ error : 'User not found'});
    }
    res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { first_name, last_name, email } = req.body;

    try {
        const result = await pool.query(
            `UPDATE Customers 
             SET first_name = $1, last_name = $2, email = $3
             WHERE customer_id = $4
             RETURNING customer_id, first_name, last_name, email`,
            [first_name, last_name, email, user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found '});
        }

        res.json({ message: 'User updated', user: result.rows[0]});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error '})
    }
});

export default router;
