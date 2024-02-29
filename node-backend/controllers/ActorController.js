const actorService = require("../services/ActorServices");

// Controller function to handle GET request for users
async function getActors(req, res) {
  try {
    const actors = await actorService.getActors(); // Call the getUsers function from the userService
    res.json(actors); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch actors" }); // Send error response
  }
}

module.exports = {
  getActors,
};
