class Movie {
  constructor(
    id,
    title,
    genre,
    directors = [],
    actors = [],
    content,
    releasedate,
    averagerating,
    sdrating,
    ratingcount,
    tags = [],
    poster
  ) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.directors = directors;
    this.actors = actors;
    this.content = content;
    this.releasedate = releasedate;
    this.averagerating = averagerating;
    this.sdrating = sdrating;
    this.ratingcount = ratingcount;
    this.tags = tags;
    this.poster = poster
  }
}

module.exports = Movie;
