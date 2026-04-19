import { BookOpen, FlaskConical, ClipboardCheck } from 'lucide-react';
import TheoryReader from './lesson/TheoryReader';
import SimulateTasks from './lesson/SimulateTasks';
import TestPanel from './lesson/TestPanel';
import ControlsBar from './ControlsBar';

const tabs = [
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'simulate', label: 'Simulate', icon: FlaskConical },
  { id: 'test', label: 'Test', icon: ClipboardCheck },
];

export default function LeftPanel({
  activeTab,
  onTabChange,
  experimentId,
  params,
  onParamChange,
  running,
  onPlay,
  onStop,
  simState,
  activeLocalized
}) {
  return (
    <div className="left-panel">
      <nav className="tab-nav">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="tab-content">
        {activeTab === 'theory' && (
          <TheoryReader experimentId={experimentId} />
        )}
        {activeTab === 'simulate' && (
          <div>
            <SimulateTasks experimentId={experimentId} simState={simState} />
            <ControlsBar
              controls={activeLocalized.controls}
              params={params}
              onParamChange={onParamChange}
              running={running}
              onPlay={onPlay}
              onStop={onStop}
            />
          </div>
        )}
        {activeTab === 'test' && (
          <TestPanel experimentId={experimentId} />
        )}
      </div>
    </div>
  );
}