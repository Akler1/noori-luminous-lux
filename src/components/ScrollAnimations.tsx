import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Enhanced scroll-linked animations as specified in the brief

export const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = "" 
}: { 
  children: React.ReactNode; 
  speed?: number; 
  className?: string; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnScroll = ({ children, className = "" }: { children: React.ReactNode; className?: string; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FluidMotion = ({ children, className = "" }: { children: React.ReactNode; className?: string; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // 3D-like floating motion inspired by the Gucci scarf reference
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        z,
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealOnScroll = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 40 };
      case "down": return { y: -40 };
      case "left": return { x: 40 };
      case "right": return { x: -40 };
      default: return { y: 40 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...getInitialPosition()
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // luxury easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Micro-interactions for anticipation build
export const HoverGlow = ({ children, className = "" }: { children: React.ReactNode; className?: string; }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        filter: "brightness(1.1) blur(0px)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`${className} transition-all duration-300`}
      style={{
        filter: "blur(0.5px)",
      }}
    >
      {children}
    </motion.div>
  );
};

// Controlled reveal with blur effect for luxury feel
export const LuxuryReveal = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        scale
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Light particle effect for ambient animation
export const LightParticles = ({ 
  count = 12, 
  className = "" 
}: { 
  count?: number; 
  className?: string; 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{ 
            opacity: [0, 1, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Hook for progressive image loading with blur effect
export const useProgressiveImage = (src: string, placeholderSrc?: string) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return { src: imageSrc, isLoaded: imageLoaded };
};