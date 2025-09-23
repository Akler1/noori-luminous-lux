import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-diamonds.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden light-particles">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury lab-grown diamond jewelry"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="reveal-up revealed">
          <h1 className="hero-text mb-6 text-primary">
            Light, made
            <br />
            <span className="noor-glow">forever</span>
          </h1>
        </div>

        <div className="reveal-up revealed" style={{ animationDelay: "0.2s" }}>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed">
            Certified lab-grown diamonds. Ethical. Enduring.
            <br />
            <span className="text-accent font-medium">Exquisitely priced.</span>
          </p>
        </div>

        <div className="reveal-up revealed flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: "0.4s" }}>
          <Button className="btn-hero group">
            Shop the Capsule
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="btn-ghost-luxury">
            Learn About Our Diamonds
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};