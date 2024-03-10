const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MovieController");

// Define route for retrieving users
router.get("/movies", movieController.getMovies);
router.get("/searchMovies", movieController.searchMovies);
router.get("/getMovie", movieController.getMovieByID);
router.get("/directorMovies", movieController.getMoviesOfSameDirector);
router.get("/tags", movieController.getTags)
router.get("/movieRecommendations", movieController.getMovieRecommendations);
router.get("/movieDiscouragements", movieController.getMovieDiscouragements)
module.exports = router;
