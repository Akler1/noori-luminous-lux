import { Link } from "react-router-dom";
import { Truck, RotateCcw, Shield, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroProductShot from "@/assets/hero-product-shot.png";

interface GridProduct {
  id: string;
  name: string;
  price: string;
  pdpUrl: string;
  type: "3d" | "model-image" | "product-image";
  iframeUrl?: string;
  image?: string;
  material: string;
}

const gridProducts: GridProduct[] = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    type: "model-image",
    image: heroLifestyle,
    material: "Yellow gold",
  },
  {
    id: "earrings-emerald-gold",
    name: "Emerald Earrings",
    price: "$2,299",
    pdpUrl: "/product/earrings-emerald-gold",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    material: "Yellow gold",
  },
  {
    id: "earrings-princess-18k",
    name: "Princess Earrings",
    price: "$1,899",
    pdpUrl: "/product/earrings-princess-18k",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    material: "Yellow gold",
  },
  {
    id: "necklace-round",
    name: "Round Necklace",
    price: "$2,199",
    pdpUrl: "/product/necklace-round",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "necklace-princess",
    name: "Princess Necklace",
    price: "$2,399",
    pdpUrl: "/product/necklace-princess",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "necklace-emerald",
    name: "Emerald Necklace",
    price: "$2,599",
    pdpUrl: "/product/necklace-emerald",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "bracelet-three-stone",
    name: "3 Stone Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-three-stone",
    type: "product-image",
    image: heroProductShot,
    material: "Yellow gold",
  },
  {
    id: "bracelet-five-9k",
    name: "Five-Solitaire Bracelet",
    price: "$3,299",
    pdpUrl: "/product/bracelet-five-9k",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
];

const getCardBackground = (index: number, type: string): string => {
  if (type === "3d") return "bg-black";
  if (index === 0) return "bg-[#f5f5f5]";
  if (index === 6) return "bg-[#f0f0f0]";
  return "bg-[#eaeaea]";
};

export default function Product3DCarousel() {
  return (
    <section
      id="product-3d-carousel"
      className="bg-background"
      role="region"
      aria-label="Best sellers product grid"
    >
      {/* Section Header */}
      <div className="container-editorial text-center py-12 md:py-16">
        <h2 className="section-header text-foreground">Best sellers</h2>
      </div>

      {/* Full-Width Product Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {gridProducts.map((product, index) => (
            <Link
              key={product.id}
              to={product.pdpUrl}
              className="group block"
            >
              {/* Card Container */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 group-hover:opacity-90",
                  getCardBackground(index, product.type),
                  product.type !== "3d" && "h-full"
                )}
              >
                {/* Media Container - taller aspect for image tiles to fill full height */}
                <div className={cn(
                  "relative overflow-hidden",
                  product.type === "3d" ? "aspect-[3/4]" : "aspect-[3/5]"
                )}>
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

              {/* Product Info - only show for 3D product tiles */}
              {product.type === "3d" && (
                <div className="p-4 md:p-6 bg-background">
                  <p className="text-xs text-muted-foreground mb-1">{product.material}</p>
                  <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base text-foreground">
                    {product.price}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Bar */}
      <div className="container-editorial mt-12 pt-8 border-t border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center pb-12">
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
    </section>
  );
}
