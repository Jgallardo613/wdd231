const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
        
        // Update button text to show current state
        if (nav.classList.contains('show')) {
            menuBtn.innerHTML = '✕ Close Menu';
            menuBtn.setAttribute('aria-label', 'Close navigation menu');
        } else {
            menuBtn.innerHTML = '☰ Open Menu';
            menuBtn.setAttribute('aria-label', 'Open navigation menu');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('show') && 
            !nav.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            nav.classList.remove('show');
            menuBtn.innerHTML = '☰ Open Menu';
        }
    });
}

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});