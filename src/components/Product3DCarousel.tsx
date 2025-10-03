import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [isRotateMode, setIsRotateMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const modelViewerRefs = useRef<Array<any>>([]);

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

  // Load model-viewer script
  useEffect(() => {
    if (document.querySelector('script[src*="model-viewer"]')) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src*="model-viewer"]');
      if (existing) existing.remove();
    };
  }, []);

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
      } else if (e.key === "Escape" && isRotateMode) {
        toggleRotateMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [config, currentIndex, isRotateMode]);

  const goToNext = useCallback(() => {
    if (!config) return;
    setCurrentIndex((prev) => Math.min(prev + 1, config.slides.length - 1));
  }, [config]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleRotateMode = useCallback(() => {
    setIsRotateMode((prev) => {
      const newMode = !prev;
      console.log(`Analytics: rotate_mode_${newMode ? "on" : "off"}`);
      return newMode;
    });
  }, []);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRotateMode) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isRotateMode || !config) return;

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

  const usingSingle = config.mode === "singleGlb";
  const currentSlide = config.slides[currentIndex];

  const getModelSource = (slide: typeof currentSlide) => {
    return usingSingle ? config.placeholder.glb : slide.glb || config.placeholder.glb;
  };

  const getPosterSource = (slide: typeof currentSlide) => {
    return usingSingle ? config.placeholder.poster : slide.poster || config.placeholder.poster;
  };

  return (
    <section
      id="product-3d-carousel"
      ref={carouselRef}
      className="w-full py-24 bg-[#0B0B0B] relative overflow-hidden"
      role="region"
      aria-label="3D product carousel"
      data-analytics="carousel_view"
    >
      {/* Radial glow behind active slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 800px 600px at ${50 + currentIndex * 5}% 50%, rgba(201, 162, 39, 0.08), transparent 60%)`,
        }}
      />

      <div className="container mx-auto px-[clamp(16px,5vw,64px)] max-w-[1280px] relative z-10">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif text-[#F8F7F3] text-center mb-16">
          {config.carouselTitle}
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* 3D Viewer */}
          <div
            className="relative aspect-[16/9] max-h-[600px] mb-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isLoaded ? (
              <model-viewer
                ref={(el: any) => (modelViewerRefs.current[currentIndex] = el)}
                src={getModelSource(currentSlide)}
                poster={getPosterSource(currentSlide)}
                camera-controls={isRotateMode}
                camera-orbit={`${currentSlide.camera.azimuthDeg}deg ${currentSlide.camera.elevationDeg}deg auto`}
                field-of-view={`${currentSlide.camera.fov}deg`}
                min-camera-orbit="auto 0deg auto"
                max-camera-orbit="auto 25deg auto"
                disable-zoom
                interaction-prompt="none"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  "--progress-bar-color": "#C9A227",
                  "--poster-color": "transparent",
                } as any}
                className={cn(
                  "rounded-lg transition-opacity duration-300",
                  isRotateMode ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                )}
                onClick={!isRotateMode ? toggleRotateMode : undefined}
                ar-modes="webxr scene-viewer quick-look"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
                <div className="text-[#E7E5DC]">Loading 3D viewer...</div>
              </div>
            )}

            {/* Rotate Mode Indicator */}
            {isRotateMode && (
              <Button
                onClick={toggleRotateMode}
                className="absolute top-4 right-4 bg-[#C9A227] hover:bg-[#A88620] text-[#0B0B0B] font-medium px-4 py-2 gap-2"
                aria-label="Exit rotate mode"
              >
                Exit Rotate <X className="w-4 h-4" />
              </Button>
            )}

            {/* Slide Content Overlay */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 md:left-8 md:right-auto md:bottom-8 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/60 to-transparent md:bg-black/70 md:backdrop-blur-sm rounded-t-lg md:rounded-lg max-w-md transition-opacity duration-300",
                currentIndex >= 0 ? "opacity-100" : "opacity-0"
              )}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-[#F8F7F3] mb-2">
                {currentSlide.title}
              </h3>
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

          {/* Navigation Arrows */}
          <Button
            onClick={goToPrevious}
            disabled={currentIndex === 0 || isRotateMode}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            size="icon"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-[#F8F7F3]" />
          </Button>

          <Button
            onClick={goToNext}
            disabled={currentIndex === config.slides.length - 1 || isRotateMode}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
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
                disabled={isRotateMode}
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
