const DirectorService = require("../services/DirectorServices");

async function getDirectors(req, res) {
    try {
      const directors = await DirectorService.getDirectors(); // Call the getUsers function from the userService
      res.json(directors); // Send the users as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch directors" }); // Send error response
    }
  }

module.exports = {
    getDirectors,
  };
  