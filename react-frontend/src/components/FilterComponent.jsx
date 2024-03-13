import * as React from "react";
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Autocomplete, TextField, Box, Button, Rating, Typography } from '@mui/material';
import './style.css';

const FilterComponent = ({ filters, setFilters }) => {
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
      const endpoints = [
        { url: 'http://localhost:3001/api/genresNames', setState: setGenres },
        { url: 'http://localhost:3001/api/actorsNames', setState: setCast },
        { url: 'http://localhost:3001/api/tags', setState: setTags },
        { url: 'http://localhost:3001/api/directorsNames', setState: setDirectors },
      ];
    
      const fetchAllData = async () => {
        try {
          for (const endpoint of endpoints) {
            const response = await fetch(endpoint.url);
            const data = await response.json();
            endpoint.setState(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } 
      };
    
      fetchAllData(); 
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
                    <h2>Filters</h2>
                    <div className="dark-theme">
                      <div className="padding">
                        {isFilterSelected() && <button onClick={handleResetFilters}>Reset Filters</button>}
                        <h3>Genres</h3>
                        <FormControl 
                        
                        sx={{ m: 1, width: 200, '.MuiInputBase-root': { bgcolor: 'background.paper', color: 'text.primary' } }}>
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
                                    maxWidth: 200,
                                  },
                                },
                              }}
                              sx={{
                                '.MuiInputBase-input': {
                                  height: 'auto',
                                  fontSize: '0.875rem',
                                  backgroundColor: '#333', 
                                  color: 'white', 
                                  '&:focus': {
                                    backgroundColor: '#333',
                                  },
                                },
                                '.MuiSelect-select': {
                                  '&:focus': {
                                    backgroundColor: '#333', 
                                  },
                                },
                                '.MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white', 
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white', 
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white', 
                                },
                                'svg': {
                                  color: 'white', 
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
                            renderInput={(params) => <TextField {...params} label="  Tags" sx={{paddingLeft: 1, width: '200px', input: { color: 'text.primary' }, '.MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}/>}
                        />
                        <h3>Cast</h3>
                        <Autocomplete
                            multiple
                            options={cast}
                            getOptionLabel={(option) => option}
                            value={filters.cast || []}
                            onChange={(event, newValue) => handleAutocompleteChange('cast', newValue)}
                            renderInput={(params) => <TextField {...params} label="  Cast" sx={{paddingLeft: 1, width: '200px', input: { color: 'text.primary' }, '.MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}/>}
                        />
                        <h3>Directors</h3>
                        <Autocomplete
                            multiple
                            options={directors}
                            getOptionLabel={(option) => option}
                            value={filters.directors || []}
                            onChange={(event, newValue) => handleAutocompleteChange('directors', newValue)}
                            renderInput={(params) => <TextField {...params} label="  Directors" sx={{paddingLeft: 1, width: '200px', input: { color: 'text.primary' }, '.MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}/>}
                        />
                        <h3>Release Year</h3>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Autocomplete
                            options={years}
                            value={startYear}
                            onChange={(event, newValue) => setStartYear(newValue)}
                            renderInput={(params) => <TextField {...params} label="  From" sx={{paddingLeft: 1, width: '100px', input: { color: 'text.primary' }, '.MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}/>}
                            disableClearable
                            />
                            <Autocomplete
                            options={years}
                            value={endYear}
                            onChange={(event, newValue) => setEndYear(newValue)}
                            renderInput={(params) => <TextField {...params} label="  To" sx={{paddingLeft: 1, width: '100px', input: { color: 'text.primary' }, '.MuiOutlinedInput-root': { bgcolor: 'background.paper' } }} />}
                            disableClearable
                            />
                        </Box>
                        <Button variant="contained" sx={{paddingLeft: 1, width: '220px', bgcolor: 'primary.light', color: 'text.primary', '&:hover': { bgcolor: 'primary.main' } }} onClick={handleSubmitYear}>Submit</Button>
                        </Box>
                        <h3>Rating</h3>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: 200, alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography component="legend">Min Rating</Typography>
                            <Rating
                              name="min-rating"
                              value={minRating}
                              onChange={(event, newValue) => {
                                setMinRating(newValue);
                              }}
                              sx={{
                                '.MuiRating-iconEmpty svg': {
                                  fill: 'transparent',
                                  stroke: 'white',
                                },
                                '.MuiRating-iconFilled svg': {
                                  fill: 'gold', 
                                  stroke: 'white',
                                },
                                '.MuiRating-iconHover svg': {
                                  fill: 'lightgray', 
                                  stroke: 'white',
                                }
                              }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography component="legend">Max Rating</Typography>
                            <Rating
                              name="max-rating"
                              value={maxRating}
                              onChange={(event, newValue) => {
                                setMaxRating(newValue);
                              }}
                              sx={{
                                '.MuiRating-iconEmpty svg': {
                                  fill: 'transparent',
                                  stroke: 'white',
                                },
                                '.MuiRating-iconFilled svg': {
                                  fill: 'gold', 
                                  stroke: 'white',
                                },
                                '.MuiRating-iconHover svg': {
                                  fill: 'lightgray', 
                                  stroke: 'white',
                                }
                              }}
                            />
                          </Box>
                          <Button 
                            variant="contained" 
                            sx={{width: '200px', bgcolor: 'primary.light', color: 'text.primary', '&:hover': { bgcolor: 'primary.main' } }} 
                            onClick={handleSubmitRating}>
                              Submit
                          </Button>
                        </Box>

                      </div>
                </div>
        </>
    );
    
  }
  
  export default FilterComponent;