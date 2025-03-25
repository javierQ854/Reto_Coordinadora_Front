import api from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data.token; // Retorna el token si la autenticación es exitosa
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

