const Movie = require("../models/Movie");
const Director = require("../models/Director");

async function getGenres() {
  try {
    // Fetch directors
    const directors = new Director();
    return directors;
  } catch (error) {
    throw new Error("Failed to fetch directors");
  }
}

module.exports = {
  getGenres,
};
