import * as React from "react";
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Autocomplete, TextField, Box, Button } from '@mui/material';
import './style.css';

const mockGenres = ["Action", "Comedy", "Drama"];
const mockTags = ["New Release", "Classic", "Trending", "prison"];
const mockCast = ["Bob Penny", "Steve Wyatt", "Anna Mucha", "Harris Savides"];
const mockDirectors = ["Christopher Nolan", "Director B", "Director C", "Director D"];

const FilterComponent = ({ filters, setFilters }) => {
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        setGenres(mockGenres);
        setTags(mockTags);
        setCast(mockCast);
        setDirectors(mockDirectors);
    }, []);
    

    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const years = Array.from({ length: (2016 - 1926) + 1 }, (_, k) => k + 1926);

    const [minRating, setMinRating] = useState(null);
    const [maxRating, setMaxRating] = useState(null);
    const ratings = Array.from({ length: 5 }, (_, k) => k + 1);
    

    const handleChange = (filterCategory, event) => {
        const { value } = event.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterCategory]: value,
        }));
      };  
    
    const handleAutocompleteChange = (filterCategory, newValue) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterCategory]: newValue,
        }));
      };
    
    const handleSubmitYear = () => {
        if (startYear && endYear && startYear <= endYear) {
          const selectedYears = Array.from({ length: (endYear - startYear) + 1 }, (_, k) => k + startYear);
          setFilters(prevFilters => ({
            ...prevFilters,
            releaseYear: selectedYears,
          }));
        } else {
          alert('Please select a valid year range.');
        }
      };

    const handleSubmitRating = () => {
        if (minRating && maxRating && minRating <= maxRating) {
            setFilters(prevFilters => ({
              ...prevFilters,
              rating: [minRating, maxRating],
            }));
          } else {
            alert('Please select a valid rating range.');
          }
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
        console.log("Filters Reset and Closed:", resetFilters);
    };

    const isFilterSelected = () => {
        return Object.values(filters).some(category => category.length > 0);
    };
    
    return (
        <>
            <div>Filters Test</div>
                    <h2>Filters</h2>
                    <div>
                        {isFilterSelected() && <button onClick={handleResetFilters}>Reset Filters</button>}
                        <h3>Genres</h3>
                        <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="genres-dropdown" variant="standard">Genres</InputLabel>
                        <Select
                            labelId="genres-dropdown-label"
                            id="genres-dropdown"
                            multiple
                            value={filters.genres}
                            onChange={(e) => handleChange('genres', e)}
                            input={<OutlinedInput label="Genres" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor: '#E0E0E0', 
                                    maxHeight: '300px', 
                                  },
                                },
                              }}
                              sx={{
                                '.MuiInputBase-input': {
                                  height: 'auto',
                                  fontSize: '0.875rem',
                                },
                                '.MuiSelect-select': {
                                  '&:focus': {
                                    backgroundColor: '#E0E0E0', 
                                  },
                                },
                              }}
                        >
                            {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>
                                <Checkbox checked={filters.genres.indexOf(genre) > -1} />
                                <ListItemText primary={genre} />
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <h3>Tags</h3>
                        <Autocomplete
                            multiple
                            options={tags} 
                            getOptionLabel={(option) => option} 
                            value={filters.tags || []}
                            onChange={(event, newValue) => handleAutocompleteChange('tags', newValue)}
                            renderInput={(params) => <TextField {...params} label="Tags" />}
                        />
                        <h3>Cast</h3>
                        <Autocomplete
                            multiple
                            options={cast}
                            getOptionLabel={(option) => option}
                            value={filters.cast || []}
                            onChange={(event, newValue) => handleAutocompleteChange('cast', newValue)}
                            renderInput={(params) => <TextField {...params} label="Cast" />}
                        />
                        <h3>Directors</h3>
                        <Autocomplete
                            multiple
                            options={directors}
                            getOptionLabel={(option) => option}
                            value={filters.directors || []}
                            onChange={(event, newValue) => handleAutocompleteChange('directors', newValue)}
                            renderInput={(params) => <TextField {...params} label="Directors" />}
                        />
                        <h3>Release Year</h3>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Autocomplete
                            options={years}
                            value={startYear}
                            onChange={(event, newValue) => setStartYear(newValue)}
                            renderInput={(params) => <TextField {...params} label="From Year" />}
                            disableClearable
                            />
                            <Autocomplete
                            options={years}
                            value={endYear}
                            onChange={(event, newValue) => setEndYear(newValue)}
                            renderInput={(params) => <TextField {...params} label="To Year" />}
                            disableClearable
                            />
                        </Box>
                        <Button variant="contained" onClick={handleSubmitYear}>Submit</Button>
                        </Box>
                        <h3>Rating</h3>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
                        <Autocomplete
                            options={ratings}
                            value={minRating}
                            onChange={(event, newValue) => setMinRating(newValue)}
                            renderInput={(params) => <TextField {...params} label="Min Rating" />}
                            disableClearable
                        />
                        <Autocomplete
                            options={ratings}
                            value={maxRating}
                            onChange={(event, newValue) => setMaxRating(newValue)}
                            renderInput={(params) => <TextField {...params} label="Max Rating" />}
                            disableClearable
                        />
                        <Button variant="contained" onClick={handleSubmitRating}>Submit</Button>
                        </Box>
                </div>
        </>
    );
    
  }
  
  export default FilterComponent;