import * as React from "react";
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import NavigationBar from './NavigationBar';
import { useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './style.css';

function PersonalityAnalysis() {
  const [ personalityMovies, setPersonalityMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(personalityMovies[0]?.movie_id || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {        
        const personalityMoviesResponse = await fetch('http://localhost:3001/api/personalityMovies');
        const personalityMoviesData = await personalityMoviesResponse.json();
        setPersonalityMovies(personalityMoviesData);

        const searchMoviesResponse = await fetch('http://localhost:3001/api/searchMovies');
        const searchMoviesData = await personalityMoviesResponse.json();
        setSearchMovies(searchMoviesData);
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);


  const handleChange = (event) => {
    setSelectedMovieId(event.target.value);
  };

  const selectedMovieData = personalityMovies.find(movie => movie.movie_id === selectedMovieId) || null;

  const chartData = selectedMovieData ? {
    labels: ['Openness', 'Agreeableness', 'Emotional Stability', 'Conscientiousness', 'Extraversion'],
    datasets: [
      {
        label: selectedMovieData.movie_title,
        data: [
          selectedMovieData.avg_openness,
          selectedMovieData.avg_agreeableness,
          selectedMovieData.avg_emotional_stability,
          selectedMovieData.avg_conscientiousness,
          selectedMovieData.avg_extraversion,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  } : {};

  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <FormControl fullWidth>
            <InputLabel id="movie-select-label">Select a Movie</InputLabel>
            <Select
              labelId="movie-select-label"
              id="movie-select"
              value={selectedMovieId}
              label="Select a Movie"
              onChange={handleChange}
            >
              {personalityMovies.map((movie) => (
                <MenuItem key={movie.movie_id} value={movie.movie_id}>{movie.movie_title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedMovieData && <Bar data={chartData} />}
        </div>
      )}
    </div>
    </ThemeProvider>
  );
}

export default PersonalityAnalysis;