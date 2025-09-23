import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import earringsImage from "@/assets/earrings-hero.jpg";
import necklaceImage from "@/assets/necklace-hero.jpg";
import braceletImage from "@/assets/bracelet-hero.jpg";

// Featured products from the Noori capsule collection
const products = [
  {
    id: "1",
    name: "Diamond Stud Earrings",
    price: "CAD $890",
    originalPrice: "CAD $1,200",
    image: earringsImage,
    rating: 5,
    reviewCount: 124,
  },
  {
    id: "2", 
    name: "Bezel-less Necklace",
    price: "CAD $1,450",
    image: necklaceImage,
    rating: 5,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Solitaire Bracelet",
    price: "CAD $1,190",
    image: braceletImage,
    rating: 5,
    reviewCount: 67,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-up">
          <h2 className="display-text mb-6">
            The Capsule
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Three essential pieces. Infinite possibilities.
            <br />
            <span className="text-accent">Modern heirlooms, built to be worn for life.</span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="reveal-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center reveal-up">
          <Button className="btn-hero group">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};