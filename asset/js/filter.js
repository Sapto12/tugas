
// PRODUCT FILTER - Filter Functionality


// Initialize Product Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length === 0) return;

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

// Filter Products by Category
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

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
});
