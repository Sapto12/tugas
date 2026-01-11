
// PRODUCT PAGE - FILTER & INTERACTIONS
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeCart();
    initializeLazyLoad();
});


// FILTER FUNCTIONALITY


function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            filterProducts(filterValue, productCards);
        });
    });
}

function filterProducts(filterValue, productCards) {
    productCards.forEach(card => {
        const cardFilter = card.getAttribute('data-filter');
        
        if (filterValue === 'all' || cardFilter === filterValue) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ============================================
// CART FUNCTIONALITY
// ============================================

function initializeCart() {
    const cartButtons = document.querySelectorAll('.btn-outline');
    const cartIcon = document.querySelector('.icon-link');
    let cartCount = 0;

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

function showCartNotification(productName) {
    // Check if notification already exists
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = `✓ ${productName} ditambahkan ke keranjang`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ============================================
// LAZY LOAD IMAGES
// ============================================

function initializeLazyLoad() {
    const images = document.querySelectorAll('.product-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.animation = 'fadeIn 0.6s ease-in-out';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// LOAD MORE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more .btn-primary');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadMoreProducts();
        });
    }
});

function loadMoreProducts() {
    // Simulasi loading lebih banyak produk
    const notification = createNotification('Memuat produk...');
    
    setTimeout(() => {
        removeNotification(notification);
        showNotification('✓ Produk berhasil dimuat!', 'success');
    }, 1500);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.classList.add('show');
    return notification;
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function showNotification(message, type = 'info') {
    const notification = createNotification(message, type);
    setTimeout(() => {
        removeNotification(notification);
    }, 3000);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initializeSearch() {
    const searchIcon = document.querySelector('[title="Search"]');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.classList.add('show');
        document.querySelector('.search-input')?.focus();
    }
}

// ============================================
// PRICE FILTER
// ============================================

function initializePriceFilter() {
    const priceInputs = document.querySelectorAll('.price-filter-input');
    
    priceInputs?.forEach(input => {
        input.addEventListener('change', function() {
            filterByPrice();
        });
    });
}

function filterByPrice() {
    const minPrice = document.querySelector('.min-price')?.value || 0;
    const maxPrice = document.querySelector('.max-price')?.value || Infinity;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const priceText = card.querySelector('.price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));

        if (price >= minPrice && price <= maxPrice) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMATION UTILITIES
// ============================================

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Initialize on page load
window.addEventListener('load', function() {
    updateCartCount();
    animateOnScroll();
    initializeSearch();
    initializePriceFilter();
});
