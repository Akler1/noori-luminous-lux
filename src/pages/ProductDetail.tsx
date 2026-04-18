import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield, Award, ArrowRight, Image as ImageIcon, Box, Sparkles, Gem } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { VariantSelector } from "@/components/VariantSelector";
import { shopify } from "@/lib/shopify";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { useCartActions } from "@/hooks/useCart";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { SocialFeed } from "@/components/SocialFeed";
import { ReviewsStub } from "@/components/ReviewsStub";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, productSchema, breadcrumbs } from "@/components/JsonLd";
import { klaviyoViewedProduct, klaviyoAddedToCart } from "@/lib/klaviyo-tracking";

/* ── Product-specific accordion content ── */
function getProductType(handle: string): 'earring' | 'pendant' | 'bracelet' | 'necklace' {
  if (handle.includes('studs')) return 'earring';
  if (handle.includes('pendant')) return 'pendant';
  if (handle.includes('bracelet')) return 'bracelet';
  return 'necklace';
}

const ACCORDION_CONTENT: Record<string, { diamond: { text: string; bullets: string[] }; metal: string; sizing: string }> = {
  earring: {
    diamond: {
      text: "Each stud features a lab-grown diamond graded D–F colour and VS1–VVS1 clarity. Stones are precision-cut to ideal proportions for maximum brilliance and fire.",
      bullets: [
        "Type IIa lab-grown diamonds — the purest form",
        "Certified by IGI with full grading report",
        "Excellent cut grade for superior light performance",
        "Conflict-free and ethically created",
      ],
    },
    metal: "Available in 14K and 18K yellow gold, white gold, and rose gold. White gold is rhodium-plated for a bright, lasting finish. All settings feature a secure four-prong basket mount with push-back butterfly closures.",
    sizing: "Standard push-back butterfly closure for secure, comfortable everyday wear. Available in 2 ct. tw. and 4 ct. tw. total weight options. Suitable for all standard ear piercings.",
  },
  pendant: {
    diamond: {
      text: "A single solitaire lab-grown diamond, graded D–F colour and VS1–VVS1 clarity. Cut for optimal brilliance whether viewed from the front or in motion.",
      bullets: [
        "Type IIa lab-grown diamond — the purest form",
        "Certified by IGI with full grading report",
        "Excellent cut grade for superior light return",
        "Conflict-free and ethically created",
      ],
    },
    metal: "Available in 14K and 18K yellow gold, white gold, and rose gold. White gold is rhodium-plated for a lasting bright finish. Pendant hangs from a 1.2mm diamond cut cable chain.",
    sizing: "1.2mm diamond cut cable chain, 18 inches with adjustable jump rings at 16\" and 17\". Pendant drop: approximately 8 mm.",
  },
  bracelet: {
    diamond: {
      text: "Three precisely matched lab-grown diamonds, each graded D–F colour and VS1–VVS1 clarity. Stones are bezel-set for a sleek, snag-free profile.",
      bullets: [
        "Type IIa lab-grown diamonds — the purest form",
        "Each stone certified by IGI",
        "Matched for consistent colour and brilliance",
        "Conflict-free and ethically created",
      ],
    },
    metal: "Available in 14K and 18K yellow gold, white gold, and rose gold. White gold is rhodium-plated for a bright, durable finish. Diamond cut cable chain construction.",
    sizing: "Diamond cut cable chain, 7 inches with adjustable rings. Sits comfortably on the wrist with a secure clasp.",
  },
  necklace: {
    diamond: {
      text: "A single solitaire lab-grown diamond in a bezel setting, graded D–F colour and VS1–VVS1 clarity. The bezel frame protects the stone while maximising light entry from above.",
      bullets: [
        "Type IIa lab-grown diamond — the purest form",
        "Certified by IGI with full grading report",
        "Excellent cut grade for maximum sparkle",
        "Conflict-free and ethically created",
      ],
    },
    metal: "Available in 14K and 18K yellow gold, white gold, and rose gold. White gold is rhodium-plated for a lasting bright finish. Cable chain with secure lobster-claw clasp.",
    sizing: "Chain length: 18 inches (45 cm) with a 2-inch extender. Bezel pendant: approximately 6 mm diameter. Lightweight and comfortable for all-day wear.",
  },
};

