import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config';
import { appendBboxParams } from '../utils/hazard';

const fetchHeatmap = async (bbox) => {
  const url = new URL(`${API_BASE_URL}/heatmap`);
  appendBboxParams(url, bbox);

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch heatmap');
  return res.json();
};

export const useHeatmap = (bbox) => useQuery({
  queryKey: ['heatmap', bbox],
  queryFn: () => fetchHeatmap(bbox),
  refetchInterval: 30000,
  enabled: !!bbox,
});
