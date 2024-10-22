import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarBrand = () => {
  return (
    <Navbar.Brand href="/" className="navbar-brand">
      <img
        src="/logo.png" 
        alt="Logo"
        className="navbar-logo"
        style={{ width: '100px', height: '100px' }} // Adjust the size of the logo as needed
      />
    </Navbar.Brand>
  );
};

export default NavbarBrand;
