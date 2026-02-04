import { motion } from "framer-motion";
import { Check } from "lucide-react";
import necklaceHero from "@/assets/necklace-hero.jpg";
import heroProductShot from "@/assets/hero-product-shot.png";

const storyBullets = [
  "Founded on a belief in sustainable luxury",
  "Direct-to-you, cutting out traditional markups",
  "Every piece made with intention and care",
];

const qualityBullets = [
  "IGI-certified lab-grown diamonds",
  "Solid 14k and 18k gold settings",
  "30-day returns, lifetime warranty",
];

export const StoryDuoModules = () => {
  return (
    <section className="bg-background section-spacing">
      <div className="container-editorial space-y-24 md:space-y-32">
        {/* Module A: Our Story (image left, text right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={necklaceHero}
                alt="Noori necklace"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="section-header text-foreground mb-6">
              Our story.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              <span className="text-foreground italic">Noori</span> means light in Persian—the same primordial force that creates diamonds deep within the earth. We've harnessed that light to craft lab-grown diamonds of exceptional brilliance.
            </p>
            <ul className="space-y-3">
              {storyBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Module B: Quality (image right, text left) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-header text-foreground mb-6">
              Quality, without compromise.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Every Noori piece is crafted to exacting standards. From the precision of our diamond cuts to the purity of our gold, we never settle. This is jewelry built to be kept, passed down, and cherished.
            </p>
            <ul className="space-y-3">
              {qualityBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden bg-secondary/30">
              <img
                src={heroProductShot}
                alt="Noori diamond quality"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
