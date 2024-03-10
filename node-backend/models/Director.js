class Director {
  constructor(id,name, movieids = []) {
    this.id = id;
    this.name = name;
    this.movieids = movieids; // List of movie IDs directed by this director
  }
}

module.exports = Director;
