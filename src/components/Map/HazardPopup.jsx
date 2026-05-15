import { Popup } from 'react-map-gl/mapbox';
import { useHazardDetails } from '../../api/hazards';
import { SeverityBadge } from '../shared/SeverityBadge';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { MapPin, Clock, Activity } from 'lucide-react';

export const HazardPopup = ({ hazard, onClose }) => {
  const { data: details, isLoading } = useHazardDetails(hazard.id);
  
  // The API returns { hazard: {...}, detections: [...] }
  const displayData = details?.hazard || hazard;
  const detections = details?.detections || hazard.detections || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateStr));
  };

  return (
    <Popup
      longitude={hazard.longitude}
      latitude={hazard.latitude}
      anchor="top"
      onClose={onClose}
      closeOnClick={false}
      className="z-50"
      maxWidth="320px"
    >
      <div className="p-1 min-w-64 text-gray-800">
        {isLoading && !details ? (
          <div className="flex justify-center p-4"><LoadingSpinner /></div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-3 border-b pb-2">
              <h3 className="font-bold text-base flex items-center gap-1.5 text-gray-900">
                <MapPin size={16} className="text-gray-500"/>
                {displayData.damage_class || 'Unknown Damage'}
              </h3>
              <SeverityBadge score={displayData.severity_score || 0} />
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Activity size={14}/> Detections:</span>
                <span className="font-medium text-gray-900">{displayData.detection_count || 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Clock size={14}/> First seen:</span>
                <span>{formatDate(displayData.first_detected_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Clock size={14}/> Last seen:</span>
                <span>{formatDate(displayData.last_detected_at || displayData.timestamp)}</span>
              </div>
            </div>

            {detections && detections.length > 0 && (
              <div className="mt-4 pt-3 border-t">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Raw Detections</p>
                <div className="max-h-32 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {detections.map((d, i) => (
                    <div key={i} className="text-xs bg-gray-50 p-1.5 rounded flex justify-between">
                      <span className="text-gray-500 truncate w-16" title={d.device_id}>{d.device_id}</span>
                      <span>{(d.confidence * 100).toFixed(0)}% conf</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Popup>
  );
};
