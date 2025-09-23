import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield, Award } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import earringsImage from "@/assets/earrings-hero.jpg";
import { toast } from "sonner";

const ProductDetail = () => {
  const [selectedMetal, setSelectedMetal] = useState("14k-gold");
  const [selectedCut, setSelectedCut] = useState("round-brilliant");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const metalOptions = [
    { id: "silver", label: "Sterling Silver", price: "CAD $890" },
    { id: "9k-gold", label: "9K Gold", price: "CAD $1,190" },
    { id: "14k-gold", label: "14K Gold", price: "CAD $1,490" },
  ];

  const cutOptions = [
    { id: "round-brilliant", label: "Round Brilliant" },
    { id: "princess", label: "Princess Cut" },
  ];

  const currentPrice = metalOptions.find(m => m.id === selectedMetal)?.price || "CAD $890";

  const handleAddToCart = () => {
    toast.success("Added to cart! Continue shopping or view your cart.");
  };

  const handleBuyNow = () => {
    toast.success("Redirecting to secure checkout...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-accent transition-colors">Home</a>
          <span>/</span>
          <a href="#shop" className="hover:text-accent transition-colors">Shop</a>
          <span>/</span>
          <span className="text-foreground">Diamond Stud Earrings</span>
        </nav>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl overflow-hidden">
              <img
                src={earringsImage}
                alt="Diamond Stud Earrings"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 3D Viewer Placeholder */}
            <div className="bg-muted/10 rounded-lg p-8 text-center border-2 border-dashed border-muted/30">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-accent/40 rounded-full animate-pulse" />
              </div>
              <p className="text-muted-foreground mb-2">3D Viewer</p>
              <p className="text-sm text-muted-foreground">Rotate and zoom to explore every detail</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-normal mb-4">
                Diamond Stud Earrings
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 reviews)</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Timeless elegance meets modern ethics. Our lab-grown diamond studs offer the same brilliance 
                and fire as mined diamonds, certified for quality and crafted to last generations.
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              <div className="text-3xl font-display font-normal text-accent mb-2">
                {currentPrice}
              </div>
              <div className="text-sm text-muted-foreground">
                Free shipping across Canada • 30-day returns
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Metal</label>
                <div className="flex flex-wrap gap-2">
                  {metalOptions.map((metal) => (
                    <Button
                      key={metal.id}
                      variant={selectedMetal === metal.id ? "default" : "outline"}
                      className={selectedMetal === metal.id ? "btn-hero" : "btn-ghost-luxury"}
                      onClick={() => setSelectedMetal(metal.id)}
                    >
                      {metal.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Diamond Cut</label>
                <div className="flex flex-wrap gap-2">
                  {cutOptions.map((cut) => (
                    <Button
                      key={cut.id}
                      variant={selectedCut === cut.id ? "default" : "outline"}
                      className={selectedCut === cut.id ? "btn-hero" : "btn-ghost-luxury"}
                      onClick={() => setSelectedCut(cut.id)}
                    >
                      {cut.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-hero"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "border-accent text-accent" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <Button 
                onClick={handleBuyNow}
                variant="outline" 
                className="w-full btn-ghost-luxury"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-accent" />
                <span>GIA Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-accent" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-accent" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-accent" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="max-w-4xl mx-auto mt-20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="diamonds">
              <AccordionTrigger className="text-left font-medium">
                Diamond & Certification
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <p>
                  Our lab-grown diamonds are created using advanced technology that replicates the natural 
                  diamond formation process. Each stone is certified by leading gemological institutes 
                  including GIA, ensuring the same quality standards as mined diamonds.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Type IIa lab-grown diamonds (the purest form)</li>
                  <li>Certified by GIA or equivalent institute</li>
                  <li>Identical optical, physical, and chemical properties to mined diamonds</li>
                  <li>Conflict-free and ethically sourced</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="materials">
              <AccordionTrigger className="text-left font-medium">
                Metal & Finish
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>
                  Available in recycled sterling silver, 9K gold, and 14K gold. All metals are 
                  responsibly sourced and finished with our signature brushed texture that 
                  complements the diamond's natural brilliance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sizing">
              <AccordionTrigger className="text-left font-medium">
                Sizing & Fit
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>
                  Standard butterfly backing ensures secure, comfortable wear. Each earring measures 
                  approximately 6mm in diameter (0.75 carat total weight). Suitable for all ear 
                  piercings and comfortable for extended wear.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger className="text-left font-medium">
                Care & Warranty
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>
                  Your Noori jewelry comes with a lifetime warranty against manufacturing defects. 
                  Clean with warm soapy water and a soft brush. Professional cleaning recommended 
                  annually to maintain optimal brilliance.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;