import { Microscope, Gem, Leaf } from "lucide-react";

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

export const WhyLabDiamonds = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="reveal-up mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Why <span className="noor-glow">Lab Diamonds</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The choice is clear—lab-grown diamonds deliver the same brilliance with superior ethics and exceptional quality.
          </p>
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
