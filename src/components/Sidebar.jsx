export default function Sidebar({ experiments, activeKey, onSelect }) {
  return (
    <aside className="sidebar">
      <h1>LabSim</h1>
      <div className="sidebar-nav">
        {experiments.map((experiment) => (
          <button
            key={experiment.key}
            className={`sidebar-button ${experiment.key === activeKey ? 'active' : ''}`}
            onClick={() => onSelect(experiment.key)}
            type="button"
          >
            <span className="sidebar-button-main">{experiment.name}</span>
            <span className="sidebar-button-meta">
              {experiment.subject} · {experiment.grade}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
