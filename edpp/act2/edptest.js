//lloyd joshua matobato edptest

// Get the button element from the HTML page
const button = document.getElementById('myButton');
// Listen for when the user clicks the button
button.addEventListener('click', async () => {
    let dotCount = 0;
    const updateButtonText = () => {
        dotCount = (dotCount + 1) % 4; // Cycle through 0 to 3
        button.textContent = 'fetching' + '.'.repeat(dotCount);
    };

    const intervalId = setInterval(updateButtonText, 500); // Update every 500ms

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Clear previous cards

    // Create card elements for each post
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.body}</p>
        `;
        cardsContainer.appendChild(card);
    });

    clearInterval(intervalId); // Clear the interval when done
    button.textContent = 'Fetch Posts'; // Reset button text
});