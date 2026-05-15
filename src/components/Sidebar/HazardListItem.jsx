import { MapPin, Clock } from 'lucide-react';
import { SeverityBadge } from '../shared/SeverityBadge';

export const HazardListItem = ({ hazard, onClick, isSelected }) => {
  // Format to IST
  const dateStr = hazard.first_detected_at || hazard.timestamp;
  const dateIntl = dateStr ? new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(dateStr)) : 'Unknown time';

  return (
    <div 
      onClick={() => onClick(hazard)}
      className={`p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800/50 ${isSelected ? 'bg-gray-800' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-gray-100 flex items-center gap-2">
          <MapPin size={16} className="text-gray-400"/> 
          {hazard.damage_class || 'Unknown Damage'}
        </span>
        <SeverityBadge score={hazard.severity_score || 0} />
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} /> {dateIntl}
        </span>
        <span>{hazard.detection_count || 1} detections</span>
      </div>
    </div>
  );
};
