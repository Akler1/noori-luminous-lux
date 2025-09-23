import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-diamonds.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LightParticles } from "@/components/ScrollAnimations";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden light-particles">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury lab-grown diamond jewelry"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <LightParticles count={18} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.25,0.46,0.45,0.94] }}>
          <h1 className="hero-text mb-6 text-primary">
            Light, made
            <br />
            <span className="noor-glow">forever</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed">
            Certified lab-grown diamonds. Ethical. Enduring.
            <br />
            <span className="text-accent font-medium">Exquisitely priced.</span>
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Button className="btn-hero group" asChild>
            <Link to="/capsule">
              Shop the Capsule
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" className="btn-ghost-luxury" asChild>
            <Link to="/policies#care">Learn About Our Diamonds</Link>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};