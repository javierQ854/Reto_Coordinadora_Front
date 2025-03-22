import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.jsx', // El archivo que maneja la lógica de Single SPA
      name: 'App',
      fileName: (format) => `app.${format}.js`,
    },
    rollupOptions: {
      external: ['single-spa'],  // No empaquetamos single-spa dentro del bundle
      output: {
        globals: {
          'single-spa': 'singleSpa',  // Esto hace que single-spa esté disponible globalmente
        },
      },
    },
  },
});
