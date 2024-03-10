import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import styled from 'styled-components';
import FilterComponent from './FilterComponent'
import MovieListComponent from './MovieListComponent'
import NavigationBar from './NavigationBar';

const mockedJSON = `[
  {
    "id": "1",
    "title": "Chungking Express",
    "genre": ["Comedy", "Crime", "Drama"],
    "directors": ["A", "B", "C"]
    "actors": ["Brigitte Lin", "Takeshi Kaneshiro", "Tony Leung Chiu-wai"],
    "content": "Two melancholic Hong Kong policemen fall in love: one with a mysterious female underworld figure, the other with a beautiful and ethereal waitress at a late-night restaurant he frequents.",
    "releaseDate": "1996",
    "averageRating": "8.0",
    "sdRating": "1.2",
    "ratingCount": "100000",
    "tags": ["New Wave", "Romantic", "Cult Film"],
    "poster": "https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
  },
  {
    "id": "2",
    "title": "In the Mood for Love",
    "genre": ["Drama", "Romance"],
    "actors": ["Maggie Cheung", "Tony Leung Chiu-wai"],
    "content": "A man and a woman move in next door to each other and form a strong bond after both suspect extramarital activities of their spouses.",
    "releaseYear": "2000",
    "averageRating": "8.1",
    "sdRating": "1.3",
    "ratingCount": "110000",
    "tags": ["Slow Burn", "Visual Art", "Classic"],
    "poster": "https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
  },
  {
    "id": "3",
    "title": "The Grand Budapest Hotel",
    "genre": ["Adventure", "Comedy", "Crime"],
    "actors": ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    "content": "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    "releaseYear": "2014",
    "averageRating": "8.1",
    "sdRating": "1.5",
    "ratingCount": "690000",
    "tags": ["Quirky", "Stylized", "Witty"],
    "poster": "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
  },
  {
    "id": "4",
    "title": "Parasite",
    "genre": ["Comedy", "Drama", "Thriller"],
    "actors": ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    "content": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "releaseYear": "2019",
    "averageRating": "8.6",
    "sdRating": "1.2",
    "ratingCount": "546000",
    "tags": ["Thrilling", "Dark Comedy", "Social Commentary"],
    "poster": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
  }
]`;


const StyledSearchInput = styled.input`
  width: 100%; 
  padding: 10px; 
  margin: 10px 0; 
  border: 1px solid #ddd; 
  box-sizing: border-box;
  &:focus {
    outline: none; 
    border-color: #ccc; 
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentArea = styled.div`
  transition: margin-top 0.3s ease-in-out;
  margin-top: ${props => props.showFilters ? '20px' : '0'};
`;


function SearchMovie() {
  const location = useLocation();
  const searchTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(location.state?.query || ''); 
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({
    cast: [],
    directors: [],
    genres: [],
    rating: [],
    releaseYear: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInputRef.current) {
    searchInputRef.current.blur();}
  };

  /* useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(() => {
      console.log('Sending request to backend with search term and filters:', { searchTerm, filters });
      const mockedData = JSON.parse(mockedJSON);
      console.log('Fetched movies from backend');
      setMovies(mockedData);

      setIsLoading(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, filters]); */

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(() => {
      const apiUrl = `http://localhost:3001/api/searchMovies`;
      let queryString = `?title=${encodeURIComponent(searchTerm)}`;
      const filterKeys = ['releaseYear', 'directors', 'cast', 'genres', 'rating', 'tags'];

      filterKeys.forEach(key => {
        const value = filters[key];
        queryString += `&${key}=`;
        if (Array.isArray(value) && value.length > 0) {
          queryString += value.map(item => encodeURIComponent(item)).join(',');
        }
      });

      fetch(apiUrl + queryString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      });
      console.log("Request URL:", apiUrl + queryString);
      setIsLoading(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, filters]);
    
  return (
    <>
      <ThemeProvider theme={theme}>
      <NavigationBar />
      <form onSubmit={handleFormSubmit}>
        <StyledSearchInput
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
          ref={searchInputRef} 
        />
      </form>
      <LayoutContainer>
        <FilterComponent 
          filters={filters}
          setFilters={setFilters}
          setShowFilters={setShowFilters} 
          showFilters={showFilters} 
        />
        <ContentArea showFilters={showFilters}>
          {!isLoading && <MovieListComponent movies={movies} />}
        </ContentArea>
      </LayoutContainer>
      </ThemeProvider>
    </>
  );
}

export default SearchMovie;