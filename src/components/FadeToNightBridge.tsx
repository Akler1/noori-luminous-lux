import { motion } from "framer-motion";

export const FadeToNightBridge = () => {
  return (
    <section 
      className="relative h-[15vh] md:h-[18vh] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(40 30% 96%) 0%, hsl(220 20% 20%) 50%, hsl(220 30% 5%) 100%)",
      }}
    >
      {/* Optional subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-2xl md:text-3xl italic text-white/90 tracking-wide"
      >
        Explore in 3D.
      </motion.p>
    </section>
  );
};