const ProductAccordions = ({ handle }: { handle: string }) => {
  const type = getProductType(handle);
  const content = ACCORDION_CONTENT[type];

  return (
    <div className="pt-6 border-t">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="diamonds">
          <AccordionTrigger className="text-left font-medium">
            Diamond & Certification
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-4">
            <p>{content.diamond.text}</p>
            <ul className="list-disc list-inside space-y-2">
              {content.diamond.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger className="text-left font-medium">
            Metal & Finish
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>{content.metal}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizing">
          <AccordionTrigger className="text-left font-medium">
            Sizing & Fit
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>{content.sizing}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care">
          <AccordionTrigger className="text-left font-medium">
            Care & Warranty
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>
              Your Noori jewelry comes with a lifetime warranty against manufacturing defects.
              Clean with warm soapy water and a soft brush. We recommend visiting a local jeweler
              annually for professional cleaning and inspection.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'images'>('3d');
  const [showSparkles, setShowSparkles] = useState(false);
  const { addToCart, isLoading: cartLoading, cart } = useCartActions();

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

  // Fire Klaviyo "Viewed Product" once when a product + variant are loaded.
  // Klaviyo uses this to power Browse Abandonment flows and Recently Viewed.
  useEffect(() => {
    if (!product || !selectedVariant || !handle) return;
    klaviyoViewedProduct({
      id: product.id,
      handle,
      title: product.title,
      price: selectedVariant.price.amount,
      sku: selectedVariant.sku,
      image: product.images.edges[0]?.node.url,
      compareAtPrice: selectedVariant.compareAtPrice?.amount,
    });
  }, [product, selectedVariant, handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !product || !handle) return;

    // Trigger sparkles animation
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 700);

    try {
      const updatedCart = await addToCart(selectedVariant.id, quantity);

      if (updatedCart) {
        // Klaviyo "Added to Cart" — powers Cart Abandonment flow
        klaviyoAddedToCart({
          productId: product.id,
          productHandle: handle,
          productTitle: product.title,
          variantId: selectedVariant.id,
          variantSku: selectedVariant.sku,
          variantPrice: selectedVariant.price.amount,
          variantImage: selectedVariant.image?.url ?? product.images.edges[0]?.node.url,
          quantity,
          cartTotalValue: parseFloat(updatedCart.cost.totalAmount.amount),
          cartItemNames: updatedCart.lines.edges.map(({ node }) => node.merchandise.product.title),
          checkoutUrl: updatedCart.checkoutUrl,
        });

        // GA4 + Meta Pixel add_to_cart events
        const value = parseFloat(selectedVariant.price.amount) * quantity;
        window.gtag?.("event", "add_to_cart", {
          currency: selectedVariant.price.currencyCode,
          value,
          items: [{
            item_id: selectedVariant.sku ?? product.id,
            item_name: product.title,
            price: parseFloat(selectedVariant.price.amount),
            quantity,
          }],
        });
        window.fbq?.("track", "AddToCart", {
          content_name: product.title,
          content_ids: [selectedVariant.sku ?? product.id],
          content_type: "product",
          value,
          currency: selectedVariant.price.currencyCode,
        });
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };


  // Dynamic cross-sell based on product cut type
  const getCutType = (h: string): string => {
    if (h.includes('round')) return 'round';
    if (h.includes('emerald')) return 'emerald';
    if (h.includes('princess')) return 'princess';
    return 'round'; // default
  };

  const CROSS_SELL_MAP: Record<string, { name: string; handle: string; price: string; iframeUrl: string }[]> = {
    round: [
      { name: "Round Vela Pendant", handle: "round-vela-pendant", price: "CAD $1,575", iframeUrl: "https://akler1.github.io/round-y_zoomed/" },
      { name: "Vela Bracelet", handle: "vela-bracelet", price: "CAD $2,525", iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html" },
      { name: "Round Vela Studs", handle: "round-vela-studs", price: "CAD $1,750", iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html" },
    ],
    emerald: [
      { name: "Emerald Vela Pendant", handle: "emerald-vela-pendant", price: "CAD $1,575", iframeUrl: "https://akler1.github.io/emerald-y_zoomed/" },
      { name: "Vela Bracelet", handle: "vela-bracelet", price: "CAD $2,525", iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html" },
      { name: "Emerald Vela Studs", handle: "emerald-vela-studs", price: "CAD $1,750", iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/" },
    ],
    princess: [
      { name: "Princess Vela Pendant", handle: "princess-vela-pendant", price: "CAD $1,575", iframeUrl: "https://akler1.github.io/princess-y_zoomed/" },
      { name: "Vela Bracelet", handle: "vela-bracelet", price: "CAD $2,525", iframeUrl: "https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html" },
      { name: "Princess Vela Studs", handle: "princess-vela-studs", price: "CAD $1,750", iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html" },
    ],
  };

  const cutType = getCutType(handle || '');
  const crossSellProducts = (CROSS_SELL_MAP[cutType] || CROSS_SELL_MAP.round)
    .filter(p => p.handle !== handle);

  // Prepare images for carousel — use variantImages filtered by selected metal if available
  const carouselImages = (() => {
    // Check if product has metal-specific variant images
    if (product?.variantImages && selectedVariant) {
      const selectedMetal = selectedVariant.selectedOptions.find(o => o.name === 'Metal')?.value;
      if (selectedMetal && product.variantImages[selectedMetal]) {
        return product.variantImages[selectedMetal];
      }
    }

    // Fallback: variant-specific image + product images
    if (selectedVariant?.image) {
      const variantImage = {
        id: selectedVariant.image.id,
        url: selectedVariant.image.url,
        altText: selectedVariant.image.altText
      };
      const otherImages = product?.images.edges
        .filter(({ node }) => node.id !== selectedVariant.image?.id)
        .map(({ node }) => ({ id: node.id, url: node.url, altText: node.altText })) || [];
      return [variantImage, ...otherImages];
    }

    // Fallback: all product images
    return product?.images.edges.map(({ node }) => ({
      id: node.id, url: node.url, altText: node.altText
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
      <PageMeta
        title={`${product.title} | Noori — Lab-Grown Diamond Jewelry`}
        description={product.description || `Shop the ${product.title} by Noori. IGI-certified lab-grown diamond in 14K and 18K gold. Ethically sourced luxury jewelry.`}
        path={`/product/${handle}`}
        image={product.images.edges[0]?.node.url}
      />
      <JsonLd data={[
        productSchema({
          name: product.title,
          description: product.description || `${product.title} by Noori — luxury lab-grown diamond jewelry`,
          handle: handle || '',
          price: selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount,
          currency: selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode,
          sku: selectedVariant?.sku,
          image: product.images.edges[0]?.node.url,
          rating: product.reviews?.rating,
          reviewCount: product.reviews?.count,
          available: selectedVariant?.availableForSale,
        }),
        breadcrumbs([
          { name: "Home", url: "/" },
          { name: "Vela Collection", url: "/collections/solitaires" },
          { name: product.title, url: `/product/${handle}` },
        ]),
      ]} />
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections/solitaires" className="hover:text-accent transition-colors">Vela</Link>
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
              <div className="relative -mx-2 lg:-mx-3">
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
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              <div className="text-4xl md:text-5xl font-display font-medium text-accent mb-2 tracking-tight">
                USD ${selectedVariant?.price.amount ? parseFloat(selectedVariant.price.amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : ''}
              </div>
              {selectedVariant?.cadPrice && (
                <div className="text-lg text-muted-foreground mb-2">
                  CAD ${selectedVariant.cadPrice.amount}
                </div>
              )}
              {selectedVariant?.compareAtPrice && (
                <div className="text-xl text-muted-foreground line-through mb-2">
                  USD ${selectedVariant.compareAtPrice.amount}
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                Free shipping across Canada & the US • 30-day returns
              </div>
            </div>

            {/* Diamond Quality Badge */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-accent/30 bg-accent/5 mb-6">
              <Gem className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm text-foreground font-medium tracking-wide">
                Excellent Cut · D-F Colour · VS1-VVS1 Clarity
              </span>
            </div>

            {/* Chain/sizing info for pendants and bracelets */}
            {handle && (getProductType(handle) === 'pendant' || getProductType(handle) === 'necklace') && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/50 bg-muted/30 mb-6">
                <span className="text-sm text-foreground/80">
                  1.2mm diamond cut cable chain · 18" <span className="text-foreground/50">(adjustable at 16" and 17")</span>
                </span>
              </div>
            )}
            {handle && getProductType(handle) === 'bracelet' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/50 bg-muted/30 mb-6">
                <span className="text-sm text-foreground/80">
                  Diamond cut cable chain · 7" <span className="text-foreground/50">(with adjustable rings)</span>
                </span>
              </div>
            )}

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
                className={`w-full px-10 py-6 text-xl font-medium rounded-lg transition-all duration-300 ${
                  selectedVariant?.availableForSale
                    ? "bg-accent text-accent-foreground hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                {cartLoading ? "Adding..." : selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-accent" />
                <span>IGI Certified</span>
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
            <ProductAccordions handle={handle || ''} />
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
                  <div className="aspect-square bg-[#e8e8e8] rounded-lg mb-4 overflow-hidden relative" onWheel={(e) => e.preventDefault()}>
                    <iframe
                      src={(item as any).iframeUrl}
                      className="w-full h-full border-0"
                      style={{ touchAction: "pan-x pan-y" }}
                      allow="xr-spatial-tracking; fullscreen; autoplay"
                      title={item.name}
                      loading="lazy"
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
        {handle && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-20"
          >
            <ReviewsStub productHandle={handle} />
          </motion.section>
        )}

        <SocialFeed />

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;