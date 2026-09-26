import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Happy-Birthday/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,   // expose on local network (same as --host flag)
    port: 5173,
  },
})
