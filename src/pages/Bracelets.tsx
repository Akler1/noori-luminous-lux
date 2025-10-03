import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

const braceletsProducts = [
  {
    id: "bracelet-five",
    name: "Five-Solitaire Bracelet — 9K Gold",
    price: "$2,499",
    image: "/src/assets/bracelet-hero.jpg",
    pdpUrl: "/product/bracelet-five-9k",
    rating: 5,
    reviewCount: 29
  }
];

export default function Bracelets() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="display-text mb-4">Bracelets</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Refined luxury for everyday wear. Our signature five-solitaire design 
              brings timeless sophistication to your wrist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {braceletsProducts.map((product) => (
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