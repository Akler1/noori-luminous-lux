import { Link } from "react-router-dom";
import { Truck, RotateCcw, Shield, Gem } from "lucide-react";

interface GridProduct {
  id: string;
  name: string;
  price: string;
  pdpUrl: string;
  iframeUrl: string;
  material: string;
}

const gridProducts: GridProduct[] = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "necklace-princess",
    name: "Princess Pendant",
    price: "$2,399",
    pdpUrl: "/product/necklace-princess",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "bracelet-five-9k",
    name: "Five-Solitaire Bracelet",
    price: "$3,299",
    pdpUrl: "/product/bracelet-five-9k",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
];

export default function Product3DCarousel() {
  return (
    <section
      id="product-3d-carousel"
      className="bg-background"
      role="region"
      aria-label="Best sellers product grid"
    >
      <div className="container-editorial text-center py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-medium tracking-wide uppercase text-foreground">
          Best Sellers
        </h2>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {gridProducts.map((product) => (
            <Link
              key={product.id}
              to={product.pdpUrl}
              className="group block"
            >
              <div className="overflow-hidden transition-all duration-300 group-hover:opacity-90 bg-black">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <iframe
                    src={product.iframeUrl}
                    className="w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto"
                    style={{ background: "#000000" }}
                    allow="xr-spatial-tracking; fullscreen; autoplay"
                    title={product.name}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-4 md:p-6 bg-background">
                <p className="text-xs text-muted-foreground mb-1">{product.material}</p>
                <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base text-foreground">
                  {product.price}
                </p>
              </div>
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
