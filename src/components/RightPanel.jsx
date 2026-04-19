import AIAssistant from './AIAssistant';
import SafetyPanel from './SafetyPanel';

export default function RightPanel({ experimentContext, messages, onAddMessage, experimentId }) {
  return (
    <div className="right-panel">
      <AIAssistant experimentContext={experimentContext} messages={messages} onAddMessage={onAddMessage} />
      <SafetyPanel experimentId={experimentId} />
    </div>
  );
}