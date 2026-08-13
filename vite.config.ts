// import { defineConfig, mergeConfig } from 'vite'
// import { tanstackViteConfig } from '@tanstack/vite-config'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// const config = defineConfig({
//   plugins: [
//     tailwindcss(),
//     react(),
//   ],
//   base: '/', 
// })

// export default mergeConfig(
//   config,
//   tanstackViteConfig({
//     entry: './src/start.ts',
//     srcDir: './src',
//   }),
// )


import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    tailwindcss(),
    react(),
  ],
  base: '/',
})