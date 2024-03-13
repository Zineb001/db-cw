const express = require("express");
const router = express.Router();
const DirectorController = require("../controllers/DirectorController");

router.get("/directorsNames", DirectorController.getDirectors);
module.exports = router;
