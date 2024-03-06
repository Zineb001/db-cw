import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const SearchIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#888" d="M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.49 4.49 0 019.5 14z"/>
  </svg>
);

const StyledSearchBar = styled.div`
  width: 240px;
  height: 40px;
  margin: 0 auto;
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;

  &:hover {
    /* Styles for hover state */
    border-color: #ccc;
  }
`;

const SearchIcon = styled(SearchIconSVG)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  pointer-events: none; 
`;

function HomePage() {
  const navigate = useNavigate();
  const handleSearchBarClick = () => {
    navigate('/search-movie');
  };

  return (
  <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/future-releases">Future Releases</Link></li>
        <li><Link to="/discover-genres">Discover Genres</Link></li>
      </ul>
    </nav>
    <StyledSearchBar onClick={handleSearchBarClick}>
      <SearchIcon viewBox="0 0 24 24">
        <path fill="#000000" d="M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.49 4.49 0 019.5 14z" />
      </SearchIcon>
    </StyledSearchBar>
  </>
  );
} 
export default HomePage;