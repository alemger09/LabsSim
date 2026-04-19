import { ContactShadows, Environment, Line, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ─── Acid-Base Experiment ─────────────────────────────────── */
function AcidBase({ simState, running }) {
  const bubbleGroupRef = useRef();
  const fillScale = useMemo(
    () => 0.75 + Math.max(0, Math.min(1, (simState.volume - 10) / 90)),
    [simState.volume]
  );
  const bubbles = useMemo(() => {
    const arr = [];
    const count = Math.min(16, simState.bubbles);
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        speed: 0.02 + Math.random() * 0.02,
        offset: Math.random() * Math.PI * 2,
        pos: [(Math.random() - 0.5) * 1.2, -0.5 + Math.random() * 1.8, (Math.random() - 0.5) * 0.8],
      });
    }
    return arr;
  }, [simState.bubbles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (running && simState.bubbles > 0 && bubbleGroupRef.current) {
      bubbleGroupRef.current.children.forEach((bubble) => {
        bubble.position.y += bubble.userData.speed;
        bubble.position.x += Math.sin(time + bubble.userData.offset) * 0.002;
        if (bubble.position.y > 2.4) bubble.position.y = -0.5;
      });
    }
  });

  const liquidColor = new THREE.Color(simState.color || 0x64b490);

  return (
    <group>
      <mesh position={[0, 1.2, 0]} scale={[1, fillScale, 1]} castShadow>
        <cylinderGeometry args={[1.05, 0.85, 2.4, 48]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transparent
          opacity={0.88}
          roughness={0.18}
          metalness={0}
          transmission={0.55}
          thickness={0.6}
          ior={1.33}
        />
      </mesh>
      <mesh position={[0, 1.2 + 1.2 * fillScale, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={running && simState.bubbles > 0}>
        <circleGeometry args={[1.04, 40]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.28} roughness={0.35} />
      </mesh>
      <group ref={bubbleGroupRef} visible={running && simState.bubbles > 0}>
        {bubbles.map((b) => (
          <mesh key={b.id} position={b.pos} userData={{ speed: b.speed, offset: b.offset }}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshPhysicalMaterial color="#f0f9ff" transparent opacity={0.82} roughness={0.25} transmission={0.2} thickness={0.2} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[1.2, 0.9, 3.4, 40, 1, true]} />
        <meshPhysicalMaterial color="#bae6fd" transparent opacity={0.22} side={THREE.DoubleSide} roughness={0.08} metalness={0} transmission={0.85} thickness={0.15} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <torusGeometry args={[1.2, 0.045, 10, 48]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.35} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[0.9, 0.045, 10, 48]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.35} />
      </mesh>
    </group>
  );
}

/* ─── Pendulum Experiment ───────────────────────────────────── */
function Pendulum({ simState, running }) {
  const PIVOT = new THREE.Vector3(0, 4, 0);
  const L = simState.length;
  const bobRadius = 0.2 + (simState.mass || 1) * 0.04;

  const bobMeshRef = useRef();
  const stringMeshRef = useRef();

  const theta0 = 0.6;

  useFrame((state) => {
    if (!running) return;
    const t = state.clock.getElapsedTime();
    const g = simState.gravity || 9.81;
    const omega = Math.sqrt(g / L);
    const theta = theta0 * Math.cos(omega * t);

    const bobX = PIVOT.x + Math.sin(theta) * L;
    const bobY = PIVOT.y - Math.cos(theta) * L;

    if (bobMeshRef.current) {
      bobMeshRef.current.position.set(bobX, bobY, 0);
    }

    if (stringMeshRef.current) {
      stringMeshRef.current.position.set((PIVOT.x + bobX) / 2, (PIVOT.y + bobY) / 2, 0);
      const dir = new THREE.Vector3(bobX - PIVOT.x, bobY - PIVOT.y, 0).normalize();
      stringMeshRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      stringMeshRef.current.scale.set(1, L, 1);
    }
  });

  return (
    <group>
      <mesh position={[PIVOT.x, PIVOT.y, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.8, 20]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15} />
      </mesh>

      <mesh ref={stringMeshRef} position={[PIVOT.x, PIVOT.y - L / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1, 10]} />
        <meshStandardMaterial color="#64748b" roughness={0.45} />
      </mesh>

      <mesh ref={bobMeshRef} position={[Math.sin(0.6) * L, PIVOT.y - Math.cos(0.6) * L, 0]} castShadow>
        <sphereGeometry args={[bobRadius, 40, 40]} />
        <meshStandardMaterial color="#a855f7" metalness={0.7} roughness={0.12} />
      </mesh>
    </group>
  );
}

/* ─── Projectile Motion Experiment ───────────────────────────── */
function Projectile({ simState, running }) {
  const ballRef = useRef();
  const startTime = useRef(null);

  const angle = ((simState.angle ?? 45) * Math.PI) / 180;
  const speed = simState.speed ?? 15;
  const g = simState.gravity ?? 9.81;
  const SCALE = 0.4;
  const ORIGIN = new THREE.Vector3(-5, 0.2, 0);

  const trajectoryPoints = useMemo(() => {
    const pts = [];
    const tFlight = (2 * speed * Math.sin(angle)) / g;
    const steps = 72;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tFlight;
      const x = speed * Math.cos(angle) * t;
      const y = speed * Math.sin(angle) * t - 0.5 * g * t * t;
      pts.push(new THREE.Vector3(ORIGIN.x + x * SCALE, ORIGIN.y + y * SCALE, 0));
    }
    return pts;
  }, [angle, speed, g]);

  useFrame((state) => {
    if (!running) {
      startTime.current = null;
      if (ballRef.current) {
        ballRef.current.position.set(ORIGIN.x, ORIGIN.y, 0);
      }
      return;
    }
    if (startTime.current === null) startTime.current = state.clock.getElapsedTime();
    const elapsed = state.clock.getElapsedTime() - startTime.current;

    const tFlight = (2 * speed * Math.sin(angle)) / g;
    const t = elapsed % (tFlight + 0.8);

    if (t <= tFlight) {
      const x = ORIGIN.x + speed * Math.cos(angle) * t * SCALE;
      const y = ORIGIN.y + (speed * Math.sin(angle) * t - 0.5 * g * t * t) * SCALE;
      if (ballRef.current) ballRef.current.position.set(x, y, 0);
    } else if (ballRef.current) {
      ballRef.current.position.set(ORIGIN.x, ORIGIN.y, 0);
    }
  });

  return (
    <group>
      <mesh position={[ORIGIN.x - 0.3, ORIGIN.y + 0.3, 0]} rotation={[0, 0, angle]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.2, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.65} roughness={0.28} />
      </mesh>

      {trajectoryPoints.length > 1 && (
        <Line
          points={trajectoryPoints}
          color="#a855f7"
          lineWidth={1.5}
          dashed
          dashSize={0.2}
          gapSize={0.15}
          transparent
          opacity={0.45}
        />
      )}

      <mesh ref={ballRef} position={[ORIGIN.x, ORIGIN.y, 0]} castShadow>
        <sphereGeometry args={[0.18, 28, 28]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.55} roughness={0.18} />
      </mesh>

      <mesh position={[ORIGIN.x + (simState.range ?? 0) * SCALE, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.65} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─── Mass–Spring Experiment ─────────────────────────────────── */
function MassSpring({ simState, running }) {
  const anchorY = 5;
  const naturalLength = 2.5;
  const yEq = anchorY - naturalLength;
  const omega = simState.omega ?? 4;
  const A = simState.amplitude ?? 0.35;

  const massGroupRef = useRef();
  const springScaleRef = useRef();

  const helixCurve = useMemo(() => {
    const pts = [];
    const turns = 9;
    const r = 0.11;
    const h = naturalLength;
    for (let i = 0; i <= 96; i++) {
      const t = i / 96;
      const y = -t * h;
      const ang = t * Math.PI * 2 * turns;
      pts.push(new THREE.Vector3(Math.cos(ang) * r, y, Math.sin(ang) * r));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let massY = yEq + A;
    if (running) {
      massY = yEq + A * Math.cos(omega * t);
    }
    const springLen = anchorY - massY;
    const scale = Math.max(0.12, springLen / naturalLength);
    if (springScaleRef.current) {
      springScaleRef.current.scale.set(1, scale, 1);
    }
    if (massGroupRef.current) {
      massGroupRef.current.position.set(0, massY, 0);
    }
  });

  const bobR = 0.26 + (simState.mass || 1) * 0.05;

  return (
    <group>
      <mesh position={[0, anchorY + 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.22, 0.45]} />
        <meshStandardMaterial color="#334155" metalness={0.55} roughness={0.3} />
      </mesh>

      <group position={[0, anchorY, 0]}>
        <group ref={springScaleRef}>
          <mesh castShadow>
            <tubeGeometry args={[helixCurve, 120, 0.052, 12, false]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.32} />
          </mesh>
        </group>
      </group>

      <group ref={massGroupRef} position={[0, yEq + A, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[bobR, 40, 40]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.68} roughness={0.16} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Ohm’s Law (visual circuit) ───────────────────────────── */
function CircuitOhmScene({ simState }) {
  const I = simState.current ?? 0;
  const glow = Math.min(2.4, 0.15 + I * 1.4);

  return (
    <group position={[3.15, 0.34, 0.9]}>
      <mesh position={[-0.62, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.62, 0.34]} />
        <meshStandardMaterial color="#166534" metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[-0.62, 0.42, 0.19]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.06]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.25} />
      </mesh>

      <mesh position={[0.62, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.26, 0.26]} />
        <meshStandardMaterial color="#c2410c" metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh position={[0.62, 0.08, 0.14]} castShadow>
        <boxGeometry args={[0.64, 0.05, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.14, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 1.15, 20]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.65}
          roughness={0.22}
          emissive="#fbbf24"
          emissiveIntensity={glow}
        />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={glow * 0.85} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ─── Static Lab Bench ─────────────────────────────────────── */
function PhysicalLabBench() {
  const [benchRef] = useBox(() => ({
    args: [14, 0.45, 7],
    position: [0, -0.25, 0],
    type: 'Static',
  }));
  return (
    <>
      <mesh ref={benchRef} receiveShadow castShadow>
        <boxGeometry args={[14, 0.45, 7]} />
        <meshStandardMaterial color="#e8edf3" roughness={0.55} metalness={0.05} />
      </mesh>
      {[[-5, -2, -2], [5, -2, -2], [-5, -2, 2], [5, -2, 2]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.32, 3.5, 0.32]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.48} metalness={0.15} />
        </mesh>
      ))}
      <mesh position={[-4, 1.75, 0]} castShadow>
        <boxGeometry args={[0.32, 3.5, 0.32]} />
        <meshStandardMaterial color="#475569" roughness={0.45} />
      </mesh>
      <mesh position={[-2.35, 3.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3.5, 14]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.35} />
      </mesh>
      <gridHelper args={[12, 12, 0xb8c5d9, 0xdde3ef]} position={[0, 0.02, 0]} />
    </>
  );
}

function cameraDistance(experimentKey) {
  if (experimentKey === 'projectile') return 18;
  if (experimentKey === 'circuitOhm') return 14;
  return 11;
}

/* ─── Root Scene ───────────────────────────────────────────── */
export default function Scene({ experimentKey, simState, running }) {
  const camZ = cameraDistance(experimentKey);
  const targetY = experimentKey === 'circuitOhm' ? 1.2 : 1.5;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.2, camZ]} fov={46} near={0.1} far={80} />
      <OrbitControls
        target={[0, targetY, 0]}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2 - 0.08}
        minDistance={6}
        maxDistance={32}
      />

      <color attach="background" args={['#eef2f8']} />
      <fog attach="fog" args={['#eef2f8', 18, 55]} />

      <ambientLight intensity={0.55} color="#e8f4fc" />
      <hemisphereLight intensity={0.35} color="#f0f9ff" groundColor="#94a3b8" />
      <directionalLight
        castShadow
        position={[9, 16, 7]}
        intensity={1.25}
        color="#fff7ed"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={40}
        shadow-camera-near={0.5}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.00025}
      />
      <directionalLight position={[-7, 5, -5]} intensity={0.38} color="#bfdbfe" />
      <pointLight position={[1, 7, 4]} intensity={0.45} color="#e0f2fe" />

      <Environment preset="city" environmentIntensity={0.85} />

      <mesh position={[0, -0.8, -6]} receiveShadow>
        <planeGeometry args={[48, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.95} metalness={0} />
      </mesh>

      <Physics gravity={[0, -9.81, 0]}>
        <PhysicalLabBench />
      </Physics>

      <ContactShadows position={[0, 0.06, 0]} opacity={0.42} scale={22} blur={2.2} far={10} color="#1e293b" />

      {experimentKey === 'acidBase' && <AcidBase simState={simState} running={running} />}
      {experimentKey === 'pendulum' && <Pendulum simState={simState} running={running} />}
      {experimentKey === 'projectile' && <Projectile simState={simState} running={running} />}
      {experimentKey === 'spring' && <MassSpring simState={simState} running={running} />}
      {experimentKey === 'circuitOhm' && <CircuitOhmScene simState={simState} />}
    </>
  );
}
