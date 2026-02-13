// ui.js - Handles all DOM manipulation and UI updates
import { fetchFatigueData, getHighFatigueEvents } from './data-fetcher.js';
import { loadUserPreferences, saveUserPreferences } from './storage.js';
import { showModal, showReportSymptomModal, showEventDetailsModal } from './modal.js';

// Initialize UI
export async function initializeUI() {
    try {
        // Load user preferences
        const prefs = loadUserPreferences();
        applyUserPreferences(prefs);
        
        // Load data
        const data = await fetchFatigueData();
        
        // Update dashboard with data
        updateAlertnessGauge(data.statistics.averageAlertness);
        updateFatigueEventsTable(data.fatigueEvents);
        updateStatistics(data.statistics);
        
        // Setup event listeners
        setupEventListeners();
        
        // Load last session if exists
        // Using localStorage!
        const lastSession = localStorage.getItem('lastView');
        if (lastSession === 'analytics') {
            console.log('User was on analytics page last visit');
        }
        
    } catch (error) {
        console.error('Failed to initialize UI:', error);
    }
}

// Update alertness gauge using DOM manipulation
export function updateAlertnessGauge(value) {
    const gaugeValue = document.querySelector('.gauge-value');
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeCircle = document.querySelector('.gauge-circle');
    
    if (gaugeValue) {
        // Modifying element content
        gaugeValue.textContent = `${value}%`;
    }
    
    if (gaugeCircle) {
        // Modifying element style
        gaugeCircle.style.background = `conic-gradient(
            var(--energy-green) 0% ${value}%,
            var(--fatigue-orange) ${value}% 85%,
            var(--exhausted-red) 85% 100%
        )`;
    }
    
    // Update warning message
    const warning = document.querySelector('.fatigue-warning');
    if (warning) {
        const warningText = warning.querySelector('.warning-text');
        if (value < 50) {
            warningText.innerHTML = '<strong>Critical Fatigue!</strong><p>Stop driving immediately!</p>';
            warning.style.borderColor = 'var(--exhausted-red)';
        } else if (value < 70) {
            warningText.innerHTML = '<strong>Moderate Fatigue</strong><p>Take a break soon</p>';
            warning.style.borderColor = 'var(--fatigue-orange)';
        } else {
            warningText.innerHTML = '<strong>Good Alertness</strong><p>Stay focused and safe</p>';
            warning.style.borderColor = 'var(--energy-green)';
        }
    }
}

