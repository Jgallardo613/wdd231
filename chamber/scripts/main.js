// main.js - Footer information
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Set your name
    document.getElementById('your-name').textContent = 'Jeffrey Gallardo';
    
    // Mobile menu toggle (optional)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
});