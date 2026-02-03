import { Gem, Leaf, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Gem,
    title: "Lab-Grown Excellence",
    description:
      "Certified by GIA & IGI. Chemically, physically, and optically identical to mined diamonds—indistinguishable to the naked eye and under magnification.",
  },
  {
    icon: Leaf,
    title: "Ethically Pure",
    description:
      "Zero mining impact. Complete traceability from lab to your finger. No environmental destruction. No conflict. Just conscious beauty.",
  },
  {
    icon: Sparkles,
    title: "Modern Heirlooms",
    description:
      "Timeless designs crafted for today, built to be treasured for generations. Each piece tells a story of innovation and intention.",
  },
];

export const NooriDifference = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-up">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            Why Choose Noori
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
            The Noori Difference
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group text-center reveal-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <pillar.icon className="w-10 h-10 text-accent" />
                </div>
                {/* Decorative Ring */}
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-accent/20 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-normal text-foreground mb-4">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/60 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
