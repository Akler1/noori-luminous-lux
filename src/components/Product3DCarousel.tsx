import { Link } from "react-router-dom";
import { Truck, RotateCcw, RotateCw, Shield, Gem, Award } from "lucide-react";

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
    id: "round-vela-studs",
    name: "Round Vela Studs",
    price: "$1,750",
    pdpUrl: "/product/round-vela-studs",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    material: "Yellow gold",
  },
  {
    id: "emerald-vela-studs",
    name: "Emerald Vela Studs",
    price: "$1,750",
    pdpUrl: "/product/emerald-vela-studs",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    material: "Yellow gold",
  },
  {
    id: "necklace-round",
    name: "Round Vela Pendant",
    price: "$1,575",
    pdpUrl: "/product/round-vela-pendant",
    iframeUrl: "https://akler1.github.io/round-y_zoomed/",
    material: "Yellow gold",
  },
  {
    id: "vela-bracelet",
    name: "Vela Bracelet",
    price: "$2,525",
    pdpUrl: "/product/vela-bracelet",
    iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html",
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
      <div className="container-editorial text-center pt-16 pb-6 md:pt-20 md:pb-8">
        <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
          Best Sellers
        </h2>
      </div>

      {/* Trust Bar */}
      <div className="w-full px-4 py-5 md:py-6 border-b border-border/40">
        <div className="grid grid-cols-5 gap-2 md:gap-8 text-center max-w-[1280px] mx-auto">
          {[
            { Icon: Truck, label: "Free Shipping", sub: "On all orders" },
            { Icon: RotateCcw, label: "30-Day Returns", sub: "Easy exchanges" },
            { Icon: Shield, label: "Lifetime Warranty", sub: "Crafted to last" },
            { Icon: Gem, label: "Ethical Diamonds", sub: "Lab-grown" },
            { Icon: Award, label: "IGI Certified", sub: "Every diamond" },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1 md:gap-2">
              <Icon className="h-5 w-5 md:h-7 md:w-7 text-accent" />
              <div>
                <p className="font-medium text-[10px] md:text-sm text-foreground">{label}</p>
                <p className="text-[9px] md:text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20">
          {gridProducts.map((product) => (
            <Link
              key={product.id}
              to={product.pdpUrl}
              className="group block"
            >
              <div className="overflow-hidden transition-all duration-300 group-hover:opacity-90 bg-[#e8e8e8]">
                <div className="relative overflow-hidden aspect-square">
                  <iframe
                    src={product.iframeUrl}
                    className="w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto"
                    style={{ background: "#e8e8e8" }}
                    allow="xr-spatial-tracking; fullscreen; autoplay"
                    title={product.name}
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                    <div className="flex items-center gap-1.5 text-accent/70 text-[10px] tracking-wide">
                      <RotateCw className="h-3 w-3" />
                      Click & drag to rotate
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pt-4 pb-5 md:px-6 md:pt-6 md:pb-6 bg-background">
                <p className="text-xs text-muted-foreground/80 uppercase tracking-wider mb-1">
                  {product.material}
                </p>
                <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base text-foreground group-hover:text-accent transition-colors">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
