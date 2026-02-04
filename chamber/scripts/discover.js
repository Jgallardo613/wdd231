// FIXED: Correct import path
import { locations } from './data/locations.mjs';

console.log("JavaScript loaded successfully!");

function displayVisitorMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const message = document.getElementById('visitor-message');
    
    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        if (days < 1) {
            message.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = days === 1 ? "day" : "days";
            message.textContent = `You last visited ${days} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now);
}

function displayCards() {
    const gallery = document.getElementById('gallery');
    const spinner = gallery.querySelector('.loading-spinner');
    
    if (spinner) {
        spinner.remove();
    }
    
    gallery.innerHTML = locations.map(loc => `
        <div class="card">
            <div class="card-header"><h2>${loc.name}</h2></div>
            <img src="${loc.image}" alt="${loc.name}" loading="lazy" width="300" height="200">
            <div class="card-address">${loc.address}</div>
            <div class="card-description"><p>${loc.description}</p></div>
            <div class="card-actions"><button class="learn-more">Learn More</button></div>
        </div>
    `).join('');
    
    console.log(`Displayed ${locations.length} cards`);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    displayVisitorMessage();
    displayCards();
});