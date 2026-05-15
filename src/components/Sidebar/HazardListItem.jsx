import { MapPin, Clock } from 'lucide-react';
import { SeverityBadge } from '../shared/SeverityBadge';

const STATUS_STYLES = {
  active: 'bg-green-500/20 text-green-400',
  resolved: 'bg-gray-500/20 text-gray-400',
};

export const HazardListItem = ({ hazard, onClick, isSelected }) => {
  const dateStr = hazard.first_detected_at || hazard.timestamp;
  const dateIntl = dateStr
    ? new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateStr))
    : 'Unknown time';

  return (
    <div
      onClick={() => onClick(hazard)}
      className={`p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800/50 ${isSelected ? 'bg-gray-800' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-gray-100 flex items-center gap-2">
          <MapPin size={16} className="text-gray-400 shrink-0" />
          <span className="capitalize">{hazard.damage_class || 'Unknown Damage'}</span>
        </span>
        <SeverityBadge score={hazard.severity_score || 0} />
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} /> {dateIntl}
        </span>
        <div className="flex items-center gap-2">
          {hazard.status && (
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${STATUS_STYLES[hazard.status] ?? 'bg-gray-700 text-gray-400'}`}>
              {hazard.status}
            </span>
          )}
          <span>{hazard.detection_count || 1} detections</span>
        </div>
      </div>
    </div>
  );
};
