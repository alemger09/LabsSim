import { useI18n } from '../i18n/I18nContext';

function formatMetricValue(value) {
  if (value === undefined || value === null) return '—';
  if (typeof value === 'number' && !Number.isFinite(value)) return '—';
  if (typeof value === 'number') {
    return Number.isInteger(value) ? String(value) : String(value);
  }
  return String(value);
}

export default function DataPanel({ simState, metrics, experimentKey }) {
  const { t } = useI18n();

  const rows = metrics?.length
    ? metrics
    : Object.keys(simState || {}).map((key) => ({ key, label: key }));

  const displayValue = (m, raw) => {
    if (m.key === 'indicatorKey' && experimentKey && simState?.indicatorKey) {
      return t(`experiments.${experimentKey}.indicators.${simState.indicatorKey}`);
    }
    return formatMetricValue(raw);
  };

  return (
    <section className="card">
      <h3>{t('data.title')}</h3>
      <div className="data-grid">
        {rows.map((m) => {
          const raw = simState?.[m.key];
          const text = displayValue(m, raw);
          const suffix =
            m.unit && raw !== undefined && raw !== null && text !== '—' ? m.unit : '';
          return (
            <div className="data-item" key={m.key}>
              <label>{m.label}</label>
              <span>
                {text}
                {suffix}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
