import { Flame, Zap, Sparkles, Microscope, Gem, Leaf } from "lucide-react";

const stats = [
  { icon: Flame, value: "2,700°F", label: "Extreme Heat" },
  { icon: Zap, value: "870,000 PSI", label: "Crushing Pressure" },
  { icon: Sparkles, value: "Type IIa", label: "Superior Purity" },
];

const pillars = [
  {
    icon: Microscope,
    title: "Scientifically Identical",
    description: "Same crystal structure, same 10 Mohs hardness, certified by GIA & IGI. Even experts can't tell the difference.",
  },
  {
    icon: Gem,
    title: "Superior Clarity",
    description: "Lab-controlled environments mean fewer inclusions and defects. Exceptional brilliance and fire in every stone.",
  },
  {
    icon: Leaf,
    title: "Ethically Pure",
    description: "Zero mining, no conflict financing, no displaced communities. Complete traceability from lab to jewelry box.",
  },
];

export const LabDiamonds = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="reveal-up mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Forged in <span className="noor-glow">Light</span>, Not Earth
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We recreate the forces of nature—the same conditions found 100 miles beneath the Earth's surface—to craft diamonds of extraordinary purity.
          </p>
        </div>

        {/* 3 Stat Cards */}
        <div className="reveal-up grid grid-cols-3 gap-4 md:gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-primary/10 hover:border-primary/30 transition-colors"
            >
              <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
              <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Benefit Pillars */}
        <div className="reveal-up grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
