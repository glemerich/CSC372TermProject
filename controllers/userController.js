const userModel = require('../models/userModel');

exports.getAllUsers = (req, res) => res.json(userModel.getAllUsers());
exports.getUserById = (req, res) => res.json(userModel.getUserById(req.params.id));
exports.createUser = (req, res) => res.json(userModel.createUser(req.body));
exports.updateUser = (req, res) => res.json(userModel.updateUser(req.params.id, req.body));
exports.deleteUser = (req, res) => res.json(userModel.deleteUser(req.params.id));