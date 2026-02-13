// Driver Fatigue Tracker - Main JavaScript
console.log('Driver Fatigue Tracker Loaded');

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION BUTTONS =====
    const navButtons = document.querySelectorAll('.instrument-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim().toLowerCase();
            
            if (text.includes('dashboard')) {
                window.location.href = 'index.html';
            } else if (text.includes('analytics')) {
                window.location.href = 'analytics.html';
            } else if (text.includes('safety')) {
                window.location.href = 'safety-tips.html';
            } else if (text.includes('contact')) {
                window.location.href = 'form-action.html';
            }
        });
    });

    // ===== ACTION BUTTONS =====
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const btnText = this.querySelector('.btn-text')?.textContent || 'Action';
            const btnIcon = this.querySelector('.btn-icon')?.textContent || '🔔';
            
            // Show different messages based on button type
            if (this.classList.contains('recovery')) {
                alert('🅿️ Take a 15-minute break. Find a safe place to rest!');
            } else if (this.classList.contains('hydration')) {
                alert('💧 Drink water and stay hydrated!');
            } else if (this.classList.contains('rest')) {
                alert('😴 Schedule a 20-minute power nap for best results.');
            } else if (this.classList.contains('journal')) {
                alert('📝 Log your fatigue level. How are you feeling?');
            } else {
                alert(`${btnIcon} ${btnText} clicked!`);
            }
        });
    });

    // ===== SYMPTOM ITEMS =====
    const symptomItems = document.querySelectorAll('.symptom-item');
    symptomItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const symptomName = this.querySelector('.symptom-name')?.textContent || 'Symptom';
            const symptomLevel = this.querySelector('.symptom-level')?.textContent || 'Moderate';
            
            alert(`⚠️ ${symptomName}\nSeverity: ${symptomLevel}\n\nTake appropriate action to stay safe.`);
        });
    });

    // ===== UPDATE GAUGE =====
    const gaugeValue = document.querySelector('.gauge-value');
    if (gaugeValue) {
        // Random alertness between 65-85 for demo
        const alertness = Math.floor(Math.random() * 20) + 65;
        gaugeValue.textContent = `${alertness}%`;
        
        // Update gauge color based on value
        const gaugeCircle = document.querySelector('.gauge-circle');
        if (gaugeCircle) {
            gaugeCircle.style.background = `conic-gradient(
                var(--energy-green) 0% ${alertness}%,
                var(--fatigue-orange) ${alertness}% 85%,
                var(--exhausted-red) 85% 100%
            )`;
        }
        
        // Update warning message
        const warning = document.querySelector('.fatigue-warning');
        if (warning) {
            const warningText = warning.querySelector('.warning-text');
            if (alertness < 50) {
                warningText.innerHTML = '<strong>CRITICAL FATIGUE!</strong><p>Stop driving immediately!</p>';
                warning.style.borderColor = 'var(--exhausted-red)';
            } else if (alertness < 70) {
                warningText.innerHTML = '<strong>Moderate Fatigue</strong><p>Take a break soon</p>';
                warning.style.borderColor = 'var(--fatigue-orange)';
            } else {
                warningText.innerHTML = '<strong>Good Alertness</strong><p>Stay focused and safe</p>';
                warning.style.borderColor = 'var(--energy-green)';
            }
        }
    }

    // ===== METRIC BARS =====
    const metricBars = document.querySelectorAll('.metric-bar .metric-fill');
    metricBars.forEach(bar => {
        if (!bar.style.width) {
            const randomWidth = Math.floor(Math.random() * 60) + 20;
            bar.style.width = `${randomWidth}%`;
        }
    });

    // ===== RECOMMENDATION ITEMS =====
    const recommendations = document.querySelectorAll('.recommendations li');
    recommendations.forEach(item => {
        item.addEventListener('click', function() {
            const tip = this.textContent.trim();
            alert(`💡 Safety Tip: ${tip}`);
        });
    });

    // ===== VIEW DETAILS BUTTONS (for analytics) =====
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📊 Viewing detailed fatigue analytics...');
        });
    });

    // ===== LOCAL STORAGE EXAMPLE =====
    // Save current page visit
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    localStorage.setItem('lastVisited', currentPage);
    localStorage.setItem('lastVisitTime', new Date().toLocaleString());
    
    // ===== WELCOME MESSAGE (first visit only) =====
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        console.log('Welcome to Driver Fatigue Tracker!');
        localStorage.setItem('firstVisit', 'true');
    }

    console.log('Driver Fatigue Tracker initialized successfully');
});