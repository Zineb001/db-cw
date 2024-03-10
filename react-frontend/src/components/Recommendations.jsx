import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecommendationListComponent from './RecommendationListComponent'
import NavBar from './SearchMovie';
import LayoutContainer from './SearchMovie';
import ContentArea from './SearchMovie';

// Function to fetch recommendations from the backend API
const fetchRecommendations = async (movieId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/movieRecommendations?movieID=${movieId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendationsData = async () => {
      try {
        const data = await fetchRecommendations(movieId);
        setRecommendations(data);
        console.log("recommendations",recommendations);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setIsLoading(false);
      }
    };

    fetchRecommendationsData();

    // Clean-up function (optional)
    return () => {
      // Cleanup code if needed
    };
  }, [movieId]);

  return (
    <div>
        <>
        <NavBar>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search-movie">Search Movie</Link></li>
          <li><Link to="/future-releases">Future Releases</Link></li>
          <li><Link to="/discover-genres">Discover Genres</Link></li>
        </ul>
      </NavBar>
      <LayoutContainer>

        <ContentArea>
        <h2>Recommendations for Movie {movieId}</h2>
          {!isLoading && <RecommendationListComponent recommendations={recommendations} />}
        </ContentArea>
      </LayoutContainer>
        </>
    </div>
  );
};

export default Recommendations;
