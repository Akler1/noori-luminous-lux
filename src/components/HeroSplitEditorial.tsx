import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroLifestyle from "@/assets/hero-lifestyle.png";

export const HeroSplitEditorial = () => {
  return (
    <section className="min-h-screen bg-background pt-28 md:pt-32">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Mobile: Image first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:hidden order-1"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={heroLifestyle}
                alt="Noori diamond jewelry"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content - Left 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
              Lab-Grown Diamonds
            </p>

            {/* H1 */}
            <h1 className="hero-text text-foreground mb-6 lg:mb-8">
              Brilliance,
              <br />
              <span className="italic">refined.</span>
            </h1>

            {/* Subhead */}
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-md mb-10">
              Modern heirlooms crafted from light itself. Lab-grown diamonds that shine forever, without compromise.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium rounded-lg"
              >
                <Link to="/collections/solitaires">Shop best sellers</Link>
              </Button>
              
              <Link
                to="#product-3d-carousel"
                className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors group px-4 py-3"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('product-3d-carousel')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="text-base">Explore in 3D</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image - Right 7 columns (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block lg:col-span-7 order-2"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Left edge gradient overlay for cohesion */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/40 to-transparent z-10 pointer-events-none" />
              
              <img
                src={heroLifestyle}
                alt="Noori diamond jewelry"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
