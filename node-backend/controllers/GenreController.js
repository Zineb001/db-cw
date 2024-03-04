const genreService = require("../services/GenreServices");

// Controller function to handle GET request for users
async function getGenreNames(req, res) {
  try {
    const genres = await genreService.getGenreNames(); // Call the getUsers function from the userService
    res.json(genres); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genres" }); // Send error response
  }
}

module.exports = {
  getGenreNames,
};
