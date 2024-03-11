const personalityService = require("../services/PersonalityServices");

async function getGenres(req, res) {
  try {
    const genres= await personalityService.getGenres(); 
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch personality genres" }); 
  }
}

async function getMovies(req, res) {
    try {
      const movies = await personalityService.getGenres(); 
      res.json(movies); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch personality movies" }); 
    }
  }
module.exports = {
  getGenres,
  getMovies,
};
