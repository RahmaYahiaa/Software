const Product = require("../models/productModel");

const createProduct=async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const getAllProducts =async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
}

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(404).json({ message: "Product not found" });
    }
  }

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };