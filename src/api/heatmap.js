import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config';

const fetchHeatmap = async (bbox) => {
  const url = new URL(`${API_BASE_URL}/heatmap`);
  if (bbox) {
    url.searchParams.append('min_lat', bbox.min_lat);
    url.searchParams.append('max_lat', bbox.max_lat);
    url.searchParams.append('min_lng', bbox.min_lng);
    url.searchParams.append('max_lng', bbox.max_lng);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch heatmap');
  return res.json();
}

export const useHeatmap = (bbox) => useQuery({
  queryKey: ["heatmap", bbox],
  queryFn: () => fetchHeatmap(bbox),
  refetchInterval: 30000,
  enabled: !!bbox
});
