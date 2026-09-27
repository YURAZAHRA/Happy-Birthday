import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Happy-Birthday/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-entry-fallback',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html
            .replace(/<link rel="stylesheet"[^>]*assets\/index-[^>]*>/gi, '')
            .replace(/<script type="module"[^>]*src="[^"]*assets\/index-[^"]*\.js"[^>]*><\/script>/gi, '<script type="module" src="/src/main.jsx"></script>')
        },
      },
    },
  ],
  server: {
    host: true,   // expose on local network (same as --host flag)
    port: 5173,
  },
})
