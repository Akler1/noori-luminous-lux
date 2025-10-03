import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArcCarousel3D } from "./ArcCarousel3D";

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

  // Load config
  useEffect(() => {
    fetch("/data/carousel-config.json")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Failed to load carousel config:", err));
  }, []);

  if (!config) {
    return (
      <section className="w-full py-24 bg-[#0B0B0B]">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center text-[#E7E5DC]">
            Loading carousel...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="product-3d-carousel"
      className="w-full relative overflow-hidden"
      role="region"
      aria-label="3D product carousel"
    >
      {/* Hero Content */}
      <div className="absolute top-12 left-0 right-0 z-10 text-center px-4">
        <h1 className="font-display text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[-0.02em] text-[#F8F7F3] mb-6">
          Light, made forever.
        </h1>
        <p className="max-w-[48ch] mx-auto text-[#E7E5DC] text-[clamp(16px,2vw,20px)] font-light leading-relaxed mb-8">
          Certified lab-grown diamonds. Ethical. Enduring.{" "}
          <span className="text-[#C9A227] font-medium">Exquisitely priced.</span>
        </p>
        <div className="flex gap-3 flex-col sm:flex-row justify-center">
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
      </div>

      {/* Three.js Arc Carousel */}
      <ArcCarousel3D slides={config.slides} />
    </section>
  );
}
