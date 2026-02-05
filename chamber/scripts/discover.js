// Simple JavaScript for Discover page

// Your 8 locations
const locations = [
  {
    name: "Rexburg City Park",
    address: "200 W 2nd S, Rexburg, ID 83440",
    description: "Beautiful park with playgrounds, picnic areas, and walking trails.",
    image: "https://placehold.co/300x200/2c3e50/ffffff/webp?text=Rexburg+Park"
  },
  {
    name: "Madison County Library",
    address: "73 N Center St, Rexburg, ID 83440",
    description: "Public library with extensive collections and community programs.",
    image: "https://placehold.co/300x400/3498db/ffffff/webp?text=Library"
  },
  {
    name: "Teton Flood Museum",
    address: "51 N Center St, Rexburg, ID 83440",
    description: "Museum documenting the 1976 Teton Dam flood disaster.",
    image: "https://placehold.co/300x200/e74c3c/ffffff/webp?text=Museum"
  },
  {
    name: "BYU-Idaho Campus",
    address: "525 S Center St, Rexburg, ID 83460",
    description: "Beautiful university campus with historic buildings and gardens.",
    image: "https://placehold.co/300x200/2ecc71/ffffff/webp?text=Campus"
  },
  {
    name: "Rexburg Rapids",
    address: "300 S 2nd W, Rexburg, ID 83440",
    description: "Water park with slides, pools, and splash areas for summer fun.",
    image: "https://placehold.co/300x200/9b59b6/ffffff/webp?text=Water+Park"
  },
  {
    name: "Porter Park",
    address: "300 S 2nd W, Rexburg, ID 83440",
    description: "Historic park with walking trails and summer concert series.",
    image: "https://placehold.co/300x200/1abc9c/ffffff/webp?text=Porter+Park"
  },
  {
    name: "Rexburg Tabernacle",
    address: "16 S Center St, Rexburg, ID 83440",
    description: "Historic religious building from 1911 with beautiful architecture.",
    image: "https://placehold.co/300x200/f39c12/ffffff/webp?text=Tabernacle"
  },
  {
    name: "Yellowstone Bear World",
    address: "6010 S 4300 W, Rexburg, ID 83440",
    description: "Drive-through wildlife park featuring bears and other animals.",
    image: "https://placehold.co/300x200/e67e22/ffffff/webp?text=Bear+World"
  }
];

// When page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading attractions...');
    
    // Load the cards
    loadCards();
    
    // Handle visitor message
    handleVisitorMessage();
});

// Load attraction cards
function loadCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${location.image}" alt="${location.name}" loading="lazy">
            <h3>${location.name}</h3>
            <address>${location.address}</address>
            <p>${location.description}</p>
            <button class="button">Learn More</button>
        `;
        container.appendChild(card);
    });
}

// Visitor message
function handleVisitorMessage() {
    const messageElement = document.getElementById('visit-msg');
    const closeButton = document.getElementById('close-msg');
    
    if (!messageElement || !closeButton) return;
    
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
    
    // Close button
    closeButton.addEventListener('click', () => {
        document.getElementById('visitor-message').style.display = 'none';
    });
}