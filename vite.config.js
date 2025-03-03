import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'automatic', // This allows JSX in .js files
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@syncfusion")) return "syncfusion";
            if (id.includes("react-icons")) return "icons";
            return "vendor";
          }
        },
      },
    },
  },
})
