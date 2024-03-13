const Director = require("../models/Director");

const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'postgres', 
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

async function getDirectorsByMovieID(movieID) {
  try {

    const client = await pool.connect();
    const query = `
      SELECT *
      FROM VIEW_DIRECTOR
      WHERE $1= ANY(movieids)`;

    const { rows } = await pool.query(query, [movieID]);
    client.release();
    const directors = rows.map(row => new Director(row.id, row.name, row.movieids));
    return directors;
  } catch (error) {
    throw new Error("Failed to fetch director ID");
  }
}

async function getDirectors() {
  try {
    const client = await pool.connect();
    const query = 'SELECT DISTINCT "name" FROM VIEW_DIRECTOR';
    const result = await client.query(query);
    client.release();
    const uniqueDirectorNames = result.rows.map(row => row.name);
    return uniqueDirectorNames;
  } catch (error) {
    throw new Error("Failed to fetch director ID");
  }
}


module.exports = {
  getDirectorsByMovieID,
  getDirectors,
};
