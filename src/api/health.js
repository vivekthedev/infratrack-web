import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config';

const fetchHealth = async () => {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
};

export const useHealth = () => useQuery({
  queryKey: ['health'],
  queryFn: fetchHealth,
  refetchInterval: 60000,
  retry: 1,
});

export const isHealthy = (data) =>
  data?.api === 'ok' && data?.database === 'ok';
