import * as React from "react";
import { useState, useEffect } from 'react';
import './style.css';

const mockGenres = ["Action", "Comedy", "Drama"];
const mockTags = ["New Release", "Classic", "Trending"];
const mockCast = ["Actor A", "Actor B", "Actor C", "Actor D"];
const mockDirectors = ["Christopher Nolan", "Director B", "Director C", "Director D"];

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
            <button className="toggleButton" onClick={handleToggleFilters}>
                {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
            </button>
            {showFilters && (
                <div className={`panel ${showFilters ? 'show' : ''}`}>
                    <div>
                        {isFilterSelected() && <button onClick={handleResetFilters}>Reset Filters</button>}
                        <h3>Genres</h3>
                        {genres.map((genre, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(genre) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('genres', genre)}>
                                {genre}
                            </button>
                        ))}
                        <h3>Tags</h3>
                        {tags.map((tag, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(tag) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('tags', tag)}>
                                {tag}
                            </button>
                        ))}
                        <h3>Cast</h3>
                        {cast.map((actor, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(actor) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('actors', actor)}>
                                {actor}
                            </button>
                        ))}
                        <h3>Directors</h3>
                        {directors.map((director, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(director) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('directors', director)}>
                                {director}
                            </button>
                        ))}
                        <h3>Release Year</h3>
                        {years.map((year, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(year) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('years', year)}>
                                {year}
                            </button>
                        ))}
                        <h3>Ratings</h3>
                        {ratings.map((rating, index) => (
                            <button
                            className={`filterButton ${filters.genres.includes(rating) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleToggleFilter('ratings', rating)}>
                                {rating}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
    
  }
  
  export default FilterComponent;