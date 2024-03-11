class PersonalityMovie {
  constructor(movie_id, movie_title, avg_openness, avg_agreeableness, avg_emotional_stability, avg_conscientiousness, avg_extraversion) {
    this.movie_id = movie_id;
    this.movie_title = movie_title;
    this.avg_openness = avg_openness;
    this.avg_agreeableness = avg_agreeableness;
    this.avg_emotional_stability = avg_emotional_stability;
    this.avg_conscientiousness = avg_conscientiousness;
    this.avg_extraversion = avg_extraversion;
  }
}

module.exports = PersonalityMovie;