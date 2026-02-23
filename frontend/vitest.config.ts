import * as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      "@components": path.resolve(__dirname, "./app/components"),
      "@modules": path.resolve(__dirname, "./app/modules"),
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
