import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import earringsHero from "@/assets/earrings-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";

export const CollectionShowcase = () => {
  return (
    <section className="py-0">
      {/* Hero Feature - Full Width */}
      <Link to="/collections/solitaires" className="block group relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] md:aspect-[21/7]"
        >
          <img
            src={earringsHero}
            alt="Round Brilliant Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-8 md:bottom-12 left-8 md:left-16">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
              The Brilliance
            </p>
            <h3 className="font-display text-2xl md:text-4xl font-light text-foreground mb-4">
              Round Brilliant
            </h3>
            <span className="inline-flex items-center text-sm text-primary group-hover:underline underline-offset-4">
              Shop Now
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left - Princess */}
        <Link to="/collections/solitaires" className="block group relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[4/5]"
          >
            <img
              src={necklaceHero}
              alt="Princess Cut Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                The Elegance
              </p>
              <h3 className="font-display text-xl md:text-2xl font-light text-foreground mb-3">
                Princess Cut
              </h3>
              <span className="inline-flex items-center text-sm text-primary group-hover:underline underline-offset-4">
                Explore
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Right - Emerald */}
        <Link to="/collections/solitaires" className="block group relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/5]"
          >
            <img
              src={braceletHero}
              alt="Emerald Cut Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                The Grace
              </p>
              <h3 className="font-display text-xl md:text-2xl font-light text-foreground mb-3">
                Emerald Cut
              </h3>
              <span className="inline-flex items-center text-sm text-primary group-hover:underline underline-offset-4">
                Explore
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};
