const genreService = require("../services/GenreServices");

async function getGenreNames(req, res) {
  try {
    const genres = await genreService.getGenreNames(); 
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genres names" }); 
  }
}

async function getMostPolarizedGenres(req, res) {
  try {
    const genres = await genreService.getMostPolarizedGenres(); 
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch most polarized genres" }); 
  }
}

async function getBestRatedGenres(req, res) {
  try {
    const genres = await genreService.getBestRatedGenres();
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch best rated genres" }); 
  }
}

async function getMostReviewedGenres(req, res) {
  try {
    const genres = await genreService.getMostReviewedGenres();
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch most reviewed genres" }); 
  }
}

async function getMostReleasedGenres(req, res) {
  try {
    const genres = await genreService.getMostReleasedGenres();
    res.json(genres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch most released genres" }); 
  }
}
async function getRecommendedGenres(req, res) {
  try {
    const { genres } = req.query;
    const recommendedGenres = await genreService.getRecommendedGenres(genres);
    res.json(recommendedGenres); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommended genres" }); 
  }
}
module.exports = {
  getGenreNames,
  getMostPolarizedGenres,
  getBestRatedGenres,
  getMostReviewedGenres,
  getMostReleasedGenres,
  getRecommendedGenres,
};
