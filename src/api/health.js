import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '../utils/api';

const fetchHealth = async () => {
  const res = await fetch(buildApiUrl('/health'));
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
