import { Flame, Zap, Gem } from "lucide-react";

export const HowLabDiamondsMade = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="reveal-up mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            How <span className="noor-glow">Lab Diamonds</span> Are Made
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We recreate the forces of nature—the same conditions found 100 miles beneath the Earth's surface—to craft diamonds of extraordinary purity.
          </p>
        </div>

        {/* 3 Stat Cards with Effects */}
        <div className="reveal-up grid grid-cols-3 gap-4 md:gap-8">
          {/* Diamond Seed Card */}
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-primary/20 transition-colors overflow-hidden">
            {/* Crystalline sparkle effect - always visible */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              {/* Sparkle points */}
              <div className="absolute top-3 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-primary/70 rounded-full animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
              {/* Diamond facet shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse" style={{ animationDuration: '4s' }} />
            </div>
            <Gem className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3 relative z-10" />
            <div className="text-xl md:text-2xl font-bold text-primary mb-1 relative z-10">
              Diamond Seed
            </div>
            <div className="text-xs md:text-sm text-muted-foreground relative z-10">
              Where It Begins
            </div>
          </div>

          {/* Fire Card - Temperature */}
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-orange-500/20 transition-colors overflow-hidden">
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
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-400/20 transition-colors overflow-hidden">
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
        </div>
      </div>
    </section>
  );
};
