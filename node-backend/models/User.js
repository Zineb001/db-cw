class User {
  constructor(userID, movieRatings = []) {
    this.userID = userID;
    this.movieRatings = movieRatings; // Initialize movieRatings as an empty array of tuples (movie_id, rating, tag)
  }
}
module.exports = User;
