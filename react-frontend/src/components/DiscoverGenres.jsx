import * as React from "react";
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import theme from './theme';
import './style.css';
import NavigationBar from './NavigationBar';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import {PolarizingGenresHistogram, BestRatedGenresHistogram, MostReviewedGenresHistogram, MostReleasedGenresHistogram, PolarizingGenresLeaderboard, BestRatedGenresLeaderboard, MostReviewedGenresLeaderboard, MostReleasedGenresLeaderboard, GenrePieChart, GenreHistogram} from './Charts';

function calculateRatingsByGenre(movies) {
  let genreStats = {};

  movies.forEach(movie => {
      const rating = parseFloat(movie.averagerating); 

      movie.genre.forEach(genre => { 
          if (!genreStats[genre]) {
              genreStats[genre] = { '5 stars': 0, 'between 4 and 5': 0, 'between 3 and 4': 0, 'between 2 and 3': 0, 'between 1 and 2': 0, 'less than 1 star': 0 };
          }

          if (rating === 5) {
              genreStats[genre]['5 stars']++;
          } else if (rating >= 4) {
              genreStats[genre]['between 4 and 5']++;
          } else if (rating >= 3) {
              genreStats[genre]['between 3 and 4']++;
          } else if (rating >= 2) {
              genreStats[genre]['between 2 and 3']++;
          } else if (rating >= 1) {
              genreStats[genre]['between 1 and 2']++;
          } else {
              genreStats[genre]['less than 1 star']++;
          }
      });
  });

  return Object.keys(genreStats).map(genre => ({
      genre,
      ...genreStats[genre]
  }));
}




