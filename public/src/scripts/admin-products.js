/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for admin page]
*/

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    document.getElementById('add-product-button').addEventListener('click', () => {
        window.location.href = '/src/html/product-edit.html'; // Corrected path to product-edit.html
    });

    // Search and filter
    document.getElementById('search-input').addEventListener('input', loadProducts);
    document.getElementById('category-filter').addEventListener('change', loadProducts);
});

async function loadProducts() {
    try {
        const searchQuery = document.getElementById('search-input').value;
        const categoryId = document.getElementById('category-filter').value;
        
        let url = `/api/products?search=${searchQuery}`;
        if (categoryId) {
            url += `&category=${categoryId}`;
        }

        const response = await fetch(url);
        const products = await response.json();

        const tableBody = document.querySelector('#product-table tbody');
        tableBody.innerHTML = ''; // Clear previous rows

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category_name}</td>
                <td>
                    <button class="edit-button" data-id="${product.id}">Edit</button>
                    <button class="delete-button" data-id="${product.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                window.location.href = `/src/html/product-edit.html?id=${productId}`; // Corrected path to product-edit.html
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                deleteProduct(productId);
            });
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Product deleted');
            loadProducts(); // Reload the products after deletion
        } else {
            alert('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
