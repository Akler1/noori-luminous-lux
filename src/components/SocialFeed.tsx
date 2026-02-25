import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import earringsHero from "@/assets/earrings-hero.jpg";
import earringsPrincess from "@/assets/earrings-princess.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import heroProductShot from "@/assets/hero-product-shot.png";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const socialPosts = [
  { src: earringsHero, handle: "@noori.diamonds" },
  { src: heroLifestyle, handle: "@sarah.styles" },
  { src: braceletHero, handle: "@noori.diamonds" },
  { src: earringsPrincess, handle: "@emma.luxe" },
  { src: necklaceHero, handle: "@noori.diamonds" },
  { src: heroProductShot, handle: "@jewelry.daily" },
];

export const SocialFeed = () => {
  return (
    <section className="section-spacing bg-background overflow-hidden">
      <div className="container-editorial mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-header text-foreground">
            Worn by you.
          </h2>
        </motion.div>
      </div>

      <div className="px-4 md:px-8">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <CarouselContent className="-ml-4">
            {socialPosts.map((post, index) => (
              <CarouselItem key={index} className="pl-4 basis-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-72 md:w-80 aspect-square relative group rounded-lg overflow-hidden"
                >
                  <img
                    src={post.src}
                    alt={`Instagram post by ${post.handle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <Instagram className="w-8 h-8 text-foreground mb-3" />
                    <span className="text-foreground text-sm tracking-wide">
                      {post.handle}
                    </span>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};
