// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('active');
});

document.getElementById('close-mobile-menu').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
    });
});

// Scroll to Section Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle Details Function
function toggleDetails(type) {
    const extraContent = document.getElementById(type + '-extra');
    const button = document.getElementById('btn-' + type);
    const buttonText = button.querySelector('.btn-text');
    const chevron = button.querySelector('.fas');
    
    if (extraContent.classList.contains('expanded')) {
        // Collapse
        extraContent.classList.remove('expanded');
        buttonText.textContent = 'Lihat Lebih Banyak';
        chevron.classList.remove('rotate-180');
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    } else {
        // Expand
        extraContent.classList.add('expanded');
        buttonText.textContent = 'Lihat Lebih Sedikit';
        chevron.classList.add('rotate-180');
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('TPQ Al Hikmah Website Loaded Successfully');
});
