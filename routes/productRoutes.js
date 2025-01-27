const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Path to your Product model

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the DB
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Add a new product
router.post('/products', async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
    });

    await newProduct.save(); // Save the new product to the DB
    res.status(201).json(newProduct); // Return the created product
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
