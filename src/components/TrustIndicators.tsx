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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div
              key={indicator.title}
              className="text-center reveal-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <indicator.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-2 text-foreground">{indicator.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};