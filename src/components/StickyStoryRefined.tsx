import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import unicefBackpacks from "@/assets/unicef-backpacks.webp";

export const StickyStoryRefined = () => {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="container-editorial max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="section-header text-4xl md:text-5xl text-foreground">
            How Your Purchase Creates Change.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-elegant mb-12"
        >
          <img
            src={unicefBackpacks}
            alt="Children with UNICEF backpacks heading to school"
            className="w-full max-h-[420px] md:max-h-[600px] object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            A portion of every Noori purchase supports UNICEF programs for children to get out of dangerous mines and into the classroom.
          </p>
          <Link
            to="/policies#mission"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-base font-medium"
          >
            Learn Our Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
