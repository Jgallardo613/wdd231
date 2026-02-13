// modal.js - Handles modal dialog functionality
export function showModal(title, content, onConfirm = null) {
    // Check if modal already exists
    let modal = document.getElementById('fatigue-modal');
    
    if (!modal) {
        modal = createModal();
        document.body.appendChild(modal);
    }
    
    // Update modal content using template literals!
    modal.querySelector('.modal-title').textContent = title;
    
    if (typeof content === 'string') {
        modal.querySelector('.modal-body').innerHTML = content;
    } else {
        modal.querySelector('.modal-body').appendChild(content);
    }
    
    // Setup confirm button
    const confirmBtn = modal.querySelector('.modal-confirm');
    if (onConfirm) {
        confirmBtn.onclick = () => {
            onConfirm();
            closeModal();
        };
        confirmBtn.style.display = 'block';
    } else {
        confirmBtn.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Trap focus inside modal
    trapFocus(modal);
    
    return modal;
}

export function closeModal() {
    const modal = document.getElementById('fatigue-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function createModal() {
    // Using template literals for HTML!
    const modalHTML = `
        <div id="fatigue-modal" class="modal" role="dialog" aria-modal="true" aria-hidden="true">
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="modal-cancel">Cancel</button>
                    <button class="modal-confirm">Confirm</button>
                </div>
            </div>
        </div>
    `;
    
    const template = document.createElement('template');
    template.innerHTML = modalHTML.trim();
    const modal = template.content.firstElementChild;
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close on Escape key
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    return modal;
}

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    firstFocusable?.focus();
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable?.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable?.focus();
            }
        }
    });
}

// Report fatigue symptom modal
export function showReportSymptomModal(onSubmit) {
    // Using template literals for form!
    const formHTML = `
        <form id="symptom-report-form">
            <div class="form-group">
                <label for="symptom-select">Select Symptom:</label>
                <select id="symptom-select" required>
                    <option value="">Choose a symptom...</option>
                    <option value="yawning">Frequent Yawning</option>
                    <option value="eyelids">Heavy Eyelids</option>
                    <option value="focus">Poor Concentration</option>
                    <option value="irritability">Irritability</option>
                    <option value="drifting">Lane Drifting</option>
                    <option value="memory">Memory Lapses</option>
                </select>
            </div>
            <div class="form-group">
                <label for="severity-select">Severity Level:</label>
                <select id="severity-select" required>
                    <option value="">Select severity...</option>
                    <option value="low">Low - Just noticing</option>
                    <option value="medium">Medium - Affecting driving</option>
                    <option value="high">High - Need immediate break</option>
                </select>
            </div>
            <div class="form-group">
                <label for="symptom-notes">Additional Notes:</label>
                <textarea id="symptom-notes" rows="3" placeholder="Any other details..."></textarea>
            </div>
        </form>
    `;
    
    showModal('Report Fatigue Symptom', formHTML, () => {
        const form = document.getElementById('symptom-report-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if (onSubmit) {
            onSubmit(data);
        }
    });
}

// View event details modal
export function showEventDetailsModal(event) {
    // Using template literals with dynamic data!
    const detailsHTML = `
        <div class="event-details">
            <p><strong>Date:</strong> ${event.date} at ${event.time}</p>
            <p><strong>Alertness Level:</strong> ${event.alertness}%</p>
            <p><strong>Trip Duration:</strong> ${Math.floor(event.tripDuration / 60)}h ${event.tripDuration % 60}m</p>
            <p><strong>Symptoms:</strong> ${event.symptoms.join(', ')}</p>
            <p><strong>Action Taken:</strong> ${event.action}</p>
            <p><strong>Fatigue Status:</strong> ${event.alertness > 70 ? 'Good' : event.alertness > 50 ? 'Moderate' : 'Critical'}</p>
        </div>
    `;
    
    showModal(`Event Details - ID: ${event.id}`, detailsHTML);
}