import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCw, ArrowRight } from "lucide-react";
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
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src*="model-viewer"]');
      if (existing) existing.remove();
    };
  }, []);

  // Auto-dismiss hint after timeout
  useEffect(() => {
    if (showRotateHint) {
      const timer = setTimeout(() => {
        setShowRotateHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showRotateHint]);

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
        className="section-spacing bg-background"
        aria-label="Loading 3D product carousel"
      >
        <div className="container-editorial">
          <div className="animate-pulse text-center text-muted-foreground">
            Loading carousel...
          </div>
        </div>
      </section>
    );
  }

  const usingSingle = config.mode === "singleGlb";
  const currentSlide = config.slides[currentIndex];

  const prevIndex = (currentIndex - 1 + config.slides.length) % config.slides.length;
  const nextIndex = (currentIndex + 1) % config.slides.length;

  // Helper to check if a slide is the stud earring
  const isStudSlide = (slide: typeof currentSlide) => slide.slug === "stud-round-14k";

  // Helper to check if a slide is the emerald earring
  const isEmeraldSlide = (slide: typeof currentSlide) =>
    slide.slug === "earrings-emerald-gold";

  // Render function for 3D viewer or iframe
  const renderViewer = (slide: typeof currentSlide, isMain: boolean = false) => {
    const iframeSrc = isStudSlide(slide)
      ? "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html"
      : isEmeraldSlide(slide)
      ? "https://akler1.github.io/XR-Emerald-gold.1/"
      : "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html";

    return (
      <iframe
        src={iframeSrc}
        className="w-full h-full border-0"
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
        }}
        allow="xr-spatial-tracking; fullscreen; autoplay"
        allowFullScreen
        title={slide.title}
      />
    );
  };

  return (
    <section
      id="product-3d-carousel"
      className="section-spacing bg-background"
      role="region"
      aria-label="3D product carousel"
      data-analytics="carousel_view"
    >
      <div className="container-editorial" ref={carouselRef}>
        {/* Section Header on light background */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Explore in 3D
          </p>
          <h2 className="section-header text-foreground mb-3">
            Best sellers
          </h2>
          <p className="text-muted-foreground">
            Spin each piece. See the details.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4 md:gap-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Slide - Side tile */}
            <div className="hidden md:block">
              {isLoaded && (
                <div
                  className="scale-[0.85] opacity-80 hover:opacity-100 hover:scale-[0.88] transition-all duration-300 cursor-pointer origin-center"
                  onClick={() => goToPrevious()}
                >
                  <div className="xr-tile aspect-square">
                    {renderViewer(config.slides[prevIndex])}
                  </div>
                </div>
              )}
            </div>

            {/* Current Slide - Main tile */}
            <div className="relative">
              <div
                className="xr-tile aspect-square relative"
                onMouseDown={() => setShowRotateHint(false)}
                onTouchStart={(e) => {
                  handleTouchStart(e);
                  setShowRotateHint(false);
                }}
              >
                {isLoaded ? (
                  renderViewer(currentSlide, true)
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <div className="text-white/70">Loading 3D viewer...</div>
                  </div>
                )}

                {/* One-time drag hint overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-500 z-10",
                    showRotateHint ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-sm">Drag to rotate</span>
                  </div>
                </div>
              </div>

              {/* Product info below tile on light bg */}
              <div className="text-center mt-6">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                  {currentSlide.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Solid gold • Lab-grown
                </p>
                <a
                  href={currentSlide.pdpUrl}
                  onClick={() => handleCTAClick(currentSlide.pdpUrl)}
                  data-analytics="cta_click"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-200 rounded font-medium text-sm group"
                >
                  View details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Next Slide - Side tile */}
            <div className="hidden md:block">
              {isLoaded && (
                <div
                  className="scale-[0.85] opacity-80 hover:opacity-100 hover:scale-[0.88] transition-all duration-300 cursor-pointer origin-center"
                  onClick={() => goToNext()}
                >
                  <div className="xr-tile aspect-square">
                    {renderViewer(config.slides[nextIndex])}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Minimal chevron arrows - positioned outside tiles */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-12 top-1/3 -translate-y-1/2 p-2 text-muted-foreground hover:text-accent transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-12 top-1/3 -translate-y-1/2 p-2 text-muted-foreground hover:text-accent transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {config.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-accent w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
