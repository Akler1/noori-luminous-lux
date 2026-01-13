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
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html",
    rating: 5,
    reviewCount: 24
  },
  {
    id: "necklace-round-brilliant",
    name: "Round Necklace",
    price: "$2,599",
    pdpUrl: "/product/necklace-round-brilliant",
    glb: "/models/noori_placeholder.glb",
    rating: 5,
    reviewCount: 47
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
    id: "bracelet-three-stone",
    name: "3 Stone Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-three-stone",
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
        {/* Solitaires Hero Section */}
        <section className="pt-28 md:pt-36 pb-16 bg-gradient-hero light-particles relative overflow-hidden">
          {/* Decorative Sparkles */}
          <Sparkles className="absolute top-24 left-8 md:left-16 h-4 w-4 text-accent/40 animate-pulse" />
          <Sparkles className="absolute top-32 right-12 md:right-24 h-5 w-5 text-accent/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute top-1/2 left-4 md:left-12 h-3 w-3 text-accent/25 animate-pulse" style={{ animationDelay: '1s' }} />
          <Sparkles className="absolute top-1/2 right-4 md:right-12 h-3 w-3 text-accent/25 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <Sparkles className="absolute bottom-32 left-16 md:left-32 h-5 w-5 text-accent/35 animate-pulse" style={{ animationDelay: '0.75s' }} />
          <Sparkles className="absolute bottom-24 right-8 md:right-20 h-4 w-4 text-accent/40 animate-pulse" style={{ animationDelay: '1.25s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-accent" />
                <Badge variant="secondary" className="text-accent border-accent/20 text-base md:text-lg px-4 py-1.5">
                  Signature Collection
                </Badge>
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-normal mb-6">
                The Solitaires Collection
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Three essential pieces. Three signature cuts — Round, Princess, and Emerald. 
                Our inaugural collection captures the essence of modern luxury — refined, ethical, 
                and built to transcend trends.
              </p>

              <div className="text-center mb-8">
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
