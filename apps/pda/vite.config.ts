import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import { resolve } from 'path';
import postcssPxtorem from 'postcss-pxtorem';
import legacy from '@vitejs/plugin-legacy';
const baseUrl = resolve(__dirname, '..', '..', 'dist', 'wms-pda');

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
      postcssPxtorem({
        rootValue: 37.5,
        propList: ['*'],
      }),
      legacy({
        targets: ['defaults', 'chrome 74'], //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      open: true,
      port: 5794,
      proxy: {
        // 请求代理地址(仅开发环境有效)
        '/api': {
          target: 'http://120.79.8.215:7228/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/pad': {
          target: 'http://120.79.8.215:7228/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
        },
        '/Pda': {
          target: 'http://120.79.8.215:7228/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
        },
        '/wms_pda': {
          // target: 'http://192.168.1.174:7228/',
          target: 'http://localhost:5794/',
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          rewrite: (path) => path.replace(/^\/wms_pda/, ''),
          // ws: true, //websocket支持
        },
      },
    },
    base: config.mode === 'development' ? '/' : `/wms_pda`,
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
