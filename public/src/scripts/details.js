// Function to fetch product details
async function loadProductDetails() {
    try {
        // Get product ID from URL query string
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
            throw new Error("No product ID provided in the URL.");
        }

        // Fetch product data from the backend
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product details: ${response.status}`);
        }
        const product = await response.json();

        // Populate the HTML with product details
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.image_url;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-category').textContent = `Category: ${product.category_id}`;
        document.getElementById('product-stock').textContent = product.is_featured ? 'Featured Item' : 'Available';

        // Enable "Add to Cart" button and attach event listener
        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.disabled = false;
        addToCartButton.addEventListener('click', () => addToCart(productId));
    } catch (error) {
        console.error('Error loading product details:', error);
        document.getElementById('product-name').textContent = 'Error loading product.';
    }
}

// Function to add product to cart
async function addToCart(productId) {
    try {
        const response = await fetch('/api/carts/add', { // Updated endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity: 1 }), // Ensure both productId and quantity are sent
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        alert('Product added to cart successfully!');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart. Please try again later.');
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', loadProductDetails);