import { defineConfig } from 'vite';

/**
 * Vite 配置
 *
 * 说明：
 * - base 用相对路径 './'，这样 dist 可以挂在任意子目录下，
 *   也能直接用静态服务器托管（原构建用绝对 '/'，必须部署在站点根目录）
 * - 端口固定 3000，与原项目 README 一致
 */
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // 关键：开启 sourcemap，以后再丢源码也能还原
    target: 'es2020',
    rollupOptions: {
      output: {
        // 保留可读的文件名，便于排查
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
