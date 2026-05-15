const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'all', label: 'All' },
];

export const HazardFilters = ({ filters, onChange }) => {
  const setStatus = (status) => onChange({ ...filters, status });
  const setMinSeverity = (min_severity) => onChange({ ...filters, min_severity });

  return (
    <div className="px-4 py-3 bg-gray-900/80 border-b border-gray-800 space-y-3">
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">
          Status
        </label>
        <div className="flex gap-1.5">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={`flex-1 text-xs py-1.5 px-2 rounded-md font-medium transition-colors ${
                filters.status === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="min-severity" className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Min Severity
          </label>
          <span className="text-xs text-gray-300 font-mono">
            {(filters.min_severity ?? 0).toFixed(1)}
          </span>
        </div>
        <input
          id="min-severity"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={filters.min_severity ?? 0}
          onChange={(e) => setMinSeverity(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
};
