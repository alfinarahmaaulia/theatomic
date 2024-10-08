// navbar
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink dari react-router-dom

const NavLinksGroup = () => {
  return (
    <Nav className="ms-auto navbar-nav">
      <NavLink to="/" className="nav-link">Home</NavLink> {/* Mengarah ke Home */}
      <NavLink to="/sektoral" className="nav-link">Sektoral</NavLink> {/* Mengarah ke Sektoral */}
      <NavLink to="/DigitalBookList" className="nav-link">Buku Digital</NavLink> {/* Mengarah ke DigitalBookList */}
      <NavLink to="/Login" className="btn btn-primary login-button">Login</NavLink> {/* Mengarah ke Login */}
    </Nav>
  );
};

export default NavLinksGroup;
