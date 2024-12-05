/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for user controller]
*/

const userModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    try {
        const users = userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserById = (req, res) => {
    try {
        const user = userModel.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createUser = (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = userModel.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = (req, res) => {
    try {
        const updatedUser = req.body;
        const updated = userModel.updateUser(req.params.id, updatedUser);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ message: 'User not found or update failed' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = (req, res) => {
    try {
        const result = userModel.deleteUser(req.params.id);
        if (result) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
