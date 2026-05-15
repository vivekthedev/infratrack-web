export const MAP_CONFIG = {
  center: [80.9462, 26.8467],  // Lucknow [lng, lat]
  zoom: 12,
  style: "mapbox://styles/mapbox/dark-v11"  // dark style suits infrastructure
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
