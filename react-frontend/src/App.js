import * as React from "react";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import HomePage from './components/HomePage';
import SearchMovie from './components/SearchMovie';
import FutureReleases from './components/FutureReleases';
import DiscoverGenres from './components/DiscoverGenres';
import NavBar from './components/NavBar';

function App() {
  
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-movie" element={<SearchMovie />} />
            <Route path="/future-releases" element={<FutureReleases />} />
            <Route path="discover-genres" element={<DiscoverGenres />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;