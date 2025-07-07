import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import Checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion"],
      },
    }),
    svgr(),
  ],
  server: {
    port: 3001,
   },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
    },
  },
});
