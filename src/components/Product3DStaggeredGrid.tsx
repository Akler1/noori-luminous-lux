import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SlideConfig {
  slug: string;
  title: string;
  subtitle: string;
  pdpUrl: string;
  camera: { azimuthDeg: number; elevationDeg: number; fov: number };
  glb?: string;
}

interface CarouselConfig {
  carouselTitle: string;
  mode: string;
  placeholder: string | null;
  slides: SlideConfig[];
}

// XR viewer URL mapping
const XR_VIEWER_URLS: Record<string, string> = {
  "round-vela-studs": "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
  "emerald-vela-studs": "https://akler1.github.io/XR-Emerald-gold.1/",
  "princess-vela-studs": "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
};

// Placeholder for products without specific viewers
const PLACEHOLDER_XR_URL = "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html";

// Stagger offsets for each card position (desktop - 3 columns)
const DESKTOP_OFFSETS = [
  { col: 0, mt: "mt-0" },
  { col: 1, mt: "mt-24" },
  { col: 2, mt: "mt-12" },
  { col: 0, mt: "mt-8" },
  { col: 1, mt: "mt-16" },
];

// Stagger offsets for mobile (2 columns)
const MOBILE_OFFSETS = [
  { col: 0, mt: "mt-0" },
  { col: 1, mt: "mt-8" },
  { col: 0, mt: "mt-4" },
  { col: 1, mt: "mt-12" },
  { col: 0, mt: "mt-6" },
];

export function Product3DStaggeredGrid() {
  const [slides, setSlides] = useState<SlideConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/carousel-config.json")
      .then((res) => res.json())
      .then((data: CarouselConfig) => {
        setSlides(data.slides);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load carousel config:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="bg-background section-spacing">
        <div className="container-editorial">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bracket-border aspect-[4/5] animate-pulse bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background section-spacing">
      <div className="container-editorial">
        {/* Desktop Layout - 3 columns with staggered positioning */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {slides.map((slide, index) => {
            const offset = DESKTOP_OFFSETS[index] || { col: index % 3, mt: "mt-0" };
            const xrUrl = XR_VIEWER_URLS[slide.slug] || PLACEHOLDER_XR_URL;

            return (
              <motion.div
                key={slide.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={offset.mt}
              >
                <Link to={slide.pdpUrl} className="block group">
                  <div className="bracket-border aspect-[4/5] relative">
                    <div className="bracket-border-inner" />
                    <iframe
                      src={xrUrl}
                      className="w-full h-full border-0"
                      allow="autoplay; xr-spatial-tracking"
                      loading="lazy"
                      title={slide.title}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-foreground font-serif text-lg group-hover:text-accent transition-colors">
                      {slide.title}
                    </span>
                    <span className="text-accent text-sm font-medium">2025</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Layout - 2 columns with smaller offsets */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:hidden">
          {slides.map((slide, index) => {
            const offset = MOBILE_OFFSETS[index] || { col: index % 2, mt: "mt-0" };
            const xrUrl = XR_VIEWER_URLS[slide.slug] || PLACEHOLDER_XR_URL;

            return (
              <motion.div
                key={slide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={offset.mt}
              >
                <Link to={slide.pdpUrl} className="block group">
                  <div className="bracket-border aspect-[4/5] relative">
                    <div className="bracket-border-inner" />
                    <iframe
                      src={xrUrl}
                      className="w-full h-full border-0"
                      allow="autoplay; xr-spatial-tracking"
                      loading="lazy"
                      title={slide.title}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-foreground font-serif text-sm md:text-base group-hover:text-accent transition-colors">
                      {slide.title}
                    </span>
                    <span className="text-accent text-xs font-medium">2025</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Product3DStaggeredGrid;
