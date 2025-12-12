import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'http://localhost:3000',
  image: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    remotePattern: {
      protocol: 'https'
    }
  },
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/react']
    }
  }
});
