import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'frontend',        // folder utama project
  build: {
    outDir: '../dist',     // hasil build keluar di root/dist
    emptyOutDir: true
  }
})
