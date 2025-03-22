import axios from 'axios';

// Configura Axios con la URL base de tu API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de tu API
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtenemos el token de localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Incluimos el token en los encabezados
  }
  return config;
});

export default api;
