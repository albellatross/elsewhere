import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 让构建产物可用 file:// 直接打开预览
  base: './',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      // Alias @ to the src directory
      { find: '@', replacement: path.resolve(__dirname, './src') },
      // Map figma asset imports (e.g. figma:asset/xxx.png) to local assets folder
      { find: /^figma:asset\//, replacement: path.resolve(__dirname, './src/assets/') + '/' },
    ],
  },
  server: {
    // 避免在部分环境中绑定 IPv6 ::1 导致 EPERM
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
