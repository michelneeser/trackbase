import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import createNewStatAndRedirect from '../../utils/history';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <div className="container">
          <Navbar.Brand href="/">uStats</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-toggle" />
          <Navbar.Collapse id="navbar-toggle">
            <Nav className="mr-auto">
              <StyledNavLink onClick={createNewStatAndRedirect.bind(this)}>Create</StyledNavLink>
              <Nav.Link as={Link} to="/showroom">Showroom</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/api">API</Nav.Link>
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