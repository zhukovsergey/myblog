import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/sitemap.xml": "http://localhost:3000",
      "/robots.txt": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
      // proxy requests to Express server
    },
  },
});
