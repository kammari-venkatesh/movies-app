// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,         // Enables polling
      interval: 100,            // Check for changes every 100ms (optional)
    },
  },
})
