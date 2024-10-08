import React from 'react';
import HeaderContent from '../molecules/HeaderContent'; // Pastikan jalur ini benar
import './HeaderSection.css'; // Pastikan jalur ke file CSS benar

const HeaderSection = () => {
  return (
    <header className="Header-section">
      <div className="Header-text">
        <HeaderContent /> {/* Ini akan berisi teks dan tombol */}
      </div>
      <div className="Header-image">
        <img src="/HeaderImage.png" alt="Header Visual" />
      </div>
    </header>
  );
};

export default HeaderSection;
