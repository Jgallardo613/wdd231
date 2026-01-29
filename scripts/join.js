// join.js - JavaScript for Chamber of Commerce Join Page

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Set timestamp when page loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = Date.now();
    }
    
    // Modal functionality for membership benefits
    setupModals();
    
    // Form validation enhancements
    enhanceFormValidation();
    
    // Add animation to membership cards
    animateMembershipCards();
});

// Modal functionality
function setupModals() {
    // Open modal when "View Benefits" button is clicked
    document.querySelectorAll('.view-benefits').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });
    
    // Close modal when close button is clicked
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            event.target.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });
        }
    });
}

// Form validation enhancements
function enhanceFormValidation() {
    const form = document.getElementById('joinForm');
    if (!form) return;
    
    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Add focus styles
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Validate on input change
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
    
    // Validate individual field
    function validateField(field) {
        const parent = field.parentElement;
        
        if (field.validity.valid) {
            parent.classList.remove('invalid');
            parent.classList.add('valid');
        } else {
            parent.classList.remove('valid');
            parent.classList.add('invalid');
        }
    }
    
    // Form submission validation
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.parentElement.classList.add('invalid');
                isValid = false;
            }
        });
        
        // Check pattern validation
        const patternFields = form.querySelectorAll('[pattern]');
        patternFields.forEach(field => {
            const pattern = new RegExp(field.pattern);
            if (field.value && !pattern.test(field.value)) {
                field.parentElement.classList.add('invalid');
                isValid = false;
            }
        });
        
        if (!isValid) {
            event.preventDefault();
            // Scroll to first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Animate membership cards on page load
function animateMembershipCards() {
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, index) => {
        // Add animation delay for staggered effect
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
}

// Helper function to format phone number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Optional: Format phone number input in real-time
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        const input = e.target.value.replace(/\D/g, '').substring(0, 10);
        const formatted = input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        e.target.value = formatted;
    });
}

// Membership level descriptions (for reference)
const membershipBenefits = {
    np: {
        name: 'Non-Profit',
        price: 'Free',
        benefits: [
            'Free basic listing in our online directory',
            'Monthly email newsletter with community updates',
            'Access to quarterly networking events',
            'Resource library access',
            'Volunteer opportunity listings'
        ]
    },
    bronze: {
        name: 'Bronze',
        price: '$50/month',
        benefits: [
            'All Non-Profit benefits',
            '15% discount on chamber events',
            'Monthly business training sessions',
            'Enhanced directory listing with logo',
            'Business referral program',
            'Annual business listing'
        ]
    },
    silver: {
        name: 'Silver',
        price: '$100/month',
        benefits: [
            'All Bronze benefits',
            'Advertising opportunities in chamber publications',
            'Featured in monthly member spotlights',
            'Social media promotion',
            'Priority registration for events',
            'Business consulting sessions (2 per year)'
        ]
    },
    gold: {
        name: 'Gold',
        price: '$200/month',
        benefits: [
            'All Silver benefits',
            'Premium advertising placement',
            'Board participation and voting rights',
            'Annual leadership conference access',
            'Dedicated business consultant',
            'VIP networking events with community leaders',
            'Complimentary event tickets (4 per year)',
            'Featured speaker opportunities'
        ]
    }
};

console.log('Join page JavaScript loaded successfully');