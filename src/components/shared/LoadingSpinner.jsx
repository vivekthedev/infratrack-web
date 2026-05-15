import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ className = "" }) => (
  <Loader2 className={`animate-spin text-blue-500 ${className}`} />
);
