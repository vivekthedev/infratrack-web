import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config';

const fetchAnalytics = async () => {
  const res = await fetch(`${API_BASE_URL}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export const useAnalytics = () => useQuery({
  queryKey: ["analytics"],
  queryFn: fetchAnalytics,
  refetchInterval: 30000
});
