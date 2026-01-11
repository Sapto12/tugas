
// LAZY LOADING & PERFORMANCE


// Initialize Lazy Load Images
function initializeLazyLoad() {
    const images = document.querySelectorAll('.product-image img');
    
    if ('IntersectionObserver' in window && images.length > 0) {
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

// Initialize Load More
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more .btn-primary');
    
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadMoreProducts();
    });
}

// Load More Products
function loadMoreProducts() {
    createNotification('Memuat produk...', 'info');
    
    setTimeout(() => {
        createNotification('✓ Produk berhasil dimuat!', 'success');
    }, 1500);
}

// Page Visibility Handler
function initializePageVisibility() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('Page is hidden');
        } else {
            console.log('Page is visible');
            updateCartCount();
        }
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoad();
    initializeLoadMore();
    initializePageVisibility();
});
