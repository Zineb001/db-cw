const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MovieController");

// Define route for retrieving users
router.get("/movies", movieController.getMovies);
router.get("/soonReleasedMovies", movieController.getSoonReleasedMovies);
router.get("/searchMovies", movieController.searchMovies);
router.get("/tags", movieController.getTags);
module.exports = router;
