const movieService = require("../services/MovieServices");
const directorService = require("../services/DirectorServices");
const Movie = require("../models/Movie");


// Controller function to handle GET request for users
async function getMovies(req, res) {
  try {
    const movies = await movieService.getMovies(); // Call the getUsers function from the userService
    res.json(movies); // Send the users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" }); // Send error response
  }
}

async function searchMovies(req, res) {
  try {
    //for testing: /api/searchMovies?title=&releaseYear=&cast=&genre=&rating=2&tags=
    const { title, releaseYear, directors, cast, genres, rating, tags } = req.query;
    const searchResults = await movieService.searchMovies(
      null,
      title,
      releaseYear,
      directors,
      cast,
      genres,
      rating,
      tags
    );

    const sortedSearchResults = movieService.sortMovies(searchResults);
    res.json(sortedSearchResults);

  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMoviesOfSameDirector(req, res) {
  try {
    //for testing: 
    const { movieID } = req.query;
    const directors = await directorService.getDirectorsByMovieID(movieID);
    const searchResults= await movieService.getMoviesOfDirectors(directors);
    const sortedSearchResults = movieService.sortMovies(searchResults);
    res.json(sortedSearchResults);

  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTags(req, res){
  try{
    const tags = await movieService.getTags();
    res.json(tags)
  }
  catch(error)
  {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMovieRecommendations(req, res){
  try{
    const movieRecommendationsResults = await movieService.getMovieRecommendations();
    res.json(movieRecommendationsResults)
  }
  catch(error)
  {
    console.error("Error fetching movie recommendations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getMovies,
  searchMovies,
  getMoviesOfSameDirector,
  getTags,
  getMovieRecommendations
};
