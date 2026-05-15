export const getSeverityColor = (score) => {
  if (score < 0.25) return { color: "#22c55e", label: "Smooth" }
  if (score < 0.50) return { color: "#eab308", label: "Minor" }
  if (score < 0.75) return { color: "#f97316", label: "Moderate" }
  return { color: "#ef4444", label: "Severe" }
}
