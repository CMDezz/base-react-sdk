import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDemoBuild = process.env.BUILD_DEMO === 'true';

export default defineConfig({
  root: resolve(__dirname, 'demo'), //for demo
  envDir: resolve(__dirname),
  define: {
    'process.env': {},
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
    preact(),
    !isDemoBuild && cssInjectedByJsPlugin({ apply: 'build' }),
    tailwindcss(),
    eslint(),
  ].filter(Boolean),
  build: isDemoBuild
    ? {
        outDir: resolve(__dirname, 'dist/demo'),
        emptyOutDir: true,
      }
    : {
        outDir: resolve(__dirname, 'dist/sdk'),
        emptyOutDir: true,

        lib: {
          // The entry point of SDK
          entry: resolve(__dirname, 'src/index.tsx'),
          name: 'SavvyEkycSDK',
          fileName: (format) => `savvy-ekyc-sdk.${format}.js`,
          formats: ['umd'],
        },
        rollupOptions: {
          // external: ['react', 'react-dom'],
          output: {
            // globals: {
            //   react: 'React',
            //   'react-dom': 'ReactDOM',
            // },
            manualChunks: undefined,
          },
        },
      },
  resolve: {
    alias: {
      '@sdk': resolve(__dirname, 'src'),
      '@demo': resolve(__dirname, 'demo'),
      '@shared': resolve(__dirname, 'shared'),
    },
  },
});
