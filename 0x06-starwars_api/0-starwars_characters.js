const request = require('request');

const movieId = process.argv[2];

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Status:', response.statusCode);
    } else {
        const filmData = JSON.parse(body);
        const charactersUrls = filmData.characters;

        // Function to fetch character names from character URLs
        const getCharacterName = (url) => {
            return new Promise((resolve, reject) => {
                request(url, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        const characterData = JSON.parse(body);
                        resolve(characterData.name);
                    }
                });
            });
        };

        // Promise.all to fetch names of all characters
        Promise.all(charactersUrls.map(url => getCharacterName(url)))
            .then(characterNames => {
                characterNames.forEach(name => console.log(name));
            })
            .catch(error => {
                console.error('Error fetching character names:', error);
            });
    }
});
