import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function BottomBar({ simState, metrics }) {
  const readings = useMemo(() => {
    // Extract key readings from simState and metrics
    const keys = Object.keys(metrics);
    return keys.slice(0, 6).map(key => {
      const metric = metrics[key];
      let value = simState[key];
      if (typeof value === 'number') {
        value = `${value}${metric.unit}`;
      } else if (value) {
        value = `${value}`;
      } else {
        value = '—';
      }

      // Check for out of range (simple check, can be expanded)
      const isOutOfRange = key === 'ph' && (value < 0 || value > 14) ||
                          key === 'temperature' && value > 100; // example

      return {
        label: metric.label,
        value,
        isOutOfRange
      };
    });
  }, [simState, metrics]);

  return (
    <div className="bottom-bar">
      {readings.map((reading, i) => (
        <div key={i} className={`reading-chip ${reading.isOutOfRange ? 'warning' : ''}`}>
          {reading.isOutOfRange && <AlertTriangle size={14} />}
          <span>{reading.label}: {reading.value}</span>
        </div>
      ))}
    </div>
  );
}