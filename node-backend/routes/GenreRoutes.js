const express = require("express");
const router = express.Router();
const genreController = require("../controllers/GenreController");

// Define route for retrieving users
router.get("/genres", genreController.getGenres);
module.exports = router;
