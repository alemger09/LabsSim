import { useI18n } from '../i18n/I18nContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, t, SUPPORTED_LOCALES } = useI18n();

  return (
    <label className={`lang-switch ${className}`.trim()}>
      <span className="lang-switch-label">{t('common.language')}</span>
      <select
        className="lang-switch-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label={t('common.language')}
      >
        {SUPPORTED_LOCALES.map((L) => (
          <option key={L.code} value={L.code}>
            {L.label}
          </option>
        ))}
      </select>
    </label>
  );
}
