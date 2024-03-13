const PersonalityGenre = require("../models/PersonalityGenre");
const PersonalityMovie = require("../models/PersonalityMovie");

const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'postgres', 
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

async function getGenres() {
  try {

    const client = await pool.connect();
    const query = `
      SELECT *
      FROM VIEW_PERSONALITY_GENRE`;

    const { rows } = await pool.query(query);
    client.release();
    const personalityGenres = rows.map(row => {
        return new PersonalityGenre(
          row.genre,
          row.avg_openness,
          row.avg_agreeableness,
          row.avg_emotional_stability,
          row.avg_conscientiousness,
          row.avg_extraversion
        );
      });
    return personalityGenres;
  } catch (error) {
    throw new Error("Failed to fetch personality genres");
  }
}

async function getMovies() {
  try {
    const client = await pool.connect();
    const query = `
      SELECT *
      FROM VIEW_PERSONALITY_MOVIE`;

    const { rows } = await pool.query(query);
    client.release();
    const personalityMovies= rows.map(row => {
        return new PersonalityMovie(
          row.movie_id,
          row.movie_title,
          row.avg_openness,
          row.avg_agreeableness,
          row.avg_emotional_stability,
          row.avg_conscientiousness,
          row.avg_extraversion
        );
      });
    return personalityMovies;
  } catch (error) {
    throw new Error("Failed to fetch personality movies");
  }
}


module.exports = {
  getMovies,
  getGenres,
};
