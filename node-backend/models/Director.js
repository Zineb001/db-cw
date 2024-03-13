class Director {
  constructor(id,name, movieids = []) {
    this.id = id;
    this.name = name;
    this.movieids = movieids; 
  }
}

module.exports = Director;
