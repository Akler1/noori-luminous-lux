import { Sparkles } from "lucide-react";

export const BrandManifesto = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-12 left-1/4 opacity-20">
        <Sparkles className="w-8 h-8 text-accent" />
      </div>
      <div className="absolute bottom-12 right-1/4 opacity-20">
        <Sparkles className="w-6 h-6 text-accent" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 md:w-48 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-48 h-px bg-gradient-to-l from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Mark */}
          <div className="mb-8 reveal-up">
            <span className="text-6xl md:text-8xl text-accent/30 font-display leading-none">"</span>
          </div>

          {/* Main Statement */}
          <blockquote className="reveal-up" style={{ animationDelay: "0.1s" }}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-foreground">
              Noori means{" "}
              <span className="italic text-accent">light</span>{" "}
              in Persian—the same light that creates diamonds deep within the earth, 
              now harnessed to craft modern heirlooms.
            </p>
          </blockquote>

          {/* Subtitle */}
          <p className="mt-8 text-lg text-foreground/60 max-w-2xl mx-auto reveal-up" style={{ animationDelay: "0.2s" }}>
            We believe luxury shouldn't come at the expense of ethics or accessibility. 
            Our diamonds offer the same brilliance as mined stones, at a fraction of the cost 
            and environmental impact.
          </p>

          {/* Closing Quote Mark */}
          <div className="mt-8 reveal-up" style={{ animationDelay: "0.3s" }}>
            <span className="text-6xl md:text-8xl text-accent/30 font-display leading-none rotate-180 inline-block">"</span>
          </div>
        </div>
      </div>
    </section>
  );
};
