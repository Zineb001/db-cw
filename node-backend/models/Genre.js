class Genre {
  constructor(name, averageRating, sdRating, reviewsCount, releasesCount) {
    this.name = name;
    this.averageRating = averageRating;
    this.sdRating = sdRating;
    this.reviewsCount = reviewsCount;
    this.releasesCount = releasesCount;
  }
}

module.exports = Genre;
