import { useState } from 'react';
import LeftPanel from '../components/LeftPanel';
import CenterArea from '../components/CenterArea';
import RightPanel from '../components/RightPanel';
import BottomBar from '../components/BottomBar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { buildAIContext } from '../i18n/aiContext';
import { useI18n } from '../i18n/I18nContext';

export default function ExperimentLayout({
  experimentId,
  simState,
  params,
  onParamChange,
  running,
  onPlay,
  onStop,
  graphData,
  onSnapshot,
  onClear,
  messages,
  onAddMessage,
  activeExperiment,
  activeLocalized
}) {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState('theory');

  const experimentContext = buildAIContext(activeExperiment.key, params, simState, locale);

  return (
    <div className="experiment-layout">
      <header className="topbar">
        <h1>{activeLocalized.name}</h1>
        <div className="topbar-right">
          {/* Progress indicator can go here */}
          <LanguageSwitcher />
        </div>
      </header>

      <aside className="left-panel">
        <LeftPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          experimentId={experimentId}
          params={params}
          onParamChange={onParamChange}
          running={running}
          onPlay={onPlay}
          onStop={onStop}
          simState={simState}
          activeLocalized={activeLocalized}
        />
      </aside>

      <main className="center-area">
        <CenterArea
          experimentKey={experimentId}
          simState={simState}
          running={running}
          graphData={graphData}
          onSnapshot={onSnapshot}
          onClear={onClear}
        />
      </main>

      <aside className="right-panel">
        <RightPanel
          experimentContext={experimentContext}
          messages={messages}
          onAddMessage={onAddMessage}
          experimentId={experimentId}
        />
      </aside>

      <footer className="bottom-bar">
        <BottomBar simState={simState} metrics={activeLocalized.metrics} />
      </footer>
    </div>
  );
}