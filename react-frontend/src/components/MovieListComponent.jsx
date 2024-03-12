import * as React from "react";
import { Link } from 'react-router-dom'; 
import "./MovieList.css";
import theme from './theme.js'; 

export const formatTitle = (title) => {
  const regex = /^(.+?)\s*\(\d{4}\)$/;
  const match = title.match(regex);
  return match ? match[1] : title;
}  

export const renderActors = (actors) => {
  const firstFourActors = actors.slice(0, 4).join(', ');
  const additionalActors = actors.length > 4 ? ', ...' : '';
  return firstFourActors + additionalActors;
};

export const truncateContent = (content, maxWords = 25) => {
  const words = content.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  } else {
    return content;
  }
};

const MovieListComponent = React.memo(({ movies }) => {
    const formatRatingCount = (count) => {
      if (count < 1000) return count; 
      if (count === 1000) return '1k'
      return (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'k';
    };
    
    const renderRating = (averageRating, ratingCount) => (
      <>
        <span className="star-icon">
          <img src={theme.images.StarIcon} alt="Star" loading="lazy" />
        </span>
        {averageRating} ({formatRatingCount(ratingCount)} reviews)
      </>
    );

    return (
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-container" key={movie.id}>
            <div className="movie-poster">
              <img src={movie.poster} alt={`${movie.title} Poster`}/>
             </div>
             <div className="movie-details">
               <h2>
                <Link to={`/movie-details/${movie.id}`}>{formatTitle(movie.title)}</Link>
               </h2>
               <p className="movie-release-year">{movie.releasedate}</p>
               <p className="movie-genre">{movie.genre.join(', ')}</p>
               <p className="movie-rating">
                {renderRating(movie.averagerating, movie.ratingcount)}
              </p>
              <p className="movie-cast">{renderActors(movie.actors)}</p>
              <p className="movie-content">{truncateContent(movie.content)}</p> 
            </div>
          </div>
        ))}
      </div>
    );
});
export default MovieListComponent;
