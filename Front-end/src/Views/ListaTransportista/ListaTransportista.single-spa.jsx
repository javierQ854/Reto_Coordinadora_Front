import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ListaTransportista from './ListaTransportista';
import store from '../../Redux/store'; // Ajusta la ruta según tu estructura

let root = null;
let container = null;

export const bootstrap = () => Promise.resolve();

export const mount = () => {
  // Crear un contenedor único para el microfrontend de Login
  container = document.createElement('div');
  container.id = 'listaTransportista-container';
  document.body.appendChild(container);

  // Crear la raíz en el nuevo contenedor
  root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ListaTransportista />
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
