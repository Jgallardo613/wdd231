document.addEventListener('DOMContentLoaded', function() {
    loadMembers();
    setupViewToggle();
    updateFooter();
});

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load data');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        document.getElementById('member-container').innerHTML = 
            '<div class="error">Error loading member data</div>';
        console.error('Load error:', error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // FIXED PATH: images/ + exact filename from JSON
        const imgPath = `images/${member.image}`;
        
        card.innerHTML = `
            <div class="image-container">
                <img src="${imgPath}" alt="${member.name}" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/ccc/666?text=Image+Error'; console.log('Failed: ${imgPath}')">
            </div>
            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="website">🌐 <a href="${member.website}" target="_blank">Visit Website</a></p>
                <p class="membership-level ${member.membershipLevel.toLowerCase()}">
                    ⭐ ${member.membershipLevel} Member
                </p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function setupViewToggle() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('member-container');
    
    gridBtn.addEventListener('click', () => {
        container.className = 'grid-view';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });
    
    listBtn.addEventListener('click', () => {
        container.className = 'list-view';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

function updateFooter() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
}