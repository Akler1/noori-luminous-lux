import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-diamonds.jpg";
import earringsImage from "@/assets/earrings-hero.jpg";
import necklaceImage from "@/assets/necklace-hero.jpg";

// Decorative curved lines SVG component
const DecorativeLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
    style={{ opacity: 0.05 }}
  >
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--accent))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M-100,200 Q300,100 600,300 T1300,200"
      stroke="url(#lineGradient)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M-100,400 Q400,300 700,500 T1300,400"
      stroke="url(#lineGradient)"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M-100,600 Q200,500 500,650 T1300,550"
      stroke="url(#lineGradient)"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

// Floating image component with animation
interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
  delay: number;
  rotate?: number;
}

const FloatingImage = ({ src, alt, className, delay, rotate = 0 }: FloatingImageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`absolute ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden shadow-2xl"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 border border-accent/20" />
    </motion.div>
  </motion.div>
);

export const CinematicHero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Decorative Background */}
      <DecorativeLines />
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-20">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typography & CTA */}
          <div className="relative z-20 order-2 lg:order-1">
            {/* Small Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-accent text-sm tracking-[0.3em] uppercase mb-8"
            >
              Lab-Grown Diamonds
            </motion.p>

            {/* Main Typography - Bold Mixed Weights */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tight"
              >
                LIGHT,
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tight"
              >
                MADE
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light italic text-accent leading-[0.9] tracking-tight"
              >
                FOREVER
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-md"
            >
              Certified brilliance. Ethical luxury.
              <br />
              Diamonds crafted from light itself.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-7 text-base font-semibold tracking-wide uppercase"
              >
                <Link to="/solitaires">Shop Collection</Link>
              </Button>
            </motion.div>

          </div>

          {/* Right: Image Collage */}
          <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Main Large Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-0 left-0 w-[70%] h-[75%] z-10"
            >
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Noori lab-grown diamond jewelry collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-accent/10" />
              </div>
            </motion.div>

            {/* Gold Accent Panel - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-8 right-0 w-[30%] h-[40%] z-20"
            >
              <div className="w-full h-full overflow-hidden shadow-xl">
                <img
                  src={earringsImage}
                  alt="Diamond earrings"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 border-2 border-accent/30" />
            </motion.div>

            {/* Single Floating Image - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="absolute bottom-8 right-20 w-44 h-56 z-30"
              style={{ transform: "rotate(2deg)" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full overflow-hidden shadow-2xl"
              >
                <img
                  src={necklaceImage}
                  alt="Diamond necklace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-accent/20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
