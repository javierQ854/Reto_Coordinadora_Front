import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerApplication, start } from 'single-spa';
import './index.css';
import App from './App.jsx';
import store from './Redux/store';
import { Provider } from 'react-redux';
// Cargar SystemJS y el plugin de Babel
import 'https://cdn.jsdelivr.net/npm/systemjs@6.9.0/dist/system.js';

// Configuración de SystemJS para usar Babel como cargador
SystemJS.config({
  map: {
    '@mi-app/envio': '/Envio.single-spa.js',  // Ruta completa al microfrontend
  },
  packages: {
    '@mi-app/envio': {
      main: 'Envio.single-spa.js',  // Archivo principal que se cargará
      defaultExtension: 'js',  // Asegúrate de que la extensión es .js
    },
  },
});

// Registrar las aplicaciones de microfrontend con single-spa
registerApplication({
  name: '@mi-app/login',
  app: () => import('./Views/Login/Login.single-spa.jsx'),
  activeWhen: ['/Login'],
});

registerApplication({
  name: '@mi-app/register',
  app: () => import('./Views/Register/Register.single-spa.jsx'),
  activeWhen: ['/register'],
});

registerApplication({
  name: '@mi-app/inicio',
  app: () => import('./Views/Inicio/Inicio.single-spa.jsx'),
  activeWhen: ['/Inicio'],
});

registerApplication({
  name: '@mi-app/envio',
  app: () => import('./Views/Envio/Envio.single-spa.jsx'),
  activeWhen: ['/Envio'],
});


// Iniciar Single SPA
start();

// Montar la aplicación principal (si la necesitas para otras rutas o un contenedor global)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
