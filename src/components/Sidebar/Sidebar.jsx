import { AnalyticsCards } from './AnalyticsCards';
import { HazardFilters } from './HazardFilters';
import { HazardList } from './HazardList';
import { useHealth, isHealthy } from '../../api/health';

export const Sidebar = ({ bbox, filters, onFiltersChange, selectedHazard, onSelectHazard }) => {
  const { data: health, isError, isLoading } = useHealth();
  const healthy = !isError && !isLoading && isHealthy(health);

  const statusLabel = isLoading
    ? 'Checking connection…'
    : healthy
      ? 'API & database online'
      : isError
        ? 'API unreachable'
        : `API: ${health?.api ?? 'unknown'}, DB: ${health?.database ?? 'unknown'}`;

  return (
    <div className="w-96 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 h-full flex flex-col shadow-2xl relative z-10 pointer-events-auto">
      <div className="p-5 border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full shrink-0 ${
              isLoading
                ? 'bg-yellow-500 animate-pulse'
                : healthy
                  ? 'bg-green-500'
                  : 'bg-red-500'
            }`}
            title={statusLabel}
          />
          Infra Track
        </h1>
        <p className="text-xs text-gray-400 mt-1">{statusLabel}</p>
      </div>

      <AnalyticsCards />

      <HazardFilters filters={filters} onChange={onFiltersChange} />

      <div className="px-4 py-3 bg-gray-900/80 border-b border-gray-800 sticky top-0">
        <h2 className="text-sm font-semibold text-gray-200">Hazards in View</h2>
      </div>

      <HazardList
        bbox={bbox}
        filters={filters}
        selectedHazard={selectedHazard}
        onSelectHazard={onSelectHazard}
      />
    </div>
  );
};
