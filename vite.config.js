import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    cors: true, 
    hmr: {
        host: 'localhost',
    },
  },
  build: {
    outDir: 'public', 
    emptyOutDir: false, 
    assetsDir: 'assets', 
  },
  publicDir: false, 
});