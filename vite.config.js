import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/PersonaltrainingSite/', // Adjust this to your repository name
  plugins: [react()],
  build: {
    assetsDir: 'dist/assets',
  },
  resolve: {
    alias: {
      "@mui": path.resolve(__dirname, "./node_modules/@mui"),
    },
  },
});
