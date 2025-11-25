import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

const necklacesProducts = [
  {
    id: "necklace-princess",
    name: "Princess Necklace",
    price: "$3,299",
    image: "/src/assets/necklace-hero.jpg",
    pdpUrl: "/product/necklace-princess-platinum",
    rating: 5,
    reviewCount: 42
  },
  {
    id: "necklace-round",
    name: "Bezel-less Necklace",
    price: "$2,799",
    image: "/src/assets/necklace-hero.jpg",
    pdpUrl: "/product/necklace-1ct-silver",
    rating: 5,
    reviewCount: 56
  },
  {
    id: "necklace-emerald",
    name: "Emerald Necklace",
    price: "$3,599",
    image: "/src/assets/necklace-hero.jpg",
    pdpUrl: "/product/necklace-emerald-18k",
    rating: 5,
    reviewCount: 38
  }
];

export default function Necklaces() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="display-text mb-4">Necklaces</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Statement pieces that capture light and attention. Each necklace features 
              ethically sourced lab-grown diamonds in your choice of precious metals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {necklacesProducts.map((product) => (
              <Link key={product.id} to={product.pdpUrl}>
                <ProductCard 
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}