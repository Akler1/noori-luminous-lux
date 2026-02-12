import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Solitaire3DCard } from "@/components/Solitaire3DCard";

const solitaireProducts = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
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
  {
    id: "necklace-round-brilliant",
    name: "Round Necklace",
    price: "$2,599",
    pdpUrl: "/product/necklace-round-brilliant",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 47
  },
  {
    id: "necklace-princess",
    name: "Princess Necklace",
    price: "$3,299",
    pdpUrl: "/product/necklace-princess-platinum",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 42
  },
  {
    id: "necklace-emerald",
    name: "Emerald Necklace",
    price: "$3,599",
    pdpUrl: "/product/necklace-emerald-18k",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 38
  },
  {
    id: "bracelet-three-stone",
    name: "3 Stone Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-three-stone",
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html",
    rating: 5,
    reviewCount: 29
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
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
