import * as React from "react";
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  width: 300px; 
  box-shadow: 2px 0 8px rgba(0,0,0,0.2);
  padding: 20px;
  box-sizing: border-box;
  max-height: 100vh; 
  overflow-y: auto; 
  display: ${props => props.showFilters ? 'block' : 'none'}; 
  margin-top: 10px; 
  margin-right: 20px;
`;

const FilterButton = styled.button`
  margin: 5px;
  padding: 8px 12px;
  background-color: ${props => props.selected ? "#4CAF50" : "#f0f0f0"};
  color: ${props => props.selected ? "white" : "black"};
  border: ${props => props.selected ? "2px solid #4CAF50" : "2px solid #ddd"};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.selected ? "#45a049" : "#e7e7e7"};
  }
`;

const ToggleButton = styled.button`
  z-index: 3;
  margin: 5px;
  width: 150px;
  height: 40px;
  padding: 8px 12px;
  cursor: pointer;
`;

const mockGenres = ["Action", "Comedy", "Drama"];
const mockTags = ["New Release", "Classic", "Trending"];
const mockCast = ["Actor A", "Actor B", "Actor C", "Actor D"];
const mockDirectors = ["Director A", "Director B", "Director C", "Director D"];

const FilterComponent = ({ filters, setFilters }) => {
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // This useEffect will run once, simulating fetching data from the backend
        setGenres(mockGenres);
        setTags(mockTags);
        setCast(mockCast);
        setDirectors(mockDirectors);
    }, []);
    
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
      };
  
    const years = Array.from({ length: 2030 - 1990 + 1 }, (_, i) => 1990 + i);
    const ratings = ['<1', '1', '2', '3', '4', '5'];

    const handleToggleFilter = (filterCategory, value) => {
        const updatedFilters = { ...filters };
        if (!updatedFilters[filterCategory].includes(value)) {
            updatedFilters[filterCategory].push(value);
        } else {
            updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(item => item !== value);
        }
        setFilters(updatedFilters);
        console.log("Updated Filters:", updatedFilters);
    };

    const handleResetFilters = () => {
        const resetFilters = {
            genres: [],
            tags: [],
            cast: [],
            directors: [],
            releaseYear: [],
            rating: []
        };
        setFilters(resetFilters);
        setShowFilters(false); 
        console.log("Filters Reset and Closed:", resetFilters);
    };

    const isFilterSelected = () => {
        return Object.values(filters).some(category => category.length > 0);
    };
    
    return (
        <>
            <ToggleButton onClick={handleToggleFilters}>
                {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
            </ToggleButton>
            {showFilters && (
                <Panel showFilters={showFilters}>
                    <div>
                        {isFilterSelected() && <button onClick={handleResetFilters}>Reset Filters</button>}
                        <h3>Genres</h3>
                        {genres.map((genre) => (
                            <FilterButton
                                key={genre}
                                onClick={() => handleToggleFilter('genres', genre)}
                                selected={filters.genres.includes(genre)}
                            >
                                {genre}
                            </FilterButton>
                        ))}
                        <h3>Tags</h3>
                        {tags.map((tag) => (
                            <FilterButton
                                key={tag}
                                onClick={() => handleToggleFilter('tags', tag)}
                                selected={filters.tags.includes(tag)}
                            >
                                {tag}
                            </FilterButton>
                        ))}
                        <h3>Cast</h3>
                        {cast.map((actor) => (
                            <FilterButton
                                key={actor}
                                onClick={() => handleToggleFilter('cast', actor)}
                                selected={filters.cast.includes(actor)}
                            >
                                {actor}
                            </FilterButton>
                        ))}
                        <h3>Directors</h3>
                        {directors.map((director) => (
                            <FilterButton
                                key={director}
                                onClick={() => handleToggleFilter('directors', director)}
                                selected={filters.directors.includes(director)}
                            >
                                {director}
                            </FilterButton>
                        ))}
                        <h3>Release Year</h3>
                        {years.map((year) => (
                            <FilterButton
                                key={year}
                                onClick={() => handleToggleFilter('releaseYear', year)}
                                selected={filters.releaseYear.includes(year)}
                            >
                                {year}
                            </FilterButton>
                        ))}
                        <h3>Ratings</h3>
                        {ratings.map((rating) => (
                            <FilterButton
                                key={rating}
                                onClick={() => handleToggleFilter('rating', rating)}
                                selected={filters.rating.includes(rating)}
                            >
                                {rating}
                            </FilterButton>
                        ))}
                    </div>
                </Panel>
            )}
        </>
    );
    
  }
  
  export default FilterComponent;