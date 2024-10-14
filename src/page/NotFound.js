import React from 'react';
import { Link } from 'react-router-dom'; // Tambahkan Link dari react-router-dom
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <i className="fas fa-exclamation-triangle not-found-icon"></i> {/* Ikon peringatan */}
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      {/* Tombol kembali ke halaman utama */}
      <Link to="/" className="back-to-home-button">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFound;
