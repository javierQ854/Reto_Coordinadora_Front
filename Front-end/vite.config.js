import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Configuramos múltiples entradas: main, login y register
    rollupOptions: {
      input: {
        main: './src/main.jsx',
        login: './src/Components/Login/Login.single-spa.js',
        register: './src/Components/Register/Register.single-spa.js',
      },
      output: {
        // Opcional: definir nombres específicos para cada bundle
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
