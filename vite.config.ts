import { defineConfig } from "npm:vite";
import vue from "npm:@vitejs/plugin-vue";

export default defineConfig({
  base: "weather-portal",
  plugins: [vue()],
  server: {
    port: 8000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  root: "src",
  publicDir: "../public",
});
