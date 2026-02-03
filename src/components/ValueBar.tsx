import { motion } from "framer-motion";
import { Award, Truck, RefreshCw, Shield } from "lucide-react";

const values = [
  {
    icon: Award,
    label: "GIA Certified",
  },
  {
    icon: Truck,
    label: "Free Shipping",
  },
  {
    icon: RefreshCw,
    label: "30-Day Returns",
  },
  {
    icon: Shield,
    label: "Lifetime Warranty",
  },
];

export const ValueBar = () => {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Vertical Divider (not on first item) */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-accent/20" />
              )}
              
              <value.icon className="w-6 h-6 text-accent mb-3" strokeWidth={1.5} />
              <span className="text-foreground text-sm md:text-base tracking-wide">
                {value.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
