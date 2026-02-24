import { motion } from "framer-motion";
import braceletHero from "@/assets/bracelet-hero.jpg";

const storyBeats = [
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
