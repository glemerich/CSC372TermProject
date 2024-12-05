const carts = [];

exports.getCartById = (id) => carts.find((cart) => cart.id === parseInt(id));
exports.createCart = (newCart) => {
    const id = carts.length + 1;
    const cart = { id, ...newCart };
    carts.push(cart);
    return cart;
};
exports.updateCart = (id, updatedCart) => {
    const index = carts.findIndex((cart) => cart.id === parseInt(id));
    if (index !== -1) {
        carts[index] = { ...carts[index], ...updatedCart };
        return carts[index];
    }
    return null;
};
exports.deleteCart = (id) => {
    const index = carts.findIndex((cart) => cart.id === parseInt(id));
    if (index !== -1) carts.splice(index, 1);
};