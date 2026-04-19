export default {
  key: 'spring',
  metricKeys: ['period', 'frequency', 'omega', 'k', 'mass'],
  controls: [
    { id: 'k', type: 'range', min: 8, max: 80, step: 1, default: 24 },
    { id: 'mass', type: 'range', min: 0.3, max: 5, step: 0.1, default: 1.2 },
    { id: 'amplitude', type: 'range', min: 0.1, max: 1.2, step: 0.05, default: 0.35 },
  ],
  computeState(params) {
    const k = Number(params.k ?? 24);
    const mass = Number(params.mass ?? 1.2);
    const amplitude = Number(params.amplitude ?? 0.35);
    const omega = Math.sqrt(k / mass);
    const period = (2 * Math.PI) / omega;
    const frequency = 1 / period;
    return {
      k,
      mass,
      amplitude,
      omega: Number(omega.toFixed(3)),
      period: Number(period.toFixed(3)),
      frequency: Number(frequency.toFixed(3)),
    };
  },
};
