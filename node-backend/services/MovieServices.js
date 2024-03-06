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


// Define a function to fetch user data from the database
async function getMovies() {
  try {
    // Example: Fetch all users from the database
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "MOVIE"');
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
  movies.sort((a, b) => b.ratingCount - a.ratingCount);
  return movies;
}

async function searchMovies(movieIDs, title, releaseYear, directors, cast, genre, rating, tag) {
  try {
    
    const releaseYears = releaseYear ? releaseYear.split(',') : [];
    const directorsList = directors ? directors.split(',') :[];
    const genres = genre ? genre.split(',') : [];
    const castList = cast ? cast.split(',') : [];
    const tags = tag ? tag.split(',') : [];
   
    let query = 'SELECT * FROM "MOVIE" WHERE TRUE';

    if (movieIDs && movieIDs.length > 0) {
      query += ` AND "id" = ANY(ARRAY[${movieIDs}])`;
      console.log("movieIDs: ", movieIDs);
    }

    if (title) {
      query += ` AND LOWER("title") LIKE LOWER('%${title}%')`;
      console.log("title: ", title);
    }

    if (releaseYears && releaseYears.length > 0) {
      query += ` AND "releaseDate" = ANY(ARRAY[${releaseYears}])`;
      console.log("releaseYears:",releaseYears)
    }

    if (directorsList && directorsList.length >0) {
      query += ` AND ARRAY(SELECT unnest("directors")) @> ARRAY[${directorsList.map(director => `'${director}'`).join(', ')}]`
      console.log("director: ", directorsList);
    }

    if (castList && castList.length > 0) {
      query += ` AND ARRAY(SELECT lower(unnest("actors"))) @> ARRAY[${castList.map(actor => `'${actor}'`).join(', ')}]`
      console.log("actors: ", castList);
    }

    if (genres && genres.length > 0) {
      query += ` AND ARRAY(SELECT unnest("genre")) @> ARRAY[${genres.map(genre => `'${genre}'`).join(', ')}]`
    }

    if (rating) {
      query += ` AND "averageRating" >= ${rating}`;
      console.log("rating ", rating)
    }

    if (tags && tags.length > 0) {
      query += ` AND ARRAY(SELECT lower(unnest("tags"))) @> ARRAY[${tags.map(tag => `'${tag}'`).join(', ')}]`
      console.log("tags: ",tags);
    }

    console.log("query: ", query);
    const client = await pool.connect();
    const { rows } = await client.query(query);
    client.release();

    const searchResults = rows.map(row => new Movie(
      row.id,
      row.title,
      row.genre,
      row.directors,
      row.actors,
      row.content,
      row.releaseDate,
      row.averageRating,
      row.sdRating,
      row.ratingCount,
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
      director.movieIds.forEach(movieId => {
        uniqueMovieIds.add(movieId);
      });
    });
    
    // Convert the Set back to an array if needed
    const uniqueMovieIdsArray = Array.from(uniqueMovieIds);
    console.log(uniqueMovieIdsArray)
    const searchResults = await searchMovies(uniqueMovieIdsArray, null, null, null, null, null, null, null);
    return searchResults;

}

async function getTags() {
  try {
    // Example: Fetch all users from the database
    const client = await pool.connect();
    const result = await client.query('SELECT DISTINCT unnest("tags") AS tag FROM "MOVIE"');
    client.release();
    
    const tags = result.rows.map(row => row.tag);
    return tags;
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
}

module.exports = {
  getMovies,
  searchMovies,
  sortMovies,
  getMoviesOfDirectors,
  getTags,
};
