import dotenvx from "@dotenvx/dotenvx";
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dotenvx.config();

export default defineConfig({
  plugins: [remixCloudflareDevProxy(), remix({ ssr: false }), tsconfigPaths()],
  ssr: {
    noExternal: ["undici"],
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL ?? "https://api.hrkmtsmt.me",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-${Date.now()}.[ext]`,
      },
    },
  },
});
