const express = require("express");
const router = express.Router();
const DirectorController = require("../controllers/DirectorController");

// Define route for retrieving users
router.get("/directorsNames", DirectorController.getDirectors);
module.exports = router;
