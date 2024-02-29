const movieService = require("../services/MovieServices");

// Controller function to handle GET request for users
async function getMovies(req, res) {
  try {
    const movies = await movieService.getMovies(); // Call the getUsers function from the userService
    res.json(movies); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" }); // Send error response
  }
}
async function getSoonReleasedMovies(req, res) {
  try {
    const soonReleasedMovies = await movieService.getSoonReleasedMovies(); // Call the getUsers function from the userService
    res.json(soonReleasedMovies); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch soon to be released movies" }); // Send error response
  }
}

async function searchMovies(req, res) {
  try {
    //for testing: /api/searchMovies?title=&releaseYear=&cast=&genre=&rating=2&tags=
    const { title, releaseYear, cast, genre, rating, tags } = req.query;
    const searchResults = await movieService.searchMovies(
      title,
      releaseYear,
      cast,
      genre,
      rating,
      tags
    );
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTags(req, res) {
  try {
    const tags = await movieService.getTags();
    res.json(tags);
  } catch (error) {
    console.error("Error getting tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getMovies,
  getSoonReleasedMovies,
  searchMovies,
  getTags,
};
