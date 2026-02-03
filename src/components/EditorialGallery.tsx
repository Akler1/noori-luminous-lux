import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import earringsHero from "@/assets/earrings-hero.jpg";
import earringsPrincess from "@/assets/earrings-princess.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import heroProductShot from "@/assets/hero-product-shot.png";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const galleryItems = [
  {
    src: earringsHero,
    alt: "Diamond earrings",
    label: "Earrings",
    link: "/solitaires",
    gridClass: "col-span-6 md:col-span-4 row-span-2",
  },
  {
    src: heroLifestyle,
    alt: "Lifestyle shot",
    label: "Collection",
    link: "/solitaires",
    gridClass: "col-span-6 md:col-span-4 row-span-1",
  },
  {
    src: necklaceHero,
    alt: "Diamond necklace",
    label: "Necklaces",
    link: "/solitaires",
    gridClass: "col-span-6 md:col-span-4 row-span-2",
  },
  {
    src: braceletHero,
    alt: "Diamond bracelet",
    label: "Bracelets",
    link: "/solitaires",
    gridClass: "col-span-6 md:col-span-4 row-span-1",
  },
  {
    src: heroProductShot,
    alt: "Diamond product shot",
    label: "Diamonds",
    link: "/why-noori",
    gridClass: "col-span-6 md:col-span-4 row-span-1",
  },
  {
    src: earringsPrincess,
    alt: "Princess cut earrings",
    label: "Princess Cut",
    link: "/solitaires",
    gridClass: "col-span-6 md:col-span-4 row-span-1",
  },
];

export const EditorialGallery = () => {
  return (
    <section className="py-2 bg-background">
      <div className="grid grid-cols-12 gap-1 md:gap-2">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${item.gridClass} relative group overflow-hidden`}
          >
            <Link to={item.link} className="block w-full h-full">
              <div className="relative w-full h-full min-h-[200px] md:min-h-[300px]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-foreground font-display text-2xl md:text-3xl tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>

                {/* Gold border accent on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
