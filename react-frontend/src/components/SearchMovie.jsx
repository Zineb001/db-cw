import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FilterComponent from './FilterComponent'
import MovieListComponent from './MovieListComponent'

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
  width: ${(props) => props.theme.searchInput.width};
  padding: ${(props) => props.theme.searchInput.padding};
  margin: ${(props) => props.theme.searchInput.margin};
  border: ${(props) => props.theme.searchInput.border} ${(props) => props.theme.colors.inputBorder};
  background-color: ${(props) => props.theme.colors.background};
  box-sizing: ${(props) => props.theme.searchInput.boxSizing};
  display: block;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.inputBorderFocus}; 
  }
`;

const StyledForm = styled.form`
  flex-grow: 1; 
  margin-right: 10px;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row; // Changed to row to lay out children side by side
  align-items: flex-start; // Align items at the start of the flex container
  width: 100%; // Ensure it takes the full viewport width
  padding: 20px 0; // Adjusted padding for visual consistency
`;

const EmptyBlock = styled.div`
  flex-grow: 1;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; // Adjust to column to stack children vertically
  align-items: center; // Center children horizontally
  padding: 20px;
  width: 100%; // Ensure it takes the full viewport width
`;

const ContentArea = styled.div`
  flex-grow: 1;
  margin: 0 350px; // Apply 350px margin to both left and right sides
  margin-top: ${props => props.showFilters ? '0' : '0'}; // Adjust if needed
  transition: margin-top 0.3s ease-in-out;
  padding: 20px;
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
    <PageContainer>
      <LayoutWrapper>
        <FilterComponent 
            filters={filters}
            setFilters={setFilters}
            setShowFilters={setShowFilters} 
            showFilters={showFilters} 
          />
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledSearchInput
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleSearchChange}
            ref={searchInputRef} 
          />
        </StyledForm>
        <EmptyBlock />
      </LayoutWrapper>
        <ContentArea showFilters={showFilters}>
            {!isLoading && <MovieListComponent movies={movies} />}
        </ContentArea>
    </PageContainer>
  );
}

export default SearchMovie;
