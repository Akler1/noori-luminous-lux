import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Solitaire3DCard } from "@/components/Solitaire3DCard";

const PLACEHOLDER_IFRAME = "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html";

const solitaireProducts = [
  // Earrings
  {
    id: "round-vela-studs",
    name: "Round Vela Studs",
    price: "$1,950",
    pdpUrl: "/product/round-vela-studs",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 31
  },
  {
    id: "emerald-vela-studs",
    name: "Emerald Vela Studs",
    price: "$1,950",
    pdpUrl: "/product/emerald-vela-studs",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    rating: 5,
    reviewCount: 18
  },
  {
    id: "earrings-princess",
    name: "Princess Vela Studs",
    price: "$1,950",
    pdpUrl: "/product/princess-vela-studs",
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    rating: 5,
    reviewCount: 24
  },
  // Pendants
  {
    id: "round-vela-pendant",
    name: "Round Vela Pendant",
    price: "$1,750",
    pdpUrl: "/product/round-vela-pendant",
    iframeUrl: "https://akler1.github.io/round-y_zoomed/",
    rating: 5,
    reviewCount: 47
  },
  {
    id: "princess-vela-pendant",
    name: "Princess Vela Pendant",
    price: "$1,750",
    pdpUrl: "/product/princess-vela-pendant",
    iframeUrl: "https://akler1.github.io/princess-y_zoomed/",
    rating: 5,
    reviewCount: 42
  },
  {
    id: "emerald-vela-pendant",
    name: "Emerald Vela Pendant",
    price: "$1,750",
    pdpUrl: "/product/emerald-vela-pendant",
    iframeUrl: "https://akler1.github.io/emerald-y_zoomed/",
    rating: 5,
    reviewCount: 38
  },
  // Bracelets
  {
    id: "vela-bracelet",
    name: "Vela Bracelet",
    price: "$2,525",
    pdpUrl: "/product/vela-bracelet",
    iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html",
    rating: 5,
    reviewCount: 29
  },
  {
    id: "vela-bracelet-2ct",
    name: "Vela Bracelet 2ct",
    price: "$3,475",
    pdpUrl: "/product/vela-bracelet-2ct",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 22
  }
];

export default function Solitaires() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Solitaires Hero Section */}
        <section className="pt-28 md:pt-36 pb-12">
          <h1 className="font-display text-4xl md:text-6xl font-normal text-center">
            The Vela Collection
          </h1>
        </section>

        {/* Product Grid with 3D Viewers */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2 lg:p-3">
            {solitaireProducts.map((product) => (
              <Solitaire3DCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                pdpUrl={product.pdpUrl}
                iframeUrl={product.iframeUrl}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
