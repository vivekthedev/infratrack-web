import { useQuery } from '@tanstack/react-query';
import { appendBboxParams, normalizeHazard } from '../utils/hazard';
import { buildApiUrl } from '../utils/api';

const fetchHazards = async ({ bbox, status = 'active', min_severity } = {}) => {
  const url = buildApiUrl('/hazards');

  if (status) {
    url.searchParams.append('status', status);
  }

  if (min_severity != null && min_severity > 0) {
    url.searchParams.append('min_severity', min_severity);
  }

  appendBboxParams(url, bbox);

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hazards');

  const data = await res.json();
  const hazards = Array.isArray(data) ? data : data.hazards ?? [];

  return hazards.map(normalizeHazard);
};

export const useHazards = (bbox, filters = {}) => useQuery({
  queryKey: ['hazards', bbox, filters],
  queryFn: () => fetchHazards({ bbox, ...filters }),
  refetchInterval: 30000,
  staleTime: 20000,
  enabled: !!bbox,
});

const fetchHazardDetails = async (id) => {
  const res = await fetch(buildApiUrl(`/hazards/${id}`));
  if (!res.ok) throw new Error('Failed to fetch hazard details');

  const data = await res.json();

  return {
    ...data,
    hazard: data.hazard ? normalizeHazard(data.hazard) : undefined,
    detections: data.detections ?? [],
  };
};

export const useHazardDetails = (id) => useQuery({
  queryKey: ['hazards', 'detail', id],
  queryFn: () => fetchHazardDetails(id),
  enabled: !!id,
});
