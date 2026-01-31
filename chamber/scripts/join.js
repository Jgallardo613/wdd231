// join.js - Chamber Join Page Functionality

// ===== HAMBURGER MENU FUNCTIONALITY =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

// Form validation
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(event) {
        const phone = document.getElementById('phone').value;
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        
        if (!phonePattern.test(phone)) {
            event.preventDefault();
            alert('Please enter phone number in format: (555) 123-4567');
            document.getElementById('phone').focus();
            return false;
        }
        
        // Additional validation
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const business = document.getElementById('business').value;
        const membership = document.getElementById('membership').value;
        
        if (!firstName || !lastName || !email || !business || !membership) {
            event.preventDefault();
            alert('Please fill in all required fields (*)');
            return false;
        }
        
        // All validations passed
        return true;
    });
}

// Modal functionality
const modal = document.getElementById('benefitsModal');
const modalTitle = document.getElementById('modalTitle');
const modalBenefits = document.getElementById('modalBenefits');
const closeModal = document.querySelector('.close-modal');

// Benefits data for each membership level
const benefitsData = {
    'np': [
        'Basic listing in business directory',
        'Monthly newsletter subscription',
        'Access to quarterly networking events',
        'Community support recognition',
        'Non-profit resource guide',
        'Eligibility for community grants',
        'Volunteer opportunity listings',
        'Access to non-profit workshops',
        'Annual community impact report'
    ],
    'bronze': [
        'All Non-Profit benefits',
        '15% discount on chamber events',
        'Monthly business training sessions',
        'Business listing with logo',
        'Social media mention once per quarter',
        'Access to member-only webinars',
        'Business mentorship program',
        'Annual business review',
        'Access to business resource library',
        'Discounts on office supplies'
    ],
    'silver': [
        'All Bronze benefits',
        '25% discount on chamber events',
        'Advertising opportunities in newsletter',
        'Featured business spotlight monthly',
        'Priority event registration',
        'Social media promotion twice per month',
        'Business consulting session quarterly',
        'Access to premium business tools',
        'Networking event hosting privileges',
        'Custom email newsletter templates',
        'Access to market research data'
    ],
    'gold': [
        'All Silver benefits',
        '50% discount on chamber events',
        'Premium advertising placement',
        'Board participation rights',
        'Annual leadership conference ticket',
        'Dedicated business consultant',
        'VIP networking events',
        'Featured on homepage monthly',
        'Press release distribution',
        'Custom business development plan',
        'Exclusive partner discounts',
        'Priority referral program',
        'Media interview opportunities',
        'Annual strategic planning session'
    ]
};

// Level titles for modal
const levelTitles = {
    'np': 'Non-Profit Membership Benefits',
    'bronze': 'Bronze Membership Benefits',
    'silver': 'Silver Membership Benefits',
    'gold': 'Gold Membership Benefits'
};

// Level descriptions
const levelDescriptions = {
    'np': 'Perfect for non-profit organizations looking to connect with the community.',
    'bronze': 'Great for small businesses starting to grow their network.',
    'silver': 'Ideal for established businesses seeking more visibility.',
    'gold': 'Premium package for businesses wanting maximum exposure and influence.'
};

// Open modal when View Benefits is clicked
document.querySelectorAll('.view-benefits').forEach(button => {
    button.addEventListener('click', function() {
        const level = this.getAttribute('data-level');
        showBenefitsModal(level);
    });
});

// Show modal with benefits
function showBenefitsModal(level) {
    if (!level || !benefitsData[level]) return;
    
    // Set modal title
    modalTitle.textContent = levelTitles[level];
    
    // Clear and populate benefits list
    modalBenefits.innerHTML = '';
    
    // Add description
    const description = document.createElement('p');
    description.textContent = levelDescriptions[level];
    description.style.color = 'var(--text-dark)';
    description.style.marginBottom = '1.5rem';
    description.style.fontStyle = 'italic';
    modalBenefits.appendChild(description);
    
    // Add benefits list
    const ul = document.createElement('ul');
    
    benefitsData[level].forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = `✓ ${benefit}`;
        ul.appendChild(li);
    });
    
    modalBenefits.appendChild(ul);
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal when X is clicked
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Trigger card animations when page loads
window.addEventListener('load', function() {
    // Make cards visible after animation
    document.querySelectorAll('.membership-card').forEach(card => {
        card.style.opacity = '1';
    });
    
    // Add loading timestamp
    const loadTime = new Date().toLocaleString();
    console.log(`Page loaded at: ${loadTime}`);
});

// Format phone number as user types
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 4) {
            value = value.slice(0, 4) + ') ' + value.slice(4);
        }
        if (value.length > 9) {
            value = value.slice(0, 9) + '-' + value.slice(9, 13);
        }
        
        e.target.value = value;
    });
}

// Membership level change handler
const membershipSelect = document.getElementById('membership');
if (membershipSelect) {
    membershipSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        const selectedText = this.options[this.selectedIndex].text;
        console.log(`Selected membership: ${selectedText}`);
        
        // Highlight corresponding card
        document.querySelectorAll('.membership-card').forEach(card => {
            card.classList.remove('selected-level');
        });
        
        const selectedCard = document.querySelector(`[data-level="${selectedValue}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected-level');
            selectedCard.style.boxShadow = '0 0 0 3px var(--accent-color)';
            
            // Scroll to card
            setTimeout(() => {
                selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
}