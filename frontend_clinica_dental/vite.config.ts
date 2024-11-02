import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'jquery': 'jquery/src/jquery',
      '@popperjs/core': '@popperjs/core/dist/umd/popper.min.js'
    }
  },
  build: {
    sourcemap: false, // Desactiva los mapas de fuentes
  },
})
