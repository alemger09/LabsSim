import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Scene from './Scene';

export default function SimCanvas({ experimentKey, simState, running }) {
  return (
    <div className="card canvas-card">
      <div className="canvas-container">
        <Canvas
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <Scene experimentKey={experimentKey} simState={simState} running={running} />
        </Canvas>
      </div>
    </div>
  );
}
