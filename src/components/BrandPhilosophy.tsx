import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import necklaceHero from "@/assets/necklace-hero.jpg";

export const BrandPhilosophy = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={necklaceHero}
                alt="Noori diamond necklace"
                className="w-full h-auto object-cover"
              />
              {/* Gold frame accent */}
              <div className="absolute inset-4 border border-accent/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            {/* Label */}
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">
              Our Story
            </p>

            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8">
              Born from
              <br />
              <span className="italic">Light</span>
            </h2>

            {/* Body */}
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed max-w-lg">
              <p>
                <span className="text-foreground italic">Noori</span> means light in Persian—the same primordial force that creates diamonds deep within the earth.
              </p>
              <p>
                We've harnessed that light to craft lab-grown diamonds of exceptional brilliance. Each piece is a modern heirloom, born from innovation, destined to last forever.
              </p>
            </div>

            {/* Link */}
            <Link
              to="/why-noori"
              className="inline-flex items-center gap-2 mt-10 text-accent hover:text-accent/80 transition-colors group"
            >
              <span className="text-base tracking-wide">Learn More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
