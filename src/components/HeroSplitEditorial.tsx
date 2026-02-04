import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import heroLifestyle from "@/assets/hero-lifestyle.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } 
  }
};

export const HeroSplitEditorial = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || isMobile) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section className="min-h-screen bg-background pt-20 md:pt-24 relative overflow-hidden">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Mobile: Image first */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:hidden order-1"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Mobile glow overlay */}
              <div className="absolute inset-0 hero-mobile-glow pointer-events-none z-10" />
              <img
                src={heroLifestyle}
                alt="Noori diamond jewelry"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content - Left 5 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.p 
              variants={itemVariants}
              className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
            >
              Lab-Grown Diamonds
            </motion.p>

            {/* H1 */}
            <motion.h1 
              variants={itemVariants}
              className="hero-text text-foreground mb-6 lg:mb-8"
            >
              Brilliance,
              <br />
              <span className="italic">refined.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-md mb-10"
            >
              Modern heirlooms crafted from light itself. Lab-grown diamonds that shine forever, without compromise.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                className="btn-magnetic bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-medium rounded-lg"
              >
                <Link to="/collections/solitaires">Shop best sellers</Link>
              </Button>
              
              <Link
                to="#product-3d-carousel"
                className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors group px-4 py-3"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('product-3d-carousel')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="text-base">Explore in 3D</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Image - Absolute positioned, bleeds right */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        className="hidden lg:block absolute top-0 right-0 bottom-0 w-[58%]"
      >
        {/* Gradient veil for text/image cohesion */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
        
        {/* Cursor-follow highlight overlay */}
        <div 
          className="absolute inset-0 cursor-highlight z-20 pointer-events-none"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`,
          } as React.CSSProperties}
        />
        
        <img
          src={heroLifestyle}
          alt="Noori diamond jewelry"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Scroll Cue - Desktop only */}
      <div className="hidden lg:flex absolute bottom-12 left-16 items-center gap-3 z-20">
        <span 
          className="text-muted-foreground text-xs tracking-[0.2em] uppercase"
          style={{ 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-border scroll-cue-line" />
      </div>
    </section>
  );
};
