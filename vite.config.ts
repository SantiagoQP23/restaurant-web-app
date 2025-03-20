import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/**
 * Vite configuration
 * @author Steven Rosales
 * @version 1.0 17/03/2025 Hide console and debugger in production
 */
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx'
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  },
  ...(process.env.NODE_ENV === 'production' && {
    esbuild: {
      drop: ['console', 'debugger']
    }
  })
});
