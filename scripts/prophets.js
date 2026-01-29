// URL for the JSON data
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Get the div where cards will be displayed
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
    try {
        console.log('Fetching data from:', url);
        
        // Fetch data from URL
        const response = await fetch(url);
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Convert response to JSON
        const data = await response.json();
        
        // Display data in console for checking
        console.table(data.prophets);
        console.log('Successfully loaded data for', data.prophets.length, 'prophets');
        
        // Display the prophets on the page
        displayProphets(data.prophets);
        
    } catch (error) {
        // If error occurs, display error message
        console.error('Error fetching data:', error);
        cards.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c;">
                <h3>⚠️ Error Loading Data</h3>
                <p>Unable to load prophet information. Please check your internet connection and try again.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

// Function to display prophets
const displayProphets = (prophets) => {
    // Clear loading message if any
    cards.innerHTML = '';
    
    // Loop through each prophet and create a card
    prophets.forEach((prophet) => {
        // Create card container
        const card = document.createElement('section');
        card.className = 'card';
        
        // Create name heading
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Create image element
        const portrait = document.createElement('img');
        portrait.src = prophet.imageurl;
        portrait.alt = `Portrait of ${prophet.name} ${prophet.lastname}, ${prophet.order}th President of The Church of Jesus Christ of Latter-day Saints`;
        portrait.loading = 'lazy';
        portrait.width = 280;
        portrait.height = 350;
        
        // Create info container
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        
        // Create birth date paragraph
        const birthDate = document.createElement('p');
        birthDate.innerHTML = `<strong>📅 Date of Birth:</strong> ${prophet.birthdate}`;
        
        // Create birth place paragraph
        const birthPlace = document.createElement('p');
        birthPlace.innerHTML = `<strong>📍 Place of Birth:</strong> ${prophet.birthplace}`;
        
        // Create prophet number paragraph
        const prophetNumber = document.createElement('p');
        prophetNumber.innerHTML = `<strong>#️⃣ Prophet Number:</strong> ${prophet.order}`;
        
        // Add birth date and place to info div
        infoDiv.appendChild(birthDate);
        infoDiv.appendChild(birthPlace);
        infoDiv.appendChild(prophetNumber);
        
        // Add years as prophet if available
        if (prophet.length && prophet.length !== '') {
            const years = document.createElement('p');
            years.innerHTML = `<strong>⏳ Years as Prophet:</strong> ${prophet.length}`;
            infoDiv.appendChild(years);
        }
        
        // Add death date if available
        if (prophet.death) {
            const death = document.createElement('p');
            death.innerHTML = `<strong>✝️ Passed Away:</strong> ${prophet.death}`;
            infoDiv.appendChild(death);
        }
        
        // Add all elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(infoDiv);
        
        // Add card to the cards container
        cards.appendChild(card);
    });
    
    // Log success message
    console.log(`Displayed ${prophets.length} prophet cards`);
}

// Start the application
getProphetData();

// Optional: Add a simple loading indicator
document.addEventListener('DOMContentLoaded', () => {
    cards.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p>Loading prophet information...</p>
            <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; margin: 20px auto; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    // Add CSS for spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});