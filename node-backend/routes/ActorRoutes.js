const express = require("express");
const router = express.Router();
const actorController = require("../controllers/ActorController");

router.get("/actorsNames", actorController.getActors);
module.exports = router;
