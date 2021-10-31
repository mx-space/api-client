import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
const { resolve } = require('path')

export default defineConfig({
  base: '',
  server: { port: 2323 },
  plugins: [
    tsconfigPaths({
      projects: [
        resolve(__dirname, './example/tsconfig.json'),
        resolve(__dirname, './tsconfig.json'),
      ],
    }),
  ],
  root: resolve(__dirname, './example'),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './example/index.html'),
      },
    },
  },
})
