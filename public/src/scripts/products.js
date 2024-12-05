/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for main products page]
*/
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const products = await response.json();
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; 

        products.forEach((product) => {
            productGrid.innerHTML += `
                <div class="product-item">
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <a href="/src/html/details.html?id=${product.id}" class="view-details">View Details</a>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);