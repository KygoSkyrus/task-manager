import { defineConfig, mergeConfig } from 'vite'
import { tanstackViteConfig } from '@tanstack/vite-config'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: './src/start.ts',
    srcDir: './src',
  }),
)