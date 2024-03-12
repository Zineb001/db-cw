import * as React from 'react';
import { Link } from 'react-router-dom'; 
import { formatTitle, renderActors, truncateContent } from './MovieListComponent';
import "./MovieCard.css";
import theme from './theme.js'; 

const MovieCard = ({ movie }) => {
    const formatRating = (averagerating) => {
        return Math.floor(averagerating * 10) / 10;
      } 

    return (
        <div className="movie-card">
        <div className="movie-poster">
            <img src={movie.poster} alt={`${movie.title} Poster`} />
        </div>
        <div className="movie-info">
            <h3>
                <Link to={`/movie-details/${movie.id}`}>{formatTitle(movie.title)}</Link>
            </h3>
            <p className="movie-genres">{movie.genre.join(', ')}</p>
            <div className="movie-rating">
                <span className="star-icon">
                    <img src={theme.images.StarIcon} alt="Star" loading="lazy" />
                </span>
                <span className="rating-number">{formatRating(movie.averagerating)}</span> 
                <span className="rating-type">(predicted)</span> 
            </div>
            <p className="movie-cast">{renderActors(movie.actors)}</p>
            <p className="movie-content">{truncateContent(movie.content)}</p> 
        </div>
        </div>
    );
};

export default MovieCard;