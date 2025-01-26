const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const newProduct = new Product({ name, category, price, quantity });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!', newProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, category, price, quantity }, { new: true });
        res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});

module.exports = router;
