import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import { resolve } from 'path';

const baseUrl = resolve(__dirname, '..', '..', 'dist', 'wms-dashboard');

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      open: true,
      port: 5795,
      proxy: {
        // 请求代理地址(仅开发环境有效)
        '/api': {
          // target: "http://127.0.0.1:4523/m1/1806414-0-default",
          // target: "http://192.168.2.8:7229/api",
          target: 'http://120.79.8.215:7228/api',
          // target: 'http://192.168.2.124:7228/api',
          // target: "http://192.168.2.50::7229/",
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/pad': {
          // target: 'http://192.168.1.174:7228/',
          // target: 'http://120.79.8.215:7228/',
          target: 'http://192.168.2.124:7228',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
        },
        '/wms_dashboard': {
          target: 'http://localhost:5795/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/wms_dashboard/, ''),
        },
      },
    },
    base: config.mode === 'development' ? '/' : `/wms_dashboard`,
    build: {
      outDir: baseUrl,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
});
