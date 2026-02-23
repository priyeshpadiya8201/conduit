import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    minify: 'esbuild',
    // Prevent minifier from mangling function/class names
    // which breaks some component logic in react-router-dom v6
    target: 'esnext',
  },
  esbuild: {
    keepNames: true,
  }
})
