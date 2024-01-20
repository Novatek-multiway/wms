import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';

const baseUrl = path.resolve(__dirname, '..', '..', 'dist', 'wms-pad');

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      vitePluginCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      open: true,
      port: 5793,
      proxy: {
        // 请求代理地址(仅开发环境有效)
        '/api': {
          target: ' http://192.168.1.240:23065/api',
          // target: 'http://120.79.8.215:7239/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/pad': {
          target: ' http://192.168.1.240:23065/',
          // target: 'http://120.79.8.215:7239/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
        },
      },
    },
    base: config.mode === 'development' ? '/' : `./`,
    build: {
      outDir: baseUrl,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks: {
            lodash: ['lodash'], // 将 lodash 模块打包到单独的块中
            react: ['react', 'react-dom'], // 将 react 和 react-dom 打包到单独的块中
            antd: ['antd'], // 将 moment 模块打包到单独的块中
            multiway: ['multiway'], // 将 moment 模块打包到单独的块中
          },
        },
      },
    },
  };
});
