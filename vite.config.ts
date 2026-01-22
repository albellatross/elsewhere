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
      { find: '@ainimation', replacement: path.resolve(__dirname, './ainimation') },
      // Map figma asset imports (e.g. figma:asset/xxx.png) to local assets folder
      { find: /^figma:asset\//, replacement: path.resolve(__dirname, './src/assets/') + '/' },
      // Use the light build of lottie-web to avoid eval in CSP-restricted environments
      { find: 'lottie-web', replacement: 'lottie-web/build/player/lottie_light' },
    ],
  },
  server: {
    // 使用 0.0.0.0 方便远程 / 端口转发预览，避免绑定 IPv6 ::1
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src *; font-src 'self' data: https:; worker-src 'self' blob:;",
    },
  },
})
