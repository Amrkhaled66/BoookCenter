import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import Checker from "vite-plugin-checker";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Create a chunk for all dependencies inside `node_modules`
          vendor: ["react", "react-dom", "axios","react-router-dom","sweetalert2","framer-motion"],
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["@emotion"],
      },
    }),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: "bundle-report.html",
    // }),
  ],
  server: {
    host: '0.0.0.0', // or '127.0.0.1' for IPv4 only
    port: 5173
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
    },
  },
});
