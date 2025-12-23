import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDemoBuild = process.env.BUILD_DEMO === "true";

export default defineConfig({
  root: resolve(__dirname, "demo"), //for demo
  envDir: resolve(__dirname),
  define: {
    "process.env": {},
  },
  server: {
    fs: {
      allow: [
        // Allow serving files from one level up to the project root
        resolve(__dirname),
      ],
    },
  },
  plugins: [
    react(),
    !isDemoBuild && cssInjectedByJsPlugin({ apply: "build" }),
    tailwindcss(),
  ].filter(Boolean),
  build: isDemoBuild
    ? {
        outDir: resolve(__dirname, "dist/demo"),
        emptyOutDir: true,
      }
    : {
        outDir: resolve(__dirname, "dist/sdk"),
        emptyOutDir: true,
        lib: {
          // The entry point of SDK
          entry: resolve(__dirname, "src/index.tsx"),
          name: "MySDK",
          fileName: (format) => `savvy-ekyc-sdk.${format}.js`,
          formats: ["umd"],
        },
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
  resolve: {
    alias: {
      "@sdk": resolve(__dirname, "src"),
      "@demo": resolve(__dirname, "demo"),
      "@shared": resolve(__dirname, "shared"),
    },
  },
});
