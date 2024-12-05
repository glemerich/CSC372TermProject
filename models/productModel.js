const products = [
    { 
        id: 1, 
        name: 'Tesla Cybertruck Diecast Model', 
        price: 19.99, 
        image_url: '/src/images/cybertruck.jpg', 
        description: 'High-quality diecast model of the futuristic vehicle.', 
        category_id: 3, 
        is_featured: true 
    },
    { 
        id: 2, 
        name: 'Vintage Polaroid SX-70 Camera', 
        price: 299.99, 
        image_url: '/src/images/polaroid.jpg', 
        description: 'Classic instant camera with a folding body.', 
        category_id: 2, 
        is_featured: true 
    },
    { 
        id: 3, 
        name: 'Handcrafted Damascus Steel Hunting Knife', 
        price: 199.99, 
        image_url: '/src/images/knife.jpg', 
        description: 'Sharp and durable knife made from Damascus steel.', 
        category_id: 4, 
        is_featured: false 
    },
    { 
        id: 4, 
        name: 'Fossilized Megalodon Shark Tooth', 
        price: 149.99, 
        image_url: '/src/images/sharktooth.jpg', 
        description: 'Rare fossil of a prehistoric Megalodon shark.', 
        category_id: 1, 
        is_featured: true 
    },
];

exports.getAllProducts = () => products;

exports.getProductById = (id) => products.find((product) => product.id === parseInt(id));

exports.createProduct = (newProduct) => {
    const id = products.length + 1;
    const product = { id, ...newProduct };
    products.push(product);
    return product;
};

exports.updateProduct = (id, updatedProduct) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    }
    return null;
};

exports.deleteProduct = (id) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) products.splice(index, 1);
};