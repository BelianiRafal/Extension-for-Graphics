import {
  STORAGE_KEY,
  NOTIFICATION_ID,
  CHECK_INTERVAL,
  API_URL,
  RELEASE_PAGE_URL,
  normalizeVersion,
  compareVersions,
  type UpdateState,
} from './utils';

async function getState(): Promise<UpdateState> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as UpdateState) ?? {};
}

async function saveState(state: UpdateState): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: state });
}

function pickDownloadUrl(release: any): string | undefined {
  const assets: any[] = Array.isArray(release?.assets) ? release.assets : [];
  const zip = assets.find((a: any) => typeof a?.name === 'string' && a.name.endsWith('.zip'));
  return zip?.browser_download_url;
}

async function notify(state: UpdateState): Promise<void> {
  if (!state.remoteVersion) return;

  await browser.notifications.create(NOTIFICATION_ID, {
    type: 'image',
    imageUrl: 'update-available.png',
    iconUrl: 'icon/128.png',
    title: 'Outdated version detected!',
    message: `Download the latest extension (${state.remoteVersion}) on GitHub (click).`,
    priority: 2,
  } as any);
}

export function initUpdateChecker(): void {
  browser.notifications.onClicked.addListener(async id => {
    if (id !== NOTIFICATION_ID) return;

    const state = await getState();
    const url = state.downloadUrl ?? state.releaseUrl ?? RELEASE_PAGE_URL;
    await browser.tabs.create({ url });
    await browser.notifications.clear(id);
  });

  browser.runtime.onInstalled.addListener(() => void checkForUpdate());
  browser.runtime.onStartup.addListener(() => void checkForUpdate());
}

export async function checkForUpdate(): Promise<void> {
  const version = normalizeVersion(browser.runtime.getManifest()?.version);
  if (!version) return;

  const state = await getState();

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
    await saveState(state);
    return;
  }

  state.lastCheckedAt = now;
  await saveState(state);

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (state.etag) headers['If-None-Match'] = state.etag;

  let response: Response;
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

  const etag = response.headers.get('ETag') ?? response.headers.get('Etag');
  if (etag) {
    state.etag = etag;
    await saveState(state);
  }

  const release = await response.json().catch(() => null);
  if (!release) return;

  const remoteVersion = normalizeVersion(release?.tag_name);
  if (!remoteVersion) return;

  state.remoteTag = release.tag_name;
  state.remoteVersion = remoteVersion;
  state.releaseUrl = release.html_url;
  state.downloadUrl = pickDownloadUrl(release) ?? release.html_url;

  await saveState(state);

  if (compareVersions(remoteVersion, version) > 0) {
    await notify(state);
  }
}
