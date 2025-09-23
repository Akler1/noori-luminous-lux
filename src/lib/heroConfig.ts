export type HeroMode = 'abstract' | 'proxy' | 'product';

export interface HeroConfig {
  mode: HeroMode;
  assets: {
    poster: string;
    videoFallback: string;
    hdri: string;
    glb: string | null;
  };
  scrollPinPct: number; // e.g. 1.3 for 130%
  camera: {
    fov: number;
    yaw: number; // initial yaw deg
    elev: number; // initial elevation deg
    limits: {
      yaw: number; // +/- deg
      elev: number; // 0..deg
    };
  };
  performance: {
    maxPixelRatio: number;
    enableBloom: boolean;
    maxParticles: number;
    enableMobileOptimizations: boolean;
  };
}

const defaultConfig: HeroConfig = {
  mode: 'abstract',
  assets: { poster: '/media/hero/poster.avif', videoFallback: '/media/hero/loop.webm', hdri: '/hdr/studio_black.exr', glb: null },
  scrollPinPct: 1.3,
  camera: { fov: 35, yaw: -20, elev: 10, limits: { yaw: 15, elev: 20 } },
  performance: { maxPixelRatio: 1.5, enableBloom: true, maxParticles: 150, enableMobileOptimizations: true },
};

export async function fetchHeroConfig(): Promise<HeroConfig> {
  try {
    const res = await fetch('/config/hero.json');
    const cfg = (await res.json()) as HeroConfig;
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode') as HeroMode | null;
    const mode = modeParam ?? cfg.mode ?? defaultConfig.mode;
    return { ...defaultConfig, ...cfg, mode };
  } catch {
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode') as HeroMode | null;
    return { ...defaultConfig, mode: modeParam ?? defaultConfig.mode };
  }
}
