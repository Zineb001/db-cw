const express = require("express");
const router = express.Router();
const genreController = require("../controllers/GenreController");

// Define route for retrieving users
router.get("/genresNames", genreController.getGenreNames);
router.get("/mostPolarizedGenres", genreController.getMostPolarizedGenres)
router.get("/bestRatedGenres", genreController.getBestRatedGenres)
router.get("/mostReviewedGenres", genreController.getMostReviewedGenres)
router.get("/mostReleasedGenres", genreController.getMostReleasedGenres)
router.get("/recommendedGenres", genreController.getHighlyRatedGenres)
router.get("/discouragedGenres", genreController.getDiscouragedGenres)
module.exports = router;
