const express = require("express");
const router = express.Router();
const directorController = require("../controllers/DirectorController");

// Define route for retrieving users
router.get("/directors", directorController.getDirectors);
module.exports = router;
