import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield, Award, ArrowRight, Image as ImageIcon, Box, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { VariantSelector } from "@/components/VariantSelector";
import { ReviewsStub } from "@/components/ReviewsStub";
import { shopify } from "@/lib/shopify";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { useCartActions } from "@/hooks/useCart";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'images'>('3d');
  const [showSparkles, setShowSparkles] = useState(false);
  const { addToCart, isLoading: cartLoading } = useCartActions();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      setIsLoading(true);
      try {
        const productData = await shopify.getProduct(handle);
        setProduct(productData);
        
        // Set first available variant as default
        if (productData?.variants.edges.length) {
          const firstVariant = productData.variants.edges.find(
            ({ node }) => node.availableForSale
          )?.node || productData.variants.edges[0].node;
          setSelectedVariant(firstVariant);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        toast.error('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    // Trigger sparkles animation
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 700);
    
    try {
      await addToCart(selectedVariant.id, quantity);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };


  // Get cross-sell products (other products in capsule)
  const crossSellProducts = [
    { name: "Bezel-less Necklace", handle: "bezel-necklace", price: "CAD $1,450", image: "/src/assets/necklace-hero.jpg" },
    { name: "Solitaire Bracelet", handle: "solitaire-bracelet", price: "CAD $1,190", image: "/src/assets/bracelet-hero.jpg" }
  ].filter(p => p.name !== product?.title);

  // Prepare images for carousel - update based on selected variant
  const carouselImages = (() => {
    if (selectedVariant?.image) {
      // Show variant-specific image first, then other product images
      const variantImage = {
        id: selectedVariant.image.id,
        url: selectedVariant.image.url,
        altText: selectedVariant.image.altText
      };
      
      const otherImages = product?.images.edges
        .filter(({ node }) => node.id !== selectedVariant.image?.id)
        .map(({ node }) => ({
          id: node.id,
          url: node.url,
          altText: node.altText
        })) || [];
      
      return [variantImage, ...otherImages];
    }
    
    // Fallback to all product images
    return product?.images.edges.map(({ node }) => ({
      id: node.id,
      url: node.url,
      altText: node.altText
    })) || [];
  })();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">Product not found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections/solitaires" className="hover:text-accent transition-colors">Solitaires</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Media - Sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* 3D Viewer or Image Gallery */}
              <div className="relative">
                {/* Golden glow effect */}
                <div 
                  className="absolute -inset-3 rounded-2xl opacity-40 blur-xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.3), transparent 70%)'
                  }}
                />
                {viewMode === '3d' ? (
                  <ThreeDViewer 
                    variant={selectedVariant}
                    autoRotate={false}
                  />
                ) : (
                  <ProductCarousel 
                    images={carouselImages}
                    showThumbs={true}
                  />
                )}
              </div>
              
              {/* Toggle Button */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={viewMode === '3d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('3d')}
                  className={viewMode === '3d' ? 'btn-hero' : 'btn-ghost-luxury'}
                >
                  <Box className="mr-2 h-4 w-4" />
                  3D View
                </Button>
                <Button
                  variant={viewMode === 'images' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('images')}
                  className={viewMode === 'images' ? 'btn-hero' : 'btn-ghost-luxury'}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Images
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Title & Rating */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-normal mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews?.count || 0} reviews)
                </span>
              </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Available in 14K and 18K Gold, White Gold, and Rose Gold.
            </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              <div className="text-4xl md:text-5xl font-display font-medium text-accent mb-2 tracking-tight">
                CAD ${selectedVariant?.price.amount}
              </div>
              {selectedVariant?.compareAtPrice && (
                <div className="text-xl text-muted-foreground line-through mb-2">
                  CAD ${selectedVariant.compareAtPrice.amount}
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                Free shipping across Canada • 30-day returns
              </div>
            </div>

            {/* Variant Selector */}
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={selectedVariant ? quantity >= selectedVariant.quantityAvailable : false}
                >
                  +
                </Button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative">
              {/* Animated Sparkles */}
              {showSparkles && (
                <>
                  <Sparkles className="absolute left-1/4 top-1/2 h-4 w-4 text-accent animate-sparkle-1 pointer-events-none z-10" />
                  <Sparkles className="absolute left-1/2 top-1/2 h-5 w-5 text-accent animate-sparkle-2 pointer-events-none z-10" />
                  <Sparkles className="absolute right-1/4 top-1/2 h-4 w-4 text-accent animate-sparkle-3 pointer-events-none z-10" />
                  <Sparkles className="absolute left-1/3 top-1/2 h-3 w-3 text-accent animate-sparkle-4 pointer-events-none z-10" />
                  <Sparkles className="absolute right-1/3 top-1/2 h-3 w-3 text-accent animate-sparkle-5 pointer-events-none z-10" />
                </>
              )}
              
              <Button 
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || cartLoading}
                className="w-full bg-accent text-accent-foreground px-10 py-6 text-xl font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)]"
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                {cartLoading ? "Adding..." : "Add to Cart"}
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

            {/* Product Details Accordion */}
            <div className="pt-6 border-t">
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
          </motion.div>
        </div>

        {/* Complete the Set */}
        {crossSellProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl font-normal mb-4">
                Complete the Set
              </h2>
              <p className="text-muted-foreground">
                Create your perfect capsule collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {crossSellProducts.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="card-luxury p-6 group cursor-pointer"
                >
                  <div className="aspect-square bg-muted/10 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl font-normal mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-medium">{item.price}</span>
                    <Button size="sm" className="btn-hero group" asChild>
                      <Link to={`/product/${(item as any).handle}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ReviewsStub
            productId={product.id}
            averageRating={product.reviews?.rating || 5}
            totalReviews={product.reviews?.count || 124}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;