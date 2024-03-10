import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const NavigationBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  return (
    <ThemeProvider theme={theme}> 
    <AppBar position="static" backgroundColor="primary">
      <Toolbar>
        {/* Icon button for the drawer or menu */}
        <IconButton edge="start" color='secondary1' aria-label="menu">
          <MenuIcon />
        </IconButton>
        
        {/* The Search Field */}
        <TextField
            variant="standard"
            placeholder="Search Movie"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
                style: { textTransform: 'none', fontSize: '0.875rem' },
            }}
            sx={{
                marginLeft: 'auto',
                marginRight: 1, 
                '& .MuiOutlinedInput-root': {borderRadius: '4px'},
            }}
        />


        {/* Navigation Buttons */}
        <Button variant='contained' color="secondary2"
                sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem' }} startIcon={<HourglassTopIcon />}
                onClick={() => navigate('/future-releases')}>
            Future Releases
        </Button>
        <Button variant='contained' color="secondary2"
                sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem'}} startIcon={<SsidChartIcon />}
                onClick={() => navigate('/discover-genres')}>
            Genre Analysis
        </Button>
        <Button variant='contained' color="secondary2"
                sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem'}} startIcon={<PersonIcon />}
                onClick={() => navigate('/personality-analysis')}>
            Personality Analysis
        </Button>
        <Button variant='contained' color="secondary2"
                sx={{mx: 1, textTransform: 'none', fontSize: '0.875rem'}} startIcon={<HomeIcon />}
                onClick={() => navigate('/search-movie')}>
            Home
        </Button>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default NavigationBar;
