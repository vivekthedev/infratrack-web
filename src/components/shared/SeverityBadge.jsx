import { getSeverityColor } from '../../utils/severity';

export const SeverityBadge = ({ score }) => {
  const { color, label } = getSeverityColor(score);
  
  return (
    <span 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: `${color}1A`, // 10% opacity 
        color: color,
        border: `1px solid ${color}33` // 20% opacity
      }}
    >
      <span 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: color }}
      />
      {label} ({score.toFixed(2)})
    </span>
  );
};
