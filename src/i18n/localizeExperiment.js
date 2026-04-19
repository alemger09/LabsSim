import { bundles } from './bundles.js';

export function localizeExperiment(exp, locale) {
  const copy = bundles[locale]?.experiments?.[exp.key];
  const fallback = bundles.en?.experiments?.[exp.key];
  const L = copy || fallback;

  if (!L) {
    console.warn(`[i18n] missing experiment copy: ${exp.key} (${locale})`);
    return {
      ...exp,
      name: exp.key,
      subject: '',
      grade: '',
      lesson: null,
      controls: exp.controls,
      metrics: [],
    };
  }

  const fbControls = fallback?.controls ?? {};
  const controls = exp.controls.map((c) => ({
    ...c,
    label: L.controls?.[c.id] ?? fbControls[c.id] ?? c.id,
  }));

  const metrics = (exp.metricKeys || []).map((key) => ({
    key,
    label: L.metrics?.[key]?.label ?? fallback?.metrics?.[key]?.label ?? key,
    unit: L.metrics?.[key]?.unit ?? fallback?.metrics?.[key]?.unit ?? '',
  }));

  return {
    ...exp,
    name: L.name ?? fallback?.name ?? exp.key,
    subject: L.subject ?? fallback?.subject ?? '',
    grade: L.grade ?? fallback?.grade ?? '',
    lesson: L.lesson ?? fallback?.lesson ?? null,
    controls,
    metrics,
  };
}
