const Genre = require("../models/Genre");
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

async function executeSQLQuery(query, values) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getHighlyRatedGenres(givenGenre)
{
  try{ 
    // Step 1: Select Movie IDs with Given Genre 
    const movieIds = await executeSQLQuery(
      `
      SELECT id 
      FROM VIEW_MOVIE 
      WHERE $1 = ANY(genre);
      `,
      [givenGenre]
    );

    // Extract movie IDs
    const movieIdArray = movieIds.map(row => row.id);

    // Step 2: Select Distinct Users who Rated Movies of 5 Stars
    const highlyRatedUsers = await executeSQLQuery(
      `
      SELECT DISTINCT user_id 
      FROM VIEW_MOVIE_RATING 
      WHERE movie_id = ANY($1)
      GROUP BY user_id
      HAVING MIN(CASE WHEN movie_id = ANY($1) THEN rating ELSE NULL END) = 5;
      `,
      [movieIdArray]
    );
    // Extract user IDs
    const userIds = highlyRatedUsers.map(row => row.user_id);

    // Step 3: Get Distinct Genres of Highly Rated Movies by Users
    const highlyRatedMovies = await executeSQLQuery(
      `
      SELECT id, genre 
      FROM VIEW_MOVIE 
      WHERE id IN (
          SELECT movie_id
          FROM VIEW_MOVIE_RATING
          WHERE user_id IN (
              SELECT UNNEST($1::int[])
          )
      )
      `,
      [userIds]
    );

    // Calculate average rating for each genre
    const genreRatings = {};
    highlyRatedMovies.forEach(movie => {
    movie.genre.forEach(genre => {
        if (!genreRatings[genre]) {
            genreRatings[genre] = [];
        }
        genreRatings[genre].push(movie.id); // Store movie ID for each genre
    });
    });

    const avgGenreRatings = {};
    for (const genre in genreRatings) {
    const ratings = await executeSQLQuery(
      `
      SELECT AVG(rating) AS avg_rating
      FROM VIEW_MOVIE_RATING
      WHERE movie_id IN (
        SELECT UNNEST($1::int[])
      )
      `,
      [genreRatings[genre]]
    );
    avgGenreRatings[genre] = ratings[0].avg_rating;
    }
    // Calculate average ratings over all genres average ratings by this user group
    const genres = Object.keys(avgGenreRatings);
    const totalGenres = genres.length;
    const overallAverage = genres.reduce((sum, genre) => sum + avgGenreRatings[genre], 0) / totalGenres;

    // Filter genres with average rating above overall average rating of all genres rated by this user group
    const distinctGenres = Object.keys(avgGenreRatings)
    .filter(genre => genre !== givenGenre && avgGenreRatings[genre] > overallAverage);

    return distinctGenres
  }catch (error) {
    throw new Error("Failed to fetch recommended genres");
  }
}
async function getLowRatedGenres(givenGenre)
{
  try{ 
    // Step 1: Select Movie IDs with Given Genre 
    const movieIds = await executeSQLQuery(
      `
      SELECT id 
      FROM VIEW_MOVIE 
      WHERE $1 = ANY(genre);
      `,
      [givenGenre]
    );

    // Extract movie IDs
    const movieIdArray = movieIds.map(row => row.id);

    // Step 2: Select Distinct Users who Rated Movies below 3 stars
    const lowRatedUsers = await executeSQLQuery(      `
    SELECT DISTINCT user_id 
    FROM VIEW_MOVIE_RATING 
    WHERE movie_id = ANY($1)
    GROUP BY user_id
    HAVING MIN(CASE WHEN movie_id = ANY($1) THEN rating ELSE NULL END) < 3;
    `,
    [movieIdArray]);
      
    // Extract user IDs
    const userIds = lowRatedUsers.map(row => row.user_id);

    // Step 3: Get Distinct Genres of Low Rated Movies by Users
    const lowRatedMovies = await executeSQLQuery(      `
    SELECT id, genre 
    FROM VIEW_MOVIE 
    WHERE id IN (
        SELECT movie_id
        FROM VIEW_MOVIE_RATING
        WHERE user_id IN (
            SELECT UNNEST($1::int[])
        )
    )
    `,
    [userIds]);

    // Calculate average rating for each genre
    const genreRatings = {};
    lowRatedMovies.forEach(movie => {
    movie.genre.forEach(genre => {
        if (!genreRatings[genre]) {
            genreRatings[genre] = [];
        }
        genreRatings[genre].push(movie.id); // Store movie ID for each genre
    });
    });

    const avgGenreRatings = {};
    for (const genre in genreRatings) {
    const ratings = await executeSQLQuery(      `
    SELECT AVG(rating) AS avg_rating
    FROM VIEW_MOVIE_RATING
    WHERE movie_id IN (
      SELECT UNNEST($1::int[])
    )
    `,
    [genreRatings[genre]]);
    avgGenreRatings[genre] = ratings[0].avg_rating;
    }

    // Calculate average ratings over all genres average ratings by this user group
    const genres = Object.keys(avgGenreRatings);
    const totalGenres = genres.length;
    const overallAverage = genres.reduce((sum, genre) => sum + avgGenreRatings[genre], 0) / totalGenres;

    // Filter genres with average rating above overall average rating of all genres rated by this user group
    const distinctGenres = Object.keys(avgGenreRatings)
    .filter(genre => genre !== givenGenre && avgGenreRatings[genre] < overallAverage);

    return distinctGenres
  }catch (error) {
    throw new Error("Failed to fetch recommended genres");
  }
}

module.exports = {
  getGenreNames,
  getMostPolarizedGenres,
  getBestRatedGenres,
  getMostReviewedGenres,
  getMostReleasedGenres,
  getHighlyRatedGenres,
  getLowRatedGenres,
};
