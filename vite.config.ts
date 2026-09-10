import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — относительные пути, чтобы одинаково работало
// и на carpediem-events.github.io/<repo>/, и на своём домене.
export default defineConfig({
  base: './',
  plugins: [react()],
  // --host: dev-сервер виден в локальной сети — открыть с телефона
  server: { host: true },
  build: { assetsInlineLimit: 0 },
})
