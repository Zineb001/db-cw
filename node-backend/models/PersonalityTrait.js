class PersonalityTrait {
  constructor(personalityTraitName, genreAvgRatings, movieAvgRatings) {
    this.personalityTraitName = personalityTraitName;
    this.genreAvgRatings = genreAvgRatings; // Object storing average ratings for each genre
    this.movieAvgRatings = movieAvgRatings; // Object storing average ratings for each movie
  }
}

module.exports = PersonalityTrait;
