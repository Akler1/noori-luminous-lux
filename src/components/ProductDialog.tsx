import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartActions } from "@/hooks/useCart";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    slug: string;
    title: string;
    subtitle: string;
    modelUrl: string;
    poster: string;
  };
}

const MATERIALS = [
  { id: "10k-gold", label: "10K Gold" },
  { id: "14k-gold", label: "14K Gold" },
  { id: "18k-gold", label: "18K Gold" },
  { id: "silver", label: "Silver" },
  { id: "gold-vermeil", label: "Gold Vermeil" },
  { id: "platinum", label: "Platinum" },
];

const CARATS = [
  { id: "1ct", label: "1 Carat", price: 1299 },
  { id: "2ct", label: "2 Carat", price: 2499 },
];

export const ProductDialog = ({ open, onOpenChange, product }: ProductDialogProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState("14k-gold");
  const [selectedCarat, setSelectedCarat] = useState("1ct");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCartActions();

  const currentPrice = CARATS.find(c => c.id === selectedCarat)?.price || 1299;

  const handleAddToCart = async () => {
    // Create a mock variant ID based on the product and selected options
    const variantId = `gid://shopify/ProductVariant/${product.slug}-${selectedMaterial}-${selectedCarat}`;
    
    try {
      await addToCart(variantId, quantity);
      console.log('Product added to cart:', {
        product: product.title,
        material: MATERIALS.find(m => m.id === selectedMaterial)?.label,
        carat: CARATS.find(c => c.id === selectedCarat)?.label,
        quantity,
        variantId
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{product.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{product.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* 3D Viewer */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <model-viewer
              src={product.modelUrl}
              poster={product.poster}
              alt={product.title}
              camera-controls
              auto-rotate
              rotation-per-second="30deg"
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Product Options */}
          <div className="space-y-6">
            {/* Price */}
            <div>
              <p className="text-3xl font-display text-primary">${currentPrice}</p>
            </div>

            {/* Material Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Material</label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((material) => (
                  <Button
                    key={material.id}
                    variant={selectedMaterial === material.id ? "default" : "outline"}
                    onClick={() => setSelectedMaterial(material.id)}
                    className="justify-start"
                  >
                    {material.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Carat Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Carat Weight</label>
              <div className="grid grid-cols-2 gap-2">
                {CARATS.map((carat) => (
                  <Button
                    key={carat.id}
                    variant={selectedCarat === carat.id ? "default" : "outline"}
                    onClick={() => setSelectedCarat(carat.id)}
                    className="justify-start"
                  >
                    {carat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isLoading ? "Adding..." : `Add to Cart - $${currentPrice * quantity}`}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              Free shipping over $150 • 30-day returns
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
