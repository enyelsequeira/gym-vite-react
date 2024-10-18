import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/

export default defineConfig(() => {
  return {
    plugins: [viteReact(), TanStackRouterVite()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@server': path.resolve(__dirname, '../server/src'),
      },
    },
  };
});
