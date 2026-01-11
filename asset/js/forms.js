
// FORM HANDLING


// Initialize Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newletter-form');
    
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleNewsletterSubmit(this);
    });
}

// Handle Newsletter Submission
function handleNewsletterSubmit(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('.btn-primary');
    
    if (validateEmail(email)) {
        const originalText = button.textContent;
        button.textContent = 'Berhasil!';
        button.disabled = true;
        button.style.opacity = '0.7';

        setTimeout(() => {
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            createNotification('✓ Terima kasih telah subscribe!', 'success');
        }, 2000);
    } else {
        createNotification('⚠ Email tidak valid', 'error');
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterForm();
});
