import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import NavbarBrand from '../molecules/NavbarBrand'; // Mengimpor NavbarBrand dari folder molekul
import NavLinksGroup from '../molecules/NavLinksGroup';
import './NavbarBrand.css'; // Import the navbar styles

const NavbarComponent = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <NavbarBrand /> {/* NavbarBrand sebagai molekul */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLinksGroup />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
