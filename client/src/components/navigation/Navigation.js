import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { createNewStatAndRedirect, createNewCollectionAndRedirect } from '../../utils/history';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="xl">
        <div className="container">
          <Navbar.Brand as={Link} to="/">uStats</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-toggle" />
          <Navbar.Collapse id="navbar-toggle">
            <Nav className="mr-auto">
              <StyledNavLink onClick={createNewStatAndRedirect.bind(this)}>New Stat</StyledNavLink>
              <StyledNavLink onClick={createNewCollectionAndRedirect.bind(this)}>New Collection</StyledNavLink>
              <Nav.Link as={Link} to="/showroom">Showroom</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/api">API</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

const StyledNavLink = styled(Nav.Link)`
  cursor: pointer;
`;

export default Navigation;