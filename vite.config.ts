import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.tsx",
  })],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  }
})
