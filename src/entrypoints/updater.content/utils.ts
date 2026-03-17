export const STORAGE_KEY = 'extension_for_graphics_update_state';
export const NOTIFICATION_ID = 'extension_for_graphics_update_available';
// check every 12h (in ms)
export const CHECK_INTERVAL = 12 * 60 * 60 * 1000;
// if we swap to org github we will need to change these urls
export const API_URL = 'https://api.github.com/repos/BelianiRafal/Extension-for-Graphics/releases/latest';
export const RELEASE_PAGE_URL = 'https://github.com/BelianiRafal/Extension-for-Graphics/releases/latest';

export interface UpdateState {
  lastVersion?: string;
  lastCheckedAt?: number;
  etag?: string;
  remoteTag?: string;
  remoteVersion?: string;
  releaseUrl?: string;
}

export function normalizeVersion(raw: string | undefined | null): string | null {
  if (typeof raw !== 'string') return null;

	// prettier-ignore
  const cleaned = raw.trim().replace(/^refs\/tags\//i, '').replace(/^v/i, '');
  const main = cleaned.split(/[+-]/)[0];
  const parts = main.split('.').map((p) => Number.parseInt(p, 10));
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;

  const [major, minor, patch = 0] = parts;
  return `${major}.${minor}.${patch}`;
}

export function compareVersions(currentVersion: string, comparedVersion: string): number {
  const currentVersionParts = currentVersion.split('.').map((versionPart) => Number.parseInt(versionPart, 10));
  const comparedVersionParts = comparedVersion.split('.').map((versionPart) => Number.parseInt(versionPart, 10));

  for (let partIndex = 0; partIndex < 3; partIndex++) {
    const currentPart = currentVersionParts[partIndex] ?? 0;
    const comparedPart = comparedVersionParts[partIndex] ?? 0;

    if (currentPart > comparedPart) return 1;
    if (currentPart < comparedPart) return -1;
  }

  return 0;
}
