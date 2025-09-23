import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Hero3D } from "@/components/Hero3D";

export const Hero = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleReduceMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  return (
    <section 
      id="hero" 
      className="relative h-[100svh] bg-[#0B0B0B] overflow-hidden"
    >
      {/* Noor Glow Background */}
      <div 
        id="noor-glow" 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(201,162,39,0.08) 0%, transparent 70%)'
        }}
      />

      {/* 3D Canvas */}
      <div id="hero-3d" className="absolute inset-0" aria-hidden="true">
        <Hero3D reducedMotion={reducedMotion} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-[clamp(24px,6vw,80px)] h-full flex items-center">
        <div className="text-left">
          <h1 className="font-display text-[clamp(48px,10vw,160px)] leading-[0.95] tracking-[-0.02em] text-[#F8F7F3]">
            Light, made forever.
          </h1>
          <p className="mt-6 max-w-[48ch] text-[#E7E5DC] text-[clamp(16px,2.2vw,22px)] font-light leading-relaxed">
            Certified lab-grown diamonds. Ethical. Enduring.{" "}
            <span className="text-[#C9A227] font-medium">Exquisitely priced.</span>
          </p>
          <div className="mt-10 flex gap-3 flex-col sm:flex-row">
            <Button 
              className="bg-[#C9A227] hover:bg-[#C9A227]/90 text-black font-medium px-8 py-3 rounded-full transition-all duration-300" 
              asChild
              onClick={() => {
                // Analytics: fire select_promotion on CTA click
                if ('gtag' in window) {
                  (window as any).gtag('event', 'select_promotion', {
                    promotion_id: 'hero_shop_capsule',
                    promotion_name: 'Shop the Capsule',
                    creative_name: 'Primary CTA',
                    creative_slot: 'hero'
                  });
                }
              }}
            >
              <Link to="/capsule">
                Shop the Capsule
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#E7E5DC]/30 text-[#E7E5DC] hover:bg-[#E7E5DC]/10 px-8 py-3 rounded-full transition-all duration-300" 
              asChild
              onClick={() => {
                // Analytics: fire select_promotion on CTA click
                if ('gtag' in window) {
                  (window as any).gtag('event', 'select_promotion', {
                    promotion_id: 'hero_about_diamonds',
                    promotion_name: 'About Our Diamonds',
                    creative_name: 'Secondary CTA',
                    creative_slot: 'hero'
                  });
                }
              }}
            >
              <Link to="/policies#care">About Our Diamonds</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Reduce Motion Toggle */}
      <button 
        id="reduce-motion" 
        className="absolute right-4 top-4 z-10 text-xs text-[#C9A227]/70 underline hover:text-[#C9A227] transition-colors"
        onClick={handleReduceMotion}
      >
        {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
      </button>

      {/* Scroll Cue */}
      <div 
        id="scroll-cue" 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#E7E5DC]/80 text-center animate-pulse"
      >
        <span className="block text-xs tracking-[0.2em] mb-1">SCROLL TO EXPLORE</span>
        <span className="block text-lg animate-bounce">⌄</span>
      </div>
    </section>
  );
};