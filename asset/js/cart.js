
// CART MANAGEMENT - Shopping Cart Functions


// Initialize Cart
function initializeCart() {
    const cartButtons = document.querySelectorAll('.btn-outline');

    cartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-info h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            // Add to cart
            addToCart(productName, productPrice);
            
            // Visual feedback
            showCartNotification(productName);
            updateCartCount();
        });
    });
}

// Add Item to Cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count Badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartIcon = document.querySelector('.icon-link[title="Shopping Cart"]');
    if (cartIcon) {
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
        }
        badge.textContent = totalItems > 0 ? totalItems : '';
    }
}

// Show Cart Notification
function showCartNotification(productName) {
    createNotification(`✓ ${productName} ditambahkan ke keranjang`, 'success');
}

// Initialize Cart on Page Load
window.addEventListener('load', function() {
    updateCartCount();
});
