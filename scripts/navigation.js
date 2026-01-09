const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
}