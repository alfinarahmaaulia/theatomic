// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; 
import DigitalBookList from './DigitalBookList'; 
import { getToken, logout } from './authService';
import Login from './Login';
import Sektoral from './Sektoral';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/DigitalBookList" element={<DigitalBookList />} />
          <Route path="/sektoral" element={<Sektoral />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/* Panggil Login */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
