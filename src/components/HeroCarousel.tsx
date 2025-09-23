import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export const HeroCarousel = ({ 
  images, 
  autoRotate = true, 
  rotationSpeed = 3500 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, images.length, isHovered]);

  const getItemPosition = (index: number) => {
    const angle = ((index - currentIndex) * (360 / images.length)) * (Math.PI / 180);
    const radius = 280;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = z > 0 ? 1 : 0.7;
    const opacity = z > -200 ? (z > 0 ? 1 : 0.6) : 0.3;
    
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
      className="relative h-[500px] w-full flex items-center justify-center"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Image carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {images.map((image, index) => {
            const position = getItemPosition(index);
            const isCenter = index === currentIndex;
            
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  x: position.x - 150, // Center the image
                  z: position.z,
                  y: -150, // Center vertically
                  scale: position.scale,
                  rotateY: position.rotateY,
                  rotateX: isCenter ? [-1, 1, -1] : 0,
                  rotateZ: isCenter ? [-0.5, 0.5, -0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  rotateX: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateZ: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  scale: isCenter ? 1.05 : position.scale * 1.02,
                  y: isCenter ? -160 : -150,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <motion.div
                  className="relative cursor-pointer"
                  animate={{
                    opacity: position.opacity,
                  }}
                  style={{
                    filter: isCenter ? 'none' : 'blur(1px)',
                    zIndex: isCenter ? 10 : 1,
                  }}
                >
                  <div className="w-72 h-72 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{
                        transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                  
                  {/* Floating glow effect for center item */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-accent/20 rounded-2xl blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 4,
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent scale-125 shadow-lg shadow-accent/50' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};