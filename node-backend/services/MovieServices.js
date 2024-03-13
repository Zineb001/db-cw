const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const DirectorService = require("../services/DirectorServices");

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

async function getMovies() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM VIEW_MOVIE');
    client.release();

    const movies = result.rows.map(row => {
      return new Movie(
        row.id,
        row.title,
        row.genre,
        row.directors,
        row.actors,
        row.content,
        row.releaseDATE,
        row.averageRating,
        row.sdRating,
        row.ratingCount,
        row.tags,
        row.poster
      );
    });

    return movies;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

function sortMovies(movies)
{
  movies.sort((a, b) => b.ratingcount - a.ratingcount);
  return movies;
}

async function searchMovies(movieIDs, title, releaseYear, directors, cast, genre, rating, tag) {
  try {
    
    const releaseYears = releaseYear ? releaseYear.split(',') : [];
    const directorsList = directors ? directors.split(',') :[];
    const genres = genre ? genre.split(',') : [];
    const castList = cast ? cast.split(',') : [];
    const ratings =  rating ? rating.split(',') : [];
    const tags = tag ? tag.split(',') : [];
    
    let query = 'SELECT * FROM VIEW_MOVIE WHERE TRUE';
    const values = [];
    
    if (movieIDs && movieIDs.length > 0) {
      query += ` AND "id" = ANY($${values.push(movieIDs)})`;
    }
    
    if (title) {
      query += ` AND LOWER("title") LIKE LOWER($${values.push(`%${title}%`)})`;
    }
    
    if (releaseYears && releaseYears.length > 0) {
      query += ` AND "releasedate" = ANY($${values.push(releaseYears)})`;
    }
    
    if (directorsList && directorsList.length > 0) {
      query += ` AND ARRAY(SELECT unnest("directors")::text) && ARRAY[${directorsList.map((_, index) => `$${values.push(directorsList[index])}`).join(', ')}]`;
    }
    
    if (castList && castList.length > 0) {
      query += ` AND ARRAY(SELECT unnest("actors")::text) && ARRAY[${castList.map((_, index) => `$${values.push(castList[index])}`).join(', ')}]`;
    }
    
    if (genres && genres.length > 0) {
      query += ` AND ARRAY(SELECT unnest("genre")::text) && ARRAY[${genres.map((_, index) => `$${values.push(genres[index])}`).join(', ')}]`;
    }
    
    if (ratings && ratings.length === 2) {
      query += ` AND "averagerating" BETWEEN $${values.push(parseFloat(ratings[0]))} AND $${values.push(parseFloat(ratings[1]))}`;
    }
    
    if (tags && tags.length > 0) {
      query += ` AND ARRAY(SELECT lower(unnest("tags"))) && ARRAY[${tags.map((_, index) => `$${values.push(tags[index])}`).join(', ')}]`;
    }
    
    console.log("query: ", query);
    console.log("values: ", values);
    
    const client = await pool.connect();
    const { rows } = await client.query(query, values);
    client.release();

    const searchResults = rows.map(row => new Movie(
      row.id,
      row.title,
      row.genre,
      row.directors,
      row.actors,
      row.content,
      row.releasedate,
      row.averagerating,
      row.sdrating,
      row.ratingcount,
      row.tags,
      row.poster
    ));
    
    return searchResults;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
}

async function getMoviesOfDirectors(directors)
{
    const uniqueMovieIds = new Set();
    directors.forEach(director => {
      director.movieids.forEach(movieid => {
        uniqueMovieIds.add(movieid);
      });
    });
    
    // Convert the Set back to an array if needed
    const uniqueMovieIdsArray = Array.from(uniqueMovieIds);
    const searchResults = await searchMovies(uniqueMovieIdsArray, null, null, null, null, null, null, null);
    return searchResults;

}

async function getTags() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT DISTINCT unnest("tags") AS tag FROM VIEW_MOVIE');
    client.release();
    
    const tags = result.rows.map(row => row.tag);
    return tags;
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
}

