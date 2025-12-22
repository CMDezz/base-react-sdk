import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin(), tailwindcss()],
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
        manualChunks: undefined,
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
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
