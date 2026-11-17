import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// SPA fallback is enabled by default in Vite dev and preview servers so all 25 routes load directly on refresh
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
