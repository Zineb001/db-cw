import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import theme from './theme/theme';
import HomePage from './components/HomePage';
import SearchMovie from './components/SearchMovie';
import FutureReleases from './components/FutureReleases';
import DiscoverGenres from './components/DiscoverGenres';
import PersonalityAnalysis from './components/PersonalityAnalysis';
import MovieDetails from './components/MovieDetails';
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-movie" element={<SearchMovie />} />
          <Route path="/future-releases" element={<FutureReleases />} />
          <Route path="discover-genres" element={<DiscoverGenres />} />
          <Route path="movie-details/:movieID" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;