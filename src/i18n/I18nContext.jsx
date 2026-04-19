import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en.json';
import ru from './locales/ru.json';
import kk from './locales/kk.json';
import { interpolate } from './interpolate.js';

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
];

const STORAGE_KEY = 'labsim-locale';

const bundles = { en, ru, kk };

function getPath(obj, path) {
  return path.split('.').reduce((o, key) => (o == null ? undefined : o[key]), obj);
}

export { interpolate };

export function createT(locale) {
  const messages = bundles[locale] || bundles.en;

  function t(key, vars) {
    const raw = getPath(messages, key);
    if (raw === undefined) {
      console.warn(`[i18n] missing "${key}" (${locale})`);
      return key;
    }
    if (typeof raw === 'string') return interpolate(raw, vars);
    return raw;
  }

  t.locale = locale;
  t.messages = messages;
  return t;
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && bundles[stored]) return stored;
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    if (nav && bundles[nav]) return nav;
    return 'en';
  });

  const setLocale = useCallback((next) => {
    if (!bundles[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
  }, []);

  const t = useMemo(() => createT(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, SUPPORTED_LOCALES }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
