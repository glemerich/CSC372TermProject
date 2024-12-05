/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for admin product edit page]
*/
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const product = await fetch(`/api/products/${productId}`).then(res => res.json());
        populateForm(product);
    }

    loadCategories();

    document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedProduct = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert('Product updated successfully');
                window.location.href = 'admin-products.html'; 
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    });
});

async function loadCategories() {
    try {
        const categories = await fetch('/api/categories').then(res => res.json());
        const categorySelect = document.getElementById('category');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function populateForm(product) {
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category_id;
    document.getElementById('image').value = product.image_url;
}