// Update events table using array methods + template literals
export function updateFatigueEventsTable(events) {
    const tableBody = document.querySelector('#events-table tbody');
    if (!tableBody) return;
    
    // Using forEach array method!
    events.slice(0, 10).forEach(event => {
        // Using template literals!
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.date} ${event.time}</td>
            <td><span class="alertness-badge ${getAlertnessClass(event.alertness)}">${event.alertness}%</span></td>
            <td>${event.symptoms.join(', ')}</td>
            <td>${Math.floor(event.tripDuration / 60)}h ${event.tripDuration % 60}m</td>
            <td>${event.action}</td>
            <td><button class="view-details-btn" data-id="${event.id}">View</button></td>
        `;
        
        // Add event listener to the button
        const viewBtn = row.querySelector('.view-details-btn');
        viewBtn.addEventListener('click', () => showEventDetailsModal(event));
        
        tableBody.appendChild(row);
    });
}

// Update statistics cards
export function updateStatistics(stats) {
    const statElements = document.querySelectorAll('.metric-item');
    
    // Using forEach array method!
    statElements.forEach((element, index) => {
        const label = element.querySelector('.metric-label');
        const value = element.querySelector('.metric-value');
        const bar = element.querySelector('.metric-fill');
        
        if (label && label.textContent.includes('Alertness')) {
            value.textContent = `${stats.averageAlertness}%`;
            value.className = `metric-value ${getAlertnessClass(stats.averageAlertness)}`;
            bar.style.width = `${stats.averageAlertness}%`;
            bar.className = `metric-fill ${getAlertnessClass(stats.averageAlertness)}`;
        }
        
        if (label && label.textContent.includes('Fatigue Events')) {
            value.textContent = stats.highFatigueEvents;
            bar.style.width = `${(stats.highFatigueEvents / 10) * 100}%`;
        }
        
        if (label && label.textContent.includes('Trip Duration')) {
            value.textContent = `${Math.floor(stats.avgTripDuration / 60)}h`;
            bar.style.width = `${(stats.avgTripDuration / 240) * 100}%`;
        }
    });
}

// Setup all event listeners
export function setupEventListeners() {
    // Quick break button
    const breakBtn = document.querySelector('.action-btn.recovery');
    if (breakBtn) {
        breakBtn.addEventListener('click', () => {
            showModal('Break Reminder', 'Take a 15-minute break. Stretch, walk, and rehydrate!');
            
            // Save to localStorage
            localStorage.setItem('lastBreak', new Date().toISOString());
        });
    }
    
    // Report symptom button
    const reportBtn = document.querySelector('.action-btn.journal');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            showReportSymptomModal((data) => {
                console.log('Symptom reported:', data);
                
                // Save to localStorage
                const reports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
                reports.push({ ...data, timestamp: new Date().toISOString() });
                localStorage.setItem('symptomReports', JSON.stringify(reports));
                
                showModal('Thank You', 'Your symptom has been reported. Stay safe!');
            });
        });
    }
    
    // Hydration button
    const hydrationBtn = document.querySelector('.action-btn.hydration');
    if (hydrationBtn) {
        hydrationBtn.addEventListener('click', () => {
            const now = new Date();
            const lastHydration = localStorage.getItem('lastHydration');
            
            if (lastHydration) {
                const minutesSince = (now - new Date(lastHydration)) / 60000;
                if (minutesSince < 30) {
                    showModal('Stay Hydrated', `You hydrated ${Math.round(minutesSince)} minutes ago. Good job!`);
                }
            }
            
            localStorage.setItem('lastHydration', now.toISOString());
        });
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', showSettingsModal);
    }
    
    // Reset data button
    const resetBtn = document.getElementById('reset-data');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            showModal('Reset Data', 'Are you sure you want to reset all preferences?', () => {
                localStorage.clear();
                location.reload();
            });
        });
    }
}

// Settings modal
function showSettingsModal() {
    const prefs = loadUserPreferences();
    
    // Using template literals!
    const settingsHTML = `
        <form id="settings-form">
            <div class="form-group">
                <label>
                    <input type="checkbox" name="notifications" ${prefs.notifications ? 'checked' : ''}>
                    Enable Notifications
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="darkMode" ${prefs.darkMode ? 'checked' : ''}>
                    Dark Mode
                </label>
            </div>
            <div class="form-group">
                <label>Alert Threshold (%):</label>
                <input type="range" name="alertThreshold" min="40" max="80" value="${prefs.alertThreshold}">
                <span>${prefs.alertThreshold}%</span>
            </div>
            <div class="form-group">
                <label>Refresh Interval (minutes):</label>
                <select name="refreshInterval">
                    <option value="1" ${prefs.refreshInterval === 1 ? 'selected' : ''}>1 minute</option>
                    <option value="5" ${prefs.refreshInterval === 5 ? 'selected' : ''}>5 minutes</option>
                    <option value="10" ${prefs.refreshInterval === 10 ? 'selected' : ''}>10 minutes</option>
                </select>
            </div>
        </form>
    `;
    
    showModal('User Preferences', settingsHTML, () => {
        const form = document.getElementById('settings-form');
        const formData = new FormData(form);
        const newPrefs = {
            notifications: formData.has('notifications'),
            darkMode: formData.has('darkMode'),
            alertThreshold: parseInt(formData.get('alertThreshold')),
            refreshInterval: parseInt(formData.get('refreshInterval')),
            defaultView: prefs.defaultView
        };
        
        saveUserPreferences(newPrefs);
        applyUserPreferences(newPrefs);
        showModal('Success', 'Preferences saved!');
    });
}

// Apply user preferences
function applyUserPreferences(prefs) {
    if (!prefs) return;
    
    // Apply dark mode
    if (prefs.darkMode === false) {
        document.body.style.background = '#f0f0f0';
    }
    
    // Save current view
    localStorage.setItem('lastView', window.location.pathname.split('/').pop());
}

// Helper function for alertness classes
function getAlertnessClass(alertness) {
    if (alertness >= 70) return 'good';
    if (alertness >= 50) return 'medium';
    return 'poor';
}

// Export to window for onclick handlers
window.showModal = showModal;
window.closeModal = closeModal;