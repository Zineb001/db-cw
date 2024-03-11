import * as React from "react";
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme/theme';

const { assets } = theme;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.navBar.gap};
  color: ${props => props.theme.navBar.color};
  padding: ${props => props.theme.navBar.padding};
  @media (max-width: ${props => props.theme.navBar.mediaMaxWidth}) {
    flex-wrap: wrap;
  }
`;

const NavItem = styled(Link)`
  border-radius: ${props => props.theme.navBar.borderRadius};
  background-color: ${props => props.theme.navBar.backgroundColor};
  display: flex;
  gap: ${props => props.theme.navBar.gap};
  padding: ${props => props.theme.navBar.itemPadding};
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const NavIcon = styled.img`
  width: ${props => props.theme.navBar.iconSize};
  height: ${props => props.theme.navBar.iconSize};
`;

const NavText = styled.span`
  font-family: ${props => props.theme.fonts.family};
  font-size: ${props => props.theme.navBar.fontSize};
  font-weight: ${props => props.theme.fonts.fontWeight};
  letter-spacing: ${props => props.theme.navBar.letterSpacing};
  line-height: ${props => props.theme.navBar.lineHeight};
  `;

const NavBar = ({ theme }) => {
    return (
        <Nav>
          <NavItem to="/search-movie">
            <NavIcon src={assets.searchIcon} alt="Search" loading="lazy" />
            <NavText>Search Movie</NavText>
          </NavItem>
          <NavItem to="/future-releases">
            <NavIcon src={assets.futureReleasesIcon} alt="Future Releases" loading="lazy" />
            <NavText>Future Releases</NavText>
          </NavItem>
          <NavItem to="/discover-genres">
            <NavIcon src={assets.discoverGenresIcon} alt="Discover Genres" loading="lazy" />
            <NavText>Discover Genres</NavText>
          </NavItem>
          <NavItem to="/">
            <NavIcon src={assets.homeIcon} alt="Home" loading="lazy" />
            <NavText>Home</NavText>
          </NavItem>
        </Nav>
      );
};

export default withTheme(NavBar);

