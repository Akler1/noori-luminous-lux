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
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 24
  },
  {
    id: "necklace-round",
    name: "Bezel-less Necklace",
    price: "$2,799",
    pdpUrl: "/product/necklace-1ct-silver",
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 56
  },
  {
    id: "necklace-princess",
    name: "Princess Necklace",
    price: "$3,299",
    pdpUrl: "/product/necklace-princess-platinum",
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 42
  },
  {
    id: "necklace-emerald",
    name: "Emerald Necklace",
    price: "$3,599",
    pdpUrl: "/product/necklace-emerald-18k",
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 38
  },
  {
    id: "bracelet-five",
    name: "Five-Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-five-9k",
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 29
  }
];

export default function Solitaires() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="display-text mb-4">Solitaires</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Light, captured in every facet. Our complete collection of certified lab-grown 
              diamond solitaires — from timeless studs to statement necklaces.
            </p>
          </div>

          {/* Product Grid with 3D Viewers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solitaireProducts.map((product) => (
              <Solitaire3DCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                pdpUrl={product.pdpUrl}
                iframeUrl={product.iframeUrl}
                glb={product.glb}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
