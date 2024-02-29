const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

async function getActors() {
  try {
    // Fetch directors
    const actors = new Actor();
    return actors;
  } catch (error) {
    throw new Error("Failed to fetch actors");
  }
}

module.exports = {
  getActors,
};
