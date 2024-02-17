#!/usr/bin/node

const request = require('request');

const args = process.argv.slice(2); // Get movie ID from arguments

if (!args.length) {
  console.error('Please provide a movie ID.');
  process.exit(1);
}

const movieId = args[0];

const url = `https://swapi.dev/api/films/${movieId}`;

request(url, (error, response, body) => {
  if (error) {
    console.error('Error fetching movie data:', error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error('Invalid movie ID or API error:', response.statusCode);
    process.exit(1);
  }

  const movieData = JSON.parse(body);

  // Get characters in the same order as "characters" list
  const characters = movieData.characters;

  // Print each character name on a separate line
  characters.forEach(characterUrl => {
    request(characterUrl, (error, response, body) => {
      if (error) {
        console.error('Error fetching character data:', error);
        process.exit(1);
      }

      if (response.statusCode !== 200) {
        console.error('Invalid character URL or API error:', response.statusCode);
        process.exit(1);
      }

      const characterData = JSON.parse(body);
      console.log(characterData.name);
    });
  });
});
