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

async function getRecommendedGenres(givenGenresString) {
  try {
    const givenGenres = givenGenresString ? givenGenresString.split(',') : [];
    //given a list of genres, go through users 
    //and check if the movies of that list of genres (or at least contain it) are rated on average over that users average rating
    //then go through that users movies and calculate averagerating for every genre they have watched and collect those which were above that users average rating
    //go through all users like that and get the intersection of genres
    const client = await pool.connect();
    const query = `
      WITH user_genre_ratings AS (
        SELECT 
            u.id AS user_id,
            g.name AS genre_name,
            u.averageRating AS user_average_rating,
            AVG(mr.rating) AS avg_genre_rating
        FROM 
            VIEW_MOVIE m
        JOIN 
            UNNEST(m.genre) g_name ON true
        JOIN 
            VIEW_GENRE g ON g.name = g_name
        JOIN 
            VIEW_MOVIE_RATING mr ON m.id = mr.movie_id
        JOIN 
            VIEW_USER_RATING u ON mr.user_id = u.id
        WHERE 
            g.name = ANY(ARRAY[${givenGenres.map(genre => `'${genre}'`).join(',')}])
        GROUP BY 
            u.id, user_id, genre_name, u.averageRating
        HAVING 
            AVG(mr.rating) > u.averageRating
    )
    SELECT 
        genre_name
    FROM 
        user_genre_ratings
    GROUP BY 
        genre_name
    `
    const result = await client.query(query);
    client.release();
    const genres = await getGenres();
    console.log("recommended genres: ", result);
   
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
  getRecommendedGenres,
};
