import { AnalyticsCards } from './AnalyticsCards';
import { HazardList } from './HazardList';

export const Sidebar = ({ bbox, selectedHazard, onSelectHazard }) => {
  return (
    <div className="w-96 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 h-full flex flex-col shadow-2xl relative z-10 pointer-events-auto">
      <div className="p-5 border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          Infra Track
        </h1>
        <p className="text-xs text-gray-400 mt-1">Live infrastructure monitoring</p>
      </div>

      <AnalyticsCards />
      
      <div className="px-4 py-3 bg-gray-900/80 border-b border-gray-800 sticky top-0">
        <h2 className="text-sm font-semibold text-gray-200">Recent Detections</h2>
      </div>

      <HazardList 
        bbox={bbox} 
        selectedHazard={selectedHazard} 
        onSelectHazard={onSelectHazard} 
      />
    </div>
  );
};
