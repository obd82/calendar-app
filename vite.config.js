/// <reference types="vitest" />
/// <reference types="vite/client" />

import fs from 'fs/promises';
import * as path from 'path';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig((configEnv, mode) => {
  const env = loadEnv(mode, process.cwd());
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {}
  );
  return ({
    define: {
      ...envWithProcessPrefix,
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad(
                { filter: /src\/.*\.js$/ },
                async (args) => ({
                  loader: 'jsx',
                  contents: await fs.readFile(
                    args.path,
                    'utf8'
                  ),
                })
              );
            },
          },
        ],
      },
    },
    build: {
      sourcemap: true,
      emptyOutDir: false,
      lib: {
        entry: resolve('src', 'main.js'),
        formats: ['es', 'cjs'],
        fileName: (format) => `main.${format}.js`,
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        external: [
          'react',
          'react-dom',
          'handlebars',
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, './src/components'),
        modules: path.resolve(__dirname, './src/modules'),
        util: path.resolve(__dirname, './src/utils/'),
      },
    },
    test: {
      globals: true,
      testTimeout: 10000,
      environment: 'jsdom',
      setupFiles: './src/utils/test-utils.js',
      coverage: {
        enabled: true,
      },
    },
  })
});