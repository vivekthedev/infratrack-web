import { useRef, useEffect } from 'react';
import Map from 'react-map-gl/mapbox';
import { MAP_CONFIG } from '../../config';
import { HeatmapLayer } from './HeatmapLayer';
import { HazardMarkers } from './HazardMarkers';
import { HazardPopup } from './HazardPopup';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapView = ({ bbox, onBboxChange, selectedHazard, onSelectHazard }) => {
  const mapRef = useRef(null);

  // Initialize bbox on load if map is ready
  useEffect(() => {
    if (mapRef.current) {
      updateBbox();
    }
  }, []);

  // When a hazard is selected from outside (e.g. Sidebar list), fly to it
  useEffect(() => {
    if (selectedHazard && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedHazard.longitude, selectedHazard.latitude],
        zoom: Math.max(mapRef.current.getZoom(), 15),
        duration: 1500
      });
    }
  }, [selectedHazard]);

  const updateBbox = () => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getMap().getBounds();
    onBboxChange({
      min_lat: bounds.getSouth(),
      max_lat: bounds.getNorth(),
      min_lng: bounds.getWest(),
      max_lng: bounds.getEast()
    });
  };

  return (
    <div className="flex-1 relative w-full h-full">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: MAP_CONFIG.center[0],
          latitude: MAP_CONFIG.center[1],
          zoom: MAP_CONFIG.zoom
        }}
        mapStyle={MAP_CONFIG.style}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMoveEnd={updateBbox}
        onLoad={updateBbox}
        style={{ width: '100%', height: '100%' }}
      >
        <HeatmapLayer bbox={bbox} />
        <HazardMarkers bbox={bbox} onSelectHazard={onSelectHazard} />

        {selectedHazard && (
          <HazardPopup 
            hazard={selectedHazard} 
            onClose={() => onSelectHazard(null)} 
          />
        )}
      </Map>
    </div>
  );
};
