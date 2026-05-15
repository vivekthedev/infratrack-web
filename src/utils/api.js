import { API_BASE_URL } from '../config';

export const buildApiUrl = (path) => {
  const base = API_BASE_URL.replace(/\/$/, '');
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  const full = `${base}${endpoint}`;

  if (/^https?:\/\//.test(full)) {
    return new URL(full);
  }

  return new URL(full, window.location.origin);
};
