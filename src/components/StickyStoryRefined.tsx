import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroProductShot from "@/assets/hero-product-shot.png";
import cutClarityDiamonds from "@/assets/cut-clarity-diamonds.png";
import necklaceHero from "@/assets/necklace-hero.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";

const storyBeats = [
  {
    header: "The cut. The clarity.",
    body: "Every Noori diamond is precision-cut to maximize brilliance. The same fire that lives in mined stones, born from innovation.",
    image: cutClarityDiamonds,
    chips: ["Precision cut", "Optical symmetry", "Quality checked"],
  },
  {
    header: "The details that matter.",
    body: "Handcrafted settings in solid 14k and 18k gold. Each piece inspected to exacting standards before it reaches you.",
    image: necklaceHero,
    chips: ["Hand-finished", "Solid gold", "Inspected"],
  },
  {
    header: "Made to be kept.",
    body: "Lab-grown diamonds are chemically identical to mined diamonds. The same hardness, the same sparkle—designed to last generations.",
    image: braceletHero,
    chips: ["Lab-grown", "Certified", "Lifetime warranty"],
  },
];

export const StickyStoryRefined = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    beatRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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
                  ref={(el) => (beatRefs.current[index] = el)}
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
                  {/* Proof chips */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {beat.chips.map((chip, chipIndex) => (
                      <span
                        key={chipIndex}
                        className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Sticky media frame - 7 columns */}
            <div className="col-span-7">
              <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center">
                <div className="relative w-full">
                  {/* Crossfading images */}
                  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-sticky">
                    {storyBeats.map((beat, index) => (
                      <img
                        key={index}
                        src={beat.image}
                        alt={beat.header}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          activeIndex === index ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>

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
              {/* Product image */}
              <div className="mb-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src={beat.image}
                    alt={beat.header}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Text */}
              <h2 className="section-header text-foreground mb-4">
                {beat.header}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                {beat.body}
              </p>
              {/* Proof chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {beat.chips.map((chip, chipIndex) => (
                    <span
                      key={chipIndex}
                      className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full"
                    >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
