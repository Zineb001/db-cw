class Actor {
  constructor(id, name, movieIds = []) {
    this.id = id;
    this.name = name;
    this.movieIds = movieIds; // List of movie IDs directed by this director
  }
}

module.exports = Actor;
