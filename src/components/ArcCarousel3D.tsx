import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArcCarousel3DProps {
  slides: Array<{
    slug: string;
    title: string;
    subtitle: string;
    pdpUrl: string;
  }>;
  className?: string;
}

export const ArcCarousel3D = ({ slides, className }: ArcCarousel3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const modelsRef = useRef<THREE.Object3D[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const touchStartX = useRef<number>(0);
  const activeIndexRef = useRef<number>(2);
  
  const [activeIndex, setActiveIndex] = useState(2); // Start at center
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Calculate transform for each instance based on distance from active
  const getTransform = (d: number) => {
    return {
      position: {
        x: d * 1.15,
        y: 0,
        z: -Math.abs(d) * 0.35
      },
      rotation: {
        x: THREE.MathUtils.degToRad(-8 - 2 * Math.abs(d)),
        y: THREE.MathUtils.degToRad(-12 * d),
        z: 0
      },
      scale: 1.15 - 0.12 * Math.abs(d),
      opacity: 1.0 - 0.08 * Math.abs(d)
    };
  };

  // Mouse parallax handler
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup: FOV 32°, position (0, 0.18, 5.0)
    const camera = new THREE.PerspectiveCamera(
      32,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.18, 5.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load HDRI environment
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "/hdris/studio_small_08_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      },
      undefined,
      (error) => console.error("HDRI load error:", error)
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.4);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "/models/noori_placeholder.glb",
      (gltf) => {
        console.log("GLB loaded", gltf);
        const baseModel = gltf.scene;
        
        // Normalize model width to ~1.0 scene unit
        const box = new THREE.Box3().setFromObject(baseModel);
        const size = box.getSize(new THREE.Vector3());
        const width = Math.max(size.x, 1e-6);
        const scale = 1.0 / width;
        baseModel.scale.setScalar(scale);

        // Recompute bounds after scaling and center the model at origin
        const boxScaled = new THREE.Box3().setFromObject(baseModel);
        const centerScaled = boxScaled.getCenter(new THREE.Vector3());
        baseModel.position.sub(centerScaled);

        // Brighten materials for visibility
        baseModel.traverse((child) => {
          if ((child as any).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = (mesh.material as any);
            if (mat && 'metalness' in mat) {
              mat.metalness = 0.8;
              mat.roughness = 0.25;
              if (!mat.color?.isColor) mat.color = new THREE.Color(0xC9A227);
            }
          }
        });

        // Create 5 instances
        for (let i = 0; i < 5; i++) {
          const instance = baseModel.clone(true);
          instance.traverse((child) => {
            if ((child as any).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });
          
          // Add shadow blob under each instance
          const shadowGeometry = new THREE.CircleGeometry(0.3, 32);
          const shadowMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.35,
            depthWrite: false
          });
          const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.y = -0.01;
          instance.add(shadow);
          (instance as any).shadowBlob = shadowMaterial;

          scene.add(instance);
          modelsRef.current.push(instance);
        }

        setIsLoaded(true);

        // Set initial transforms immediately
        modelsRef.current.forEach((model, i) => {
          const d = i - activeIndexRef.current;
          const t = getTransform(d);
          model.position.set(t.position.x, t.position.y, t.position.z);
          model.rotation.set(t.rotation.x, t.rotation.y, 0);
          model.scale.set(t.scale, t.scale, t.scale);
          // Shadow sizing per scale
          const shadow = (model as any).children?.find((c: any) => (c as any).geometry instanceof THREE.CircleGeometry) as THREE.Mesh | undefined;
          if (shadow) {
            shadow.scale.set(t.scale, t.scale, 1);
            (model as any).shadowBlob.opacity = d === 0 ? 0.35 : Math.abs(d) === 1 ? 0.25 : 0.18;
          }
        });
      },
      undefined,
      (error) => {
        console.error("Model load error:", error);
      }
    );

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (modelsRef.current.length > 0) {
        // Update each model position based on activeIndex
        modelsRef.current.forEach((model, i) => {
          const d = i - activeIndexRef.current;
          const transform = getTransform(d);

          // Target position with optional bobbing
          const bob = d === 0 && !prefersReducedMotion ? Math.sin(Date.now() * 0.001) * 0.01 : 0;
          const targetPos = new THREE.Vector3(transform.position.x, transform.position.y + bob, transform.position.z);

          // Smooth transition to target transform
          model.position.lerp(targetPos, 0.12);
          model.rotation.x += (transform.rotation.x - model.rotation.x) * 0.12;
          model.rotation.y += (transform.rotation.y - model.rotation.y) * 0.12;
          model.scale.lerp(
            new THREE.Vector3(transform.scale, transform.scale, transform.scale),
            0.12
          );

          // Update shadow opacity and size based on distance
          if ((model as any).shadowBlob) {
            const shadowOpacity = d === 0 ? 0.35 : Math.abs(d) === 1 ? 0.25 : 0.18;
            (model as any).shadowBlob.opacity += (shadowOpacity - (model as any).shadowBlob.opacity) * 0.12;
            const shadowMesh = (model as any).children?.find((c: any) => c.geometry instanceof THREE.CircleGeometry) as THREE.Mesh | undefined;
            if (shadowMesh) {
              const s = transform.scale;
              shadowMesh.scale.set(s, s, 1);
            }
          }
        });

        // Camera parallax
        if (cameraRef.current && !prefersReducedMotion) {
          const targetRotationY = mouseRef.current.x * THREE.MathUtils.degToRad(5);
          const targetRotationX = mouseRef.current.y * THREE.MathUtils.degToRad(2);
          cameraRef.current.rotation.y += (targetRotationY - cameraRef.current.rotation.y) * 0.05;
          cameraRef.current.rotation.x += (targetRotationX - cameraRef.current.rotation.x) * 0.05;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const currentSlide = slides[activeIndex];

  return (
    <div className={cn("relative w-full h-screen bg-[#0B0B0B]", className)}>
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#E7E5DC]">Loading 3D carousel...</div>
        </div>
      )}

      {/* Content overlay */}
      {isLoaded && (
        <>
          {/* Slide info */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[#F8F7F3] mb-3">
              {currentSlide.title}
            </h2>
            <p className="text-[#E7E5DC] mb-6">{currentSlide.subtitle}</p>
            <a
              href={currentSlide.pdpUrl}
              className="inline-block px-8 py-3 border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B0B0B] transition-all duration-300 rounded-full font-medium"
            >
              View Product
            </a>
          </div>

          {/* Navigation */}
          <Button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 z-20"
            size="icon"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-[#F8F7F3]" />
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 z-20"
            size="icon"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-[#F8F7F3]" />
          </Button>

          {/* Dot navigation */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <span className="text-[#E7E5DC] font-mono text-sm">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-[#C9A227] w-8"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
