const express = require("express");
const router = express.Router();
const personalityController = require("../controllers/PersonalityController");

router.get("/personalityMovies" , personalityController.getMovies);
router.get("/personalityGenres" , personalityController.getGenres);
module.exports = router;
