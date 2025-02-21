// /Users/dbass/Documents/GitHub/adf_rescue/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/styles', 'recharts'],
    force: true,
    esbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/styles'],
          'recharts': ['recharts'],
        },
      },
    },
  },
})