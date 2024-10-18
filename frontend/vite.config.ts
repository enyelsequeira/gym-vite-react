import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
// vite.config.ts
import { defineConfig } from 'vite';

// https://vitejs.dev/config/

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '');

  return {
    // define: {
    //   'process.env.DATABASE_URL': JSON.stringify(env.DATABASE_URL),
    //   'process.env.DATABASE_AUTH_TOKEN': JSON.stringify(env.DATABASE_AUTH_TOKEN),
    // },
    plugins: [TanStackRouterVite(), viteReact()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
