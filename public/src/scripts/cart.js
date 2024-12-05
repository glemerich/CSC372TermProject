/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for loading shopping cart]
*/
async function loadCart() {
    try {
        // Fetch cart data 
        const response = await fetch('/api/carts/1'); 
        if (!response.ok) {
            throw new Error(`Failed to fetch cart: ${response.status}`);
        }
        const cart = await response.json();
        console.log(response.json());

        const cartSection = document.querySelector('.cart-items');
        cartSection.innerHTML = ''; 

        if (cart.items.length === 0) {
            cartSection.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.items.forEach((item) => {
                const itemTotal = item.price * item.quantity;

                cartSection.innerHTML += `
                    <div class="cart-item">  <div class="cart-item-details">
                            <p><strong>${item.name}</strong></p>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <p>Total: $${itemTotal.toFixed(2)}</p>
                            <p>
                                Quantity: 
                                <input type="number" value="${item.quantity}" min="1" data-id="${item.product_id}" class="quantity-input">
                                <button class="update-button" data-id="${item.product_id}">Update</button>
                                <button class="remove-button" data-id="${item.product_id}">Remove</button>
                            </p>
                        </div>
                    </div>
                `;
            });
        }

        // totals
        const tax = cart.subtotal * 0.7; // 7% tax rate
        const deliveryFee = cart.deliveryFee || 0;
        const total = cart.total;

        document.querySelector('.cart-totals').innerHTML = `
            <p>Subtotal: $${cart.subtotal.toFixed(2)}</p>
            <p>Tax: $${tax.toFixed(2)}</p>
            <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
        `;

        
        addCartEventListeners();
    } catch (error) {
        console.error('Error loading cart:', error);
        alert('Failed to load cart. Please try again.');
    }
}

function addCartEventListeners() {
   
    document.querySelectorAll('.update-button').forEach((button) => {
        button.addEventListener('click', async (e) => {
            const productId = e.target.dataset.id;
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const quantity = parseInt(quantityInput.value);
    
            try {
                const response = await fetch(`/api/carts/1`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update quantity');
                }
    
                alert('Quantity updated successfully');
                loadCart();
            } catch (error) {
                console.error('Error updating quantity:', error);
                alert('Failed to update quantity. Please try again.');
            }
        });
    });

    // Remove item
    document.querySelectorAll('.remove-button').forEach((button) => {
        button.addEventListener('click', async (e) => {
            const productId = e.target.dataset.id;
            const cartId = 1; 

            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, { 
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Failed to remove item');
                }

                alert('Item removed successfully');
                loadCart(); 
            } catch (error) {
                console.error('Error removing item:', error);
                alert('Failed to remove item. Please try again.');
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', loadCart);