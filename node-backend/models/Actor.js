class Actor {
  constructor(id, name, movieIds = []) {
    this.id = id;
    this.name = name;
    this.movieIds = movieIds; 
  }
}

module.exports = Actor;
