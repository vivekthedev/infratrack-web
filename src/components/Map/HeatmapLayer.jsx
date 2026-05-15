import { Source, Layer } from 'react-map-gl/mapbox';
import { useHeatmap } from '../../api/heatmap';

const heatmapLayerConfig = {
  id: 'heatmap-layer',
  type: 'heatmap',
  paint: {
    "heatmap-weight": ["get", "weight"],
    "heatmap-intensity": 1.5,
    "heatmap-color": [
      "interpolate", ["linear"], ["heatmap-density"],
      0, "rgba(0,0,255,0)",
      0.3, "rgb(34,197,94)",     // green = low
      0.6, "rgb(249,115,22)",   // orange = medium  
      1.0, "rgb(239,68,68)"      // red = high
    ],
    "heatmap-radius": 30
  }
};

export const HeatmapLayer = ({ bbox }) => {
  const { data } = useHeatmap(bbox);
  
  // Extract points array from the response object
  const points = data?.points || [];

  // Convert points to GeoJSON FeatureCollection
  const geojson = {
    type: "FeatureCollection",
    features: points.map(p => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.lng, p.lat] },
      properties: { weight: p.weight || 1 }
    }))
  };

  return (
    <Source id="heatmap-source" type="geojson" data={geojson}>
      <Layer {...heatmapLayerConfig} />
    </Source>
  );
};
