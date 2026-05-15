import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config';

const fetchHazards = async (bbox) => {
  const url = new URL(`${API_BASE_URL}/hazards`);
  if (bbox) {
    url.searchParams.append('min_lat', bbox.min_lat);
    url.searchParams.append('max_lat', bbox.max_lat);
    url.searchParams.append('min_lng', bbox.min_lng);
    url.searchParams.append('max_lng', bbox.max_lng);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hazards');
  return res.json();
}

export const useHazards = (bbox) => useQuery({
  queryKey: ["hazards", bbox],
  queryFn: () => fetchHazards(bbox),
  refetchInterval: 30000,
  staleTime: 20000,
  enabled: !!bbox
});

const fetchHazardDetails = async (id) => {
  const res = await fetch(`${API_BASE_URL}/hazards/${id}`);
  if (!res.ok) throw new Error('Failed to fetch hazard details');
  return res.json();
}

export const useHazardDetails = (id) => useQuery({
  queryKey: ["hazards", id],
  queryFn: () => fetchHazardDetails(id),
  enabled: !!id
});
