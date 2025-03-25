import { createSlice } from '@reduxjs/toolkit';

// Estado inicial, no hay usuario autenticado ni token
const initialState = {
  token: localStorage.getItem('token') || null, // Traemos el token si existe en localStorage
  isAuthenticated: !!localStorage.getItem('token'),
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token); // Guardamos el token en localStorage
      },
      logout: (state) => {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token'); // Borramos el token de localStorage
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  
  export default authSlice.reducer;