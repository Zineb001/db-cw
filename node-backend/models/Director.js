class Director {
  constructor(name, movieIds = []) {
    this.name = name;
    this.movieIds = movieIds; // List of movie IDs directed by this director
  }
}

module.exports = Director;
