document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ directory.js loaded");
    loadMembers();
    setupViewToggle();
    updateFooter();
});

async function loadMembers() {
    try {
        console.log("Fetching members data...");
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const members = await response.json();
        console.log(`✅ Loaded ${members.length} members`);
        displayMembers(members);
    } catch (error) {
        console.error('❌ Error loading members:', error);
        document.getElementById('member-container').innerHTML = 
            '<div class="error"><p>Error loading member data. Please try again later.</p></div>';
    }
}

function displayMembers(members) {
    const container = document.getElementById('member-container');
    if (!container) {
        console.error('❌ member-container not found!');
        return;
    }
    
    container.innerHTML = '';
    console.log(`Displaying ${members.length} members...`);
    
    members.forEach((member, index) => {
        // DEBUG: Log what image we're trying to load
        console.log(`Member ${index + 1}: ${member.name}, Image: ${member.image}`);
        
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // Create the image element separately for better error handling
        const img = document.createElement('img');
        img.alt = `${member.name} logo`;
        img.loading = 'lazy';
        
        // Try THREE different path formats - ONE will work
        const possiblePaths = [
            `images/${member.image}`,     // Relative from current directory
            `/images/${member.image}`,    // Absolute from server root
            `../images/${member.image}`   // Up one level then into images
        ];
        
        // Try each path until one works
        let currentPathIndex = 0;
        img.src = possiblePaths[0];
        
        img.onerror = function() {
            currentPathIndex++;
            if (currentPathIndex < possiblePaths.length) {
                console.log(`🔄 Trying alternative path: ${possiblePaths[currentPathIndex]}`);
                this.src = possiblePaths[currentPathIndex];
            } else {
                console.error(`❌ All paths failed for: ${member.image}`);
                this.style.display = 'none';
                
                // Create a fallback placeholder
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.innerHTML = `<div style="width:100%;height:200px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#666;">${member.name.charAt(0)}</div>`;
                this.parentNode.appendChild(placeholder);
            }
        };
        
        img.onload = function() {
            console.log(`✅ Image loaded successfully: ${this.src}`);
        };
        
        card.innerHTML = `
            <div class="image-container"></div>
            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <p class="website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                <p class="membership-level ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</p>
            </div>
        `;
        
        // Add the image to the container
        card.querySelector('.image-container').appendChild(img);
        container.appendChild(card);
    });
    
    console.log("✅ All members displayed");
}

function setupViewToggle() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('member-container');
    
    if (!gridBtn || !listBtn || !container) {
        console.warn('⚠️ View toggle elements not found');
        return;
    }
    
    gridBtn.addEventListener('click', function() {
        container.classList.add('grid-view');
        container.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        console.log('Switched to Grid View');
    });
    
    listBtn.addEventListener('click', function() {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        console.log('Switched to List View');
    });
}

function updateFooter() {
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Update last modified date
    const modifiedElement = document.getElementById('last-modified');
    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}

// Add some basic error styling
const style = document.createElement('style');
style.textContent = `
    .error {
        background: #ffebee;
        color: #c62828;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        margin: 20px;
    }
    .image-placeholder {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #f5f5f5, #e0e0e0);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        font-weight: bold;
        color: #999;
        border-radius: 4px;
    }
`;
document.head.appendChild(style);