import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import HomePage from './components/HomePage';
import SearchMovie from './components/SearchMovie';
import FutureReleases from './components/FutureReleases';
import DiscoverGenres from './components/DiscoverGenres';
import Recommendations from './components/Recommendations';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-movie" element={<SearchMovie />} />
          <Route path="/future-releases" element={<FutureReleases />} />
          <Route path="discover-genres" element={<DiscoverGenres />} />
          <Route path="/recommendations:1" element={<Recommendations/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;