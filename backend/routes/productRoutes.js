const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Assuming you have a Product model


// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new product
router.post("/create", async (req, res) => {
    const { name, price, description, stock } = req.body;
    try {
        const newProduct = new Product({
            name,
            price,
            description,
            stock
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update product details
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { name, price, description, stock } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, stock },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
router.delete("/delete/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;