export const __esModule = true; // ⚠️ Hace que SystemJS lo reconozca como un módulo

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Redux/store.js'; 
import DashBoard from './Dashboard.jsx';
let root = null;
let container = null;

export const bootstrap = () => Promise.resolve();

export const mount = () => {

  container = document.createElement('div');
  container.id = 'Dasboard-container';
  document.body.appendChild(container);

  root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <DashBoard />
      </BrowserRouter>
    </Provider>
  );
  return Promise.resolve();
};

export const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
    container = null;
  }
  return Promise.resolve();
};
