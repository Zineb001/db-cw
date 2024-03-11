import * as React from "react";
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import theme from './theme';
import './style.css';
import NavigationBar from './NavigationBar';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import {PolarizingGenresHistogram, BestRatedGenresHistogram, MostReviewedGenresHistogram, MostReleasedGenresHistogram, PolarizingGenresLeaderboard, BestRatedGenresLeaderboard, MostReviewedGenresLeaderboard, MostReleasedGenresLeaderboard} from './Charts';

function DiscoverGenres() {
  const [genreNames, setGenreNames] = useState([]);
  const [mostPolarizingGenres, setMostPolarizingGenres] = useState([]);;
  const [bestRatedGenres, setBestRatedGenres] =useState([]);;
  const [mostReviewedGenres, setMostReviewedGenres] = useState([]);;
  const [mostReleasedGenres, setMostReleasedGenres] = useState([]);;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const genreNamesResponse = await fetch('http://localhost:3001/api/genresNames');
        const genreNamesData = await genreNamesResponse.json();
        setGenreNames(genreNamesData);
  
        const mostPolarizingGenreResponse = await fetch('http://localhost:3001/api/mostPolarizedGenres');
        const mostPolarizingGenreData = await mostPolarizingGenreResponse.json();
        setMostPolarizingGenres(mostPolarizingGenreData);

        const bestRatedGenreResponse = await fetch('http://localhost:3001/api/bestRatedGenres');
        const bestRatedGenreData = await bestRatedGenreResponse.json();
        setBestRatedGenres(bestRatedGenreData);

        const mostReviewedGenreResponse = await fetch('http://localhost:3001/api/mostReviewedGenres');
        const mostReviewedGenreData = await mostReviewedGenreResponse.json();
        setMostReviewedGenres(mostReviewedGenreData);

        const mostReleasedGenreResponse = await fetch('http://localhost:3001/api/mostReleasedGenres');
        const mostReleasedGenreData = await mostReleasedGenreResponse.json();
        setMostReleasedGenres(mostReleasedGenreData);
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);

  const [selectedChart, setSelectedChart] = useState('polarizing');

  const handleChange = (event) => {
    setSelectedChart(event.target.value);
  };
  
  const polarizingGenreNames = mostPolarizingGenres.map(genre => genre.name);
  const sdRatings = mostPolarizingGenres.map(genre => parseFloat(genre.sdrating));
  const bestRatedGenresNames = bestRatedGenres.map(genre => genre.name);
  const avgRatings = bestRatedGenres.map(genre => parseFloat(genre.averagerating));
  const mostReviewedGenresNames = mostReviewedGenres.map(genre => genre.name);
  const reviewscount = mostReviewedGenres.map(genre => parseInt(genre.reviewscount));
  const mostReleasedGenresNames = mostReleasedGenres.map(genre => genre.name);
  const releasescount = mostReleasedGenres.map(genre => parseInt(genre.releasescount));

  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
    </ThemeProvider>
  );
}

export default DiscoverGenres;