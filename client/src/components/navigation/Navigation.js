import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { createNewStatAndRedirect, createNewCollectionAndRedirect } from '../../utils/history';

class Navigation extends React.Component {
  render() {
    return (
      <StyledNavbar bg="dark" variant="dark" expand="xl">
        <div className="container">
          <Navbar.Brand as={Link} to="/">trackbase</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-toggle" />
          <Navbar.Collapse id="navbar-toggle">
            <StyledNav className="mr-auto">
              <StyledDivider />
              <StyledNavLink onClick={createNewStatAndRedirect.bind(this)}>Create Stat</StyledNavLink>
              <StyledDivider />
              <StyledNavLink onClick={createNewCollectionAndRedirect.bind(this)}>Create Collection</StyledNavLink>
              <StyledDivider />
              <Nav.Link as={Link} to="/showroom">Showroom</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/api">API</Nav.Link>
            </StyledNav>
          </Navbar.Collapse>
        </div>
      </StyledNavbar>
    );
  }
}

const StyledNavbar = styled(Navbar)`
  text-transform: none !important;

  a.nav-link {
    text-transform: uppercase !important;
  }
`;

const StyledNav = styled(Nav)`
  @media(min-width: 1200px) {
    height: 2.2rem;

    a {
      padding-top: 0.4rem !important;
    }
  }
`;

const StyledDivider = styled.div`
  @media(min-width: 1200px) {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    margin: 0 3rem;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  cursor: pointer;

  @media(min-width: 1200px) {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 0rem;
    padding: 0 1rem !important;
  }
`;

export default Navigation;