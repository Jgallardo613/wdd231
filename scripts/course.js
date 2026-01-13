const courses = [
    { subject: 'CSE', number: 110, title: 'Programming Building Blocks', credits: 2, completed: true},
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true},
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    const totalCreditsElement = document.getElementById('totalCredits');
    
    // NULL CHECK - Prevents "undefined or null" error
    if (!container || !totalCreditsElement) {
        console.log('Course elements not found yet');
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Filter courses
    let filteredCourses = courses;
    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    }
    
    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    // Display courses
    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course ${course.completed ? 'completed' : ''}`;
        courseElement.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>Credits: ${course.credits}</p>
            <p>Status: ${course.completed ? '✅ Completed' : '⏳ In Progress'}</p>
            <p>Subject: ${course.subject}</p>
        `;
        container.appendChild(courseElement);
    });
    
    // Update total credits
    totalCreditsElement.textContent = totalCredits;
    
    // Update button states
    updateButtonStates(filter);
}

function updateButtonStates(activeFilter) {
    const buttons = ['allBtn', 'wddBtn', 'cseBtn'];
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            if (buttonId.replace('Btn', '') === activeFilter) {
                button.style.backgroundColor = '#002244';
                button.style.fontWeight = 'bold';
            } else {
                button.style.backgroundColor = '#003366';
                button.style.fontWeight = 'normal';
            }
        }
    });
}

// Initialize courses display
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment to ensure DOM is fully loaded
    setTimeout(() => {
        // Check if elements exist
        const allBtn = document.getElementById('allBtn');
        const wddBtn = document.getElementById('wddBtn');
        const cseBtn = document.getElementById('cseBtn');
        
        if (allBtn && wddBtn && cseBtn) {
            // Add event listeners to filter buttons
            allBtn.addEventListener('click', () => displayCourses('all'));
            wddBtn.addEventListener('click', () => displayCourses('wdd'));
            cseBtn.addEventListener('click', () => displayCourses('cse'));
            
            // Display all courses by default
            displayCourses('all');
            
            // Log success
            console.log('Course system loaded successfully!');
            console.log('Total credits (all):', courses.reduce((sum, c) => sum + c.credits, 0));
            console.log('WDD credits:', courses.filter(c => c.subject === 'WDD').reduce((sum, c) => sum + c.credits, 0));
            console.log('CSE credits:', courses.filter(c => c.subject === 'CSE').reduce((sum, c) => sum + c.credits, 0));
        } else {
            console.log('Filter buttons not found yet, retrying...');
            // Try again after a short delay
            setTimeout(() => {
                displayCourses('all');
            }, 100);
        }
    }, 50);
});

// Fallback: Try to initialize if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        displayCourses('all');
    }, 100);
}