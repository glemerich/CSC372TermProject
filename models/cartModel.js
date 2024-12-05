/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for interacting with cart tables in db]
*/
const db = require('../db');


exports.addProductToCart = (productId, quantity) => {
    console.log(`Adding product ${productId} with quantity ${quantity} to cart.`);

   
    let cart = db.prepare(`SELECT * FROM carts WHERE user_id = ? AND status = 'open'`).get(1); 

    if (!cart) {
        try {
            // Create a new cart if none exists
            const result = db.prepare(`INSERT INTO carts (status, user_id) VALUES ('open', ?)`).run(1);
            cart = { id: result.lastInsertRowid, status: 'open', user_id: 1 };
            console.log('Created new cart:', cart);
        } catch (error) {
            console.error('Error creating cart:', error);
            throw new Error('Failed to create a new cart.');
        }
    }

    const cartId = cart.id;

    
    try {
        const cartProduct = db.prepare(`SELECT * FROM cart_products WHERE cart_id = ? AND product_id = ?`).get(cartId, productId);

        if (cartProduct) {
            // Update quantity if product already exists
            db.prepare(`UPDATE cart_products SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?`)
                .run(quantity, cartId, productId);
            console.log(`Updated quantity for product ${productId} in cart ${cartId}.`);
        } else {
            // Insert new product into the cart
            db.prepare(`INSERT INTO cart_products (cart_id, product_id, quantity) VALUES (?, ?, ?)`)
                .run(cartId, productId, quantity);
            console.log(`Added product ${productId} to cart ${cartId}.`);
        }
    } catch (error) {
        console.error('Error updating or inserting product into cart:', error);
        throw new Error('Failed to add product to cart.');
    }

   
    return exports.getCartById(cartId);
};


exports.getCartById = (cartId) => {
    const sql = `
        SELECT products.id AS product_id, products.name, products.price, products.image_url, 
               cart_products.quantity
        FROM cart_products
        JOIN products ON cart_products.product_id = products.id
        WHERE cart_products.cart_id = ?;
    `;
    const items = db.prepare(sql).all(cartId);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        cartId,
        items,
        subtotal,
        deliveryFee: 5.0, 
        total: subtotal + subtotal * 0.7 + 5.0, // Tax and delivery
    };
};


exports.createCart = (userId) => {
    const sql = `INSERT INTO carts (status, user_id) VALUES ('open', ?);`;
    const result = db.prepare(sql).run(userId);
    return { cartId: result.lastInsertRowid, userId, status: 'open' };
};


exports.updateCart = (cartId, updatedCart) => {
    if (updatedCart.status) {
        const sql = `UPDATE carts SET status = ? WHERE id = ?;`;
        db.prepare(sql).run(updatedCart.status, cartId);
    }

    if (updatedCart.productId && updatedCart.quantity) {
        const sql = `UPDATE cart_products 
                     SET quantity = ? 
                     WHERE cart_id = ? AND product_id = ?;`;
        const result = db.prepare(sql).run(updatedCart.quantity, cartId, updatedCart.productId);
        return result.changes > 0 ? exports.getCartById(cartId) : null;
    }

    return exports.getCartById(cartId); 
};

exports.deleteCartProduct = (cartId, productId) => {
    const result = db.prepare(`DELETE FROM cart_products WHERE cart_id = ? AND product_id = ?;`).run(cartId, productId);
    return result.changes > 0;
};

exports.deleteCart = (cartId) => {
    db.prepare(`DELETE FROM cart_products WHERE cart_id = ?;`).run(cartId);
    const result = db.prepare(`DELETE FROM carts WHERE id = ?;`).run(cartId);
    return result.changes > 0;
};
