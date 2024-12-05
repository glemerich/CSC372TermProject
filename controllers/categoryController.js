const categoryModel = require('../models/categoryModel');

exports.getAllCategories = (req, res) => res.json(categoryModel.getAllCategories());
exports.getCategoryById = (req, res) => res.json(categoryModel.getCategoryById(req.params.id));
exports.createCategory = (req, res) => res.json(categoryModel.createCategory(req.body));
exports.updateCategory = (req, res) => res.json(categoryModel.updateCategory(req.params.id, req.body));
exports.deleteCategory = (req, res) => res.json(categoryModel.deleteCategory(req.params.id));