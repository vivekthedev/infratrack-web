export const MAP_CONFIG = {
  center: [80.9462, 26.8467],  // Lucknow [lng, lat]
  zoom: 12,
  style: "mapbox://styles/mapbox/dark-v11"  // dark style suits infrastructure
}

const resolveApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;

  if (configured) {
    // HTTPS deployments cannot call http:// APIs (mixed content). Route via Netlify proxy.
    if (import.meta.env.PROD && configured.startsWith('http://')) {
      return '/api';
    }
    return configured;
  }

  return import.meta.env.DEV ? 'http://localhost:8000' : '/api';
};

export const API_BASE_URL = resolveApiBaseUrl();
