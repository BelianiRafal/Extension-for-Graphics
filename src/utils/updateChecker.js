import {
  STORAGE_KEY_UPDATE,
  NOTIFICATION_ID,
  CHECK_INTERVAL,
  API_URL,
  RELEASE_PAGE_URL,
  normalizeVersion,
  compareVersions,
  getStorage,
  setStorage,
  pickDownloadUrl,
  createNotification,
} from '@/utils/updateUtils.js';

// nie chce sie dla mnie typescript
export function initUpdateChecker() {
  chrome.notifications.onClicked.addListener(id => {
    if (id !== NOTIFICATION_ID) return;
    void (async () => {
      const state = (await getStorage(STORAGE_KEY_UPDATE)) || {};
      const url = state.downloadUrl || state.releaseUrl || RELEASE_PAGE_URL;
      chrome.tabs.create({ url });
      chrome.notifications.clear(id);
    })();
  });

  chrome.runtime.onInstalled.addListener(() => void checkForUpdate());
  chrome.runtime.onStartup.addListener(() => void checkForUpdate());
}

export async function checkForUpdate() {
  const version = normalizeVersion(chrome.runtime.getManifest()?.version);
  if (!version) return;

  const state = (await getStorage(STORAGE_KEY_UPDATE)) || {};

  if (state.lastVersion && state.lastVersion !== version) {
    Object.assign(state, {
      lastCheckedAt: undefined,
      etag: undefined,
      remoteTag: undefined,
      remoteVersion: undefined,
      releaseUrl: undefined,
      downloadUrl: undefined,
    });
  }
  state.lastVersion = version;

  const now = Date.now();
  if (state.lastCheckedAt && now - state.lastCheckedAt < CHECK_INTERVAL) {
    await setStorage({ [STORAGE_KEY_UPDATE]: state });
    return;
  }

  state.lastCheckedAt = now;
  await setStorage({ [STORAGE_KEY_UPDATE]: state });

  const headers = { Accept: 'application/vnd.github+json' };
  if (state.etag) headers['If-None-Match'] = state.etag;

  let response;
  try {
    response = await fetch(API_URL, { method: 'GET', headers, cache: 'no-store' });
  } catch {
    return;
  }

  if (response.status === 304) {
    if (state.remoteVersion && compareVersions(state.remoteVersion, version) > 0) {
      await notify(state);
    }
    return;
  }

  if (!response.ok) return;

  const etag = response.headers.get('ETag') || response.headers.get('Etag');
  if (etag) state.etag = etag;

  let release;
  try {
    release = await response.json();
  } catch {
    await setStorage({ [STORAGE_KEY_UPDATE]: state });
    return;
  }

  const remoteVersion = normalizeVersion(release?.tag_name);
  if (!remoteVersion) {
    await setStorage({ [STORAGE_KEY_UPDATE]: state });
    return;
  }

  state.remoteTag = release.tag_name;
  state.remoteVersion = remoteVersion;
  state.releaseUrl = release.html_url;
  state.downloadUrl = pickDownloadUrl(release) || release.html_url;

  await setStorage({ [STORAGE_KEY_UPDATE]: state });

  if (compareVersions(remoteVersion, version) > 0) {
    await notify(state);
  }
}

async function notify(state) {
  const { remoteVersion, downloadUrl, releaseUrl } = state;
  if (!remoteVersion) return;

  const options = {
    iconUrl: 'icon/128.png',
    title: 'Outdated version detected!',
    message: `Download the latest extension (${remoteVersion}) on GitHub (click).`,
    priority: 2,
  };

  const shown =
    (await createNotification(NOTIFICATION_ID, { type: 'image', imageUrl: 'update-available.png', ...options })) ||
    (await createNotification(NOTIFICATION_ID, { type: 'basic', ...options }));

  if (!shown) {
    const url = downloadUrl || releaseUrl || RELEASE_PAGE_URL;
    try {
      chrome.tabs.create({ url });
    } catch {}
  }
}