function DiscoverGenres() {
  const [genreNames, setGenreNames] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [mostPolarizingGenres, setMostPolarizingGenres] = useState([]);;
  const [bestRatedGenres, setBestRatedGenres] =useState([]);;
  const [mostReviewedGenres, setMostReviewedGenres] = useState([]);;
  const [mostReleasedGenres, setMostReleasedGenres] = useState([]);;
  const [personalityGenres, setPersonalityGenres] = useState([]);;
  const [HighlyRatedGenresData, setHighlyRatedGenresData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hardcodedGenres = ["Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","IMAX","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"];
  const [selectedGenre, setSelectedGenre] = useState(hardcodedGenres[0]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {        
        const genreNamesResponse = await fetch('http://localhost:3001/api/genresNames');
        const genreNamesData = await genreNamesResponse.json();
        setGenreNames(genreNamesData);

        const movieResponse = await fetch('http://localhost:3001/api/searchMovies');
        const movieData = await movieResponse.json();
        setMovieDetails(movieData);
  
        const mostPolarizingGenreResponse = await fetch('http://localhost:3001/api/mostPolarizedGenres');
        const mostPolarizingGenreData = await mostPolarizingGenreResponse.json();
        const filteredMostPolarizingGenreData = mostPolarizingGenreData.filter(genre => genre.name !== "(no genres listed)");
        setMostPolarizingGenres(filteredMostPolarizingGenreData);

        const bestRatedGenreResponse = await fetch('http://localhost:3001/api/bestRatedGenres');
        const bestRatedGenreData = await bestRatedGenreResponse.json();
        const filteredBestRatedGenreData = bestRatedGenreData.filter(genre => genre.name !== "(no genres listed)");
        setBestRatedGenres(filteredBestRatedGenreData);

        const mostReviewedGenreResponse = await fetch('http://localhost:3001/api/mostReviewedGenres');
        const mostReviewedGenreData = await mostReviewedGenreResponse.json();
        const filteredMostReviewedGenreData = mostReviewedGenreData.filter(genre => genre.name !== "(no genres listed)");
        setMostReviewedGenres(filteredMostReviewedGenreData);

        const mostReleasedGenreResponse = await fetch('http://localhost:3001/api/mostReleasedGenres');
        const mostReleasedGenreData = await mostReleasedGenreResponse.json();
        const filteredMostReleasedGenreData = mostReleasedGenreData.filter(genre => genre.name !== "(no genres listed)");
        setMostReleasedGenres(filteredMostReleasedGenreData);

        const personalityResponse = await fetch('http://localhost:3001/api/personalityGenres');
        const personalityData = await personalityResponse.json();
        const filteredPersonalityData = personalityData.filter(genre => genre.name !== "(no genres listed)");
        setPersonalityGenres(filteredPersonalityData);
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchHighlyRatedGenres = async () => {
      if (!selectedGenre) return; 
  
      try {
        const response = await fetch(`http://localhost:3001/api/highlyRatedGenres?genres=${encodeURIComponent(selectedGenre)}`);
        if (!response.ok) throw new Error('Failed to fetch highly rated genres');
        
        const highlyRatedData = await response.json();
        setHighlyRatedGenresData(highlyRatedData);
      } catch (error) {
        console.error('Error fetching highly rated genres:', error);
      }
    };
  
    if (selectedGenre) { 
      fetchHighlyRatedGenres();
    }
  }, [selectedGenre]);


  const [selectedChart, setSelectedChart] = useState('polarizing');

  const handleChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const handleChangeGenre = (event) => {
    setSelectedGenre(event.target.value);
  };
  
  const polarizingGenreNames = mostPolarizingGenres.map(genre => genre.name);
  const sdRatings = mostPolarizingGenres.map(genre => parseFloat(genre.sdrating));
  const bestRatedGenresNames = bestRatedGenres.map(genre => genre.name);
  const avgRatings = bestRatedGenres.map(genre => parseFloat(genre.averagerating));
  const mostReviewedGenresNames = mostReviewedGenres.map(genre => genre.name);
  const reviewscount = mostReviewedGenres.map(genre => parseInt(genre.reviewscount));
  const mostReleasedGenresNames = mostReleasedGenres.map(genre => genre.name);
  const releasescount = mostReleasedGenres.map(genre => parseInt(genre.releasescount));


  const genreStats = calculateRatingsByGenre(movieDetails);
  //console.log(genreStats)

  // Find the data for the selected genre
  const selectedGenreData = genreStats.find(g => g.genre === selectedGenre) || {};

  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="vertical-stack">
          <div className="main-container">
            <div className="chart-container">
              {selectedChart === 'polarizing' && <PolarizingGenresHistogram genreNames={polarizingGenreNames} sdRatings={sdRatings} />}
              {selectedChart === 'bestRated' && <BestRatedGenresHistogram genreNames={bestRatedGenresNames} ratings={avgRatings} />}
              {selectedChart === 'mostReviewed' && <MostReviewedGenresHistogram genreNames={mostReviewedGenresNames} reviewscount={reviewscount} />}
              {selectedChart === 'mostReleased' && <MostReleasedGenresHistogram genreNames={mostReleasedGenresNames} releasescount={releasescount} />}
            </div>
            <div className="menu-and-leaderboard-container">
              <div className="menu-container ">
                <Box sx={{ minWidth: 120, mx: 1 }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel sx={{ color: 'white' }} id="custom-select-label">Filter By</InputLabel>
                    <Select
                      labelId="custom-select-label"
                      id="custom-select"
                      value={selectedChart}
                      label="Filter By"
                      onChange={handleChange}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        color: 'white',
                      }}
                    >
                      <MenuItem value="polarizing">Most Polarizing Genres</MenuItem>
                      <MenuItem value="bestRated">Best Rated Genres</MenuItem>
                      <MenuItem value="mostReviewed">Most Reviewed Genres</MenuItem>
                      <MenuItem value="mostReleased">Most Released Genres</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                {selectedChart === 'polarizing' && <PolarizingGenresLeaderboard genreNames={polarizingGenreNames}/>}
                {selectedChart === 'bestRated' && <BestRatedGenresLeaderboard genreNames={bestRatedGenresNames}/>}
                {selectedChart === 'mostReviewed' && <MostReviewedGenresLeaderboard genreNames={mostReviewedGenresNames} />}
                {selectedChart === 'mostReleased' &&<MostReleasedGenresLeaderboard genreNames={mostReleasedGenresNames} />}
              </div>
            </div>
          </div>
          <div className="horizontal-layout">
            <div className="pie-chart">
              <GenrePieChart genreData={selectedGenreData}/>
            </div>
            <div  className="dropdown-menu">
              <Box sx={{ minWidth: 120, mx: 1 }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel sx={{ color: 'white' }} id="genre-select-label">Select Genre</InputLabel>
                  <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={selectedGenre}
                    label="Select Genre"
                    onChange={handleChangeGenre}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                    }}
                  >
                    {genreStats.map((genre) => (
                      <MenuItem key={genre.genre} value={genre.genre}>{genre.genre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="histogram">
              <GenreHistogram data={personalityGenres} selectedGenre={selectedGenre} />
            </div>
          </div>
          <div>
            <h2>Genre Leaderboard</h2>
            <ol>
              {HighlyRatedGenresData.map((genre, index) => (
                <li key={index}>{genre}</li> 
              ))}
            </ol>
          </div>
        </div>
        </>
      )}
    </div>
    </ThemeProvider>
  );
}

export default DiscoverGenres;