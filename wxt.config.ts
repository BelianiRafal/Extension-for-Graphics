import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  webExt: {
    openDevtools: true,
    startUrls: ['https://prologistics.info', 'https://prolodev.prologistics.info'],
    keepProfileChanges: true,
  },
});