async function getMovieRecommendations(given_movie_id) {

      try {
        const client = await pool.connect();
        //given a movie_id, return other movie ids where the users,
        //who have watched the given movie_id and rated it above their average rating
        //also rated those movies above their average rating
        const query = `
        SELECT DISTINCT m.id
        FROM VIEW_MOVIE m
        JOIN VIEW_MOVIE_RATING r1 ON r1."movie_id" = m.id
        JOIN VIEW_USER_RATING u1 ON u1.id = r1."user_id"
        JOIN VIEW_MOVIE_RATING r2 ON r2."user_id" = r1."user_id"
        JOIN VIEW_MOVIE m2 ON r2."movie_id" = m2.id
        JOIN VIEW_USER_RATING u2 ON u2.id = r2."user_id"
        WHERE m.id != $1
        AND r1."rating" = 5
        AND m2.id = $1
        AND r2."rating" > u2."averagerating"
    `;
    const values = [given_movie_id];

    const result = await client.query(query, values);
    client.release();
    const movieIDs = result.rows.map(row => row.id);
    const movieResults = await searchMovies(movieIDs, null, null, null, null, null, null, null);
    movieResults.sort((a, b) => b.ratingcount - a.ratingcount);
    return movieResults;
  } catch (error) {
    throw new Error("Failed to fetch movie recommendations");
  }
}
async function getMovieDiscouragements(given_movie_id) {
  try {
    const client = await pool.connect();
    //given a movie_id, return other movie ids where the users,
    //who have watched the given movie_id and rated it below their average rating
    //also rated those movies below their average rating
    const query = `
    SELECT DISTINCT m.id
    FROM VIEW_MOVIE m
    JOIN VIEW_MOVIE_RATING r1 ON r1."movie_id" = m.id
    JOIN VIEW_USER_RATING u1 ON u1.id = r1."user_id"
    JOIN VIEW_MOVIE_RATING r2 ON r2."user_id" = r1."user_id"
    JOIN VIEW_MOVIE m2 ON r2."movie_id" = m2.id
    JOIN VIEW_USER_RATING u2 ON u2.id = r2."user_id"
    WHERE m.id != $1
    AND r1."rating" <2
    AND m2.id = $1
    AND r2."rating" < u2."averagerating"
    `
    const values = [given_movie_id];
    const result = await client.query(query, values);
    client.release();
    const movieIDs = result.rows.map(row => row.id);
    const movieResults = await searchMovies(movieIDs, null, null, null, null, null, null, null);
    movieResults.sort((a, b) => b.ratingcount - a.ratingcount);
    return movieResults;
  } catch (error) {
    throw new Error("Failed to fetch movie recommendations");
  }
}

async function getPredictedMovies() {
  try {
    // Example: Fetch all users from the database
    const client = await pool.connect();
    const movieIds = [592, 2028, 5952, 588];
    const query = `
    SELECT * 
    FROM VIEW_MOVIE 
    WHERE id = ANY($1)
  `;
    const values = [movieIds];
    const { rows } = await client.query(query, values);
    const movies = rows.map(row => new Movie(
        row.id,
        row.title,
        row.genre,
        row.directors,
        row.actors,
        row.content,
        row.releasedate,
        row.averagerating,
        row.sdrating,
        row.ratingcount,
        row.tags,
        row.poster
    ));

    for(const movie of movies)
    {
      const query2 = `
        WITH random_ratings AS (
          SELECT 
            rating
          FROM VIEW_MOVIE_RATING
          WHERE movie_id = $1
          ORDER BY RANDOM()
          LIMIT 20
        )
        SELECT 
          AVG(rating) AS average_rating
        FROM random_ratings;
    `;
    const predictedRatingResult = await client.query(query2, [movie.id]);
    movie.averagerating = predictedRatingResult.rows[0].average_rating;
    }
    client.release();
    return movies;
  } catch (error) {
    throw new Error("Failed to predicted movies");
  }
}

async function getTopMovies() {
  try {
    const client = await pool.connect();
    const query = `
      SELECT * FROM VIEW_MOVIE
      ORDER BY averagerating DESC, ratingcount DESC
      LIMIT 10;
    `;
    const result = await client.query(query);
    client.release();

    const movies = result.rows.map(row => new Movie(
      row.id,
      row.title,
      row.genre,
      row.directors,
      row.actors,
      row.content,
      row.releasedate,
      row.averagerating,
      row.sdrating,
      row.ratingcount,
      row.tags,
      row.poster
    ));

    return movies;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    throw new Error("Failed to fetch top movies");
  }
}

module.exports = {
  getMovies,
  searchMovies,
  sortMovies,
  getMoviesOfDirectors,
  getTags,
  getMovieRecommendations,
  getMovieDiscouragements,
  getPredictedMovies,
  getTopMovies,
};
