/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for defining api endpoints]
*/
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

// Configure multer for file uploads
const upload = multer({
    dest: path.join(__dirname, '../uploads/'),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/json') {
            cb(null, true); // Accept JSON files only
        } else {
            cb(new Error('Only JSON files are allowed.'));
        }
    }
});

// Product routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Cart routes
router.get('/carts/:id', cartController.getCartById);
router.post('/carts', cartController.createCart);
router.put('/carts/:id', cartController.updateCart);
router.delete('/carts/:id', cartController.deleteCart);
router.post('/carts/add', cartController.addToCart);

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Category routes
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Upload route
router.post('/uploads', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        // Ensure a file was uploaded
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read and parse the JSON file
        const filePath = path.join(__dirname, '../uploads', file.filename);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContents);

        // Process each product (mock processing here)
        if (Array.isArray(data)) {
            for (const product of data) {
                console.log(`Processing product: ${product.name}`);
                // Example: productController.createProduct(product);
            }
        } else {
            throw new Error('Invalid JSON structure. Expected an array of products.');
        }

        // Clean up uploaded file after processing
        fs.unlinkSync(filePath);

        res.json({ message: 'File processed successfully', processed: data.length });
    } catch (error) {
        console.error('Error processing upload:', error);

        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return res.status(400).json({ message: 'Invalid JSON file' });
        }

        res.status(500).json({ message: 'Error processing file upload', error: error.message });
    }
});

module.exports = router;