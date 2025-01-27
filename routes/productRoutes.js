const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure this is correctly defined

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products); // Send the products as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
