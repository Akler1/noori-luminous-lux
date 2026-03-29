import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Solitaire3DCard } from "@/components/Solitaire3DCard";

const PLACEHOLDER_IFRAME = "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html";

const solitaireProducts = [
  // Earrings
  {
    id: "stud-round-14k",
    name: "Round Vela Studs",
    price: "$1,954",
    pdpUrl: "/product/stud-round-14k",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 31
  },
  {
    id: "earrings-emerald-gold",
    name: "Emerald Vela Studs",
    price: "$1,954",
    pdpUrl: "/product/earrings-emerald-gold",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    rating: 5,
    reviewCount: 18
  },
  {
    id: "earrings-princess",
    name: "Princess Vela Studs",
    price: "$1,954",
    pdpUrl: "/product/earrings-princess-18k",
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    rating: 5,
    reviewCount: 24
  },
  // Pendants
  {
    id: "pendant-round",
    name: "Round Vela Pendant",
    price: "$1,748",
    pdpUrl: "/product/pendant-round",
    iframeUrl: "https://akler1.github.io/round-y_zoomed/",
    rating: 5,
    reviewCount: 47
  },
  {
    id: "pendant-princess",
    name: "Princess Vela Pendant",
    price: "$1,748",
    pdpUrl: "/product/pendant-princess",
    iframeUrl: "https://akler1.github.io/princess-y_zoomed/",
    rating: 5,
    reviewCount: 42
  },
  {
    id: "pendant-emerald",
    name: "Emerald Vela Pendant",
    price: "$1,748",
    pdpUrl: "/product/pendant-emerald",
    iframeUrl: "https://akler1.github.io/emerald-y_zoomed/",
    rating: 5,
    reviewCount: 38
  },
  // Bracelets
  {
    id: "bracelet-solitaire-1ct",
    name: "Vela Bracelet",
    price: "$2,528",
    pdpUrl: "/product/bracelet-solitaire-1ct",
    iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html",
    rating: 5,
    reviewCount: 29
  },
  {
    id: "bracelet-solitaire-2ct",
    name: "Vela Bracelet 2ct",
    price: "$3,466",
    pdpUrl: "/product/bracelet-solitaire-2ct",
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
