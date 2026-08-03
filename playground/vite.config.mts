import Uni from '@uni-helper/plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniManifest({
      insertFinalNewline: true,
    }),
    Uni(),
  ],
})
