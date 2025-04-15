// fetch('fonts.json')
//     .then(response => response.json())
//     .then(data => {
//       data.fonts.forEach(font => {
//         // Generate a URL-friendly filename by replacing spaces
//         const fileName = font.file-name.replace(/\s+/g, '-'); // Change spaces to hyphens
//         const fontPath = `/${font.parent}/${fileName}`; // Adjust extension as needed
//         const style = document.createElement('style');
//         style.innerHTML = `
//           @font-face {
//             font-family: '${font.Name}';
//             src: url('${fontPath}');
//           }
//         `;
//         document.head.appendChild(style);
//       });
//     })
//     .catch(error => console.error('Error loading fonts:', error));