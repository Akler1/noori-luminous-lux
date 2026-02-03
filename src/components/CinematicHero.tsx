import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-diamonds.jpg";

export const CinematicHero = () => {
  const scrollToCarousel = () => {
    const carousel = document.getElementById("product-3d-carousel");
    carousel?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] relative">
      {/* Left: Full-height Image */}
      <div className="relative h-[60vh] lg:h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Noori lab-grown diamond jewelry"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40 lg:to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
      </div>

      {/* Right: Content */}
      <div className="relative flex flex-col justify-center items-start px-8 md:px-16 lg:px-20 py-16 lg:py-0 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg"
        >
          {/* Small label */}
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">
            Lab-Grown Diamonds
          </p>

          {/* Main Tagline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-6">
            Light, made
            <br />
            <span className="italic text-accent">forever.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
            Certified brilliance. Ethical luxury. Diamonds crafted from light itself.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium tracking-wide"
            >
              <Link to="/solitaires">Shop Collection</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-border hover:border-accent/50 hover:bg-accent/5 px-8 py-6 text-base"
            >
              <Link to="/why-noori">Our Story</Link>
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToCarousel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-20 lg:translate-x-0 text-foreground/50 hover:text-accent transition-colors cursor-pointer"
          aria-label="Scroll to explore"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};
