import React from 'react';  // Importa React para evitar el error
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerApplication, start } from 'single-spa'; // Importamos Single SPA
import './index.css';
import App from './App.jsx';

// Registro de la aplicación principal de Single SPA
registerApplication({
  name: '@mi-app/login', // Nombre de la aplicación de login
  app: () => import('./Components/Login/Login.single-spa.js'), // Cargar la aplicación login
  activeWhen: ['/login'], // Ruta en la que debe activarse
});

registerApplication({
  name: '@mi-app/register', // Nombre de la aplicación de register
  app: () => import('./Components/Register/Register.single-spa.js'), // Cargar la aplicación register
  activeWhen: ['/register'], // Ruta en la que debe activarse
});

// Iniciar Single SPA
start();

// Ahora montamos el root de React
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
