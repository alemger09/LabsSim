export default {
  key: 'circuitOhm',
  metricKeys: ['current', 'power', 'voltage', 'resistance'],
  controls: [
    { id: 'voltage', type: 'range', min: 1, max: 24, step: 0.5, default: 12 },
    { id: 'resistance', type: 'range', min: 2, max: 120, step: 1, default: 24 },
  ],
  computeState(params) {
    const voltage = Number(params.voltage ?? 12);
    const resistance = Number(params.resistance ?? 24);
    const current = voltage / resistance;
    const power = voltage * current;
    return {
      voltage,
      resistance,
      current: Number(current.toFixed(3)),
      power: Number(power.toFixed(3)),
    };
  },
};
