import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import SimCanvas from '../components/SimCanvas';
import ControlsBar from '../components/ControlsBar';
import DataPanel from '../components/DataPanel';
import LessonPanel from '../components/LessonPanel';
import AIAssistant from '../components/AIAssistant';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LiveGraph from '../components/LiveGraph';
import SafetyPanel from '../components/SafetyPanel';
import ExperimentLayout from '../layouts/ExperimentLayout';
import experiments from '../experiments';
import { useI18n } from '../i18n/I18nContext';
import { localizeExperiment } from '../i18n/localizeExperiment';
import { buildAIContext } from '../i18n/aiContext';
import { useGraphRecorder } from '../hooks/useGraphRecorder';

const experimentList = experiments;

function getDefaultParams(experiment) {
  return experiment.controls.reduce((acc, control) => {
    acc[control.id] = control.default;
    return acc;
  }, {});
}

export default function LabWorkspace() {
  const { locale, t } = useI18n();
  const [activeExperimentKey, setActiveExperimentKey] = useState('acidBase');
  const [params, setParams] = useState(getDefaultParams(experimentList[0]));
  const [simState, setSimState] = useState(experimentList[0].computeState(getDefaultParams(experimentList[0])));
  const [messages, setMessages] = useState([]);
  const [running, setRunning] = useState(false);

  const { graphData, addSnapshot, clearGraph } = useGraphRecorder(activeExperimentKey, simState, running);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t('ai.greeting'), timestamp: Date.now() }]);
  }, [activeExperimentKey, t]);

  const activeExperiment = useMemo(
    () => experimentList.find((exp) => exp.key === activeExperimentKey) || experimentList[0],
    [activeExperimentKey]
  );

  const activeLocalized = useMemo(
    () => localizeExperiment(activeExperiment, locale),
    [activeExperiment, locale]
  );

  const experimentsForNav = useMemo(
    () => experimentList.map((exp) => localizeExperiment(exp, locale)),
    [locale]
  );

  const aiContext = useMemo(
    () => buildAIContext(activeExperiment.key, params, simState, locale),
    [activeExperiment.key, params, simState, locale]
  );

  useEffect(() => {
    try {
      setSimState(activeExperiment.computeState(params));
    } catch (e) {
      console.error('Error computing state:', e);
    }
  }, [activeExperiment, params]);

  const handleAddMessage = (message) => {
    setMessages((existing) => [...existing, message]);
  };

  const handleParamChange = (id, value) => {
    setParams((prev) => ({ ...prev, [id]: value }));
  };

  const handleExperimentSelect = (key) => {
    const nextExperiment = experimentList.find((exp) => exp.key === key) || experimentList[0];
    setActiveExperimentKey(key);
    const nextParams = getDefaultParams(nextExperiment);
    setParams(nextParams);
    setSimState(nextExperiment.computeState(nextParams));
    setRunning(false);
    setMessages([]);
  };

  const handlePlay = () => {
    setRunning(true);
    const ctx = buildAIContext(activeExperiment.key, params, simState, locale);
    handleAddMessage({
      role: 'assistant',
      content: ctx,
      timestamp: Date.now(),
    });
  };

  return (
    <ExperimentLayout
      experimentId={activeExperimentKey}
      simState={simState}
      params={params}
      onParamChange={handleParamChange}
      running={running}
      onPlay={handlePlay}
      onStop={() => setRunning(false)}
      graphData={graphData}
      onSnapshot={addSnapshot}
      onClear={clearGraph}
      messages={messages}
      onAddMessage={handleAddMessage}
      activeExperiment={activeExperiment}
      activeLocalized={activeLocalized}
    />
  );
}
