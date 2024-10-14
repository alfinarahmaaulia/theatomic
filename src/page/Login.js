import React, { useState } from 'react';
import { login } from '../authService';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLoginSuccess }) => {
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const result = await login(nip, password);
      if (result.token) {
        onLoginSuccess(); // Panggil fungsi untuk mengubah status otentikasi
        navigate('/halaman-yang-belum-ada'); // Arahkan pengguna ke halaman Not Found setelah login berhasil
      }
    } catch (error) {
      setError('Login gagal. Silakan periksa kembali kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Sabar...</p>
          </div>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p>{error}</p>}

            <div>
              <label htmlFor="nip"></label>
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Masukkan NIP"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                disabled={loading}
              />
            </div>

            <button onClick={handleLogin} disabled={loading}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
