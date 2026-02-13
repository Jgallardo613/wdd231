// storage.js - Handles all local storage operations
const STORAGE_KEYS = {
    USER_PREFERENCES: 'fatigueTracker_preferences',
    LAST_SESSION: 'fatigueTracker_lastSession',
    BOOKMARKS: 'fatigueTracker_bookmarks'
};

// Save user preferences to localStorage
export function saveUserPreferences(preferences) {
    try {
        const serialized = JSON.stringify(preferences);
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, serialized);
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

// Load user preferences from localStorage
export function loadUserPreferences() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        if (stored) {
            return JSON.parse(stored);
        }
        // Default preferences
        return {
            alertThreshold: 60,
            darkMode: true,
            notifications: true,
            defaultView: 'dashboard',
            refreshInterval: 5
        };
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return null;
    }
}

// Save current session data
export function saveSession(sessionData) {
    try {
        sessionData.timestamp = new Date().toISOString();
        const serialized = JSON.stringify(sessionData);
        localStorage.setItem(STORAGE_KEYS.LAST_SESSION, serialized);
        return true;
    } catch (error) {
        console.error('Failed to save session:', error);
        return false;
    }
}

// Load last session data
export function loadLastSession() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.LAST_SESSION);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Failed to load session:', error);
        return null;
    }
}

// Toggle bookmark for an event
export function toggleBookmark(eventId) {
    try {
        let bookmarks = loadBookmarks();
        
        if (bookmarks.includes(eventId)) {
            // Using filter array method!
            bookmarks = bookmarks.filter(id => id !== eventId);
        } else {
            bookmarks.push(eventId);
        }
        
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
        return bookmarks;
    } catch (error) {
        console.error('Failed to toggle bookmark:', error);
        return [];
    }
}

// Load all bookmarks
export function loadBookmarks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load bookmarks:', error);
        return [];
    }
}

// Clear all stored data
export function clearAllData() {
    try {
        localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
        localStorage.removeItem(STORAGE_KEYS.LAST_SESSION);
        localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
        return true;
    } catch (error) {
        console.error('Failed to clear data:', error);
        return false;
    }
}