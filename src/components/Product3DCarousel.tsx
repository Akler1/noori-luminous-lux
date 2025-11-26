import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(true);
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

  const usingSingle = config.mode === "singleGlb";
  const currentSlide = config.slides[currentIndex];

  const getModelSource = (slide: typeof currentSlide) => {
    return usingSingle ? config.placeholder.glb : slide.glb || config.placeholder.glb;
  };

  const getPosterSource = (slide: typeof currentSlide) => {
    return usingSingle ? config.placeholder.poster : slide.poster || config.placeholder.poster;
  };

  const prevIndex = (currentIndex - 1 + config.slides.length) % config.slides.length;
  const nextIndex = (currentIndex + 1) % config.slides.length;

  // Helper to check if a slide is the stud earring
  const isStudSlide = (slide: typeof currentSlide) => slide.slug === "stud-round-14k";
  
  // Helper to check if a slide is the emerald earring
  const isEmeraldSlide = (slide: typeof currentSlide) => slide.slug === "earrings-emerald-gold";

  // Render function for 3D viewer or iframe
  const renderViewer = (slide: typeof currentSlide, isMain: boolean = false) => {
    if (isStudSlide(slide)) {
      return (
        <iframe
          src="https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html"
          className="w-full h-full rounded-lg border-0"
          style={{
            width: "100%",
            height: isMain ? "100%" : "300px",
            background: "transparent",
          }}
          allow="xr-spatial-tracking; fullscreen; autoplay"
          allowFullScreen
          title={slide.title}
        />
      );
    }

    if (isEmeraldSlide(slide)) {
      return (
        <iframe
          src="https://akler1.github.io/XR-Emerald-gold.1/"
          className="w-full h-full rounded-lg border-0"
          style={{
            width: "100%",
            height: isMain ? "100%" : "300px",
            background: "transparent",
          }}
          allow="xr-spatial-tracking; fullscreen; autoplay"
          allowFullScreen
          title={slide.title}
        />
      );
    }

    return (
      <model-viewer
        ref={isMain ? (el: any) => (modelViewerRefs.current[currentIndex] = el) : undefined}
        src={getModelSource(slide)}
        poster={getPosterSource(slide)}
        {...(isMain ? {
          "camera-controls": true,
          "camera-orbit": `${slide.camera.azimuthDeg}deg ${slide.camera.elevationDeg}deg auto`,
          "field-of-view": `${slide.camera.fov}deg`,
          "disable-zoom": true,
          "interaction-prompt": "none",
          "ar-modes": "webxr scene-viewer quick-look",
        } : {
          "auto-rotate": true,
          "auto-rotate-delay": "0",
          "rotation-per-second": "15deg",
          "camera-orbit": `${slide.camera.azimuthDeg}deg ${slide.camera.elevationDeg}deg auto`,
          "field-of-view": `${slide.camera.fov}deg`,
          "disable-zoom": true,
          "interaction-prompt": "none",
        })}
        style={{
          width: "100%",
          height: isMain ? "100%" : "300px",
          background: "transparent",
          "--progress-bar-color": "#C9A227",
          "--poster-color": "transparent",
        } as any}
        className={cn(
          "rounded-lg transition-opacity duration-300",
          isMain && "cursor-grab active:cursor-grabbing"
        )}
      />
    );
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
          background: `radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(201, 162, 39, 0.06), rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 1) 80%)`,
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
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2fr_minmax(0,1fr)] items-center gap-4 md:gap-8 mb-8 bg-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Slide */}
            <div className="hidden md:block">
              {isLoaded && (
                <div 
                  className="opacity-40 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                  onClick={() => goToPrevious()}
                >
                  {renderViewer(config.slides[prevIndex])}
                </div>
              )}
            </div>

            {/* Current Slide - Main */}
            <div className="w-full max-w-3xl mx-auto">
              <div 
                className="relative aspect-square max-h-[70vh]"
                onMouseDown={() => setShowRotateHint(false)}
                onTouchStart={(e) => {
                  handleTouchStart(e);
                  setShowRotateHint(false);
                }}
              >
                {isLoaded ? (
                  renderViewer(currentSlide, true)
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
                    <div className="text-[#E7E5DC]">Loading 3D viewer...</div>
                  </div>
                )}

                {/* Rotation Hint Overlay */}
                {showRotateHint && isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/70 backdrop-blur-sm px-6 py-4 rounded-full border border-[#C9A227]/30 flex items-center gap-3 animate-pulse">
                      <RotateCw className="w-6 h-6 text-[#C9A227] animate-spin" style={{ animationDuration: '3s' }} />
                      <span className="text-[#F8F7F3] font-medium">Click & Drag to Rotate</span>
                    </div>
                  </div>
                )}

                {/* Slide Content Overlay */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 md:left-0 md:right-auto md:bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent md:bg-black/80 md:backdrop-blur-sm rounded-t-lg md:rounded-lg md:max-w-sm transition-opacity duration-300",
                    currentIndex >= 0 ? "opacity-100" : "opacity-0"
                  )}
                >
                  <h2 className="text-xl md:text-2xl font-serif text-[#F8F7F3] mb-3">
                    {currentSlide.title}
                  </h2>
                  <a
                    href={currentSlide.pdpUrl}
                    onClick={() => handleCTAClick(currentSlide.pdpUrl)}
                    data-analytics="cta_click"
                    className="inline-block px-5 py-2 border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B0B0B] transition-colors duration-200 rounded font-medium text-sm"
                  >
                    View Product
                  </a>
                </div>
              </div>
            </div>

            {/* Next Slide */}
            <div className="hidden md:block">
              {isLoaded && (
                <div 
                  className="opacity-40 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                  onClick={() => goToNext()}
                >
                  {renderViewer(config.slides[nextIndex])}
                </div>
              )}
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
