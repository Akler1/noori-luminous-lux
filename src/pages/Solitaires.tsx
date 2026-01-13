import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Solitaire3DCard } from "@/components/Solitaire3DCard";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
      
      <main className="flex-1">
        {/* Capsule-Style Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-hero light-particles">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-accent" />
                <Badge variant="secondary" className="text-accent border-accent/20">
                  Signature Collection
                </Badge>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-normal mb-6">
                The Capsule Collection
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Three essential pieces. Infinite possibilities. Our inaugural collection captures 
                the essence of modern luxury — refined, ethical, and built to transcend trends.
              </p>

              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  Each piece represents a different facet of light
                </p>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-display text-2xl text-accent">Brilliance</div>
                    <div className="text-muted-foreground">Stud Earrings</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-display text-2xl text-accent">Elegance</div>
                    <div className="text-muted-foreground">Necklace</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-display text-2xl text-accent">Grace</div>
                    <div className="text-muted-foreground">Bracelet</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Grid with 3D Viewers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
