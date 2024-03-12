import * as React from "react";
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import NavigationBar from './NavigationBar';
import { useState, useEffect} from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {GenrePersonalitysHistogram} from './Charts'; 
import './style.css';

function PersonalityAnalysis() {
  const [ personalityMovies, setPersonalityMovies] = useState([]);
  const [personalityGenres, setPersonalityGenres] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(personalityMovies[0]?.movie_id || '');
  const [isLoading, setIsLoading] = useState(true);

  const hardcodedPersonalityTraits = ['Openness', 'Agreeableness', 'Emotional Stability', 'Conscientiousness', 'Extraversion'];
  const [selectedTrait, setSelectedTrait] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {        
        const personalityMoviesResponse = await fetch('http://localhost:3001/api/personalityMovies');
        const personalityMoviesData = await personalityMoviesResponse.json();
        setPersonalityMovies(personalityMoviesData);

        const searchMoviesResponse = await fetch('http://localhost:3001/api/searchMovies');
        const searchMoviesData = await searchMoviesResponse.json();
        setSearchMovies(searchMoviesData);

        const personalityGenreResponse = await fetch('http://localhost:3001/api/personalityGenres');
        const personalityGenreData = await personalityGenreResponse.json();
        const filteredPersonalityGenreData = personalityGenreData.filter(genre => genre.name !== "(no genres listed)");
        setPersonalityGenres(filteredPersonalityGenreData);
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);


  const handleMovieChange = (event, newValue) => {
    setSelectedMovieId(newValue?.movie_id || '');
  };

  const handleTraitChange = (event, newValue) => {
    setSelectedTrait(newValue);
  };


  const selectedMovieData = personalityMovies.find(movie => movie.movie_id === selectedMovieId) || personalityMovies[0];

  const movieChartData = selectedMovieData ? {
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

  const options = {
    scales: {
      x: {
        ticks: {
          color: 'white', 
        },
        title: {
          display: true,
          text: 'Personality Traits',
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        }
      },
      y: {
        ticks: {
          color: 'white', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <>
      <div sx={{paddingBottom: 200}}>
        <div className="personality-container">
          <div className="personality-menu-container">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& a': {
                color: 'white',
                marginTop: 2,
                textDecoration: 'none',
                textAlign: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                font: "Verdana" 
              }
            }}
          >
            <Autocomplete
              id="movie-autocomplete"
              options={personalityMovies}
              getOptionLabel={(option) => option.movie_title || ''}
              value={personalityMovies.find(movie => movie.movie_id === selectedMovieId) || null}
              onChange={handleMovieChange}
              renderInput={(params) => (
                <TextField {...params} label="Select a Movie" variant="outlined" fullWidth
                  sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: '#E0E0E0', 
                    "&.Mui-focused": {
                      bgcolor: "#E0E0E0", 
                      color: 'black',
                    },
                    "& input": {
                      color: 'black', 
                    }
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: '#333333',
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0", 
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: 'black', 
                  },
                }} 
                />
              )}
              isOptionEqualToValue={(option, value) => option.movie_id === value.movie_id}
              sx={{
                width: 300, 
                "& .MuiAutocomplete-inputRoot": {
                  color: "#E0E0E0", 
                },
              }}
            />
            <a href="#" style={{ color: 'white' }}>Select a movie to display the correlation between the ratings and the users' personality traits</a>
          </Box>
          </div>
          <div className="personality-histogram-container ">
            {selectedMovieData && <Bar data={movieChartData} options={options} />}
          </div>
        </div>
          <div className="personality-container">
            <div className="personality-menu-container">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center', 
                '& a': {
                  color: 'white', 
                  marginTop: 2, 
                  textDecoration: 'none', 
                  width: '100%', 
                  textAlign: 'center',
                  font: "Verdana" 
                }
              }}
            >
              <Autocomplete
                id="trait-autocomplete"
                options={hardcodedPersonalityTraits}
                getOptionLabel={(option) => option}
                value={selectedTrait}
                onChange={handleTraitChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Trait"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: '#E0E0E0',
                        color: 'black',
                        "&.Mui-focused": {
                          bgcolor: "#E0E0E0",
                        },
                        "& fieldset": {
                          borderColor: "#E0E0E0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#E0E0E0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#E0E0E0",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#333333',
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E0E0E0",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'black',
                      }
                    }}
                  />
                )}
                sx={{
                  width: 300,
                  marginBottom: 2, 
                  "& .MuiAutocomplete-inputRoot": {
                    color: "#E0E0E0",
                  },
                }}
              />
              <a href="#" style={{ color: 'white', textAlign: 'center', paddingLeft: 20, paddingRight: 20,}}>Select a personality to display the correlation between it and the users' rating per genre</a>
            </Box>
            </div>
            <div className="personality-histogram-container ">
              {selectedTrait && <GenrePersonalitysHistogram personalityGenres={personalityGenres} selectedTrait={selectedTrait || hardcodedPersonalityTraits[0]} />}
            </div>
          </div>
          </div>
      </>
      )}
    </div>
    </ThemeProvider>
  );
}

export default PersonalityAnalysis;