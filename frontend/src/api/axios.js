import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/', // Ensure this matches your backend address
});

// Automatically attach token from localStorage to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
