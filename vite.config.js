import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { geminiProxyPlugin } from './vite-plugin-gemini-proxy.js';

export default defineConfig({
  plugins: [react(), geminiProxyPlugin()],
  server: {
    port: 5173,
  },
});
