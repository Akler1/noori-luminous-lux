import { motion } from "framer-motion";
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
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="container-editorial space-y-12 lg:space-y-24">
        {storyBeats.map((beat, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={isReversed ? "lg:order-2" : "lg:order-1"}
              >
                <div className="rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src={beat.image}
                    alt={beat.header}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={isReversed ? "lg:order-1" : "lg:order-2"}
              >
                <h2 className="section-header text-foreground mb-6">
                  {beat.header}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-lg">
                  {beat.body}
                </p>
                {/* Proof chips */}
                <div className="flex flex-wrap gap-2">
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
            </div>
          );
        })}
      </div>
    </section>
  );
};
