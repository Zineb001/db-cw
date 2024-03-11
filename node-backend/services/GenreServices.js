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

async function getRecommendedGenres(givenGenre) {
  try {
    //do viewers who tend to rate sci-fi films highly also rate another genre highly? 
    //---
    //given a list of genres (given_genres)
    //go through all users in ratings which rated a movie whose list of genres has genres in given_genres
    //calculate average rating for movies which genres are in given_genres
    //check if that average rating is above the user averagerating value
    //if it is then look movies of that user and calculate average ratings for each genre
    //check if it is above users averagerating
    //if it is, select that genre and do that with every user and get intersection of genres
    //---

    const client = await pool.connect();
    const query = `
    WITH given_genre_movies AS (
      SELECT 
          mr.user_id,
          AVG(mr.rating) AS avg_given_genre_rating
      FROM 
          VIEW_MOVIE m
      JOIN 
          VIEW_MOVIE_RATING mr ON m.id = mr.movie_id
      WHERE 
          ${givenGenre} = ANY(lower(m.genre)) -- Select movies with the given genre
      GROUP BY 
          mr.user_id
  ),
  other_genre_movies AS (
      SELECT 
          mr.user_id,
          AVG(mr.rating) AS avg_other_genre_rating
      FROM 
          VIEW_MOVIE m
      JOIN 
          VIEW_MOVIE_RATING mr ON m.id = mr.movie_id
      WHERE 
          ${givenGenre} != ALL(lower(m.genre)) -- Select movies without the given genre
      GROUP BY 
          mr.user_id
  )
  SELECT 
      CASE 
          WHEN AVG(ogr.avg_other_genre_rating) > AVG(ggr.avg_given_genre_rating) THEN g.name
          ELSE NULL
      END AS recommended_genre
  FROM 
      given_genre_movies ggr
  JOIN 
      other_genre_movies ogr ON ggr.user_id = ogr.user_id
  JOIN
      VIEW_GENRE g ON g.averagerating > ggr.avg_given_genre_rating -- Filter genres with average rating higher than the given genre
  GROUP BY
      g.name;
    `;
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
