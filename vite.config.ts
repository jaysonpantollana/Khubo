// @context: Vite build configuration — container architecture + CI/CD config
// @purpose: Build tool config for React 19 SPA + TypeScript 5.8 + Tailwind CSS v4
// @purpose: Containerized via Vite dev server (port 3000); no Docker/k8s manifests yet
// @config: @ alias → project root (NOT src/ — potential mismatch with tsconfig @/* → src/* — ADR-005)
// @config: Dev server: port 3000, host 0.0.0.0 (accessible on LAN), HMR toggle via DISABLE_HMR env var
// @config: Manual chunk splitting strategy: maptiler (~500KB), recharts+d3, lucide, motion, vendor (rest)
// @config: chunkSizeWarningLimit: 2000KB — adjusted up from default 500KB for chunk splitting
// @cicd: Build step: npm run build → vite build → outputs to dist/
// @cicd: Preview step: npm run preview → vite preview → serves dist/ locally
// @cicd: No CI/CD pipeline configured — no GitHub Actions, no Docker, no deployment script
// @cicd: Deployment target: static hosting (Netlify/Vercel/GitHub Pages compatible)
// @capacity: Total bundle ~650KB gzipped (estimated), split across 5+ chunks
// @capacity: chunkSizeWarningLimit: 2000KB allows large chunks without warnings during dev
// @capacity: Largest chunk: maptiler (~500KB) — lazy-loaded on Maps page
// @security: VITE_* env vars exposed client-side; DISABLE_HMR controls file watching
// @dependencies: @vitejs/plugin-react, @tailwindcss/vite
// @owner: Core team
// @adr: ADR-005 — Vite @ alias → project root: intentional but mismatches tsconfig @/* → src/*
// @known-issues: @ alias points to project root (.) but tsconfig maps @/* → ./src/* — potential import mismatch

/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
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
      port: 3002,
      strictPort: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
