import * as React from "react";
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import NavigationBar from './NavigationBar';
import MovieCard from './MovieCard';

const FutureReleases = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch('/api/movies/predictions') // Your API endpoint
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <NavigationBar />
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    </ThemeProvider>
  );
}

export default FutureReleases;