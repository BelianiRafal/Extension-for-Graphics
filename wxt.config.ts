import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		"name": "Prolo Shop Banners Extension",
	},
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  webExt: {
    openDevtools: true,
    startUrls: ['https://prologistics.info', 'https://prolodev.prologistics.info'],
    keepProfileChanges: true,
  },
});
