const courses = [
    { subject: 'CSE', number: 110, title: 'Programming Building Blocks', credits: 2, completed: false },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    const totalCreditsElement = document.getElementById('totalCredits');
    
    if (!container || !totalCreditsElement) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Filter courses
    let filteredCourses = courses;
    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    }
    
    // Calculate total credits
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
            } else {
                button.style.backgroundColor = '#003366';
            }
        }
    });
}

// Initialize courses display
document.addEventListener('DOMContentLoaded', () => {
    // Display all courses by default
    displayCourses('all');
    
    // Add event listeners to filter buttons
    const allBtn = document.getElementById('allBtn');
    const wddBtn = document.getElementById('wddBtn');
    const cseBtn = document.getElementById('cseBtn');
    
    if (allBtn) {
        allBtn.addEventListener('click', () => displayCourses('all'));
    }
    
    if (wddBtn) {
        wddBtn.addEventListener('click', () => displayCourses('wdd'));
    }
    
    if (cseBtn) {
        cseBtn.addEventListener('click', () => displayCourses('cse'));
    }
});