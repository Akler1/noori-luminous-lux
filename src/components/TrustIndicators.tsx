import { Award, Truck, RotateCcw, Shield } from "lucide-react";

const indicators = [
  {
    icon: Award,
    title: "GIA & IGI Certified",
    description: "Every diamond certified by the world's leading gemological institutes",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary insured shipping across Canada on all orders",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Full refund or exchange within 30 days, no questions asked",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Comprehensive coverage for manufacturing defects forever",
  },
];

export const TrustIndicators = () => {
  return (
    <section className="py-20 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 reveal-up">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            Our Promise
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
            Trust & Transparency
          </h2>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {indicators.map((indicator, index) => (
            <div
              key={indicator.title}
              className="group text-center p-6 rounded-lg bg-background/50 border border-border/30 hover:border-accent/30 transition-all duration-300 reveal-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <indicator.icon className="h-7 w-7 text-accent" />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-normal text-foreground mb-2">
                {indicator.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground/60 leading-relaxed">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};