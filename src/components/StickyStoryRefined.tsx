import { motion } from "framer-motion";
import { FacetPlaceholder } from "@/components/FacetPlaceholder";
import heroProductShot from "@/assets/hero-product-shot.png";

const storyBeats = [
  {
    header: "The cut. The clarity.",
    body: "Every Noori diamond is precision-cut to maximize brilliance. The same fire that lives in mined stones, born from innovation.",
    variant: "diamond" as const,
  },
  {
    header: "The details that matter.",
    body: "Handcrafted settings in solid 14k and 18k gold. Each piece inspected to exacting standards before it reaches you.",
    variant: "facet" as const,
  },
  {
    header: "Made to be kept.",
    body: "Lab-grown diamonds are chemically identical to mined diamonds. The same hardness, the same sparkle—designed to last generations.",
    variant: "minimal" as const,
  },
];

export const StickyStoryRefined = () => {
  return (
    <section className="relative bg-background">
      {/* Desktop: Sticky layout */}
      <div className="hidden lg:block">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Scrolling story blocks - 5 columns */}
            <div className="col-span-5 py-24">
              {storyBeats.map((beat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6 }}
                  className="min-h-screen flex flex-col justify-center py-12"
                >
                  <h2 className="section-header text-foreground mb-6">
                    {beat.header}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                    {beat.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: Sticky media frame - 7 columns */}
            <div className="col-span-7">
              <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center">
                <div className="relative w-full">
                  {/* FacetPlaceholder instead of images */}
                  <FacetPlaceholder 
                    variant="diamond" 
                    className="w-full h-[500px] shadow-sticky"
                  />

                  {/* Single overlapping product card - bottom right */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -bottom-6 -right-6 w-32 h-40 rounded-2xl overflow-hidden border border-accent/20 shadow-elegant bg-background"
                  >
                    <img
                      src={heroProductShot}
                      alt="Noori diamond"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="lg:hidden section-spacing">
        <div className="container-editorial space-y-16">
          {storyBeats.map((beat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* FacetPlaceholder */}
              <div className="mb-8">
                <FacetPlaceholder 
                  variant={beat.variant} 
                  className="w-full h-64"
                />
              </div>
              
              {/* Text */}
              <h2 className="section-header text-foreground mb-4">
                {beat.header}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                {beat.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
