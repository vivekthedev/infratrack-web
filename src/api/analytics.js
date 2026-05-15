import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '../utils/api';

const fetchAnalytics = async () => {
  const res = await fetch(buildApiUrl('/analytics'));
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
};

export const useAnalytics = () => useQuery({
  queryKey: ['analytics'],
  queryFn: fetchAnalytics,
  refetchInterval: 30000,
});
