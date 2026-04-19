import SimCanvas from './SimCanvas';
import LiveGraph from './LiveGraph';

export default function CenterArea({
  experimentKey,
  simState,
  running,
  graphData,
  onSnapshot,
  onClear
}) {
  return (
    <div className="center-area">
      <div className="canvas-section">
        <SimCanvas experimentKey={experimentKey} simState={simState} running={running} />
      </div>
      <div className="controls-section">
        <div className="graph-column">
          <LiveGraph
            experimentId={experimentKey}
            graphData={graphData}
            onSnapshot={onSnapshot}
            onClear={onClear}
          />
        </div>
        <div className="actions-column">
          <button className="action-btn">Run</button>
          <button className="action-btn">Stop</button>
          <button className="action-btn">Reset</button>
          <button className="action-btn" onClick={() => onSnapshot('Manual')}>Snapshot</button>
        </div>
      </div>
    </div>
  );
}