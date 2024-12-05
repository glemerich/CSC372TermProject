/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for product endpoints]
*/
const productModel = require('../models/productModel');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Failed to fetch product details' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productModel.createProduct(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = req.body;
        const productId = req.params.id;
        const result = await productModel.updateProduct(productId, updatedProduct);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Product not found or update failed' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await productModel.deleteProduct(productId);
        if (result) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
