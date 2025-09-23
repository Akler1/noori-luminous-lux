import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Hero3DProps {
  reducedMotion: boolean;
}

export const Hero3D = ({ reducedMotion }: Hero3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const modelRef = useRef<THREE.Group>();
  const animationFrameRef = useRef<number>();
  const materialsRef = useRef<THREE.Material[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (!mountRef.current || reducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
    camera.rotation.y = THREE.MathUtils.degToRad(-25);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 4, 2);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-2, 1, -1);
    scene.add(rimLight);

    // HDRI environment (simplified - using gradient for now)
    scene.background = null; // Keep transparent for CSS background

    // Load jewelry model (placeholder with simple geometry for now)
    const createJewelryPlaceholder = () => {
      const group = new THREE.Group();
      
      // Main pendant (diamond-like shape)
      const pendantGeometry = new THREE.OctahedronGeometry(0.15, 2);
      const pendantMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.9,
        transparent: true,
        opacity: 0.6,
        ior: 2.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      materialsRef.current.push(pendantMaterial);
      const pendant = new THREE.Mesh(pendantGeometry, pendantMaterial);
      group.add(pendant);

      // Chain (simplified)
      const chainGeometry = new THREE.TorusGeometry(0.8, 0.005, 6, 50);
      const chainMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xc0c0c0,
        metalness: 1.0,
        roughness: 0.1,
        transparent: true,
        opacity: 0.6
      });
      materialsRef.current.push(chainMaterial);
      const chain = new THREE.Mesh(chainGeometry, chainMaterial);
      chain.rotation.x = Math.PI / 2;
      group.add(chain);

      return group;
    };

    const jewelryModel = createJewelryPlaceholder();
    jewelryModel.position.set(0.6, 0.1, 0); // Start position
    jewelryModel.scale.set(0.96, 0.96, 0.96); // Start scale
    scene.add(jewelryModel);
    modelRef.current = jewelryModel;

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        // Subtle idle rotation when not scrolling
        modelRef.current.rotation.y += 0.002;
        modelRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.02;
      }

      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);

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
  }, [reducedMotion]);

  // Setup scroll animations
  useEffect(() => {
    if (!isLoaded || reducedMotion || !modelRef.current || !cameraRef.current) return;

    const model = modelRef.current;
    const camera = cameraRef.current;

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=140%",
        scrub: 0.6,
        pin: true
      }
    });

    // Keyframes for model animation
    tl.to(model.position, {
      duration: 0.15,
      x: keyframes.path[1][0],
      y: keyframes.path[1][1],
      z: keyframes.path[1][2],
      ease: "power2.inOut"
    })
    .to(model.scale, {
      duration: 0.15,
      x: 1.0,
      y: 1.0,
      z: 1.0,
      ease: "power2.inOut"
    }, 0)
    .to(materialsRef.current as any, {
      duration: 0.15,
      opacity: 1,
      ease: "power2.inOut"
    }, 0)
    
    // Bezier path animation
    .to(model.position, {
      duration: 0.35,
      motionPath: {
        path: [
          { x: keyframes.path[1][0], y: keyframes.path[1][1] },
          { x: keyframes.path[2][0], y: keyframes.path[2][1] },
          { x: keyframes.path[3][0], y: keyframes.path[3][1] },
          { x: 0, y: 0 }
        ],
        curviness: 1,
        autoRotate: false
      },
      z: 0,
      ease: "power2.inOut"
    })
    
    // Camera movement
    .to(camera.rotation, {
      duration: 0.65,
      y: THREE.MathUtils.degToRad(keyframes.cameraYaw[1]),
      ease: "power2.inOut"
    }, 0.15)
    
    // Model roll
    .to(model.rotation, {
      duration: 0.3,
      z: THREE.MathUtils.degToRad(keyframes.rollDeg[1]),
      ease: "sine.inOut"
    }, 0.15)
    
    // Idle breathing
    .to(model.position, {
      duration: 0.3,
      y: "+=0.02",
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
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