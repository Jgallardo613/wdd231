document.addEventListener('DOMContentLoaded', function() {
    console.log('Courses script loaded');
    
    const courses = [
        { subject: 'CSE', number: 110, title: 'Programming Building Blocks', credits: 3, completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 3, completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: true},
        { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 3, completed: false }
    ];
    
    // Get elements - IDs MUST MATCH HTML
    const container = document.getElementById('coursesContainer');
    const totalCredits = document.getElementById('totalCredits');
    const allBtn = document.getElementById('allBtn');
    const wddBtn = document.getElementById('wddBtn');
    const cseBtn = document.getElementById('cseBtn');
    
    console.log('Found:', { 
        container: container ? 'YES' : 'NO',
        totalCredits: totalCredits ? 'YES' : 'NO',
        allBtn: allBtn ? 'YES' : 'NO',
        wddBtn: wddBtn ? 'YES' : 'NO',
        cseBtn: cseBtn ? 'YES' : 'NO'
    });
    
    // If container not found, show error
    if (!container) {
        console.error('ERROR: coursesContainer not found in HTML');
        console.error('Add this to HTML: <div id="coursesContainer"></div>');
        return;
    }
    
    function displayCourses(courseList) {
        container.innerHTML = '';
        let credits = 0;
        
        courseList.forEach(course => {
            credits += course.credits;
            
            const div = document.createElement('div');
            div.className = 'course ' + (course.completed ? 'completed' : 'not-completed');
            div.innerHTML = `
                <strong>${course.subject} ${course.number}</strong><br>
                ${course.title}<br>
                Credits: ${course.credits}<br>
                ${course.completed ? '✓ Completed' : 'Not Completed'}
            `;
            container.appendChild(div);
        });
        
        if (totalCredits) {
            totalCredits.textContent = credits;
        }
        
        console.log('Displayed', courseList.length, 'courses,', credits, 'credits');
    }
    
    // Add button events
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            displayCourses(courses);
        });
    }
    
    if (wddBtn) {
        wddBtn.addEventListener('click', function() {
            const wddCourses = courses.filter(course => course.subject === 'WDD');
            displayCourses(wddCourses);
        });
    }
    
    if (cseBtn) {
        cseBtn.addEventListener('click', function() {
            const cseCourses = courses.filter(course => course.subject === 'CSE');
            displayCourses(cseCourses);
        });
    }
    
    // Show all courses on load
    displayCourses(courses);
});