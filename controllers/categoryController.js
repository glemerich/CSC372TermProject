/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for ]
*/
const categoryModel = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryModel.getCategoryById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Failed to fetch category details' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const newCategory = req.body;
        const createdCategory = await categoryModel.createCategory(newCategory);
        res.status(201).json(createdCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = req.body;
        const categoryId = req.params.id;
        const result = await categoryModel.updateCategory(categoryId, updatedCategory);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Category not found or update failed' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await categoryModel.deleteCategory(categoryId);
        if (result) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
