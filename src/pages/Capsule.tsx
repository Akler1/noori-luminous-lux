import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Product {
  slug: string;
  title: string;
  subtitle: string;
  pdpUrl: string;
  poster?: string;
}

const Capsule = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState({ days: 14, hours: 23, minutes: 45 });

  // Load capsule products from carousel config
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/carousel-config.json');
        const config = await response.json();
        const slides = config.slides.map((slide: any) => ({
          slug: slide.slug,
          title: slide.title,
          subtitle: slide.subtitle,
          pdpUrl: slide.pdpUrl,
          poster: config.placeholder.poster
        }));
        setProducts(slides);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Countdown timer for next drop
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => ({
        days: prev.days,
        hours: prev.hours,
        minutes: prev.minutes > 0 ? prev.minutes - 1 : 59
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading capsule collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
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
                Limited Edition
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

      {/* Collection Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="card-luxury overflow-hidden">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
                    <Link to={product.pdpUrl} className="block w-full h-full" aria-label={`View ${product.title}`}>
                      <img
                        src={product.poster || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                    {/* Quick Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        className="bg-background/90 backdrop-blur-sm hover:bg-background"
                        asChild
                      >
                        <Link to={product.pdpUrl}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-normal mb-2 group-hover:text-accent transition-colors">
                      <Link to={product.pdpUrl}>{product.title}</Link>
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.subtitle}
                    </p>

                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2"
                    >
                      <Link to={product.pdpUrl}>
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Drop Countdown */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Next Drop</span>
            </div>
            
            <h2 className="font-display text-2xl md:text-3xl font-normal mb-6">
              The Elements Collection
            </h2>
            
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Four new pieces inspired by the classical elements. 
              Get early access by joining our newsletter.
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-display font-normal text-accent">
                  {countdown.days}
                </div>
                <div className="text-xs text-primary-foreground/60">Days</div>
              </div>
              <div className="text-primary-foreground/40">:</div>
              <div className="text-center">
                <div className="text-2xl font-display font-normal text-accent">
                  {countdown.hours}
                </div>
                <div className="text-xs text-primary-foreground/60">Hours</div>
              </div>
              <div className="text-primary-foreground/40">:</div>
              <div className="text-center">
                <div className="text-2xl font-display font-normal text-accent">
                  {countdown.minutes}
                </div>
                <div className="text-xs text-primary-foreground/60">Minutes</div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl font-normal mb-6">
                The Story Behind the Collection
              </h2>
              <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
                <p>
                  Our inaugural capsule represents more than jewelry — it's a manifesto of modern luxury. 
                  Each piece was designed to capture a different aspect of light, from the focused brilliance 
                  of our diamond studs to the flowing grace of our solitaire bracelet.
                </p>
                <p>
                  Created with lab-grown diamonds that are molecularly identical to mined stones, 
                  but with a fraction of the environmental impact. This is luxury with a conscience — 
                  beauty without compromise.
                </p>
              </div>
            </motion.div>

            {/* Design Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Timeless Design",
                  description: "Classic silhouettes that transcend trends, designed to become cherished heirlooms."
                },
                {
                  title: "Ethical Sourcing",
                  description: "Lab-grown diamonds and recycled metals, creating beauty without environmental cost."
                },
                {
                  title: "Accessible Luxury",
                  description: "Premium quality at honest prices, making luxury jewelry accessible to all."
                }
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="font-display text-xl font-normal mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Capsule;