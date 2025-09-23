import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createAbstractLightScene } from './scenes/AbstractLightScene';
import { createProxyJewelScene } from './scenes/ProxyJewelScene';
import type { HeroConfig, HeroMode } from '@/lib/heroConfig';

export interface HeroCanvasReady {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  group: THREE.Group;
}

export function HeroCanvas({ mode, config, reducedMotion, onReady }: { mode: HeroMode; config: HeroConfig; reducedMotion: boolean; onReady: (ctx: HeroCanvasReady) => void; }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current || reducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(config.camera.fov, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.performance.maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);

    // Lights (soft, no hard shadows)
    scene.add(new THREE.AmbientLight(0x404040, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(2, 4, 2); scene.add(key);
    const rim = new THREE.DirectionalLight(0xC9A227, 0.8); rim.position.set(-2, 1, -1); scene.add(rim);

    // Mode-specific content
    let update = (t: number) => {};
    let group: THREE.Group;
    if (mode === 'abstract') {
      const s = createAbstractLightScene();
      group = s.root; update = s.update;
    } else {
      const s = createProxyJewelScene();
      group = s.root; update = s.update;
    }

    // Start position and scale per spec
    group.position.set(0.6, 0.1, 0);
    group.scale.set(0.96, 0.96, 0.96);
    scene.add(group);

    onReady({ scene, camera, renderer, group });

    let raf = 0;
    const animate = () => {
      const t = performance.now() * 0.001;
      update(t);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (rendererRef.current && mountRef.current) mountRef.current.removeChild(rendererRef.current.domElement);
      renderer.dispose();
    };
  }, [mode, config, reducedMotion, onReady]);

  if (reducedMotion) return null;

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
