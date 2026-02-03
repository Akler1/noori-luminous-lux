import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroProductShot from "@/assets/hero-product-shot.png";
import braceletHero from "@/assets/bracelet-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import earringsHero from "@/assets/earrings-hero.jpg";
import earringsPrincess from "@/assets/earrings-princess.jpg";

const images = [
  { src: heroLifestyle, alt: "Model wearing Noori diamond jewelry" },
  { src: braceletHero, alt: "Noori diamond bracelet" },
  { src: necklaceHero, alt: "Noori diamond necklace" },
  { src: heroProductShot, alt: "Noori jewelry collection" },
  { src: earringsHero, alt: "Noori diamond earrings" },
  { src: earringsPrincess, alt: "Noori princess cut earrings" },
];

export function ImageGridHero() {
  return (
    <section className="pt-20 md:pt-28 bg-background relative overflow-hidden">
      {/* Full-width 3x2 Image Grid */}
      <div className="grid grid-cols-3 gap-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden group"
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

      {/* CTA Bar */}
      <div className="w-full border-t border-border bg-background">
        <div className="container mx-auto px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Tagline */}
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-foreground">
              Light, made forever.
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground text-sm md:text-base font-light text-center md:text-left">
              Certified lab-grown diamonds. Ethical. Enduring.{" "}
              <span className="text-primary font-medium">Exquisitely priced.</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-full transition-all duration-300"
                asChild
              >
                <Link to="/collections/solitaires">
                  Shop the Capsule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-border text-foreground bg-card hover:bg-accent px-6 py-2 rounded-full transition-all duration-300"
                asChild
              >
                <Link to="/why-noori">About Our Diamonds</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
