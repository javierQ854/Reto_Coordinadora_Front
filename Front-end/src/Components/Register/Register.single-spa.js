import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register'; // Tu componente de login

// Función bootstrap
export function bootstrap(props) {
  return Promise.resolve();
}

// Función mount
export function mount(props) {
  return ReactDOM.render(<Register />, document.getElementById('root'));
}

// Función unmount
export function unmount(props) {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
