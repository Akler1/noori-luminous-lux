import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroProductShot from "@/assets/hero-product-shot.png";
import braceletHero from "@/assets/bracelet-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";

const images = [
  { src: heroLifestyle, alt: "Model wearing Noori diamond jewelry" },
  { src: braceletHero, alt: "Noori diamond bracelet" },
  { src: necklaceHero, alt: "Noori diamond necklace" },
  { src: heroProductShot, alt: "Noori jewelry collection" },
];

export function ImageGridHero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 30% 50%, rgba(201, 162, 39, 0.08), transparent 60%)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] items-center relative z-10">
        {/* Left: 2x2 Image Grid - Full Bleed */}
        <div className="grid grid-cols-2 gap-0">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Right: Content Area with internal padding */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left px-6 lg:px-12 py-8">
          {/* Gold glow behind headline */}
          <div className="relative">
            <div
              className="absolute -inset-12 pointer-events-none hidden lg:block"
              style={{
                background:
                  "radial-gradient(ellipse 400px 200px at 50% 50%, rgba(201, 162, 39, 0.12), transparent 70%)",
              }}
            />
            <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground relative z-10">
              Light, made forever.
            </h1>
          </div>

          <p className="max-w-[48ch] mx-auto lg:mx-0 text-muted-foreground text-[clamp(16px,2vw,20px)] font-light leading-relaxed">
            Certified lab-grown diamonds. Ethical. Enduring.{" "}
            <span className="text-primary font-medium">Exquisitely priced.</span>
          </p>

          <div className="flex gap-3 flex-col sm:flex-row justify-center lg:justify-start">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-full transition-all duration-300"
              asChild
            >
              <Link to="/collections/solitaires">
                Shop the Capsule
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground bg-card hover:bg-accent px-8 py-3 rounded-full transition-all duration-300"
              asChild
            >
              <Link to="/why-noori">About Our Diamonds</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
