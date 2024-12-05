/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for home page]
*/

async function loadFeaturedProduct() {
    try {
        // Fetch all products
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        // Filter featured products 
        const products = await response.json();
        const featuredProduct = products.find((product) => product.is_featured);

        
        const featuredContainer = document.getElementById('featured-product');
        if (featuredProduct) {
            featuredContainer.innerHTML = `
                <img src="${featuredProduct.image_url}" alt="${featuredProduct.name}">
                <h3>${featuredProduct.name}</h3>
                <p class="price">$${featuredProduct.price.toFixed(2)}</p>
                <a href="/src/html/details.html?id=${featuredProduct.id}">View Details</a>
            `;
        } else {
            featuredContainer.innerHTML = '<p>No featured product available.</p>';
        }
    } catch (error) {
        console.error('Error loading featured product:', error);
        const featuredContainer = document.getElementById('featured-product');
        featuredContainer.innerHTML = '<p>Error loading featured product.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadFeaturedProduct);