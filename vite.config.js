import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1600, // Sınırı 1600 kB'a yükselt
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Üçüncü parti kütüphaneleri ayrı bir vendor chunk'ına böl
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
