// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // View toggle functionality
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const memberContainer = document.getElementById('member-container');
    
    gridViewBtn.addEventListener('click', function() {
        memberContainer.className = 'grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        memberContainer.className = 'list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    // Load members from JSON
    loadMembers();
});

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
        document.querySelector('.loading').textContent = 'Error loading businesses. Please try again later.';
    }
}

function displayMembers(members) {
    const container = document.getElementById('member-container');
    
    // Remove loading message
    const loadingElement = container.querySelector('.loading');
    if (loadingElement) {
        container.removeChild(loadingElement);
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Display each member
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // Create membership level class
        const levelClass = member.membershipLevel.toLowerCase();
        
        // Handle image path - ensure it's in images directory
        const imagePath = `images/${member.image}`;
        
        card.innerHTML = `
            <img src="${imagePath}" alt="${member.name} logo" loading="lazy">
            <div class="card-content">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p class="phone">${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener" class="website" aria-label="Visit ${member.name} website">Visit Website</a>
                <div class="level ${levelClass}">${member.membershipLevel} Member</div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // If no members found
    if (members.length === 0) {
        container.innerHTML = '<div class="loading">No businesses found.</div>';
    }
}