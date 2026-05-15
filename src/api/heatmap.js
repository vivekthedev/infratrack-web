import { useQuery } from '@tanstack/react-query';
import { appendBboxParams } from '../utils/hazard';
import { buildApiUrl } from '../utils/api';

const fetchHeatmap = async (bbox) => {
  const url = buildApiUrl('/heatmap');
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
