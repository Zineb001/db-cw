class PersonalityUser {
  constructor(userID, personalityTraits = []) {
    this.userID = userID;
    this.movieRatings = [];
    this.personalityTraits = personalityTraits;
  }
}
module.exports = PersonalityUser;
