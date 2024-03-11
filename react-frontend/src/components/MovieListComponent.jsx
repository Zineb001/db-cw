import * as React from "react";
const MovieListComponent = React.memo(({ movies }) => {
    console.log('Received movies:', movies);

    return (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre.join(', ')}</p>
              <p>Directors: {movie.directors.join(', ')}</p>
              <p>Actors: {movie.actors.join(', ')}</p>
              <p>Description: {movie.content}</p>
              <p>Release Year: {movie.releasedate}</p>
              <p>Rating: {movie.averagerating}</p>
              <p>Tags: {movie.tags.join(', ')}</p>
              {/* <img src={movie.poster}/>*/}
            </div>
          ))}
        </div>
      );
});

export default MovieListComponent;
  
