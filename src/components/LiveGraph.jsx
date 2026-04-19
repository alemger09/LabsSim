import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { GRAPH_CONFIGS } from '../experiments';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LiveGraph({ experimentId, graphData, onSnapshot, onClear, hypothesisCurve }) {
  const [snapshotLabel, setSnapshotLabel] = useState('');

  const config = GRAPH_CONFIGS[experimentId] || { xLabel: 'X', yLabel: 'Y', yMin: 0, yMax: 10 };

  const data = {
    datasets: [
      {
        label: config.yLabel,
        data: graphData.map(d => ({ x: d.x, y: d.y })),
        borderColor: '#1D9E75',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: graphData.map(d => d.label ? 5 : 0), // larger for labeled
        pointBackgroundColor: graphData.map(d => d.label ? '#FF0000' : '#1D9E75'),
      },
      ...(hypothesisCurve ? [{
        label: 'Predicted',
        data: hypothesisCurve.map(d => ({ x: d.x, y: d.y })),
        borderColor: '#7F77DD',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
      }] : [])
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: config.xLabel },
      },
      y: {
        title: { display: true, text: config.yLabel },
        min: config.yMin,
        max: config.yMax,
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = graphData[context.dataIndex];
            return point.label ? `${context.dataset.label}: ${context.parsed.y} (${point.label})` : `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
  };

  const handleSnapshot = () => {
    if (snapshotLabel.trim()) {
      onSnapshot(snapshotLabel.trim());
      setSnapshotLabel('');
    }
  };

  return (
    <div className="live-graph card">
      <h3>Live Graph</h3>
      <Line data={data} options={options} />
      <div className="graph-controls">
        <input
          type="text"
          placeholder="Snapshot label"
          value={snapshotLabel}
          onChange={(e) => setSnapshotLabel(e.target.value)}
        />
        <button onClick={handleSnapshot}>Snapshot</button>
        <button onClick={onClear}>Clear Graph</button>
      </div>
    </div>
  );
}