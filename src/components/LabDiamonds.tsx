import { Flame, Zap, Sparkles, Microscope, Gem, Leaf } from "lucide-react";

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

        {/* 3 Stat Cards with Effects */}
        <div className="reveal-up grid grid-cols-3 gap-4 md:gap-8 mb-16">
          {/* Fire Card - Temperature */}
          <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-orange-500/20 transition-colors overflow-hidden">
            {/* Fire glow effect - always visible */}
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-t from-orange-500/40 via-amber-400/25 to-transparent blur-xl animate-pulse" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-t from-red-500/30 via-orange-400/20 to-transparent blur-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <Flame className="w-8 h-8 md:w-10 md:h-10 text-orange-500 mx-auto mb-3 animate-pulse relative z-10" />
            <div className="text-xl md:text-2xl font-bold text-foreground mb-1 relative z-10">
              2,700°F
            </div>
            <div className="text-xs md:text-sm text-muted-foreground relative z-10">
              Extreme Heat
            </div>
          </div>

          {/* Pressure Card - PSI */}
          <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-400/20 transition-colors overflow-hidden">
            {/* Pressure pulse effect - always visible & enhanced */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 border-4 border-blue-400/30 rounded-xl animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 border-3 border-cyan-400/25 rounded-lg animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
              <div className="absolute inset-4 border-2 border-blue-300/20 rounded-md animate-ping" style={{ animationDuration: '2s', animationDelay: '0.8s' }} />
              {/* Center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mx-auto mb-3 relative z-10" />
            <div className="text-xl md:text-2xl font-bold text-foreground mb-1 relative z-10">
              870,000 PSI
            </div>
            <div className="text-xs md:text-sm text-muted-foreground relative z-10">
              Crushing Pressure
            </div>
          </div>

          {/* Sparkle Card - Type IIa */}
          <div className="relative bg-background/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-primary/20 transition-colors overflow-hidden">
            {/* Shimmer glow effect - always visible */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-primary/15 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
            </div>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3 animate-pulse relative z-10" />
            <div className="text-xl md:text-2xl font-bold text-primary mb-1 relative z-10">
              Type IIa
            </div>
            <div className="text-xs md:text-sm text-muted-foreground relative z-10">
              Superior Purity
            </div>
          </div>
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
