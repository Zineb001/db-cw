const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'postgres', // This should match the service name in docker-compose.yml
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

async function getGenres() {
  try {

      // Fetch genres
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM VIEW_GENRE');
      client.release();
      
      const genres = result.rows.map(row => {
        return new Genre(
          row.name,
          row.averagerating,
          row.sdrating,
          row.reviewscount,
          row.releasescount
        );
      });
  
      return genres;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}


async function getGenreNames() {
  try {
    // Fetch genres
    const client = await pool.connect();
    const result = await client.query('SELECT name FROM VIEW_GENRE'); // Only select the name column
    client.release();
    
    const genreNames = result.rows.map(row => row.name);

    return genreNames;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

async function getMostPolarizedGenres() {
  try {
    // Fetch genres
    const genres = await getGenres();
    genres.sort((a, b) => b.sdrating - a.sdrating);
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch most polarized genres");
  }
}

async function getBestRatedGenres() {
  try {
    // Fetch genres
    const genres = await getGenres();
    genres.sort((a, b) => b.averagerating - a.averagerating);
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch best rated genres");
  }
}

async function getMostReviewedGenres() {
  try {
    // Fetch genres
    const genres = await getGenres();
    genres.sort((a, b) => b.reviewscount - a.reviewscount);
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch most reviewed genres");
  }
}
async function getMostReleasedGenres() {
  try {
    // Fetch genres
    const genres = await getGenres();
    genres.sort((a, b) => b.releasescount- a.releasescount);
    return genres;
  } catch (error) {
    throw new Error("Failed to fetch most released genres");
  }
}

module.exports = {
  getGenreNames,
  getMostPolarizedGenres,
  getBestRatedGenres,
  getMostReviewedGenres,
  getMostReleasedGenres,
};
