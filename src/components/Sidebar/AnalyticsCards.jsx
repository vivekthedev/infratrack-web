import { useAnalytics } from '../../api/analytics';
import { AlertTriangle, Activity, Map, Hash } from 'lucide-react';

const Card = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700/50 backdrop-blur-md">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</h3>
      <Icon size={16} className={colorClass} />
    </div>
    <p className="text-2xl font-bold mt-2 text-gray-100">{value}</p>
  </div>
);

export const AnalyticsCards = () => {
  const { data, isLoading } = useAnalytics();

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-gray-800/30 rounded-xl m-4" />;
  }

  const stats = data || {
    total_hazards: 0,
    avg_severity: 0,
    critical_hazards: 0,
    total_detections: 0
  };

  return (
    <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-800">
      <Card title="Total Hazards" value={stats.total_hazards} icon={Map} colorClass="text-blue-400" />
      <Card title="Avg Severity" value={(stats.avg_severity || 0).toFixed(2)} icon={Activity} colorClass="text-yellow-400" />
      <Card title="Critical" value={stats.critical_hazards} icon={AlertTriangle} colorClass="text-red-400" />
      <Card title="Total Reports" value={stats.total_detections} icon={Hash} colorClass="text-green-400" />
    </div>
  );
};
