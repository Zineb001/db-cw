import * as React from "react";
const RecommendationListComponent = React.memo(({ movies }) => {
    console.log('Received movies:', movies);

    return (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Release Year: {movie.releasedate}</p>
              <p>Rating: {movie.averagerating}</p>
              {/* <img src={movie.poster}/>*/}
            </div>
          ))}
        </div>
      );
});

export default RecommendationListComponent;