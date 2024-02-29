const express = require("express");
const router = express.Router();
const actorController = require("../controllers/ActorController");

// Define route for retrieving users
router.get("/actors", actorController.getActors);
module.exports = router;
