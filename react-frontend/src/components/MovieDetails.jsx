import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import styled from 'styled-components';
import NavigationBar from './NavigationBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Display as column */
  align-items: center; /* Center items horizontally */
  padding: 20px;
`;

const SectionsContainer = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center its children vertically */
  width: 100%; /* Take up the entire width */
  padding: 20px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 100px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  max-width: 600px;
  background-color: #ffffff;
`;


const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [directorDetails, setDirectorDetails] = useState(null); 
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
      const fetchDirectorDetails= async () => {
        try {
          // Fetch director info based on movie ID
          const response = await fetch(`http://localhost:3001/api/directorMovies?movieID=${movieID}`);
          const data = await response.json();
          setDirectorDetails(data);
        } catch (error) {
          console.error('Error fetching director info:', error);
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
              <>
                <p>Cast: {movieDetails[0].actors.join(', ')}</p>
              </>
            )}
            {activeTab === 'recommendations' && (
              <>
                {/* Add recommendations details */}
              </>
            )}
            </Content>
            </LeftSection>
            <RightSection>
              <content>
              <p>Director: {directorDetails[0].directors.join(', ')}</p>
              </content>
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