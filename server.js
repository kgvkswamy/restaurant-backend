const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const port = 5000;

// Middleware to parse JSON data from requests
app.use(express.json());

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number
});

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy and running!');
});


// Create a model for the product
const Product = mongoose.model('Product', productSchema);

// POST route to add a product
app.post('/api/products/add', (req, res) => {
    const { name, category, price, quantity } = req.body;

    // Check if the required fields are provided
    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new product object
    const newProduct = new Product({ name, category, price, quantity });

    // Save the product to the MongoDB database
    newProduct.save()
        .then(product => {
            res.status(201).json({
                message: 'Product added successfully!',
                product
            });
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).json({ message: 'Error adding product to database' });
        });
});

// Simple GET route to confirm server is running
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// GET route to fetch all products
app.get('/api/products', (req, res) => {
    Product.find()  // Find all products
        .then(products => {
            res.status(200).json(products);  // Send back the products as a response
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            res.status(500).json({ message: 'Error fetching products' });
        });
});

// PUT route to update a product by ID
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;  // Get the product ID from the URL
    const { name, category, price, quantity } = req.body;  // Get the updated product details from the body

    // Validate the fields
    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the product by ID and update it
    Product.findByIdAndUpdate(id, { name, category, price, quantity }, { new: true })
        .then(updatedProduct => {
            res.status(200).json({
                message: 'Product updated successfully!',
                updatedProduct
            });
        })
        .catch(err => {
            console.error('Error updating product:', err);
            res.status(500).json({ message: 'Error updating product' });
        });
});
// DELETE route to delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;  // Get the product ID from the URL

    // Find the product by ID and delete it
    Product.findByIdAndDelete(id)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({
                message: 'Product deleted successfully!',
                deletedProduct
            });
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            res.status(500).json({ message: 'Error deleting product' });
        });
});

// server.js (or relevant backend file)
app.get('/api/dashboard', async (req, res) => {
    try {
        // Example values; replace with actual database queries.
        const totalStoreValue = 50000; 
        const dailyIssueValue = 1200; 
        res.json({ totalStoreValue, dailyIssueValue });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes'); // Import the productRoutes file

app.use('/api', productRoutes); // Use '/api' as the base path for the product routes

// Your other server configuration and middleware go here
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


