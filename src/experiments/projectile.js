const key = 'projectile';

export default {
  key,
  metricKeys: ['angle', 'speed', 'gravity', 'range', 'maxHeight', 'timeOfFlight'],
  controls: [
    { id: 'angle', type: 'range', min: 10, max: 80, step: 1, default: 45 },
    { id: 'speed', type: 'range', min: 5, max: 30, step: 1, default: 15 },
    { id: 'gravity', type: 'range', min: 1, max: 20, step: 0.5, default: 9.81 },
  ],
  computeState(params) {
    const angle = Number(params.angle ?? 45);
    const speed = Number(params.speed ?? 15);
    const gravity = Number(params.gravity ?? 9.81);
    const rad = (angle * Math.PI) / 180;
    const vx = speed * Math.cos(rad);
    const vy = speed * Math.sin(rad);
    const timeOfFlight = (2 * vy) / gravity;
    const maxHeight = (vy * vy) / (2 * gravity);
    const range = vx * timeOfFlight;

    return {
      angle,
      speed,
      gravity,
      timeOfFlight: Number(timeOfFlight.toFixed(2)),
      maxHeight: Number(maxHeight.toFixed(2)),
      range: Number(range.toFixed(2)),
    };
  },
};
