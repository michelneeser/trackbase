import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">uStats</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/new">Create</NavLink>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }
}

export default NavBar;