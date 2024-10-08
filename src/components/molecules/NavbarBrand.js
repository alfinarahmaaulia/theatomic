import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarBrand = () => {
  return (
    <Navbar.Brand href="/" className="navbar-brand">
      <span className="navbar-logo">Logo</span>
    </Navbar.Brand>
  );
};

export default NavbarBrand;
