import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['tabs', 'scripting'],
    host_permissions: [
      'https://prolodev.prologistics.info/shop_banners.php*',
      'https://www.prologistics.info/shop_banners.php*',
      'https://prolodev.prologistics.info/shop_banner.php*',
      'https://www.prologistics.info/shop_banner.php*',
      'https://prolodev.prologistics.info/',
      'https://prolodev.prologistics.info/start.php',
      'https://prolodev.prologistics.info/timestamp_filter.php',
      'http://localhost/*',
    ],
  },
  webExt: {
    openDevtools: true,
    disabled: true,
    startUrls: ['https://prologistics.info', 'https://prolodev.prologistics.info'],
    keepProfileChanges: true,
  },
});
