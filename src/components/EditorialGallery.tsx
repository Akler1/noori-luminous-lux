import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroDiamonds from "@/assets/hero-diamonds.jpg";
import earringsPrincess from "@/assets/earrings-princess.jpg";

export const EditorialGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column - Tall Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 relative group"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={heroDiamonds}
                alt="Lab-grown diamond brilliance"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <p className="font-display text-lg md:text-xl text-foreground/90 italic">
                "Ethical brilliance"
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stacked */}
          <div className="md:col-span-7 flex flex-col gap-6 md:gap-8">
            {/* Top Right - Wide Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative group"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-sm">
                <img
                  src={earringsPrincess}
                  alt="Crafted to last forever"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 text-right">
                <p className="font-display text-lg md:text-xl text-foreground/90 italic">
                  "Crafted forever"
                </p>
              </div>
            </motion.div>

            {/* Bottom Right - Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center justify-center py-12 md:py-16"
            >
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl text-foreground/80 mb-6">
                  Pure light
                </p>
                <Link 
                  to="/why-noori" 
                  className="inline-flex items-center text-sm text-primary hover:underline underline-offset-4 transition-colors"
                >
                  Discover our story
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
