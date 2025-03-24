import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel'; 
export default defineConfig({
  resolve:{
    alias:{
      '@src': '/src',
    }
  },
  plugins: [
    react(),
  ],
  build: {
    target: "esnext", // Evita que Vite transpile import/export
    modulePreload: false,
    rollupOptions: {
      input: {
        main: './index.html',  // Asegura que index.html sea el punto de entrada principal
        login: './src/Views/Login/Login.single-spa.jsx',
        register: './src/Views/Register/Register.single-spa.jsx',
      },
      output: {
        format: "system", // Exporta en formato compatible con SystemJS
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'main') return 'app.js';
          if (chunkInfo.name === 'login') return 'login-app.js';
          if (chunkInfo.name === 'register') return 'register-app.js';
          return `[name].js`;
        },
      },
    },
  },
});
