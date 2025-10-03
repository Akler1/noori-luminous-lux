import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

const earringsProducts = [
  {
    id: "earrings-princess",
    name: "Princess-Cut Earrings — 18K White Gold",
    price: "$1,899",
    image: "/src/assets/earrings-princess.jpg",
    pdpUrl: "/product/earrings-princess-18k",
    rating: 5,
    reviewCount: 24
  },
  {
    id: "earrings-round",
    name: "Round Brilliant Studs — 14K Gold",
    price: "$1,599",
    image: "/src/assets/earrings-hero.jpg",
    pdpUrl: "/product/stud-round-14k",
    rating: 5,
    reviewCount: 31
  },
  {
    id: "earrings-emerald",
    name: "Emerald-Cut Earrings — Platinum",
    price: "$2,299",
    image: "/src/assets/earrings-hero.jpg",
    pdpUrl: "/product/earrings-emerald-platinum",
    rating: 5,
    reviewCount: 18
  }
];

export default function Earrings() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="display-text mb-4">Earrings</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Timeless elegance in every cut. Our collection features certified lab-grown diamonds 
              in princess, round brilliant, and emerald cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {earringsProducts.map((product) => (
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