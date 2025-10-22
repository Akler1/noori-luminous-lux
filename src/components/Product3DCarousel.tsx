import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface CarouselConfig {
  carouselTitle: string;
  mode: "singleGlb" | "perSlide";
  placeholder: {
    glb: string;
    poster: string;
    videoFallback: string;
    hdri: string;
  };
  slides: Array<{
    slug: string;
    title: string;
    subtitle: string;
    pdpUrl: string;
    camera: {
      azimuthDeg: number;
      elevationDeg: number;
      fov: number;
    };
    glb?: string;
    poster?: string;
    videoFallback?: string;
  }>;
}

export default function Product3DCarousel() {
  const [config, setConfig] = useState<CarouselConfig | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const scenesRef = useRef<Array<{ scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; controls: OrbitControls; mixer?: THREE.AnimationMixer } | null>>([]);
  const animationFrameIds = useRef<Array<number>>([]);

  // Load config
  useEffect(() => {
    fetch("/data/carousel-config.json")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Failed to load carousel config:", err));
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Setup Three.js scenes
  const setupScene = useCallback((canvas: HTMLCanvasElement, modelPath: string, camera: { azimuthDeg: number; elevationDeg: number; fov: number }, index: number, autoRotate = false) => {
    const scene = new THREE.Scene();
    const threeCamera = new THREE.PerspectiveCamera(
      camera.fov,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Controls
    const controls = new OrbitControls(threeCamera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;

    // Set camera position based on config
    const azimuthRad = (camera.azimuthDeg * Math.PI) / 180;
    const elevationRad = (camera.elevationDeg * Math.PI) / 180;
    const radius = 2;
    
    threeCamera.position.x = radius * Math.cos(elevationRad) * Math.sin(azimuthRad);
    threeCamera.position.y = radius * Math.sin(elevationRad);
    threeCamera.position.z = radius * Math.cos(elevationRad) * Math.cos(azimuthRad);
    threeCamera.lookAt(0, 0, 0);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        // Apply diamond material settings to transparent materials
        gltf.scene.traverse((o: any) => {
          if (o.isMesh && o.material && o.material.type === "MeshPhysicalMaterial") {
            const m = o.material as THREE.MeshPhysicalMaterial;
            // Treat as diamond:
            m.metalness = 0.0;
            m.roughness = 0.02;
            m.specularIntensity = 1.0;
            m.clearcoat = 0.15;
            m.clearcoatRoughness = 0.08;
            m.ior = 2.4;
            m.transmission = 1.0;
            // Volume:
            m.thickness = 1.5;
            m.attenuationColor = new THREE.Color(0.96, 0.96, 0.98);
            m.attenuationDistance = 0.006;
            m.needsUpdate = true;
          }
        });

        // Center and scale model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.5 / maxDim;
        
        gltf.scene.scale.multiplyScalar(scale);
        gltf.scene.position.sub(center.multiplyScalar(scale));
        
        scene.add(gltf.scene);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          if (scenesRef.current[index]) {
            scenesRef.current[index]!.mixer = mixer;
          }
        }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    scenesRef.current[index] = { scene, camera: threeCamera, renderer, controls };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      controls.update();
      
      if (scenesRef.current[index]?.mixer) {
        scenesRef.current[index]!.mixer!.update(delta);
      }
      
      renderer.render(scene, threeCamera);
      animationFrameIds.current[index] = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      threeCamera.aspect = width / height;
      threeCamera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIds.current[index]) {
        cancelAnimationFrame(animationFrameIds.current[index]);
      }
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  // Initialize scenes when config loads
  useEffect(() => {
    if (!config || !isLoaded) return;

    const cleanups: Array<() => void> = [];

    // Setup current slide
    const currentCanvas = canvasRefs.current[1];
    if (currentCanvas) {
      const cleanup = setupScene(
        currentCanvas,
        getModelSource(config.slides[currentIndex]),
        config.slides[currentIndex].camera,
        1,
        false
      );
      cleanups.push(cleanup);
    }

    // Setup prev slide
    const prevCanvas = canvasRefs.current[0];
    if (prevCanvas) {
      const cleanup = setupScene(
        prevCanvas,
        getModelSource(config.slides[prevIndex]),
        config.slides[prevIndex].camera,
        0,
        true
      );
      cleanups.push(cleanup);
    }

    // Setup next slide
    const nextCanvas = canvasRefs.current[2];
    if (nextCanvas) {
      const cleanup = setupScene(
        nextCanvas,
        getModelSource(config.slides[nextIndex]),
        config.slides[nextIndex].camera,
        2,
        true
      );
      cleanups.push(cleanup);
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      scenesRef.current = [null, null, null];
    };
  }, [config, currentIndex, isLoaded, setupScene]);

  // Analytics tracking
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Analytics: carousel_view");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Track slide changes
  useEffect(() => {
    if (config) {
      console.log("Analytics: slide_change", {
        index: currentIndex,
        slug: config.slides[currentIndex].slug,
      });
    }
  }, [currentIndex, config]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!config) return;

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
  }, [config, currentIndex]);

  const goToNext = useCallback(() => {
    if (!config) return;
    setCurrentIndex((prev) => (prev + 1) % config.slides.length);
  }, [config]);

  const goToPrevious = useCallback(() => {
    if (!config) return;
    setCurrentIndex((prev) => (prev - 1 + config.slides.length) % config.slides.length);
  }, [config]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!config) return;

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

  const handleCTAClick = (pdpUrl: string) => {
    console.log("Analytics: cta_click", { pdpUrl });
  };

  if (!config) {
    return (
      <section
        id="product-3d-carousel"
        className="w-full py-24 bg-[#0B0B0B]"
        aria-label="Loading 3D product carousel"
      >
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center text-[#E7E5DC]">
            Loading carousel...
          </div>
        </div>
      </section>
    );
  }

  const currentSlide = config.slides[currentIndex];
  const prevIndex = (currentIndex - 1 + config.slides.length) % config.slides.length;
  const nextIndex = (currentIndex + 1) % config.slides.length;

  const getModelSource = (slide: typeof currentSlide) => {
    return config.mode === "singleGlb" ? config.placeholder.glb : slide.glb || config.placeholder.glb;
  };

  return (
    <section
      id="product-3d-carousel"
      ref={carouselRef}
      className="w-full min-h-screen bg-background relative overflow-hidden flex items-center"
      role="region"
      aria-label="3D product carousel"
      data-analytics="carousel_view"
    >
      {/* Radial glow behind active slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(201, 162, 39, 0.12), transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-[clamp(24px,6vw,80px)] max-w-[1600px] relative z-10 py-12">
        {/* Hero Content */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[-0.02em] text-[#F8F7F3] mb-6">
            Light, made forever.
          </h1>
          <p className="max-w-[48ch] mx-auto text-[#E7E5DC] text-[clamp(16px,2vw,20px)] font-light leading-relaxed mb-8">
            Certified lab-grown diamonds. Ethical. Enduring.{" "}
            <span className="text-[#C9A227] font-medium">Exquisitely priced.</span>
          </p>
          <div className="flex gap-3 flex-col sm:flex-row justify-center mb-8">
            <Button className="bg-[#C9A227] hover:bg-[#C9A227]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300" asChild>
              <Link to="/capsule">
                Shop the Capsule
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#E7E5DC]/30 text-[#0B0B0B] bg-[#E7E5DC] hover:bg-[#F8F7F3] px-8 py-3 rounded-full transition-all duration-300" 
              asChild
            >
              <Link to="/policies">About Our Diamonds</Link>
            </Button>
          </div>
          <p className="text-[#E7E5DC]/70 text-xs tracking-[0.2em] uppercase">Drag to rotate 360°</p>
        </div>

        {/* Carousel Container with 3 slides visible */}
        <div className="relative">
          <div
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2fr_minmax(0,1fr)] items-center gap-4 md:gap-8 mb-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Slide */}
            <div className="hidden md:block">
              <div 
                className="opacity-40 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                onClick={() => goToPrevious()}
              >
                <canvas
                  ref={(el) => (canvasRefs.current[0] = el)}
                  className="rounded-lg w-full h-[300px]"
                />
              </div>
            </div>

            {/* Current Slide - Main */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative aspect-square max-h-[70vh]">
                <canvas
                  ref={(el) => (canvasRefs.current[1] = el)}
                  className={cn(
                    "rounded-lg transition-opacity duration-300 w-full h-full",
                    "cursor-grab active:cursor-grabbing"
                  )}
                />

                {/* Slide Content Overlay */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 md:left-0 md:right-auto md:bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent md:bg-black/80 md:backdrop-blur-sm rounded-t-lg md:rounded-lg md:max-w-md transition-opacity duration-300",
                    currentIndex >= 0 ? "opacity-100" : "opacity-0"
                  )}
                >
                  <h2 className="text-2xl md:text-3xl font-serif text-[#F8F7F3] mb-2">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm text-[#E7E5DC] mb-4">{currentSlide.subtitle}</p>
                  <a
                    href={currentSlide.pdpUrl}
                    onClick={() => handleCTAClick(currentSlide.pdpUrl)}
                    data-analytics="cta_click"
                    className="inline-block px-6 py-3 border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B0B0B] transition-colors duration-200 rounded font-medium"
                  >
                    View Product
                  </a>
                </div>
              </div>
            </div>

            {/* Next Slide */}
            <div className="hidden md:block">
              <div 
                className="opacity-40 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                onClick={() => goToNext()}
              >
                <canvas
                  ref={(el) => (canvasRefs.current[2] = el)}
                  className="rounded-lg w-full h-[300px]"
                />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 z-20"
            size="icon"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-[#F8F7F3]" />
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 z-20"
            size="icon"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#F8F7F3]" />
          </Button>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <span className="text-[#E7E5DC] font-mono text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(config.slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {config.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-[#C9A227] w-8"
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
