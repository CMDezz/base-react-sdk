import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      // The entry point of your SDK
      entry: resolve(__dirname, "src/index.tsx"),
      name: "MySDK",
      // This produces a file named 'my-sdk.umd.cjs'
      fileName: (format) => `my-sdk.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensures everything stays in one file
      },
    },
    //  minify: "terser",
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    //   mangle: true,
    // },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
