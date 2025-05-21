import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/02.pages"),
      "@widgets": path.resolve(__dirname, "src/03.processes"),
      "@features": path.resolve(__dirname, "src/04.features"),
      "@entities": path.resolve(__dirname, "src/05.entities"),
      "@shared": path.resolve(__dirname, "src/06.shared"),
    },
  },
});
