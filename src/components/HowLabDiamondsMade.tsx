import { Flame, Zap, Gem, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const HowLabDiamondsMade = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [diamondPayoff, setDiamondPayoff] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger diamond payoff after the sequence completes
          setTimeout(() => setDiamondPayoff(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="reveal-up mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            How <span className="noor-glow">Lab Diamonds</span> Are Made
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We recreate the forces of nature—the same conditions found 100 miles beneath the Earth's surface—to craft diamonds of extraordinary purity.
          </p>
        </div>

        {/* Process Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* SVG Connectors */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 800 280"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Seed to Heat */}
              <path
                d="M 160 140 Q 280 80 400 100"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1s ease-out 0.2s, opacity 0.5s ease-out 0.2s'
                }}
              />
              {/* Seed to Pressure */}
              <path
                d="M 160 140 Q 280 200 400 180"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1s ease-out 0.2s, opacity 0.5s ease-out 0.2s'
                }}
              />
              {/* Heat to Diamond */}
              <path
                d="M 480 100 Q 560 80 640 140"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1s ease-out 0.4s, opacity 0.5s ease-out 0.4s'
                }}
              />
              {/* Pressure to Diamond */}
              <path
                d="M 480 180 Q 560 200 640 140"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1s ease-out 0.4s, opacity 0.5s ease-out 0.4s'
                }}
              />
              {/* Arrow heads */}
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="hsl(var(--primary) / 0.5)" />
                </marker>
              </defs>
            </svg>

            {/* Nodes Container */}
            <div className="relative flex items-center justify-between gap-4" style={{ minHeight: '280px' }}>
              {/* Seed Node */}
              <ProcessNode
                icon={<Gem className="w-7 h-7 text-primary" />}
                title="Diamond Seed"
                subtitle="Where it all begins"
                accentColor="primary"
                delay={0}
                isVisible={isVisible}
                effect={<SeedEffect />}
              />

              {/* Heat + Pressure (Parallel) */}
              <div className="flex flex-col gap-4">
                <ProcessNode
                  icon={<Flame className="w-7 h-7 text-orange-500" />}
                  title="2,700°F"
                  subtitle="Extreme heat applied"
                  accentColor="orange"
                  delay={300}
                  isVisible={isVisible}
                  effect={<HeatEffect />}
                  size="small"
                />
                <ProcessNode
                  icon={<Zap className="w-7 h-7 text-blue-400" />}
                  title="870,000 PSI"
                  subtitle="Crushing pressure"
                  accentColor="blue"
                  delay={300}
                  isVisible={isVisible}
                  effect={<PressureEffect />}
                  size="small"
                />
              </div>

              {/* Diamond Result Node */}
              <ProcessNode
                icon={<Sparkles className="w-7 h-7 text-primary" />}
                title="Diamond"
                subtitle="Pure brilliance emerges"
                accentColor="primary"
                delay={600}
                isVisible={isVisible}
                effect={<DiamondEffect active={diamondPayoff} />}
                onMouseEnter={() => setDiamondPayoff(true)}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-4">
              {/* Seed */}
              <ProcessNode
                icon={<Gem className="w-7 h-7 text-primary" />}
                title="Diamond Seed"
                subtitle="Where it all begins"
                accentColor="primary"
                delay={0}
                isVisible={isVisible}
                effect={<SeedEffect />}
                fullWidth
              />

              {/* Connector Arrow */}
              <div className={`flex flex-col items-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '150ms' }}>
                <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-primary/20" />
                <div className="w-2 h-2 border-r-2 border-b-2 border-primary/40 rotate-45 -mt-1" />
              </div>

              {/* Heat + Pressure Side by Side */}
              <div className="w-full">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Applied Simultaneously</p>
                <div className="grid grid-cols-2 gap-3">
                  <ProcessNode
                    icon={<Flame className="w-6 h-6 text-orange-500" />}
                    title="2,700°F"
                    subtitle="Extreme heat"
                    accentColor="orange"
                    delay={300}
                    isVisible={isVisible}
                    effect={<HeatEffect />}
                    size="compact"
                  />
                  <ProcessNode
                    icon={<Zap className="w-6 h-6 text-blue-400" />}
                    title="870,000 PSI"
                    subtitle="Crushing pressure"
                    accentColor="blue"
                    delay={300}
                    isVisible={isVisible}
                    effect={<PressureEffect />}
                    size="compact"
                  />
                </div>
              </div>

              {/* Connector Arrow */}
              <div className={`flex flex-col items-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '450ms' }}>
                <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-primary/20" />
                <div className="w-2 h-2 border-r-2 border-b-2 border-primary/40 rotate-45 -mt-1" />
              </div>

              {/* Diamond Result */}
              <ProcessNode
                icon={<Sparkles className="w-7 h-7 text-primary" />}
                title="Diamond"
                subtitle="Pure brilliance emerges"
                accentColor="primary"
                delay={600}
                isVisible={isVisible}
                effect={<DiamondEffect active={diamondPayoff} />}
                onMouseEnter={() => setDiamondPayoff(true)}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes diamondShimmer {
          0% { background-position: 200% 0; }
          60% { background-position: -100% 0; }
          100% { background-position: -100% 0; }
        }
        
        @keyframes diamondShine {
          0%, 55% { opacity: 0; }
          65% { opacity: 1; }
          85% { opacity: 0; }
          100% { opacity: 0; }
        }
        
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

