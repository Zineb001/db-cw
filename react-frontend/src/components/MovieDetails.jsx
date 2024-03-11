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

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Display as column */
  align-items: center; /* Center items horizontally */
  padding: 20px;
`;

const SectionsContainer = styled.div`
  background-color: #f2f2f2;
  display: flex;
  align-items: center; /* Center its children vertically */
  width: 100%; /* Take up the entire width */
  padding: 20px;
`;

const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 0 100px;
`;

const RightSection = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 0 100px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PosterContainer = styled.div`
  background-color: #333333;
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  padding: 20px;
  width: 100%; /* Take up the entire horizontal space */
`;

const Poster = styled.img`
  max-width: 100%;
`;

const Title = styled.h2`
  margin: 0;
`;
const ToggleSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Toggle = styled.div`
  padding: 0 100px;
  display: flex;
  width: 100%; /* Take up the entire horizontal space */
  background-color: #ffffff;
`;
const Content = styled.div`
  width:100%;
  background-color: #ffffff;
  padding: 20px;
  height: 800px;
`;

const HorizontalList = styled(List)`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto; /* Enable horizontal scrolling */
    padding: 10px 0; /* Add some padding */
    gap: 20px; /* Add some space between items */
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px; /* Adjust margin as needed */
`;

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
        <div>
          <Container>
          {isLoading ? (
            <p>Loading movie details...</p>
          ) : movieDetails ? (
            <>
            <PosterContainer>
                  <Poster src={movieDetails[0].poster} alt={movieDetails[0].title} />
            </PosterContainer>
            <ToggleSectionContainer>
            <Toggle>
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
            </Toggle>
            </ToggleSectionContainer>
            <SectionsContainer>
            <LeftSection>
            <Header>
            <Title>{movieDetails[0].title}</Title>
            </Header> 
            <Content>    
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
                    <HorizontalList>
                {recommendedMovies.map(movie => (
                <ListItem key={movie.id} component={Link} to={`/movie-details/${movie.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => setActiveTab('synopsis')}>
                <Poster src={movie.poster} alt={movie.title} />
                <TextContainer>
                    <ListItemText
                        primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                        primary={movie.title}
                    />
                </TextContainer>
              </ListItem>
                ))}
            </HorizontalList>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Viewers who did not enjoy this movie, also did not enjoy:
                    </Typography>
                    <HorizontalList>
                {discouragedMovies.map(movie => (
                <ListItem key={movie.id} component={Link} to={`/movie-details/${movie.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => setActiveTab('synopsis')}>
                <Poster src={movie.poster} alt={movie.title} />
                <TextContainer>
                    <ListItemText
                        primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                        primary={movie.title}
                    />
                </TextContainer>
              </ListItem>
                ))}
            </HorizontalList>
                </div>
                
            ) : (
                <p></p>
            )}
            </Content>
            </LeftSection>
            <RightSection>
            {directorDetails ? (
                <Content>
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
                </Content>
              ) : (
                <p>No director details found</p>
              )}
            </RightSection>
            </SectionsContainer>
            </>
          ) : (
            <p>No movie details found for ID {movieID}</p>
          )}
          </Container>
        </div>
      </ThemeProvider>
    );
  };
  export default MovieDetails;