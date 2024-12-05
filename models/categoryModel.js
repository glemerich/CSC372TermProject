const db = require('../db');

// Get all categories
exports.getAllCategories = () => {
    const sql = 'SELECT * FROM categories';
    return db.prepare(sql).all();
};

// Get category by ID
exports.getCategoryById = (id) => {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    return db.prepare(sql).get(id);
};

// Create a new category
exports.createCategory = (newCategory) => {
    const { name, priority_level } = newCategory;
    const sql = 'INSERT INTO categories (name, priority_level) VALUES (?, ?)';
    const result = db.prepare(sql).run(name, priority_level);
    return { id: result.lastInsertRowid, name, priority_level };
};

// Update a category
exports.updateCategory = (id, updatedCategory) => {
    const { name, priority_level } = updatedCategory;
    const sql = 'UPDATE categories SET name = ?, priority_level = ? WHERE id = ?';
    const result = db.prepare(sql).run(name, priority_level, id);
    return result.changes > 0 ? exports.getCategoryById(id) : null;
};

// Delete a category
exports.deleteCategory = (id) => {
    const sql = 'DELETE FROM categories WHERE id = ?';
    const result = db.prepare(sql).run(id);
    return result.changes > 0;
};
