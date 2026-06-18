// @context: Vite build configuration
// @purpose: Build tool config for React 19 + TypeScript + Tailwind CSS v4
// @config: @ alias → project root (NOT src/ — potential mismatch with tsconfig @/* → src/*)
// @config: Dev server on port 3000, host 0.0.0.0, HMR toggle via DISABLE_HMR env var
// @config: Manual chunk splitting: maptiler, recharts/d3, lucide, motion, vendor (everything else)
// @config: chunkSizeWarningLimit: 2000KB
// @security: VITE_* env vars exposed client-side; DISABLE_HMR controls file watching
// @dependencies: @vitejs/plugin-react, @tailwindcss/vite
// @known-issues: @ alias points to project root (.) but tsconfig maps @/* → ./src/* — potential import mismatch
// @owner: Core team

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@maptiler') || id.includes('maplibre')) {
                return 'maptiler';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'recharts';
              }
              if (id.includes('lucide')) {
                return 'lucide';
              }
              if (id.includes('motion')) {
                return 'motion';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
