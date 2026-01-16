import { Award, Truck, RotateCcw, Shield } from "lucide-react";

export const TrustIndicators = () => {
  const indicators = [
    {
      icon: Award,
      title: "GIA Certified",
      description: "Every diamond certified by leading gemological institutes",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary shipping across Canada on all orders",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Full refund or exchange within 30 days of purchase",
    },
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "Comprehensive coverage for manufacturing defects",
    },
  ];

  return (
    <section className="py-6 bg-background border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {indicators.map((indicator, index) => (
            <div
              key={indicator.title}
              className="flex items-center gap-2 text-sm reveal-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <indicator.icon className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-foreground/90 whitespace-nowrap">{indicator.title}</span>
              {index < indicators.length - 1 && (
                <span className="hidden md:block text-border/50 ml-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};