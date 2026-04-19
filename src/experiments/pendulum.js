export default {
  key: 'pendulum',
  metricKeys: ['length', 'mass', 'gravity', 'period', 'frequency'],
  controls: [
    { id: 'length', type: 'range', min: 0.5, max: 4, step: 0.1, default: 2 },
    { id: 'mass', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
    { id: 'gravity', type: 'range', min: 1, max: 20, step: 0.1, default: 9.8 },
  ],
  computeState(params) {
    const length = Number(params.length ?? 2);
    const mass = Number(params.mass ?? 1);
    const gravity = Number(params.gravity ?? 9.8);

    const period = 2 * Math.PI * Math.sqrt(length / gravity);
    const frequency = 1 / period;

    return {
      length,
      mass,
      gravity,
      period: Number(period.toFixed(2)),
      frequency: Number(frequency.toFixed(2)),
      running: false,
    };
  },
};
