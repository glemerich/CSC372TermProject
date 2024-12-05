// Fetch and display products
async function loadProducts() {
    try {
        const response = await fetch('/api/products'); // Fetch products from the backend
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const products = await response.json(); // Parse JSON response

        const productGrid = document.querySelector('.product-grid'); // Get the product grid container

        // Clear existing content
        productGrid.innerHTML = '';

        // Populate the grid with products
        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <a href="#">View Details</a>
            `;
            productGrid.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', loadProducts);