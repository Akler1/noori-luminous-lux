import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ParallaxSection, RevealOnScroll } from "@/components/ScrollAnimations";
import { Link } from "react-router-dom";
import earringsImage from "@/assets/earrings-hero.jpg";
import necklaceImage from "@/assets/necklace-hero.jpg";
import braceletImage from "@/assets/bracelet-hero.jpg";

// Featured products from the Noori capsule collection
const products = [
  {
    id: "1",
    name: "Round Solitaire Studs",
    price: "CAD $1,954",
    image: earringsImage,
    rating: 5,
    reviewCount: 124,
  },
  {
    id: "2", 
    name: "Solitaire Necklace",
    price: "CAD $1,748",
    image: necklaceImage,
    rating: 5,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Solitaire Bracelet",
    price: "CAD $2,528",
    image: braceletImage,
    rating: 5,
    reviewCount: 67,
  },
];

export const FeaturedProducts = () => {
  return (
    <ParallaxSection speed={0.3} className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="display-text mb-6">
            The Capsule
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Three essential pieces. Infinite possibilities.
            <br />
            <span className="text-accent">Modern heirlooms, built to be worn for life.</span>
          </p>
        </RevealOnScroll>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <RevealOnScroll
              key={product.id}
              delay={index * 0.2}
              direction="up"
            >
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                onToggleWishlist={() => console.log(`Toggled wishlist for ${product.name}`)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* View All Button */}
        <RevealOnScroll className="text-center mt-12">
          <Button className="btn-hero group" asChild>
            <Link to="/capsule">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </RevealOnScroll>
      </div>
    </ParallaxSection>
  );
};