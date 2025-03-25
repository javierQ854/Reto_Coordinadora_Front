import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Transportista from './Transportista';

let root = null;
let container = null;

export const bootstrap = () => Promise.resolve();

export const mount = () => {
  // Creamos un contenedor único para este microfrontend
  container = document.createElement('div');
  container.id = 'transportista-container';
  document.body.appendChild(container);

  // Creamos la raíz sobre este nuevo contenedor
  root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Transportista />
    </BrowserRouter>
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
