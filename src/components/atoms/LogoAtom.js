//Logobar
import React from 'react';
import './LogoAtom.css';

const LogoAtom = ({ src, alt }) => {
  return <img src={src} alt={alt} className="logo-atom" />;
};

export default LogoAtom;
