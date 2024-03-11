import * as React from "react";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';

const Panel = styled.div`
  position: absolute;
  top: 125px; // Adjust this value to match the combined height of the LayoutWrapper and any margins/paddings
  left: 0;
  width: 350px;
  box-shadow: 2px 0 8px rgba(0,0,0,0.2);
  padding: 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.background};
  max-height: calc(100vh - 60px); // Adjust this value too if necessary
  overflow-y: auto;
  display: ${props => props.showFilters ? 'block' : 'none'};
  z-index: 2;
`;

const FilterButton = styled.button`
    display: block;
    background-color: ${(props) => (props.selected ? '#000000' : 'transparent')};
    color: ${(props) => (props.selected ? '#fff' : '#333')};
    border: none;
    width: 100%;
    text-align: left;
    padding: 10px;
    cursor: pointer;

    background-color: ${props => props.selected ? '#000000' : 'transparent'};
    color: ${props => props.selected ? '#fff' : '#333'};
  `;

const FilterScroller = styled.div`
  max-height: 150px;
  overflow-y: scroll;

  // Webkit-based browsers
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 6px;
    border: 2px solid #ffffff; // Add border for the thumb for contrast if desired
  }

  // Firefox
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #ffffff;

  // IE and Edge
  -ms-overflow-style: scrollbar;
`;

const RatingsContainer = styled.div`
  display: flex; // Aligns items in a row
  align-items: center; 
  gap: 10px; // Space between each rating button
  justify-content: center; // Center the items within the container
  margin-bottom: 20px; // Add space below the ratings
`;

const RatingButton = styled(FilterButton)`
    display: inline-flex; // Use inline-flex to keep the icon and text aligned
    align-items: center; // Align the icon and text vertically
    justify-content: center; // Center align the icon and text horizontally
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    background-color: ${props => props.selected ? '#000000' : 'transparent'};
    color: ${props => props.selected ? '#fff' : '#333'};
`;

const ResetButton = styled.button`
    font-family: ${(props) => props.theme.fonts.family};
    font-size: ${(props) => props.theme.filters.toggleButton.fontSize};
    font-weight: ${(props) => props.theme.fonts.fontWeight};
    text-decoration: underline;
    color: ${(props) => props.theme.filters.toggleButton.color};
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 0; // Provide padding at the top and bottom only
    margin: 0; // Remove margins to align with other text
    display: block;
    align-self: flex-start; // Align to the start if within a flex container
`;

const StarIcon = styled.img`
  width: 16px; // Set width for the star icon
  height: 15px; // Set height to maintain aspect ratio (assuming square icon)
  margin-left: 5px; // Space between the star icon and rating number
`;

const ToggleButton = styled.button`
  z-index: 3;
  width: ${(props) => props.theme.filters.toggleButton.width};
  height: ${(props) => props.theme.filters.toggleButton.height};
  margin-left: auto;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.filters.toggleButton.color};
  padding: ${(props) => props.theme.filters.toggleButton.padding};
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.filters.toggleButton.gap};
`;

const FilterText = styled.span`
  font-family: ${(props) => props.theme.fonts.family};
  font-size: ${(props) => props.theme.filters.toggleButton.fontSize};
  font-weight: ${(props) => props.theme.fonts.fontWeight};
  letter-spacing: ${(props) => props.theme.filters.toggleButton.letterSpacing};
`;

const FilterIcon = styled.img`
width: ${(props) => props.theme.filters.toggleButton.height};
`;

const mockGenres = ["Action", "Comedy", "Drama", "Fiction", "Thriller", "Sci-Fi"];
const mockTags = ["New Release", "Classic", "Trending", "Funny", "Best", "Boring"];
const mockCast = ["Actor A", "Actor B", "Actor C", "Actor D", "Actor E", "Actor F", "Actor G"];
const mockDirectors = ["Christopher Nolan", "Director B", "Director C", "Director D", "Director E", "Director F", "Director G"];

