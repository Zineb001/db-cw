const genreService = require("../services/GenreServices");

// Controller function to handle GET request for users
async function getGenres(req, res) {
  try {
    const genres = await genreService.getGenres(); // Call the getUsers function from the userService
    res.json(genres); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genres" }); // Send error response
  }
}

module.exports = {
  getGenres,
};
