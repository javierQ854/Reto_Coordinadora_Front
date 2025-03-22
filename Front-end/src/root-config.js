import { registerApplication } from 'single-spa';
import { start } from 'single-spa';

registerApplication({
  name: '@mi-app/login',
  app: () => import('./Components/Login/Login.jsx'),
  activeWhen: ['/login'],
});

registerApplication({
  name: '@mi-app/register',
  app: () => import('./Components/Register/Register.jsx'),
  activeWhen: ['/register'],
});

start();  // Iniciar Single SPA
