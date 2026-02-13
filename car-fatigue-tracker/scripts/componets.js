// components.js - Handle component data operations

let componentsCache = null;

// Load components from JSON file
export async function loadComponents() {
    try {
        // Check cache first
        if (componentsCache) {
            console.log('Using cached components data');
            return componentsCache;
        }
        
        console.log('Loading components from JSON...');
        const response = await fetch('../data/components.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const components = await response.json();
        
        // Cache the data
        componentsCache = components;
        
        // Also save to localStorage for offline use
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('componentsBackup', JSON.stringify(components));
        }
        
        return components;
        
    } catch (error) {
        console.error('Error loading components:', error);
        
        // Try to load from localStorage as fallback
        try {
            const backup = localStorage.getItem('componentsBackup');
            if (backup) {
                console.log('Using localStorage backup');
                return JSON.parse(backup);
            }
        } catch (localStorageError) {
            console.error('LocalStorage fallback failed:', localStorageError);
        }
        
        // Return empty array if all fails
        return [];
    }
}

// Calculate statistics from components
export function getComponentStats(components) {
    const stats = {
        criticalItems: 0,
        maintenanceDue: 0,
        totalCost: 0,
        overallHealth: 0,
        byCategory: {},
        criticalComponents: []
    };
    
    if (!components || components.length === 0) {
        return stats;
    }
    
    // Use array methods (map, filter, reduce)
    const totalWear = components.reduce((sum, component) => sum + component.currentWear, 0);
    stats.overallHealth = Math.round(100 - (totalWear / components.length));
    
    stats.criticalItems = components.filter(comp => comp.criticalLevel === 'high').length;
    
    // Components with wear > 70% are considered due for maintenance
    stats.maintenanceDue = components.filter(comp => comp.currentWear > 70).length;
    
    stats.totalCost = components
        .filter(comp => comp.currentWear > 50)
        .reduce((sum, comp) => sum + comp.replacementCost, 0);
    
    // Group by category using reduce
    stats.byCategory = components.reduce((categories, component) => {
        const category = component.category;
        if (!categories[category]) {
            categories[category] = {
                count: 0,
                totalWear: 0,
                totalCost: 0
            };
        }
        categories[category].count++;
        categories[category].totalWear += component.currentWear;
        categories[category].totalCost += component.replacementCost;
        return categories;
    }, {});
    
    // Get top 3 critical components
    stats.criticalComponents = components
        .filter(comp => comp.criticalLevel === 'high')
        .sort((a, b) => b.currentWear - a.currentWear)
        .slice(0, 3);
    
    return stats;
}

// Filter components by category
export function filterByCategory(components, category) {
    if (!components) return [];
    return components.filter(component => 
        category === 'all' || component.category === category
    );
}

// Sort components
export function sortComponents(components, sortBy) {
    if (!components) return [];
    
    const sorted = [...components];
    
    switch (sortBy) {
        case 'wear-high':
            return sorted.sort((a, b) => b.currentWear - a.currentWear);
        case 'wear-low':
            return sorted.sort((a, b) => a.currentWear - b.currentWear);
        case 'cost-high':
            return sorted.sort((a, b) => b.replacementCost - a.replacementCost);
        case 'cost-low':
            return sorted.sort((a, b) => a.replacementCost - b.replacementCost);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Get component by ID
export function getComponentById(components, id) {
    if (!components) return null;
    return components.find(comp => comp.id === id);
}

// Add new component
export function addComponent(newComponent) {
    if (componentsCache) {
        const newId = Math.max(...componentsCache.map(c => c.id)) + 1;
        const componentToAdd = {
            ...newComponent,
            id: newId,
            currentWear: parseInt(newComponent.currentWear) || 0,
            replacementCost: parseFloat(newComponent.replacementCost) || 0
        };
        componentsCache.push(componentToAdd);
        return componentToAdd;
    }
    return null;
}

// Update component
export function updateComponent(componentId, updates) {
    if (componentsCache) {
        const index = componentsCache.findIndex(c => c.id === componentId);
        if (index !== -1) {
            componentsCache[index] = { ...componentsCache[index], ...updates };
            return componentsCache[index];
        }
    }
    return null;
}