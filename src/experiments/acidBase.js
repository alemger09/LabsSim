const phToColor = (ph) => {
  if (ph <= 3) return 0xdc5050;
  if (ph <= 6) return 0xdca030;
  if (ph <= 8) return 0x64b490;
  if (ph <= 11) return 0x508cd2;
  return 0x8c50c8;
};

const indicatorKeyByPh = (ph) => {
  if (ph <= 3) return 'strongAcid';
  if (ph <= 6) return 'acid';
  if (ph <= 8) return 'neutral';
  if (ph <= 11) return 'base';
  return 'strongBase';
};

export default {
  key: 'acidBase',
  metricKeys: ['ph', 'volume', 'temperature', 'indicatorKey', 'bubbles'],
  controls: [
    { id: 'ph', type: 'range', min: 1, max: 14, step: 1, default: 7 },
    { id: 'volume', type: 'range', min: 10, max: 100, step: 5, default: 50 },
  ],
  computeState(params) {
    const ph = Number(params.ph ?? 7);
    const volume = Number(params.volume ?? 50);
    const color = phToColor(ph);
    const indicatorKey = indicatorKeyByPh(ph);
    const intensity = Math.max(0, 14 - Math.abs(ph - 7));
    const temperature = 20 + intensity * 1.8 + (volume - 50) * 0.08;
    const bubbles = ph <= 3 || ph >= 11 ? Math.min(18, Math.round(intensity / 1.4)) : Math.round(intensity / 3);

    return {
      ph,
      volume,
      color,
      indicatorKey,
      temperature: Number(temperature.toFixed(1)),
      bubbles,
      running: false,
    };
  },
};
