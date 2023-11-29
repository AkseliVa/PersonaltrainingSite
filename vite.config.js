import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PersonaltrainingSite/', // Add this row and use your own repository name
  plugins: [react()],
  test: {
  globals: true,
  environment: 'jsdom',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./node_modules.mui"),
    }
  }
  })