/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/02.pages"),
      "@widgets": path.resolve(__dirname, "src/03.widgets"),
      "@features": path.resolve(__dirname, "src/04.features"),
      "@entities": path.resolve(__dirname, "src/05.entities"),
      "@shared": path.resolve(__dirname, "src/06.shared"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-utils/vitest.setup.tsx"
  },
});
