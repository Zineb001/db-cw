const DirectorService = require("../services/DirectorServices");

async function getDirectors(req, res) {
    try {
      const directors = await DirectorService.getDirectors(); 
      res.json(directors); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch directors" }); 
    }
  }

module.exports = {
    getDirectors,
  };
  