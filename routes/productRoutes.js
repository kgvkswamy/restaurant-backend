const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust based on your model

// Route to get all products (inventory)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products from MongoDB
    res.json(products); // Send back the products data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
