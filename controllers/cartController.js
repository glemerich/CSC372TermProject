const cartModel = require('../models/cartModel');

exports.getCartById = (req, res) => res.json(cartModel.getCartById(req.params.id));
exports.createCart = (req, res) => res.json(cartModel.createCart(req.body));
exports.updateCart = (req, res) => res.json(cartModel.updateCart(req.params.id, req.body));
exports.deleteCart = (req, res) => res.json(cartModel.deleteCart(req.params.id));