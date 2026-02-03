import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-diamonds.jpg";

export const LuxuryHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Noori lab-grown diamond jewelry"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Tagline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground reveal-up">
            Light, made{" "}
            <span className="italic text-accent">forever</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto reveal-up" style={{ animationDelay: "0.1s" }}>
            Certified lab-grown diamonds. Ethically crafted. 
            Brilliance without compromise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-up" style={{ animationDelay: "0.2s" }}>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium group"
            >
              <Link to="/solitaires">
                Shop the Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-foreground/30 text-foreground hover:bg-foreground/5 px-8 py-6 text-base"
            >
              <Link to="/why-noori">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal-up" style={{ animationDelay: "0.4s" }}>
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
