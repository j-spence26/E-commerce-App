import express from "express";
import pool from "../db/db.js";
const router = express.Router();


router.get('/', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM cart')
    res.status(200).json(result.rows);
  } catch (err) {
    console.log("error")
    res.status(500).json({ error: "Server error "})
  }
})

router.post('/', async (req, res) => {
  const { customer_id } = req.body;
   
  if (!customer_id) return res.status(400).json({ error: 'customer_id is required' });

  try {

    const existing = await pool.query(
      'SELECT cart_id, products FROM cart WHERE customer_id = $1',
      [customer_id]
    );

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]); 
    }


    const result = await pool.query(
      'INSERT INTO cart (customer_id, products) VALUES ($1, $2) RETURNING cart_id, products',
      [customer_id, JSON.stringify([])]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/:cart_id/items', async (req, res) => {
  const { cart_id } = req.params;
  const { product_id, name, price, quantity } = req.body;
  if (!cart_id || !product_id || !name || !price) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const cartResult = await pool.query('SELECT products FROM cart WHERE cart_id = $1', [cart_id]);
    if (cartResult.rows.length === 0) return res.status(404).json({ error: 'Cart not found' });
     let products = cartResult.rows[0].products;
    if (typeof products === 'string') {
      products = JSON.parse(products);
    }
    if (!Array.isArray(products)) {
      products = [];
    }
    const existing = products.find(p => p.product_id === product_id);
    if (existing) existing.quantity += quantity || 1;
    else products.push({ product_id, name, price, quantity: quantity || 1 });

    const updateResult = await pool.query('UPDATE Cart SET products = $1 WHERE cart_id = $2 RETURNING products', [JSON.stringify(products), cart_id]);
    res.status(200).json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:cart_id/checkout', async (req, res) => {
  const { cart_id } = req.params;

  try {
    const cartResult = await pool.query('SELECT * FROM Cart WHERE cart_id = $1', [cart_id]);
    if (cartResult.rows.length === 0) return res.status(404).json({ error: 'Cart not found' });

    const cart = cartResult.rows[0];
    if (!cart.products || cart.products.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const totalAmount = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const orderResult = await pool.query(
      'INSERT INTO Orders (customer_id, total_amount, products) VALUES ($1, $2, $3) RETURNING *',
      [cart.customer_id, totalAmount, JSON.stringify(cart.products)]
    );

    await pool.query('UPDATE cart SET products = $1 WHERE cart_id = $2', [[], cart_id]);

    res.json({
      message: 'Checkout successful',
      order: orderResult.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:cart_id/items/:product_id', async (req, res) => {
  const { cart_id, product_id } = req.params;

  try {
    const result = await pool.query('SELECT products FROM cart WHERE cart_id = $1', [cart_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cart not found' });

    let products = result.rows[0].products;
    if (typeof products === 'string') products = JSON.parse(products);

    products = products.filter(p => p.product_id !== Number(product_id));

    await pool.query('UPDATE cart SET products = $1 WHERE cart_id = $2',
      [JSON.stringify(products), cart_id]
    );

    res.json({ message: 'Item removed', products });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




export default router;
