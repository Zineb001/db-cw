import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import styled from 'styled-components';
import NavigationBar from './NavigationBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import './style.css';

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [directorDetails, setDirectorDetails] = useState(null); 
    const [recommendedMovies, setRecommendedMovies] = useState(null); 
    const [discouragedMovies, setDiscouragedMovies] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const { movieID } = useParams();
    const [activeTab, setActiveTab] = useState('synopsis');

    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          console.log("movieID: ", movieID);
          // Fetch movie details from backend API based on movieId
          const response = await fetch(`http://localhost:3001/api/getMovie?movieID=${movieID}`);
          const data = await response.json();
          console.log("data:", data);
          setMovieDetails(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching movie details:', error);
          setIsLoading(false);
        }
      };
  
      fetchMovieDetails();
    }, [movieID]);

    useEffect(() => {
      const fetchRecommendedMovies = async () => {
        try {
          console.log("movieID: ", movieID);
          // Fetch movie details from backend API based on movieId
          const response = await fetch(`http://localhost:3001/api/movieRecommendations?movieID=${movieID}`);
          const data = await response.json();
          console.log("data:", data);
          setRecommendedMovies(data.slice(0, 5));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching recommended movie details:', error);
          setIsLoading(false);
        }
      };
  
      fetchRecommendedMovies();
    }, [movieID]);

    useEffect(() => {
      const fetchDiscouragedMovies = async () => {
        try {
          console.log("movieID: ", movieID);
          // Fetch movie details from backend API based on movieId
          const response = await fetch(`http://localhost:3001/api/movieDiscouragements?movieID=${movieID}`);
          const data = await response.json();
          console.log("data:", data);
          setDiscouragedMovies(data.slice(0, 5));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching discouraged movie details:', error);
          setIsLoading(false);
        }
      };
  
      fetchDiscouragedMovies();
    }, [movieID]);

    useEffect(() => {
      const fetchDirectorDetails= async () => {
        try {
          // Fetch director info based on movie ID
          const response = await fetch(`http://localhost:3001/api/directorMovies?movieID=${movieID}`);
          const data = await response.json();
          setDirectorDetails(data.slice(0, 5));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching director info:', error);
          setIsLoading(false);
        }
      };
  
      // Check if movieID exists before fetching director info
      if (movieID) {
        fetchDirectorDetails();
      }
    }, [movieID]);

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <div className = "detail-container">
          {isLoading ? (
            <p>Loading movie details...</p>
          ) : movieDetails ? (
            <>
            <div className="detail-poster-container">
              <div className="detail-poster">
                <img src={movieDetails[0].poster} alt={movieDetails[0].title} />
              </div>
            </div>
            <div className="detail-toggle-container">
            <div className="detail-toggle">
              <Stack direction="row" spacing={2}>
              <Button color="secondary1"
                  sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem' }}
                  onClick={() =>  handleTabClick('synopsis')}>
              Synopsis
              </Button>
              <Button color="secondary1"
                  sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem' }}
                  onClick={() =>  handleTabClick('cast')}>
              Cast
              </Button>
              <Button color="secondary1"
                  sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem' }}
                  onClick={() =>  handleTabClick('recommendations')}>
              Recommendations
              </Button>
              </Stack>
            </div>
            </div>
            <div className = "sections-container">
            <div className="left-section">
            <div className="detail-header">
            <h2 margin = {0}>{movieDetails[0].title}</h2>
            </div> 
            <div className="detail-content">    
            {activeTab === 'synopsis' && (
              <>
                <p>Synopsis:</p>
                <p>{movieDetails[0].content}</p>
                <hr />
                <p>Genre:</p>
                <p>{movieDetails[0].genre.join(', ')}</p>
                {/* Add more movie details as needed */}
              </>
            )}
            {activeTab === 'cast' && (
              <><p>Genre:</p>
                <p>{movieDetails[0].actors.join(', ')}</p>
              </>
            )}
             {activeTab === 'recommendations' && recommendedMovies && discouragedMovies?(
                <div>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Viewers who enjoyed this movie, also enjoyed:
                    </Typography>
                    <List className="horizontal-list">
                {recommendedMovies.map(movie => (
                <ListItem key={movie.id} component={Link} to={`/movie-details/${movie.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => setActiveTab('synopsis')}>
                <img className="detail-poster" src={movie.poster} alt={movie.title} />
                <div className="detail-text-container">
                    <ListItemText
                        primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                        primary={movie.title}
                    />
                </div>
              </ListItem>
                ))}
            </List>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Viewers who did not enjoy this movie, also did not enjoy:
                    </Typography>
                    <List className="horizontal-list">
                {discouragedMovies.map(movie => (
                <ListItem key={movie.id} component={Link} to={`/movie-details/${movie.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => setActiveTab('synopsis')}>
                <img className="detail-poster" src={movie.poster} alt={movie.title} />
                <div className="detail-text-container">
                    <ListItemText
                        primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                        primary={movie.title}
                    />
                </div>
              </ListItem>
                ))}
            </List>
                </div>
                
            ) : (
                <p></p>
            )}
            </div>
            </div>
            <div className="right-section">
            {directorDetails ? (
                <div className="detail-content">
                  <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  <p>Also by director: {directorDetails[0].directors.join(', ')}</p>
                  </Typography>
                  <List >
                  {directorDetails.map(movie => (
                    <ListItem key={movie.id} component={Link} to={`/movie-details/${movie.id}`}>
                      <ListItemText
                        primary={movie.title}
                        secondary={movie.releaseDate} // Assuming you have a release date for each movie
                      />
                    </ListItem>
                  ))}
            </List>
                </div>
              ) : (
                <p>No director details found</p>
              )}
            </div>
            </div>
            </>
          ) : (
            <p>No movie details found for ID {movieID}</p>
          )}
        </div>
      </ThemeProvider>
    );
  };
  export default MovieDetails;