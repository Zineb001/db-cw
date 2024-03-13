const express = require("express");
const router = express.Router();
const genreController = require("../controllers/GenreController");

router.get("/genresNames", genreController.getGenreNames);
router.get("/mostPolarizedGenres", genreController.getMostPolarizedGenres)
router.get("/bestRatedGenres", genreController.getBestRatedGenres)
router.get("/mostReviewedGenres", genreController.getMostReviewedGenres)
router.get("/mostReleasedGenres", genreController.getMostReleasedGenres)
router.get("/highlyRatedGenres", genreController.getHighlyRatedGenres)
router.get("/lowRatedGenres", genreController.getLowRatedGenres)

module.exports = router;
