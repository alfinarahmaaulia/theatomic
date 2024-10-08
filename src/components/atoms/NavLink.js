//navbar
import React from 'react';
import { Nav } from 'react-bootstrap';

const NavLink = ({ href, children }) => {
  return (
    <Nav.Link href={href} className="nav-link">
      {children}
    </Nav.Link>
  );
};

export default NavLink;
