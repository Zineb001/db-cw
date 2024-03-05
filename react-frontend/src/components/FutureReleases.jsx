import * as React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

function FutureReleases() {
  return (
    <div>
      <h1>Future Releases</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search-movie">Search Movie</Link></li>
          <li><Link to="/future-releases">Future Releases</Link></li>
          <li><Link to="/discover-genres">Discover Genres</Link></li>
        </ul>
      </nav>
      {/* The rest of  this page's content */}
    </div>
  );
}

export default FutureReleases;