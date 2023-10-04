import fs from 'fs/promises';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import timeReporter from 'vite-plugin-time-reporter';
// import scss from 'rollup-plugin-scss';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig((configEnv, mode) => {
  const env = loadEnv(mode, process.cwd());
  // expose .env as process.env instead of import.meta since jest does not import meta yet
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
    plugins: [
      react(),
      // timeReporter(),
      // visualizer({
      //   filename: './build/stats.html',
      // }),
    ],
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
      outDir: 'build',
      sourcemap: false,
      emptyOutDir: false,
      rollupOptions: {
        plugins: [
          // scss({
          //   include: [
          //     'src/**/*.css',
          //     'src/**/*.scss',
          //     'src/**/*.sass',
          //   ],
          //   output: 'build/css/style.css',
          // }),
        ],
      },
    },
    preview: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        src: path.resolve(__dirname, './src'),
        utils: path.resolve(__dirname, './src/utils/'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/utils/test-utils.js',
    },
  })
});