import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

export default defineConfig({
  plugins: [remixCloudflareDevProxy(), remix({ ssr: false }), tsconfigPaths()],
  ssr: {
    noExternal: ['problematic-dependency'],
  },
});
