export const normalizeHazard = (hazard) => {
  if (!hazard) return hazard;

  return {
    ...hazard,
    damage_class: hazard.damage_class ?? hazard.dominant_class ?? 'Unknown',
    severity_score: hazard.severity_score ?? hazard.max_severity ?? hazard.avg_severity ?? 0,
  };
};

export const appendBboxParams = (url, bbox) => {
  if (!bbox) return;

  url.searchParams.append('min_lat', bbox.min_lat);
  url.searchParams.append('max_lat', bbox.max_lat);
  url.searchParams.append('min_lng', bbox.min_lng);
  url.searchParams.append('max_lng', bbox.max_lng);
};
