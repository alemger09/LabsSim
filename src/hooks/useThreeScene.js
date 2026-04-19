import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function useThreeScene(containerRef, simState, running) {
  const rendererRef = useRef();
  const liquidMeshRef = useRef();
  const liquidSurfaceRef = useRef();
  const bubbleGroupRef = useRef();
  const animationFrameRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const runningRef = useRef(running);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f6fb);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 6, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 2, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.5, 6),
      new THREE.MeshStandardMaterial({ color: 0xe7ecef })
    );
    bench.position.set(0, -0.25, 0);
    scene.add(bench);

    const stand = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 3.5, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x6b7280 })
    );
    stand.position.set(-3, 1.75, 0);
    scene.add(stand);

    const flask = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 0.9, 3.4, 32, 1, true),
      new THREE.MeshPhysicalMaterial({
        color: 0xeaf2ff,
        transparent: true,
        opacity: 0.22,
        roughness: 0.05,
        metalness: 0,
        transmission: 0.92,
        thickness: 1.1,
        clearcoat: 0.92,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      })
    );
    flask.position.set(0, 1.5, 0);
    scene.add(flask);

    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x64b490,
      transparent: true,
      opacity: 0.92,
      roughness: 0.35,
      clearcoat: 0.35,
      clearcoatRoughness: 0.6,
    });
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 0.85, 2.4, 32), liquidMaterial);
    liquid.position.set(0, 1.2, 0);
    liquidMeshRef.current = liquid;
    scene.add(liquid);

    const liquidSurface = new THREE.Mesh(
      new THREE.CircleGeometry(1.04, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, roughness: 0.5 })
    );
    liquidSurface.rotation.x = -Math.PI / 2;
    liquidSurface.position.set(0, 2.4, 0);
    liquidSurfaceRef.current = liquidSurface;
    scene.add(liquidSurface);

    const bubbleGroup = new THREE.Group();
    bubbleGroupRef.current = bubbleGroup;
    scene.add(bubbleGroup);

    for (let i = 0; i < 16; i += 1) {
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.08 + Math.random() * 0.05, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.75, roughness: 0.2 })
      );
      bubble.position.set((Math.random() - 0.5) * 1.2, -0.5 + Math.random() * 1.8, (Math.random() - 0.5) * 0.8);
      bubble.userData = { speed: 0.02 + Math.random() * 0.02, offset: Math.random() * Math.PI * 2 };
      bubbleGroup.add(bubble);
    }

    const grid = new THREE.GridHelper(14, 14, 0x9ca3af, 0xd1d5db);
    grid.position.y = -0.25;
    scene.add(grid);

    const animate = () => {
      controls.update();
      const time = performance.now() * 0.001;

      if (runningRef.current) {
        bubbleGroup.children.forEach((bubble) => {
          bubble.position.y += bubble.userData.speed;
          bubble.position.x += Math.sin(time + bubble.userData.offset) * 0.001;
          if (bubble.position.y > 2.4) {
            bubble.position.y = -0.5;
          }
        });
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [containerRef]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    if (!liquidMeshRef.current) return;
    liquidMeshRef.current.material.color.setHex(simState.color ?? 0x64b490);
    const fillScale = 0.75 + Math.max(0, Math.min(1, (simState.volume - 10) / 90));
    liquidMeshRef.current.scale.y = fillScale;
    if (liquidSurfaceRef.current) {
      liquidSurfaceRef.current.position.y = 1.2 + 1.2 * fillScale;
      liquidSurfaceRef.current.visible = running && simState.bubbles > 0;
    }
    if (bubbleGroupRef.current) {
      bubbleGroupRef.current.visible = running && simState.bubbles > 0;
    }
  }, [simState, running]);
}
