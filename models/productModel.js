/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for interacting with products in db]
*/
const db = require('../db');

exports.getAllProducts = () => {
    const sql = `
        SELECT products.id, products.name, products.description, products.price, 
               products.image_url, products.category_id, products.is_featured, 
               categories.name AS category_name
        FROM products
        LEFT JOIN categories ON products.category_id = categories.id;
    `;
    return db.prepare(sql).all();
};


exports.getProductById = (id) => {
    const sql = `
        SELECT products.id, products.name, products.description, products.price, 
               products.image_url, products.category_id, products.is_featured, 
               categories.name AS category_name
        FROM products
        LEFT JOIN categories ON products.category_id = categories.id
        WHERE products.id = ?;
    `;
    return db.prepare(sql).get(id);
};


exports.createProduct = (newProduct) => {
    const { name, description, price, image_url, category_id, is_featured } = newProduct;
    const sql = `
        INSERT INTO products (name, description, price, image_url, category_id, is_featured)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = db.prepare(sql).run(name, description, price, image_url, category_id, is_featured);
    return { id: result.lastInsertRowid, ...newProduct };
};


exports.updateProduct = (id, updatedProduct) => {
    const { name, description, price, image_url, category_id, is_featured } = updatedProduct;
    const sql = `
        UPDATE products
        SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, is_featured = ?
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run(name, description, price, image_url, category_id, is_featured, id);
    return result.changes > 0 ? { id, ...updatedProduct } : null;
};


exports.deleteProduct = (id) => {
    const sql = `DELETE FROM products WHERE id = ?;`;
    const result = db.prepare(sql).run(id);
    return result.changes > 0;
};
