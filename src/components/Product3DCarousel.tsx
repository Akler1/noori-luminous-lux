import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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

  const getItemPosition = (index: number) => {
    const angle = ((index - currentIndex) * (360 / config.slides.length)) * (Math.PI / 180);
    const radius = 400;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = z > 0 ? 1 : 0.6;
    const opacity = z > -300 ? (z > 0 ? 1 : 0.5) : 0.3;
    
    return {
      x,
      z,
      scale,
      opacity,
      rotateY: -angle * (180 / Math.PI),
      isCenter: index === currentIndex,
    };
  };

  return (
    <section
      id="product-3d-carousel"
      ref={carouselRef}
      className="w-full min-h-screen bg-[#0B0B0B] relative overflow-hidden flex items-center"
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

        {/* Carousel Container - Full Circle */}
        <div className="relative">
          <div
            className="relative h-[600px] w-full flex items-center justify-center"
            style={{ perspective: '1500px' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* All items in circular arrangement */}
            <div className="relative w-full h-full">
              {config.slides.map((slide, index) => {
                const position = getItemPosition(index);
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translate(-50%, -50%) translateX(${position.x}px) translateZ(${position.z}px) rotateY(${position.rotateY}deg) scale(${position.scale})`,
                      opacity: position.opacity,
                      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      zIndex: position.isCenter ? 10 : 1,
                    }}
                    onClick={() => !position.isCenter && goToSlide(index)}
                  >
                    <div className="relative w-[300px] h-[300px]">
                      {isLoaded ? (
                        <>
                          <model-viewer
                            ref={(el: any) => position.isCenter && (modelViewerRefs.current[currentIndex] = el)}
                            src={getModelSource(slide)}
                            poster={getPosterSource(slide)}
                            camera-controls={position.isCenter}
                            auto-rotate={!position.isCenter}
                            auto-rotate-delay="0"
                            rotation-per-second={!position.isCenter ? "15deg" : undefined}
                            camera-orbit={`${slide.camera.azimuthDeg}deg ${slide.camera.elevationDeg}deg auto`}
                            field-of-view={`${slide.camera.fov}deg`}
                            disable-zoom
                            interaction-prompt="none"
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "transparent",
                              "--progress-bar-color": "#C9A227",
                              "--poster-color": "transparent",
                              filter: position.isCenter ? 'none' : 'brightness(0.7)',
                              pointerEvents: position.isCenter ? 'auto' : 'none',
                            } as any}
                            className={cn(
                              "rounded-lg transition-all duration-300",
                              position.isCenter && "cursor-grab active:cursor-grabbing"
                            )}
                            ar-modes="webxr scene-viewer quick-look"
                          />
                          
                          {/* Content overlay for center item only */}
                          {position.isCenter && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-lg">
                              <h2 className="text-xl font-serif text-[#F8F7F3] mb-1">
                                {slide.title}
                              </h2>
                              <p className="text-xs text-[#E7E5DC] mb-2">{slide.subtitle}</p>
                              <a
                                href={slide.pdpUrl}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCTAClick(slide.pdpUrl);
                                }}
                                data-analytics="cta_click"
                                className="inline-block px-4 py-2 text-sm border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B0B0B] transition-colors duration-200 rounded font-medium"
                              >
                                View Product
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
                          <div className="text-[#E7E5DC] text-sm">Loading...</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
