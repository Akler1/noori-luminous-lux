import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviewCount: number;
}

interface RotatingProductCarouselProps {
  products: Product[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export const RotatingProductCarousel = ({ 
  products, 
  autoRotate = true, 
  rotationSpeed = 4000 
}: RotatingProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, products.length, isHovered]);

  const getItemPosition = (index: number) => {
    const angle = ((index - currentIndex) * (360 / products.length)) * (Math.PI / 180);
    const radius = 300;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = z > 0 ? 1 : 0.8;
    const opacity = z > -150 ? 1 : 0.3;
    
    return {
      x,
      z,
      scale,
      opacity,
      rotateY: -angle * (180 / Math.PI),
    };
  };

  return (
    <div 
      className="relative h-[600px] w-full flex items-center justify-center"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Product carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {products.map((product, index) => {
            const position = getItemPosition(index);
            const isCenter = index === currentIndex;
            
            return (
              <motion.div
                key={product.id}
                className="absolute top-1/2 left-1/2 w-80"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  x: position.x - 160, // Center the card (width/2)
                  z: position.z,
                  y: -200, // Center vertically
                  scale: position.scale,
                  rotateY: position.rotateY,
                  rotateX: isCenter ? [-2, 2, -2] : 0,
                  rotateZ: isCenter ? [-1, 1, -1] : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  rotateX: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateZ: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  scale: isCenter ? 1.05 : position.scale * 1.02,
                  y: isCenter ? -210 : -200,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <motion.div
                  className="relative"
                  animate={{
                    opacity: position.opacity,
                  }}
                  style={{
                    filter: isCenter ? 'none' : 'blur(0.5px)',
                    zIndex: isCenter ? 10 : 1,
                  }}
                >
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                    onToggleWishlist={() => console.log(`Toggled wishlist for ${product.name}`)}
                  />
                  
                  {/* Floating glow effect for center item */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-accent/10 rounded-xl blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Auto-rotate indicator */}
      {autoRotate && !isHovered && (
        <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-muted-foreground">
          <motion.div
            className="w-2 h-2 bg-accent rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Auto-rotating
        </div>
      )}
    </div>
  );
};