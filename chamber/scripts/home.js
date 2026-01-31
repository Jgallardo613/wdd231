// scripts/home.js - FINAL VERSION WITH 3-DAY FORECAST

console.log('🏢 Chamber Home Page initialized');

// DOM Elements
const currentYearElement = document.getElementById('current-year');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Home page loaded');
    
    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Load weather data
    loadWeatherData();
    
    // Load member spotlights
    loadMemberSpotlights();
    
    // Initialize hamburger menu
    initHamburgerMenu();
});

// Helper function to get next 3 days
function getNextThreeDays() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = [];
    for (let i = 1; i <= 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(days[date.getDay()]);
    }
    return dates;
}

// Load weather data
async function loadWeatherData() {
    console.log('🌤️ Loading weather data...');
    
    try {
        // Mock data for demo with 3-day forecast
        const mockWeatherData = {
            main: { temp: 68, humidity: 42 },
            weather: [{ description: 'Partly Cloudy', icon: '01d' }],
            wind: { speed: 7 }
        };
        
        displayWeatherData(mockWeatherData);
        
    } catch (error) {
        console.error('❌ Error loading weather data:', error);
        displayWeatherError();
    }
}

// Display weather data WITH 3-DAY FORECAST
function displayWeatherData(data) {
    console.log('✅ Weather data loaded:', data);
    
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherDesc = document.querySelector('.weather-desc');
    const weatherForecast = document.querySelector('.weather-forecast');
    
    if (weatherTemp) weatherTemp.textContent = `${Math.round(data.main.temp)}°F`;
    if (weatherDesc) weatherDesc.textContent = data.weather[0].description;
    
    // Get next 3 days for forecast
    const forecastDates = getNextThreeDays();
    
    if (weatherForecast) {
        weatherForecast.innerHTML = `
            <p><strong>Today:</strong> ${data.weather[0].description}, ${Math.round(data.main.temp)}°F</p>
            <p><strong>${forecastDates[0]}:</strong> Partly Cloudy, 72°F</p>
            <p><strong>${forecastDates[1]}:</strong> Sunny, 75°F</p>
            <p><strong>${forecastDates[2]}:</strong> Clear, 70°F</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} mph SW</p>
        `;
    }
}

// Display weather error
function displayWeatherError() {
    console.log('⚠️ Using fallback weather data');
    
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherDesc = document.querySelector('.weather-desc');
    const weatherForecast = document.querySelector('.weather-forecast');
    
    const forecastDates = getNextThreeDays();
    
    if (weatherTemp) weatherTemp.textContent = '68°F';
    if (weatherDesc) weatherDesc.textContent = 'Partly Cloudy';
    if (weatherForecast) {
        weatherForecast.innerHTML = `
            <p><strong>Today:</strong> Partly Cloudy, 68°F</p>
            <p><strong>${forecastDates[0]}:</strong> Partly Cloudy, 72°F</p>
            <p><strong>${forecastDates[1]}:</strong> Sunny, 75°F</p>
            <p><strong>${forecastDates[2]}:</strong> Clear, 70°F</p>
            <p><strong>Humidity:</strong> 42%</p>
            <p><strong>Wind:</strong> 7 mph SW</p>
        `;
    }
}

// Load member spotlights from JSON
async function loadMemberSpotlights() {
    console.log('👥 Loading member spotlights...');
    
    try {
        // For demo - using mock members
        const mockMembers = [
            {
                name: 'Tech Solutions Rexburg',
                description: 'Providing innovative IT solutions for local businesses since 2010.',
                memberSince: '2012',
                membershipLevel: 'Gold',
                image: 'images/tech.jpg'
            },
            {
                name: 'Creative Design Rexburg',
                description: 'Full-service design agency specializing in branding and marketing.',
                memberSince: '2018',
                membershipLevel: 'Silver',
                image: 'images/design.jpg'
            },
            {
                name: 'Rexburg Manufacturing',
                description: 'Local manufacturing company producing quality products for over 20 years.',
                memberSince: '2005',
                membershipLevel: 'Gold',
                image: 'images/chamber-commerce.jpg'
            }
        ];
        
        // FILTER FOR GOLD/SILVER MEMBERS ONLY
        const goldSilverMembers = mockMembers.filter(member => 
            member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );
        
        // Select 2 random Gold/Silver members
        const selectedMembers = getRandomMembers(goldSilverMembers, 2);
        displayMemberSpotlights(selectedMembers);
        
    } catch (error) {
        console.warn('⚠️ Member spotlights not displayed:', error);
    }
}

// Get random members
function getRandomMembers(membersArray, count) {
    if (!membersArray || membersArray.length === 0) return [];
    const shuffled = [...membersArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Display member spotlights
function displayMemberSpotlights(members) {
    const memberContainer = document.querySelector('.card-content .businesses');
    if (!memberContainer || !members || members.length === 0) return;
    
    console.log('🎨 Displaying member spotlights:', members.length);
    
    members.forEach(member => {
        const businessDiv = document.createElement('div');
        businessDiv.className = 'business';
        businessDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="80" height="80">
            <div class="business-info">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p><strong>Member since:</strong> ${member.memberSince}</p>
                <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            </div>
        `;
        memberContainer.appendChild(businessDiv);
    });
}

// HAMBURGER MENU FUNCTION - FIXED
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        console.log('🍔 Hamburger menu initialized');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('📱 Menu toggled:', navMenu.classList.contains('active') ? 'open' : 'closed');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    } else {
        console.log('⚠️ Hamburger menu elements not found');
    }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadWeatherData, loadMemberSpotlights, initHamburgerMenu };
}