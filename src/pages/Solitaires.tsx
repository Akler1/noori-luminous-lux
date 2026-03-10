import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Solitaire3DCard } from "@/components/Solitaire3DCard";

const PLACEHOLDER_IFRAME = "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html";

const solitaireProducts = [
  // Earrings (3)
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 31
  },
  {
    id: "earrings-emerald-gold",
    name: "Emerald Earrings",
    price: "$2,299",
    pdpUrl: "/product/earrings-emerald-gold",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    rating: 5,
    reviewCount: 18
  },
  {
    id: "earrings-princess",
    name: "Princess Earrings",
    price: "$1,899",
    pdpUrl: "/product/earrings-princess-18k",
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    rating: 5,
    reviewCount: 24
  },
  // Pendants (3)
  {
    id: "pendant-round",
    name: "Round Pendant",
    price: "$2,599",
    pdpUrl: "/product/pendant-round",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 47
  },
  {
    id: "pendant-princess",
    name: "Princess Pendant",
    price: "$3,299",
    pdpUrl: "/product/pendant-princess",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 42
  },
  {
    id: "pendant-emerald",
    name: "Emerald Pendant",
    price: "$3,599",
    pdpUrl: "/product/pendant-emerald",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 38
  },
  // Bracelets (2)
  {
    id: "bracelet-solitaire-1ct",
    name: "Solitaire Bracelet 1ct",
    price: "$2,499",
    pdpUrl: "/product/bracelet-solitaire-1ct",
    iframeUrl: PLACEHOLDER_IFRAME,
    rating: 5,
    reviewCount: 29
  },
  {
    id: "bracelet-solitaire-2ct",
    name: "Solitaire Bracelet 2ct",
    price: "$3,499",
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
            The Solitaires Collection
          </h1>
        </section>

        {/* Product Grid with 3D Viewers */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 p-2 lg:p-3">
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
