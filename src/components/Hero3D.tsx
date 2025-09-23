import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';
import { HeroCanvas, type HeroCanvasReady } from './hero/HeroCanvas';
import { fetchHeroConfig, type HeroConfig } from '@/lib/heroConfig';
import { useHeroScroll } from '@/hooks/useHeroScroll';

interface Hero3DProps { reducedMotion: boolean; }

export const Hero3D = ({ reducedMotion }: Hero3DProps) => {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchHeroConfig().then((c) => { if (mounted) setConfig(c); });
    return () => { mounted = false; };
  }, []);

  useHeroScroll({ group: groupRef.current, camera: cameraRef.current, pinPct: config?.scrollPinPct ?? 1.3, reducedMotion });

  const handleReady = ({ camera, group }: HeroCanvasReady) => {
    cameraRef.current = camera;
    groupRef.current = group;
    // Fire analytics on first ready
    if ('gtag' in window) {
      (window as any).gtag('event', 'view_promotion', {
        promotion_id: 'hero_light', promotion_name: 'Hero', creative_name: config?.mode ?? 'abstract', creative_slot: 'hero'
      });
    }
  };

  if (reducedMotion) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <img src="/media/hero/poster.avif" alt="Abstract light poster" className="h-full w-full object-cover" />
        </picture>
      </div>
    );
  }

  if (!config) return null;

  return (
    <HeroCanvas mode={config.mode === 'product' ? 'proxy' : config.mode} config={config} reducedMotion={reducedMotion} onReady={handleReady} />
  );
};
