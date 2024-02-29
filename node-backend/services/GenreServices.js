const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

async function getGenres() {
  try {
    // Fetch genres
    const genres = new Genre();
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

async function getMostPolarizedGenres() {
  try {
    // Filter genres by sdRating
    const genres = getGenres();

    return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

async function getMostPopularGenres() {
  try {
    // Filter genres by averageRating
    const genres = getGenres();
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

async function getMostReviewedGenres() {
  try {
    // Filter genres by reviewsCount
    const genres = getGenres();
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

async function getRatingDataByGenre(genre) {
  try {
    // Filter genres by reviewsCount
    const genres = getGenres();
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

module.exports = {
  getGenres,
  getMostPolarizedGenres,
  getMostPopularGenres,
  getMostReviewedGenres,
  getRatingDataByGenre,
};
