import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink dari react-router-dom
import './NavLinksGroup.css'; // Pastikan ini adalah file CSS yang tepat

const NavLinksGroup = () => {
  return (
    <Nav className="ms-auto navbar-nav-custom">
      <NavLink 
        to="/" 
        className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
      >
        Home
      </NavLink>
      <NavLink 
        to="/sektoral" 
        className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
      >
        Sektoral
      </NavLink>
      <NavLink 
        to="/DigitalBookList" 
        className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
      >
        Buku Digital
      </NavLink>
      <NavLink 
        to="/dataset" 
        className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
      >
        Dataset
      </NavLink>
      <NavLink 
        to="/Login" 
        className={({ isActive }) => `btn login-button-custom ${isActive ? 'active' : ''}`}
      >
        Login
      </NavLink>
    </Nav>
  );
};

export default NavLinksGroup;
