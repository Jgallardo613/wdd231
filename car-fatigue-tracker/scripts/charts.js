// charts.js - Chart.js visualizations for analytics page

import { loadComponents, getComponentStats } from './components.js';

let wearChart = null;
let costChart = null;
let timelineChart = null;
let healthChart = null;

// Initialize charts
export async function initCharts() {
    try {
        const components = await loadComponents();
        const stats = getComponentStats(components);
        
        // Create all charts
        createWearChart(components);
        createCostChart(stats);
        createTimelineChart(components);
        createHealthChart();
        
        // Populate tables
        populateTables(components);
        
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Create wear distribution chart
function createWearChart(components) {
    const ctx = document.getElementById('wearChart');
    if (!ctx) return;
    
    const wearLevels = {
        '0-20%': 0,
        '21-40%': 0,
        '41-60%': 0,
        '61-80%': 0,
        '81-100%': 0
    };
    
    components.forEach(component => {
        const wear = component.currentWear;
        if (wear <= 20) wearLevels['0-20%']++;
        else if (wear <= 40) wearLevels['21-40%']++;
        else if (wear <= 60) wearLevels['41-60%']++;
        else if (wear <= 80) wearLevels['61-80%']++;
        else wearLevels['81-100%']++;
    });
    
    if (wearChart) wearChart.destroy();
    
    wearChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(wearLevels),
            datasets: [{
                label: 'Number of Components',
                data: Object.values(wearLevels),
                backgroundColor: [
                    '#00A36C', // green
                    '#4CAF50',
                    '#FF9500', // orange
                    '#FF5722',
                    '#C41E3A'  // red
                ],
                borderColor: [
                    '#008F5C',
                    '#388E3C',
                    '#E68900',
                    '#E64A19',
                    '#AD1A36'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Components'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Wear Level'
                    }
                }
            }
        }
    });
}

// Create cost by category chart
function createCostChart(stats) {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;
    
    const categories = Object.keys(stats.byCategory);
    const costs = categories.map(cat => stats.byCategory[cat].totalCost);
    
    if (costChart) costChart.destroy();
    
    costChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Replacement Cost',
                data: costs,
                backgroundColor: [
                    '#003DA5',
                    '#0056D6',
                    '#1A73E8',
                    '#4285F4',
                    '#6BA1FF',
                    '#94BCFF'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Create timeline chart
function createTimelineChart(components) {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;
    
    // Get critical components sorted by wear
    const criticalComponents = components
        .filter(c => c.criticalLevel === 'high')
        .sort((a, b) => b.currentWear - a.currentWear)
        .slice(0, 5);
    
    const labels = criticalComponents.map(c => c.name);
    const wearData = criticalComponents.map(c => c.currentWear);
    
    if (timelineChart) timelineChart.destroy();
    
    timelineChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wear %',
                data: wearData,
                backgroundColor: wearData.map(wear => 
                    wear > 80 ? '#C41E3A' : 
                    wear > 60 ? '#FF9500' : 
                    wear > 40 ? '#FFC107' : '#4CAF50'
                ),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Wear %'
                    }
                }
            }
        }
    });
}

// Create health trend chart
function createHealthChart() {
    const ctx = document.getElementById('healthChart');
    if (!ctx) return;
    
    // Simulated health data over time
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const healthData = [92, 88, 85, 82, 78, 75, 72, 70]; // Simulated declining health
    
    if (healthChart) healthChart.destroy();
    
    healthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Vehicle Health %',
                data: healthData,
                borderColor: '#003DA5',
                backgroundColor: 'rgba(0, 61, 165, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Health %'
                    }
                }
            }
        }
    });
}

// Populate data tables
function populateTables(components) {
    // Components table
    const componentsTable = document.querySelector('#components-table tbody');
    if (componentsTable) {
        componentsTable.innerHTML = '';
        components.forEach(component => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${component.name}</td>
                <td>${component.category}</td>
                <td>${component.currentWear}%</td>
                <td><span class="critical-${component.criticalLevel}">${component.criticalLevel}</span></td>
                <td>$${component.replacementCost}</td>
                <td>${component.urgency}</td>
            `;
            componentsTable.appendChild(row);
        });
    }
    
    // History table (simulated)
    const historyTable = document.querySelector('#history-body');
    if (historyTable) {
        const history = [
            { date: '2024-01-15', component: 'Oil Change', action: 'Replaced', cost: 75, notes: 'Synthetic oil' },
            { date: '2023-12-10', component: 'Tire Rotation', action: 'Rotated', cost: 25, notes: 'Balanced all tires' },
            { date: '2023-10-05', component: 'Brake Pads', action: 'Replaced', cost: 285, notes: 'Front pads only' },
            { date: '2023-08-20', component: 'Air Filter', action: 'Replaced', cost: 45, notes: 'Cabin and engine filters' }
        ];
        
        historyTable.innerHTML = '';
        history.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.component}</td>
                <td>${record.action}</td>
                <td>$${record.cost}</td>
                <td>${record.notes}</td>
            `;
            historyTable.appendChild(row);
        });
    }
}

// Initialize when page loads
if (document.getElementById('wearChart')) {
    document.addEventListener('DOMContentLoaded', initCharts);
}

// Export for other modules
export { initCharts };