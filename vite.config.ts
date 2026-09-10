import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — относительные пути, чтобы одинаково работало
// и на carpediem-events.github.io/<repo>/, и на своём домене.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: 0 },
})
