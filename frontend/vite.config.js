import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers for smaller output
    target: 'es2015',
    // Warn when a chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,
    // Generate source maps only for production debugging
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('react')) return 'vendor';
            if (id.includes('axios')) return 'axios';
          }
        },
      },
    },
  },

  // Allow env vars prefixed with VITE_ to be exposed to the client
  envPrefix: 'VITE_',
})
