import { defineConfig } from 'dumi';
import { resolve } from 'path';

const BASE_URL = resolve(__dirname, '..', '..', 'dist');

export default defineConfig({
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
    { id: 'zh-TW', name: '繁体' },
  ],
  outputPath: BASE_URL,
  // publicPath: '.',
  // publicPath: '/wms_docs/',
  // base: '/wms_docs/',
  themeConfig: {
    nprogress: false,

    name: '劢微文档',
    logo: '/logo.png',
    footer: `Copyright © ${new Date().getFullYear()} 劢微机器人科技（深圳）有限公司 `,
  },
  history: {
    type: 'hash'
  }
});
