import { interpolate } from './interpolate.js';
import { bundles } from './bundles.js';

export function buildAIContext(experimentKey, params, state, locale) {
  const exp = bundles[locale]?.experiments?.[experimentKey];
  const fallback = bundles.en?.experiments?.[experimentKey];
  const copy = exp || fallback;
  if (!copy?.aiContext) return '';

  const vars = { ...params, ...state };

  if (experimentKey === 'acidBase') {
    const ind = copy.indicators?.[state.indicatorKey] ?? fallback?.indicators?.[state.indicatorKey] ?? state.indicatorKey;
    vars.indicator = ind;
  }

  return interpolate(copy.aiContext, vars);
}
