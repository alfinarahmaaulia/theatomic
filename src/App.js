import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './page/Home'; 
import DigitalBookList from './page/DigitalBookList'; 
import { getToken, logout } from './authService';
import NavbarComponent from './components/organism/NavbarComponent';
import Login from './page/Login';
import Sektoral from './page/Sektoral';
import Dataset from './page/Dataset';
import NotFound from './page/NotFound'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Ambil lokasi saat ini

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      {/* Navbar hanya dirender jika bukan halaman Not Found */}
      {location.pathname !== '/halaman-yang-belum-ada' && location.pathname !== '/login' && <NavbarComponent />}
      <Routes>
        <Route path="/DigitalBookList" element={<DigitalBookList />} />
        <Route path="/sektoral" element={<Sektoral />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/" element={ <Home /> } />
        <Route path="/halaman-yang-belum-ada" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Rute 404 */}
      </Routes>
    </div>
  );
};

// Menggunakan Router di luar App
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
