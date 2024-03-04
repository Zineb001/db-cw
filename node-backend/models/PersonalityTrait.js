class PersonalityTrait {
  constructor(trait, genreAvgRatings, movieAvgRatings) {
    this.trait = trait;
    this.genreAvgRatings = genreAvgRatings; // Object storing average ratings for each genre
    this.movieAvgRatings = movieAvgRatings; // Object storing average ratings for each movie
  }
}

module.exports = PersonalityTrait;
