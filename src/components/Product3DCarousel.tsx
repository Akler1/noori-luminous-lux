import { Link } from "react-router-dom";
import { Star, Truck, RotateCcw, Shield, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import heroSolitairesCollection from "@/assets/hero-solitaires-collection.png";
import braceletHero from "@/assets/bracelet-hero.jpg";

interface GridProduct {
  id: string;
  name: string;
  price: string;
  pdpUrl: string;
  type: "3d" | "model-image" | "product-image";
  iframeUrl?: string;
  image?: string;
  rating: number;
  reviewCount: number;
}

const gridProducts: GridProduct[] = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    type: "model-image",
    image: heroSolitairesCollection,
    rating: 5,
    reviewCount: 31,
  },
  {
    id: "earrings-emerald-gold",
    name: "Emerald Earrings",
    price: "$2,299",
    pdpUrl: "/product/earrings-emerald-gold",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    rating: 5,
    reviewCount: 18,
  },
  {
    id: "earrings-princess-18k",
    name: "Princess Earrings",
    price: "$1,899",
    pdpUrl: "/product/earrings-princess-18k",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    rating: 5,
    reviewCount: 24,
  },
  {
    id: "necklace-round",
    name: "Round Necklace",
    price: "$2,199",
    pdpUrl: "/product/necklace-round",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 22,
  },
  {
    id: "necklace-princess",
    name: "Princess Necklace",
    price: "$2,399",
    pdpUrl: "/product/necklace-princess",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 19,
  },
  {
    id: "necklace-emerald",
    name: "Emerald Necklace",
    price: "$2,599",
    pdpUrl: "/product/necklace-emerald",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 16,
  },
  {
    id: "bracelet-three-stone",
    name: "3 Stone Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-three-stone",
    type: "product-image",
    image: braceletHero,
    rating: 5,
    reviewCount: 29,
  },
  {
    id: "bracelet-five-9k",
    name: "Five-Solitaire Bracelet",
    price: "$3,299",
    pdpUrl: "/product/bracelet-five-9k",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 14,
  },
];

const getCardBackground = (index: number, type: string): string => {
  if (type === "3d") return "xr-tile";
  if (index === 0) return "bg-[#f5f5f5] border-border/30";
  return "bg-[#eaeaea] border-border/30";
};

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">({reviewCount})</span>
  </div>
);

export default function Product3DCarousel() {
  return (
    <section
      id="product-3d-carousel"
      className="section-spacing bg-background"
      role="region"
      aria-label="Best sellers product grid"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Explore the Collection
          </p>
          <h2 className="section-header text-foreground mb-3">Best sellers</h2>
          <p className="text-muted-foreground">
            Discover our most loved pieces
          </p>
        </div>

        {/* 4x2 Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {gridProducts.map((product, index) => (
            <Link
              key={product.id}
              to={product.pdpUrl}
              className="group block"
            >
              {/* Card Container */}
              <div
                className={cn(
                  "rounded-2xl overflow-hidden border transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]",
                  getCardBackground(index, product.type)
                )}
              >
                {/* Media Container */}
                <div className="aspect-square relative overflow-hidden">
                  {product.type === "3d" ? (
                    <iframe
                      src={product.iframeUrl}
                      className="w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto"
                      style={{ background: "#000000" }}
                      allow="xr-spatial-tracking; fullscreen; autoplay"
                      title={product.name}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-4 pb-2">
                <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {product.price}
                </p>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-sm text-foreground">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-sm text-foreground">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy exchanges</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-sm text-foreground">Lifetime Warranty</p>
                <p className="text-xs text-muted-foreground">Crafted to last</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Gem className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-sm text-foreground">Ethical Diamonds</p>
                <p className="text-xs text-muted-foreground">Lab-grown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
