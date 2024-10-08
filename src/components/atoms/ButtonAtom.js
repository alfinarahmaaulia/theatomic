import React from 'react';
import './ButtonAtom.css';

const ButtonAtom = ({ label, type = 'default', onClick }) => {
  // Kelas CSS akan berubah berdasarkan jenis tombol
  const buttonClass = type === 'contact' ? 'contact-button' : 'submit-button';
  console.log (label)
  return (
    <button className={buttonClass} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default ButtonAtom;
