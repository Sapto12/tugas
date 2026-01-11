
// ANIMATION & UI EFFECTS

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize Button Interactions
function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        btn.addEventListener('click', function(e) {
            createRipple(e);
        });
    });
}

// Initialize Navbar Scroll Effect
function initializeNavbarScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 100));
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeButtonInteractions();
    initializeNavbarScroll();
});