// Process Node Component
interface ProcessNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: 'primary' | 'orange' | 'blue';
  delay: number;
  isVisible: boolean;
  effect?: React.ReactNode;
  size?: 'normal' | 'small' | 'compact';
  fullWidth?: boolean;
  onMouseEnter?: () => void;
}

const ProcessNode = ({ 
  icon, 
  title, 
  subtitle, 
  accentColor, 
  delay, 
  isVisible, 
  effect,
  size = 'normal',
  fullWidth = false,
  onMouseEnter
}: ProcessNodeProps) => {
  const borderColors = {
    primary: 'border-primary/20 hover:border-primary/40',
    orange: 'border-orange-500/20 hover:border-orange-500/40',
    blue: 'border-blue-400/20 hover:border-blue-400/40'
  };

  const bgColors = {
    primary: 'bg-primary/10',
    orange: 'bg-orange-500/10',
    blue: 'bg-blue-400/10'
  };

  const iconBorderColors = {
    primary: 'border-primary/30',
    orange: 'border-orange-500/30',
    blue: 'border-blue-400/30'
  };

  const sizeClasses = {
    normal: 'p-6 min-w-[160px]',
    small: 'p-4 min-w-[140px]',
    compact: 'p-3'
  };

  return (
    <div 
      className={`
        relative bg-secondary/50 backdrop-blur-sm rounded-xl 
        ${sizeClasses[size]}
        ${borderColors[accentColor]}
        border overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5
        ${fullWidth ? 'w-full' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={onMouseEnter}
    >
      {/* Effect Layer */}
      {effect}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full ${bgColors[accentColor]} flex items-center justify-center mb-3 border ${iconBorderColors[accentColor]}`}>
          {icon}
        </div>
        <div className={`font-bold text-foreground mb-1 ${size === 'compact' ? 'text-lg' : 'text-xl'}`}>
          {title}
        </div>
        <div className="text-xs text-muted-foreground">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

// Seed Effect - Crystalline sparkle
const SeedEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
    <div className="absolute top-3 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse" style={{ animationDuration: '4s' }} />
  </div>
);

// Heat Effect - Fire glow
const HeatEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-t from-orange-500/40 via-amber-400/25 to-transparent blur-xl animate-pulse" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-t from-red-500/30 via-orange-400/20 to-transparent blur-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
  </div>
);

// Pressure Effect - Inward pulsing rings
const PressureEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 border-4 border-blue-400/30 rounded-xl animate-ping" style={{ animationDuration: '2s' }} />
    <div className="absolute inset-2 border-2 border-cyan-400/25 rounded-lg animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
    <div className="absolute inset-4 border border-blue-300/20 rounded-md animate-ping" style={{ animationDuration: '2s', animationDelay: '0.8s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
  </div>
);

// Diamond Effect - Gold shimmer + sparkle payoff
const DiamondEffect = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse" />
    
    {/* Gold shimmer sweep */}
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'linear-gradient(105deg, transparent 0%, transparent 35%, hsl(45 100% 60% / 0.2) 42%, hsl(45 100% 70% / 0.3) 50%, hsl(45 100% 60% / 0.2) 58%, transparent 65%, transparent 100%)',
        backgroundSize: '300% 100%',
        animation: active ? 'diamondShimmer 3s ease-in-out infinite' : 'none',
      }}
    />
    
    {/* Bright shine flash */}
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(45 100% 85% / 0.3) 0%, transparent 70%)',
        animation: active ? 'diamondShine 3s ease-in-out infinite' : 'none',
      }}
    />
    
    {/* Sparkle particles */}
    {active && (
      <>
        <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-primary/80 rounded-full" style={{ animation: 'sparkleFloat 2s ease-in-out infinite' }} />
        <div className="absolute top-1/4 left-4 w-1 h-1 bg-amber-300/70 rounded-full" style={{ animation: 'sparkleFloat 2.3s ease-in-out infinite 0.3s' }} />
        <div className="absolute bottom-3 right-1/4 w-1 h-1 bg-primary/60 rounded-full" style={{ animation: 'sparkleFloat 1.8s ease-in-out infinite 0.6s' }} />
      </>
    )}
  </div>
);
