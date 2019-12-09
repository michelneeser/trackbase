import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import createNewStatAndRedirect from '../utils/history';

import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">uStats</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <StyledNavLink onClick={createNewStatAndRedirect.bind(this)}>Create</StyledNavLink>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/showroom">Showroom</Link>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/api">API</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }

}

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
`;

export default Navigation;