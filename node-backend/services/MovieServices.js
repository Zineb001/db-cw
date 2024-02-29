const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Define a function to fetch user data from the database
async function getMovies() {
  try {
    // Example: Fetch all users from the database
    const movie = new Movie(
      "1",
      "Geras filmukas",
      "Thriller",
      "Kapriukas",
      "About a dog which saved a pigeon from falling into a dungeon",
      "2023",
      "4.5",
      "10000",
      ["cute", "funny"],
      "link"
    );
    return movie;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

function generateMovies(numMovies) {
  const movies = [];
  for (let i = 1; i <= numMovies; i++) {
    const movie = new Movie(
      i,
      `Movie ${i}`,
      `Genre ${i % 5}`,
      [`Actor1 ${i}`, `Actor2 ${i}`],
      `Content for Movie ${i}`,
      2024,
      Number((i * 0.4).toFixed(2)),
      2,
      [`ratings ${i}`],
      [`Tag ${i}`],
      `PosterLink ${i}`
    );
    movies.push(movie);
  }
  return movies;
}

async function getSoonReleasedMovies() {
  try {
    //Randomly select 5 movies (of diferent directors) and then get movies by those directors
    const movies = generateMovies(10);

    return movies;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

async function searchMovies(title, releaseYears, cast, genres, rating, tags) {
  try {
    const movies = generateMovies(10);
    // Fetch all movies by the search parameters
    const searchResults = movies.filter((movie) => {
      // Check if movie matches the specified parameters
      return (
        (!title || movie.title.toLowerCase().includes(title.toLowerCase())) &&
        (!releaseYears || releaseYears.includes(movie.releaseYear)) &&
        (!genres ||
          genres.some(
            (genre) => movie.genre.toLowerCase() === genre.toLowerCase()
          )) &&
        (!rating || movie.averageRating >= rating) &&
        (!tags || tags.some((tag) => movie.tags.includes(tag))) &&
        (!cast || cast.some((actor) => movie.actors.includes(actor)))
      );
    });
    return searchResults;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
}

async function getMoviesByGenre(genre) {
  try {
    // Fetch movies by this genre
    const movie = new Movie();
    return movie;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

async function getMoviesByDirector(director) {
  try {
    // Fetch movies by this director
    const movie = new Movie();
    return movie;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

async function getMoviesByTags(tags) {
  try {
    // Fetch movies by these tags
    const movie = new Movie();
    return movie;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

async function getTags() {
  try {
    // Fetch all tags
    const movie = new Array("Funny");
    return movie;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

module.exports = {
  getMovies,
  getSoonReleasedMovies,
  getMoviesByDirector,
  getMoviesByGenre,
  searchMovies,
};
