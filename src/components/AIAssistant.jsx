import { useMemo, useState } from 'react';
import { Bot } from 'lucide-react';
import { askAssistant } from '../api/assistant';
import { useI18n } from '../i18n/I18nContext';

export default function AIAssistant({ experimentContext, messages, onAddMessage }) {
  const { t } = useI18n();
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  const renderedMessages = useMemo(
    () => messages.map((message, index) => (
      <div key={`${message.role}-${message.timestamp}-${index}`} className={`chat-message ${message.role}`}>
        <p>{message.content}</p>
      </div>
    )),
    [messages]
  );

  const sendMessage = async () => {
    if (!draft.trim()) return;
    const userMessage = draft.trim();
    setDraft('');
    onAddMessage({ role: 'user', content: userMessage, timestamp: Date.now() });
    setLoading(true);

    try {
      const conversation = [...messages, { role: 'user', content: userMessage }];
      const assistantText = await askAssistant(experimentContext, conversation, {
        languageHint: t('ai.systemLanguageHint'),
      });
      onAddMessage({ role: 'assistant', content: assistantText, timestamp: Date.now() });
    } catch (error) {
      onAddMessage({
        role: 'assistant',
        content: t('ai.error'),
        timestamp: Date.now(),
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card ai-assistant">
      <h3>
        {t('ai.title')}
        <span className="ai-badge">
          <Bot size={16} />
          {t('ai.badge')}
        </span>
      </h3>
      <div className="chat-list">
        {messages.length ? renderedMessages : (
          <div className="chat-message assistant">
            <p>{t('ai.welcome')}</p>
          </div>
        )}
      </div>
      <div className="chat-footer">
        <input
          placeholder={t('ai.placeholder')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button className="btn btn-primary" onClick={sendMessage} type="button" disabled={loading || !draft.trim()} style={{ flex: 'none', padding: '0 24px' }}>
          {loading ? t('ai.loading') : t('ai.send')}
        </button>
      </div>
    </section>
  );
}
