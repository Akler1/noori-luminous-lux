import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Hero3DProps {
  reducedMotion: boolean;
}

interface HeroConfig {
  mode: 'abstract' | 'proxy' | 'product';
  assets: {
    poster: string;
    videoFallback: string;
    hdri: string;
    glb: string | null;
  };
  scrollPinPct: number;
  camera: {
    fov: number;
    yaw: number;
    elev: number;
    limits: {
      yaw: number;
      elev: number;
    };
  };
  performance: {
    maxPixelRatio: number;
    enableBloom: boolean;
    maxParticles: number;
    enableMobileOptimizations: boolean;
  };
}

export const Hero3D = ({ reducedMotion }: Hero3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const lightGroupRef = useRef<THREE.Group>();
  const particlesRef = useRef<THREE.Points>();
  const animationFrameRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [config, setConfig] = useState<HeroConfig | null>(null);

  // Keyframe data for bezier path animation
  const keyframes = {
    path: [
      [0.6, 0.1, 0.0],    // Start: off-right
      [0.2, 0.05, 0.0],   // Control point 1
      [-0.1, -0.04, 0.06], // Control point 2
      [0.0, 0.0, 0.0]     // End: center
    ],
    cameraYaw: [-25, -10],
    rollDeg: [0, 4]
  };

  // Load config
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config/hero.json');
        const heroConfig = await response.json();
        setConfig(heroConfig);
      } catch (error) {
        console.warn('Failed to load hero config, using defaults');
        // Default config fallback
        setConfig({
          mode: 'abstract',
          assets: {
            poster: '',
            videoFallback: '',
            hdri: '',
            glb: null
          },
          scrollPinPct: 1.3,
          camera: { fov: 35, yaw: -20, elev: 10, limits: { yaw: 15, elev: 20 } },
          performance: { maxPixelRatio: 1.5, enableBloom: true, maxParticles: 150, enableMobileOptimizations: true }
        });
      }
    };
    loadConfig();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current || reducedMotion || !config) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      config.camera.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.performance.maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera setup
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);

    // Create abstract light performance
    if (config.mode === 'abstract') {
      createAbstractLightPerformance(scene);
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Update particles and effects
      updateLightEffects();
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);

    // Analytics: fire view_promotion on hero visible
    if ('gtag' in window) {
      (window as any).gtag('event', 'view_promotion', {
        promotion_id: 'hero_light_performance',
        promotion_name: 'Hero Section',
        creative_name: 'Abstract Light',
        creative_slot: 'hero'
      });
    }

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion, config]);

  // Create abstract light performance
  const createAbstractLightPerformance = (scene: THREE.Scene) => {
    if (!config) return;
    
    const lightGroup = new THREE.Group();
    
    // 1. Caustic light shader - simulated with additive geometry
    const causticGeometry = new THREE.PlaneGeometry(4, 4, 32, 32);
    const causticMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          pos.z += sin(pos.x * 4.0 + time) * 0.1;
          pos.z += cos(pos.y * 4.0 + time * 0.7) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float intensity;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Diamond-like caustic pattern
          float caustic = sin(vPosition.x * 8.0 + time) * cos(vPosition.y * 8.0 + time * 0.8);
          caustic += sin(vPosition.x * 16.0 - time * 2.0) * cos(vPosition.y * 16.0 + time * 1.5) * 0.5;
          
          float fade = 1.0 - smoothstep(0.0, 0.8, dist);
          float alpha = caustic * fade * intensity * 0.15;
          
          vec3 color = vec3(0.788, 0.635, 0.153); // #C9A227 in RGB
          gl_FragColor = vec4(color, max(0.0, alpha));
        }
      `,
      uniforms: {
        time: { value: 0 },
        intensity: { value: 1.0 }
      }
    });
    
    const causticMesh = new THREE.Mesh(causticGeometry, causticMaterial);
    causticMesh.position.z = -1;
    lightGroup.add(causticMesh);

    // 2. Bezier ribbon path (faint line to echo necklace arc)
    const ribbonPoints = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      // Cubic bezier curve
      const x = Math.pow(1-t, 3) * keyframes.path[0][0] + 
                3 * Math.pow(1-t, 2) * t * keyframes.path[1][0] + 
                3 * (1-t) * Math.pow(t, 2) * keyframes.path[2][0] + 
                Math.pow(t, 3) * keyframes.path[3][0];
      const y = Math.pow(1-t, 3) * keyframes.path[0][1] + 
                3 * Math.pow(1-t, 2) * t * keyframes.path[1][1] + 
                3 * (1-t) * Math.pow(t, 2) * keyframes.path[2][1] + 
                Math.pow(t, 3) * keyframes.path[3][1];
      const z = Math.pow(1-t, 3) * keyframes.path[0][2] + 
                3 * Math.pow(1-t, 2) * t * keyframes.path[1][2] + 
                3 * (1-t) * Math.pow(t, 2) * keyframes.path[2][2] + 
                Math.pow(t, 3) * keyframes.path[3][2];
      ribbonPoints.push(new THREE.Vector3(x, y, z));
    }
    
    const ribbonGeometry = new THREE.BufferGeometry().setFromPoints(ribbonPoints);
    const ribbonMaterial = new THREE.LineBasicMaterial({ 
      color: 0xC9A227, 
      transparent: true, 
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const ribbonLine = new THREE.Line(ribbonGeometry, ribbonMaterial);
    lightGroup.add(ribbonLine);

    // 3. Light motes (instanced particles)
    const particleCount = Math.min(config.performance.maxParticles, 150);
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = Math.random() * 0.02 + 0.005;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    particleGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xC9A227,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      size: 2
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    lightGroup.add(particles);
    particlesRef.current = particles;

    // Position the light group
    lightGroup.position.set(keyframes.path[0][0], keyframes.path[0][1], keyframes.path[0][2]);
    lightGroup.scale.set(0.96, 0.96, 0.96);
    
    scene.add(lightGroup);
    lightGroupRef.current = lightGroup;
  };

  // Update light effects
  const updateLightEffects = () => {
    const time = Date.now() * 0.001;
    
    if (lightGroupRef.current) {
      // Find caustic material and update time
      lightGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          if (child.material.uniforms.time) {
            child.material.uniforms.time.value = time;
          }
        }
      });
      
      // Subtle idle rotation
      lightGroupRef.current.rotation.y += 0.001;
      lightGroupRef.current.rotation.z = Math.sin(time * 0.5) * 0.01;
    }
    
    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const phases = particlesRef.current.geometry.attributes.phase.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const phaseIndex = i / 3;
        positions[i + 1] += Math.sin(time + phases[phaseIndex]) * 0.001;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  };

  // Setup scroll animations
  useEffect(() => {
    if (!isLoaded || reducedMotion || !lightGroupRef.current || !cameraRef.current || !config) return;

    const lightGroup = lightGroupRef.current;
    const camera = cameraRef.current;

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: `${config.scrollPinPct * 100}% top`,
        scrub: 0.6,
        pin: true,
        pinSpacing: false
      }
    });

    // Keyframes for light group animation (mirrors the final jewelry plan)
    tl.to(lightGroup.position, {
      duration: 0.15,
      x: keyframes.path[1][0],
      y: keyframes.path[1][1],
      z: keyframes.path[1][2],
      ease: "power2.inOut"
    })
    .to(lightGroup.scale, {
      duration: 0.15,
      x: 1.0,
      y: 1.0,
      z: 1.0,
      ease: "power2.inOut"
    }, 0)
    .fromTo(lightGroup, {
      opacity: 0
    }, {
      duration: 0.15,
      opacity: 1,
      ease: "power2.inOut"
    }, 0)
    
    // Bezier path animation (S-curve)
    .to(lightGroup.position, {
      duration: 0.35,
      motionPath: {
        path: `M${keyframes.path[1][0]},${keyframes.path[1][1]} C${keyframes.path[2][0]},${keyframes.path[2][1]} ${keyframes.path[3][0]},${keyframes.path[3][1]} 0,0`,
        autoRotate: false
      },
      ease: "power2.inOut"
    })
    
    // Camera movement
    .to(camera.rotation, {
      duration: 0.65,
      y: THREE.MathUtils.degToRad(keyframes.cameraYaw[1]),
      ease: "power2.inOut"
    }, 0.15)
    
    // Light group roll
    .to(lightGroup.rotation, {
      duration: 0.3,
      z: THREE.MathUtils.degToRad(keyframes.rollDeg[1]),
      ease: "sine.inOut"
    }, 0.15)
    
    // Intensify light effects mid-journey
    .to({}, {
      duration: 0.35,
      onUpdate: function() {
        const progress = this.progress();
        if (lightGroupRef.current) {
          lightGroupRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
              if (child.material.uniforms.intensity) {
                child.material.uniforms.intensity.value = 1.0 + progress * 0.5;
              }
            }
          });
        }
      },
      ease: "power2.inOut"
    }, 0.15)
    
    // Idle breathing
    .to(lightGroup.position, {
      duration: 0.3,
      y: "+=0.01",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    }, 0.5)
    
    // Copy opacity animation (fade in by 60% through scroll)
    .to({}, {
      duration: 0.6,
      onUpdate: function() {
        const progress = this.progress();
        const copyElement = document.querySelector('#hero .text-left');
        if (copyElement && progress >= 0.6) {
          (copyElement as HTMLElement).style.opacity = String(0.6 + (progress - 0.6) * 1.0);
        }
      }
    }, 0)
    
    // Scroll cue fade
    .to({}, {
      duration: 0.2,
      onUpdate: function() {
        const progress = this.progress();
        const scrollCue = document.querySelector('#scroll-cue');
        if (scrollCue && progress >= 0.8) {
          (scrollCue as HTMLElement).style.opacity = String(1.0 - (progress - 0.8) * 5);
        }
      }
    }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded, reducedMotion, config]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-br from-[#C9A227]/20 to-transparent rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0"
      style={{ zIndex: 1 }}
    />
  );
};