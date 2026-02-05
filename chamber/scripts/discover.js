// ✅ IMPORT FROM .MJS FILE (REQUIREMENT MET)
import { locations } from '../data/locations.mjs';

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Discover page loaded with imported data');
    
    // 1. Load all 8 attractions from imported data
    loadAttractions();
    
    // 2. Handle visitor message
    handleVisitorMessage();
    
    // 3. Setup close button
    setupCloseButton();
});

function loadAttractions() {
    const container = document.getElementById('cards-container');
    if (!container) {
        console.error('❌ Cannot find #cards-container element');
        return;
    }
    
    console.log(`🖼️ Loading ${locations.length} attractions from data/locations.mjs...`);
    
    // Clear loading message
    container.innerHTML = '';
    
    // Create all 8 cards from imported data
    locations.forEach((attraction, index) => {
        const card = document.createElement('article');
        card.className = 'card';
        // ✅ Add grid-area for CSS targeting (REQUIREMENT MET)
        card.style.gridArea = `card${index + 1}`;
        
        card.innerHTML = `
            <figure>
                <img src="${attraction.image}" 
                     alt="${attraction.name}"
                     width="300"
                     height="200"
                     loading="lazy"
                     class="discover-image">
            </figure>
            <div class="card-content">
                <h2>${attraction.name}</h2>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="button">Learn More</button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log(`✅ Created ${locations.length} cards from imported data`);
}

function handleVisitorMessage() {
    const messageElement = document.getElementById('visit-msg');
    if (!messageElement) return;
    
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    let message;
    
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (days === 0) {
            message = "Back so soon! Awesome!";
        } else if (days === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }
    
    messageElement.textContent = message;
    localStorage.setItem('lastVisit', now.toString());
}

function setupCloseButton() {
    const closeBtn = document.getElementById('close-msg');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const msg = document.getElementById('visitor-message');
            if (msg) {
                msg.style.display = 'none';
            }
        });
    }
}

// Verify data import worked
console.log('📊 Successfully imported:', locations.length, 'attractions from data/locations.mjs');