import { useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface UseHeroScrollParams {
  group: THREE.Group | null;
  camera: THREE.PerspectiveCamera | null;
  pinPct: number; // e.g. 1.3
  reducedMotion: boolean;
}

const keyframes = {
  path: [
    [0.6, 0.1, 0.0],
    [0.2, 0.05, 0.0],
    [-0.1, -0.04, 0.06],
    [0.0, 0.0, 0.0],
  ],
  cameraYaw: [-25, -10],
  rollDeg: [0, 4],
};

export function useHeroScroll({ group, camera, pinPct, reducedMotion }: UseHeroScrollParams) {
  useEffect(() => {
    if (!group || !camera || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: `${pinPct * 100}% top`,
        scrub: 0.6,
        pin: true,
        pinSpacing: false,
      },
    });

    // 0.00–0.15: fade-in + drift from right; scale 0.96→1.00
    tl.to(group.position, {
      duration: 0.15,
      x: keyframes.path[1][0],
      y: keyframes.path[1][1],
      z: keyframes.path[1][2],
      ease: 'power2.inOut',
    })
      .to(
        group.scale,
        { duration: 0.15, x: 1.0, y: 1.0, z: 1.0, ease: 'power2.inOut' },
        0,
      )
      .fromTo(
        group,
        { visible: true, userData: { opacity: 0 } },
        {
          duration: 0.15,
          userData: { opacity: 1 },
          ease: 'power2.inOut',
        },
        0,
      )

      // 0.15–0.50: follow S-curve; camera yaw −25°→−10°; roll +4°
      .to(group.position, {
        duration: 0.35,
        motionPath: {
          path: `M${keyframes.path[1][0]},${keyframes.path[1][1]} C${keyframes.path[2][0]},${keyframes.path[2][1]} ${keyframes.path[3][0]},${keyframes.path[3][1]} 0,0`,
          autoRotate: false,
        },
        ease: 'power2.inOut',
      })
      .to(
        camera.rotation,
        { duration: 0.65, y: THREE.MathUtils.degToRad(keyframes.cameraYaw[1]), ease: 'power2.inOut' },
        0.15,
      )
      .to(
        group.rotation,
        { duration: 0.3, z: THREE.MathUtils.degToRad(keyframes.rollDeg[1]), ease: 'sine.inOut' },
        0.15,
      )

      // 0.50–0.80: idle “breath”
      .to(group.position, { duration: 0.3, y: '+=0.02', yoyo: true, repeat: -1, ease: 'sine.inOut' }, 0.5)

      // 0.80–1.00: copy opacity 0.6→1; cue fades
      .to(
        {},
        {
          duration: 0.6,
          onUpdate: function () {
            const progress = this.progress();
            const copy = document.querySelector('#hero .text-left') as HTMLElement | null;
            if (copy && progress >= 0.6) {
              copy.style.opacity = String(Math.min(1, 0.6 + (progress - 0.6) * 1.2));
            }
          },
        },
        0,
      )
      .to(
        {},
        {
          duration: 0.2,
          onUpdate: function () {
            const progress = this.progress();
            const cue = document.querySelector('#scroll-cue') as HTMLElement | null;
            if (cue && progress >= 0.8) {
              cue.style.opacity = String(Math.max(0, 1.0 - (progress - 0.8) * 5));
            }
          },
        },
        0.8,
      );

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const maxYaw = THREE.MathUtils.degToRad(6);
      camera.rotation.y = THREE.MathUtils.degToRad(-25) + nx * maxYaw;
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [group, camera, pinPct, reducedMotion]);
}
