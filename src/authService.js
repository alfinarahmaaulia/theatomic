import axios from 'axios';

const API_URL = 'http://116.206.212.234:4000/auth/login'; // Endpoint autentikasi

// Fungsi untuk login
export const login = async (nip, password) => {
  try {
    const response = await axios.post(API_URL, { nip, password });
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error', error.response?.data || error.message); // Tampilkan detail error
    throw error;
  }
};

// Fungsi untuk mendapatkan token
export const getToken = () => {
  return localStorage.getItem('userToken');
};

// Fungsi untuk logout
export const logout = () => {
  localStorage.removeItem('userToken');
};
