import { defineConfig, UserConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
const config: UserConfigExport = {
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
    },
    mainFields: ['module', 'main', 'browser'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
};

export default defineConfig(config);
