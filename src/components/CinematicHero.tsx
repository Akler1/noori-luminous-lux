import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroLifestyle from "@/assets/hero-lifestyle.png";

export const CinematicHero = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left: Text Content */}
      <div className="w-full lg:w-1/2 flex items-center px-6 md:px-12 lg:px-20 py-16 lg:py-0 order-2 lg:order-1">
        <div className="max-w-xl">
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
              className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-[0.9] tracking-tight"
            >
              LIGHT,
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-[0.9] tracking-tight"
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
            className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-md"
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
      </div>

      {/* Right: Full-height Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full lg:w-1/2 h-[50vh] lg:h-screen order-1 lg:order-2"
      >
        <img
          src={heroLifestyle}
          alt="Noori lab-grown diamond jewelry"
          className="w-full h-full object-contain object-right"
        />
      </motion.div>
    </section>
  );
};
