import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['tabs', 'scripting', 'storage', 'notifications'],
    host_permissions: [
      'https://prologistics.info/*',
      'https://*.prologistics.info/*',
      'https://api.github.com/*',
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
