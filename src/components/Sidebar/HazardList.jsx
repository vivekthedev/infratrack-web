import { HazardListItem } from './HazardListItem';
import { useHazards } from '../../api/hazards';
import { AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export const HazardList = ({ bbox, filters, selectedHazard, onSelectHazard }) => {
  const { data: hazards, isLoading, error } = useHazards(bbox, filters);

  if (isLoading) return <div className="p-4 flex justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="p-4 text-red-400 flex items-center gap-2"><AlertCircle size={16} /> Failed to load hazards</div>;
  if (!hazards || hazards.length === 0) return <div className="p-8 text-center text-gray-500">No hazards match current filters</div>;

  return (
    <div className="overflow-y-auto flex-1">
      {hazards.map((hazard) => (
        <HazardListItem
          key={hazard.id}
          hazard={hazard}
          isSelected={selectedHazard?.id === hazard.id}
          onClick={onSelectHazard}
        />
      ))}
    </div>
  );
};
