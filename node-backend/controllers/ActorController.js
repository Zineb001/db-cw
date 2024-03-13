const actorService = require("../services/ActorServices");

async function getActors(req, res) {
  try {
    const actors = await actorService.getActors();
    res.json(actors); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch actors" }); 
  }
}

module.exports = {
  getActors,
};
