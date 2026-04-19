import { useI18n } from '../i18n/I18nContext';

export default function ControlsBar({ controls, params, onParamChange, running, onPlay, onStop }) {
  const { t } = useI18n();
  return (
    <section className="card">
      <h3>{t('controls.title')}</h3>
      <div className="controls-grid">
        {controls.map((control) => (
          <div className="control-row" key={control.id}>
            <div className="control-header">
              <label htmlFor={control.id}>{control.label}</label>
              <output>{params[control.id]}</output>
            </div>
            <input
              id={control.id}
              type={control.type}
              min={control.min}
              max={control.max}
              step={control.step ?? 1}
              value={params[control.id]}
              onChange={(event) => onParamChange(control.id, event.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="button-row">
        {!running ? (
          <button className="btn btn-primary" onClick={onPlay} type="button">
            {t('controls.play')}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={onStop} type="button">
            {t('controls.stop')}
          </button>
        )}
      </div>
    </section>
  );
}
