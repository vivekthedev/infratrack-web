import { Marker } from 'react-map-gl/mapbox';
import { useHazards } from '../../api/hazards';
import { getSeverityColor } from '../../utils/severity';

export const HazardMarkers = ({ bbox, filters, onSelectHazard }) => {
  const { data: hazards } = useHazards(bbox, filters);

  return (
    <>
      {(hazards || []).map((hazard) => {
        const { color } = getSeverityColor(hazard.severity_score || 0);

        return (
          <Marker
            key={hazard.id}
            longitude={hazard.longitude}
            latitude={hazard.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onSelectHazard(hazard);
            }}
          >
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          </Marker>
        );
      })}
    </>
  );
};
