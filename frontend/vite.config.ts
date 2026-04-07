import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, false);
  return {
    plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), tailwindcss(), reactRouter(), tsconfigPaths()],
    server: {
      proxy: {
        "/api": {
          target: "https://hrkmtsmt.me/api",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      "import.meta.env.MODE": JSON.stringify(mode),
      "import.meta.env.VITE_APP_BASE_URL": JSON.stringify(
        mode === "production" ? env.VITE_APP_BASE_URL : env.VITE_LOCAL_APP_BASE_URL
      ),
      "import.meta.env.VITE_BASIC_AUTH_PASSWORD": JSON.stringify(env.VITE_BASIC_AUTH_PASSWORD),
      "import.meta.env.VITE_BASIC_AUTH_USERNAME": JSON.stringify(env.VITE_BASIC_AUTH_USERNAME),
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
