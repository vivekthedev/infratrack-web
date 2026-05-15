import { useState, useEffect } from 'react';
import { MapView } from './components/Map/MapView';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const DEFAULT_FILTERS = {
  status: 'active',
  min_severity: 0,
};

function App() {
  const [bbox, setBbox] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    queryClient.invalidateQueries();
    setLastUpdated(new Date());
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-950 font-sans">
      <Sidebar
        bbox={bbox}
        filters={filters}
        onFiltersChange={setFilters}
        selectedHazard={selectedHazard}
        onSelectHazard={setSelectedHazard}
      />

      <div className="flex-1 relative">
        <MapView
          bbox={bbox}
          filters={filters}
          onBboxChange={setBbox}
          selectedHazard={selectedHazard}
          onSelectHazard={setSelectedHazard}
        />

        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-2 px-4 rounded-full shadow-lg flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              Updated: {lastUpdated.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={handleManualRefresh}
              className="text-gray-300 hover:text-white hover:bg-gray-700/50 p-1.5 rounded-full transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
