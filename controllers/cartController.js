/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for cart endpoints]
*/
const cartModel = require('../models/cartModel');

exports.getCartById = (req, res) => {
    try {
        const cart = cartModel.getCartById(req.params.id);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found.' });
        }
    } catch (error) {
        console.error('Error fetching cart by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.createCart = (req, res) => {
    try {
        const userId = req.body.userId;  
        const newCart = cartModel.createCart(userId);
        if (newCart) {
            res.status(201).json(newCart);
        } else {
            res.status(400).json({ message: 'Failed to create cart.' });
        }
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.updateCart = (req, res) => {
    try {
        const cartId = parseInt(req.params.id, 10);
        const updatedCart = req.body;
        const result = cartModel.updateCart(cartId, updatedCart);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Cart not found or update failed.' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.deleteCart = (req, res) => {
    try {
        const cartId = parseInt(req.params.id, 10);
        const result = cartModel.deleteCart(cartId);
        if (result) {
            res.json({ message: 'Cart deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Cart not found.' });
        }
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.addToCart = (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }

        const result = cartModel.addProductToCart(productId, quantity);
        if (result) {
            res.status(201).json({ message: 'Product added to cart successfully.', cart: result });
        } else {
            res.status(500).json({ message: 'Failed to add product to cart.' });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.removeFromCart = (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId, 10);
        const productId = parseInt(req.params.productId, 10);

        if (!cartId || !productId) {
            return res.status(400).json({ message: 'Cart ID and Product ID are required.' });
        }

        const result = cartModel.deleteCartProduct(cartId, productId);
        if (result) {
            res.status(200).json({ message: 'Product removed from cart successfully.' });
        } else {
            res.status(404).json({ message: 'Product not found in cart.' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
