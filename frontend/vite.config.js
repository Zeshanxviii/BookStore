import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests to the backend server
      '/api': {
        target: 'https://book-store-i9cu1vkp8-jishans-projects-80682501.vercel.app/', // Replace with your backend server URL
        changeOrigin: true,
        secure: false // Optional: If your backend doesn't have the `/api` prefix
      },
    },
  },
});
