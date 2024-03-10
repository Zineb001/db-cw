import * as React from "react";
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import NavigationBar from './NavigationBar';

function DiscoverGenres() {
  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div>
      <h1>Discover Genres</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search-movie">Search Movie</Link></li>
          <li><Link to="/future-releases">Future Releases</Link></li>
          <li><Link to="/discover-genres">Discover Genres</Link></li>
          <h1>Discover Genres</h1>
        </ul>
      </nav>
      {/* The rest of  this page's content */}
    </div>
    </ThemeProvider>
  );
}

export default DiscoverGenres;