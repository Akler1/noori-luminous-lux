import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  rating = 5,
  reviewCount = 0,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) => {
  return (
    <Card className="card-luxury group cursor-pointer">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.();
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-accent text-accent' : ''}`} />
        </Button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            className="btn-hero transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-display text-xl font-normal mb-3 text-foreground group-hover:text-accent transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-medium text-accent">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="outline"
          className="w-full btn-ghost-luxury"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};