import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
    ],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8787/api",
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
  };
});
