import { STORAGE_KEY, CHECK_INTERVAL } from './utils';

export default defineContentScript({
  matches: ['https://prologistics.info/*', 'https://*.prologistics.info/*'],
  async main() {
    if (window.top !== window) return;

    const localVersion = browser.runtime.getManifest()?.version;
    const result = await browser.storage.local.get(STORAGE_KEY);
    const state = result[STORAGE_KEY] as { lastCheckedAt?: number; lastVersion?: string } | undefined;

    const versionChanged = localVersion && state?.lastVersion && state.lastVersion !== localVersion;
    const recentlyChecked =
      typeof state?.lastCheckedAt === 'number' && Date.now() - state.lastCheckedAt < CHECK_INTERVAL;

    if (!versionChanged && recentlyChecked) return;

    try {
      await browser.runtime.sendMessage({ action: 'efg:checkForUpdate' });
    } catch { /* service worker not ready */ }
  },
});
