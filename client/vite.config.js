import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://mumbailocal-qr.vercel.app',
      outDir: 'dist',
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/post', changefreq: 'monthly', priority: 0.8 },
        { url: '/admin', changefreq: 'monthly', priority: 0.6 },
      ],
    })
  ],
  base: "/"
})
