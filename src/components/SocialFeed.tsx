import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
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
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            #NooriJewelry
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
            Worn by You
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-8 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {socialPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72 md:w-80 aspect-square relative group rounded-lg overflow-hidden"
              style={{ scrollSnapAlign: "start" }}
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
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
