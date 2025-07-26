import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// import Checker from "vite-plugin-checker";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Create a chunk for all dependencies inside `node_modules`
          vendor: ["react", "react-dom", "axios"],
        },
      },
    },
  },
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "bundle-report.html",
    }),
    react({
      babel: {
        plugins: ["@emotion"],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
    },
  },
});
