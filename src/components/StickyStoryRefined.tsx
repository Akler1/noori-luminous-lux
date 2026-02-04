import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import earringsHero from "@/assets/earrings-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";
import heroProductShot from "@/assets/hero-product-shot.png";

const storyBeats = [
  {
    header: "The cut. The clarity.",
    body: "Every Noori diamond is precision-cut to maximize brilliance. The same fire that lives in mined stones, born from innovation.",
    image: earringsHero,
  },
  {
    header: "The details that matter.",
    body: "Handcrafted settings in solid 14k and 18k gold. Each piece inspected to exacting standards before it reaches you.",
    image: necklaceHero,
  },
  {
    header: "Made to be kept.",
    body: "Lab-grown diamonds are chemically identical to mined diamonds. The same hardness, the same sparkle—designed to last generations.",
    image: braceletHero,
  },
];

export const StickyStoryRefined = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to image index (0, 1, 2)
  const imageIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2]);

  return (
    <section ref={containerRef} className="relative bg-background">
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
                <div className="relative w-full rounded-3xl overflow-hidden shadow-sticky">
                  {/* Images with crossfade */}
                  {storyBeats.map((beat, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      style={{
                        opacity: useTransform(
                          imageIndex,
                          [index - 0.5, index, index + 0.5],
                          [0, 1, 0]
                        ),
                      }}
                    >
                      <img
                        src={beat.image}
                        alt={beat.header}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "500px" }}
                      />
                    </motion.div>
                  ))}

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
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={beat.image}
                  alt={beat.header}
                  className="w-full h-64 object-cover"
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
