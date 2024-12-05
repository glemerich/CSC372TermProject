const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => res.json(productModel.getAllProducts());
exports.getProductById = (req, res) => res.json(productModel.getProductById(req.params.id));
exports.createProduct = (req, res) => res.json(productModel.createProduct(req.body));
exports.updateProduct = (req, res) => res.json(productModel.updateProduct(req.params.id, req.body));
exports.deleteProduct = (req, res) => res.json(productModel.deleteProduct(req.params.id));