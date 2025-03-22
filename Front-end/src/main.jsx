import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerApplication, start } from 'single-spa';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import store from './Redux/store';

registerApplication({
  name: '@mi-app/login',
  app: () => import('./Components/Login/Login.single-spa.jsx'),
  activeWhen: ['/Login'],
});

registerApplication({
  name: '@mi-app/register',
  app: () => import('./Components/Register/Register.single-spa.jsx'),
  activeWhen: ['/register'],
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
