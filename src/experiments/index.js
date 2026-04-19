import acidBase from './acidBase';
import pendulum from './pendulum';
import projectile from './projectile';
import spring from './spring';
import circuitOhm from './circuitOhm';

export const experiments = [acidBase, pendulum, projectile, spring, circuitOhm];

export const GRAPH_CONFIGS = {
  acidBase: { xLabel: 'Volume of base (ml)', yLabel: 'pH', yMin: 0, yMax: 14 },
  circuitOhm: { xLabel: 'Voltage (V)', yLabel: 'Current (mA)', yMin: 0, yMax: 500 },
  pendulum: { xLabel: 'Time (s)', yLabel: 'Displacement (cm)', yMin: -20, yMax: 20 },
  projectile: { xLabel: 'Time (s)', yLabel: 'Height (m)', yMin: 0, yMax: 50 },
  spring: { xLabel: 'Time (s)', yLabel: 'Displacement (cm)', yMin: -10, yMax: 10 },
};

export const SAFETY_DATA = {
  acidBase: {
    ppe: ['goggles', 'gloves', 'lab-coat'],
    hazards: [
      'Strong acids (pH < 3) cause skin burns on contact',
      'Never add water to concentrated acid — always acid to water',
      'Neutralization reactions can release heat rapidly'
    ],
    realLab: 'In a real lab, you would use a burette and white tile to see the color change clearly at the equivalence point.'
  },
  circuitOhm: {
    ppe: ['none-required'],
    hazards: [
      'Never exceed the rated voltage of the resistor',
      'Short circuits cause wires to overheat rapidly',
      'Always connect ammeter in series, never in parallel'
    ],
    realLab: 'In a real lab, you would use a rheostat to vary resistance and a digital multimeter for precise readings.'
  },
  pendulum: {
    ppe: ['none-required'],
    hazards: [
      'Secure the pivot point before releasing the pendulum',
      'Keep clear of the swing path',
      'Use a fiducial marker for accurate timing'
    ],
    realLab: 'In a real lab, you would use a photogate timer for millisecond precision instead of a stopwatch.'
  },
  projectile: {
    ppe: ['goggles'],
    hazards: [
      'Projectiles can cause injury if not aimed properly',
      'Ensure the launch area is clear',
      'Use appropriate launch velocities'
    ],
    realLab: 'In a real lab, you would use motion sensors and video analysis for precise trajectory data.'
  },
  spring: {
    ppe: ['none-required'],
    hazards: [
      'Springs can snap back unexpectedly',
      'Do not overstretch the spring beyond its limit',
      'Secure the spring properly before testing'
    ],
    realLab: 'In a real lab, you would use force sensors and data loggers to measure the relationship between force and extension.'
  }
};

export default experiments;
