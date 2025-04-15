    // Function to fetch the JSON files and populate the fonts
    async function loadFonts() {
        const container = document.getElementById('fonts_container'); // Container to hold the font cards

        // Array of JSON file URLs (replace with actual URLs if fetching from server)
        const jsonFiles = ['nerd-fonts/nerd-fonts.json']; // List of your JSON file paths

        // Iterate through each JSON file and fetch its contents
        for (const file of jsonFiles) {
            try {
                const response = await fetch(file); // Fetch the JSON file
                const data = await response.json(); // Parse JSON content

                // Populate the fonts on the page
                data.fonts.forEach(font => {
                    const fontCard = createFontCard(font); // Create a card for each font
                    container.appendChild(fontCard); // Append the card to the container
                });
            } catch (error) {
                console.error('Error loading JSON file:', file, error);
            }
        }
    }

    // Function to create a font card HTML element
    function createFontCard(font) {
        // Create the card container div
        const card = document.createElement('div');
        card.classList.add('font_card'); // Apply the 'font_card' class

        // Create the font showcase div
        const showcase = document.createElement('div');
        showcase.classList.add('font_showcase');
        showcase.style.fontFamily = `'${font['common-name']}'`; // Use the common-name for the font-family
        showcase.innerHTML = `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>`;

        // Create the font name div
        const fontNameDiv = document.createElement('div');
        fontNameDiv.classList.add('font_name');
        fontNameDiv.innerHTML = `<b>Name: </b>${font.Name} <p><b>Common Name: </b>${font['common-name']}</p>`;

        // Append the showcase and name divs to the card
        card.appendChild(showcase);
        card.appendChild(fontNameDiv);

        return card; // Return the card element
    }

    // Load the fonts when the page loads
    window.onload = loadFonts;