const FilterComponent = ({ filters, setFilters }) => {
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    {/* useEffect(() => {
        // This useEffect will run once, simulating fetching data from the backend
        const genreApiUrl = 'http://localhost:3001/api/genresNames';
        const tagApiUrl = 'http://localhost:3001/api/tags';
        const directorApiUrl = 'http://localhost:3001/api/directorsNames';
        const castApiUrl = 'http://localhost:3001/api/actors';
        
        const fetchDataFromApi = (apiUrl, setStateCallback, dataType) => {
            fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'filters/json',
              },
            })
            .then(response => response.json())
            .then(data => {
              setStateCallback(data);
            })
            .catch(error => {
              console.error(`Error fetching ${dataType}`, error);
            });
          };
          fetchDataFromApi(genreApiUrl, setGenres, 'genres');
          fetchDataFromApi(tagApiUrl, setTags, 'tags');
          fetchDataFromApi(directorApiUrl, setDirectors, 'directors');
          fetchDataFromApi(castApiUrl, setCast, 'cast');
    }, []); */}
    
    useEffect(() => {
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
            <ToggleButton onClick={handleToggleFilters} showfilters={showFilters}>
                <FilterText>Filter by</FilterText>
                <FilterIcon
                src={theme.assets.downIcon}
                alt="Filter"
                loading="lazy"
               />
            </ToggleButton>
            {showFilters && (
                <Panel showFilters={showFilters}>
                    <div>
                        {isFilterSelected() && <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>}
                        <h3>Genres</h3>
                        <FilterScroller>
                            {genres.map((genre) => (
                                <FilterButton
                                    key={genre}
                                    onClick={() => handleToggleFilter('genres', genre)}
                                    selected={filters.genres.includes(genre)}
                                >
                                    {genre}
                                </FilterButton>
                            ))}
                        </FilterScroller>
                        <h3>Tags</h3>
                        <FilterScroller>
                            {tags.map((tag) => (
                                <FilterButton
                                    key={tag}
                                    onClick={() => handleToggleFilter('tags', tag)}
                                    selected={filters.tags.includes(tag)}
                                >
                                    {tag}
                                </FilterButton>
                            ))}
                        </FilterScroller>
                        <h3>Cast</h3>
                        <FilterScroller>
                            {cast.map((actor) => (
                                <FilterButton
                                    key={actor}
                                    onClick={() => handleToggleFilter('cast', actor)}
                                    selected={filters.cast.includes(actor)}
                                >
                                    {actor}
                                </FilterButton>
                            ))}
                        </FilterScroller>
                        <h3>Directors</h3>
                        <FilterScroller>
                        {directors.map((director) => (
                                <FilterButton
                                    key={director}
                                    onClick={() => handleToggleFilter('directors', director)}
                                    selected={filters.directors.includes(director)}
                                >
                                    {director}
                                </FilterButton>
                            ))}
                        </FilterScroller>
                        <h3>Release Year</h3>
                        <FilterScroller>
                            {years.map((year) => (
                                <FilterButton
                                    key={year}
                                    onClick={() => handleToggleFilter('releaseYear', year)}
                                    selected={filters.releaseYear.includes(year)}
                                >
                                    {year}
                                </FilterButton>
                            ))}
                        </FilterScroller>
                        <h3>Ratings</h3>
                        <RatingsContainer>
                            {ratings.map((rating) => (
                                <RatingButton
                                    key={rating}
                                    onClick={() => handleToggleFilter('rating', rating)}
                                    selected={filters.rating.includes(rating)}
                                >
                                    {rating}
                                    <StarIcon
                                        src={theme.assets.starIcon}
                                        alt="Star"
                                        loading="lazy"
                                    />
                                </RatingButton>
                            ))}
                        </RatingsContainer>
                    </div>
                </Panel>
            )}
        </>
    );
  }
  
  export default FilterComponent;