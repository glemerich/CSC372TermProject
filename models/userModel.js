/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for user model]
*/
const db = require('../db');


exports.getAllUsers = async () => {
    const sql = `SELECT * FROM users;`;
    return db.prepare(sql).all(); 
};


exports.getUserById = async (id) => {
    const sql = `SELECT * FROM users WHERE id = ?;`;
    return db.prepare(sql).get(id);
};


exports.createUser = async (newUser) => {
    const sql = `
        INSERT INTO users (name, email, password, user_type)
        VALUES (?, ?, ?, ?);
    `;
    const result = db.prepare(sql).run(
        newUser.name,
        newUser.email,
        newUser.password, 
        newUser.user_type
    );
    return { id: result.lastInsertRowid, ...newUser };
};


exports.updateUser = async (id, updatedUser) => {
    const sql = `
        UPDATE users
        SET name = ?, email = ?, password = ?, user_type = ?
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run(
        updatedUser.name,
        updatedUser.email,
        updatedUser.password, 
        updatedUser.user_type,
        id
    );
    return result.changes > 0 ? { id, ...updatedUser } : null; 
};


exports.deleteUser = async (id) => {
    const sql = `DELETE FROM users WHERE id = ?;`;
    const result = db.prepare(sql).run(id);
    return result.changes > 0; 
};
