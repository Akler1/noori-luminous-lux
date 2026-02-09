import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroSketchReveal } from "@/components/HeroSketchReveal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export const HeroSplitEditorial = () => {
  return (
    <section className="relative min-h-[100svh] md:min-h-0 md:aspect-[16/9] overflow-hidden">
      {/* Interactive sketch reveal background */}
      <HeroSketchReveal />

      {/* Text content */}
      {/* Text content - positioned at left edge with minimal padding */}
      <div className="relative z-10 h-full min-h-[100svh] md:min-h-0 md:absolute md:inset-0 flex items-end pb-16 md:pb-24 px-5 md:px-8 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
          >
            Lab-Grown Diamonds
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="hero-text text-stone-800 mb-4 md:mb-6"
          >
            Brilliance,
            <br />
            <span className="italic">refined.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-stone-600 text-lg md:text-xl leading-relaxed mb-8 md:mb-10"
          >
            Introducing the inaugural Solitaires collection. Modern heirlooms
            crafted from light itself.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <Button
              asChild
              className="btn-magnetic bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium rounded-lg"
            >
              <Link to="/collections/solitaires">Shop the Collection</Link>
            </Button>

            <Link
              to="#product-3d-carousel"
              className="inline-flex items-center gap-2 text-stone-700 hover:text-accent transition-colors group px-4 py-3"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("product-3d-carousel")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-base">Explore in 3D</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Cue - Desktop only */}
      <div className="hidden md:flex absolute bottom-12 right-16 items-center gap-3 z-20">
        {/* Scroll Cue - hidden on light background for now */}
        <span
          className="text-stone-500 text-xs tracking-[0.2em] uppercase"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-stone-400 scroll-cue-line" />
      </div>
    </section>
  );
};
