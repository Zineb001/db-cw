class Movie {
  constructor(
    id,
    title,
    genre,
    actors = [],
    content,
    releaseDate,
    averageRating,
    sdRating,
    ratingCount,
    tags = [],
    poster
  ) {
    this.id = ifd;
    this.title = title;
    this.genre = genre;
    this.actors = actors;
    this.content = content;
    this.releaseDate = releaseDate;
    this.averageRating = averageRating;
    this.sdRating = sdRating;
    this.ratingCount = ratingCount;
    this.tags = tags;
    this.poster = poster;
  }
}

module.exports = Movie;
