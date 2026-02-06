import { motion } from "framer-motion";
import cutClarityDiamonds from "@/assets/cut-clarity-diamonds.png";
import necklaceHero from "@/assets/necklace-hero.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";

const storyBeats = [
  {
    header: "Quality, without shortcuts.",
    body: "Noori diamonds are lab grown and chemically identical to mined diamonds, with the same crystal structure, hardness, and brilliance. From the stones we evaluate, we approve only the top 2% for Noori, prioritizing colorless D to F and VS1 clarity or better. Each piece is set in solid 14k or 18k gold, then finished and inspected for symmetry, setting security, and polish before it ships.",
    image: cutClarityDiamonds,
    chips: ["Top 2%", "D-F colour", "VS1+ clarity"],
  },
  {
    header: "A higher standard, made wearable.",
    body: "Noori began with a simple goal: create jewelry with true high jewellery presence, refined lines, substantial weight, and finishing you can feel. We use modern diamond innovation and disciplined production to remove the usual barriers, while keeping the standard uncompromising. The result is pieces that read unmistakably luxurious and wear effortlessly, day after day.",
    image: necklaceHero,
    chips: ["High jewellery presence", "Refined lines", "Effortless wear"],
  },
  {
    header: "Brilliance with impact.",
    body: "Beauty should do more than shine. That is why a portion of proceeds from every Noori purchase is donated to UNICEF, supporting efforts that help keep children safe and in school, so more kids can move away from dangerous labor and toward classrooms, opportunity, and a future of their own.",
    image: braceletHero,
    chips: ["UNICEF partner", "Education focus", "Real impact"],
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
