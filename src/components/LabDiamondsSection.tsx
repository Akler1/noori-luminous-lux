import { Microscope, Gem, Leaf, Flame, Zap, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const LabDiamondsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [diamondPayoff, setDiamondPayoff] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setDiamondPayoff(true), 2500);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-4 bg-muted/30 overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* ========== PART 1: Why Lab Diamonds ========== */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Why <span className="noor-glow">Lab Diamonds</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The choice is clear—lab-grown diamonds deliver the same brilliance with superior ethics and exceptional quality.
            </p>
          </div>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          <BenefitCard
            icon={<Microscope className="w-7 h-7 text-emerald-400" />}
            title="Scientifically Identical"
            description="Same crystal structure, same 10 Mohs hardness, certified by GIA & IGI. Even experts can't tell the difference."
            accentColor="emerald"
            delay={100}
            isVisible={isVisible}
            effect="scan"
          />
          <BenefitCard
            icon={<Gem className="w-7 h-7 text-amber-400" />}
            title="Superior Clarity"
            description="Lab-controlled environments mean fewer inclusions and defects. Exceptional brilliance and fire in every stone."
            accentColor="amber"
            delay={200}
            isVisible={isVisible}
            effect="shimmer"
          />
          <BenefitCard
            icon={<Leaf className="w-7 h-7 text-green-400" />}
            title="Ethically Pure"
            description="Zero mining, no conflict financing, no displaced communities. Complete traceability from lab to jewelry box."
            accentColor="green"
            delay={300}
            isVisible={isVisible}
            effect="organic"
          />
        </div>

        {/* ========== Visual Connector ========== */}
        <div className={`flex items-center justify-center mb-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
          <div className="px-6 py-2 bg-secondary/80 backdrop-blur-sm border border-primary/20 rounded-full mx-4">
            <span className="text-xs uppercase tracking-widest text-primary/80 font-medium">The Process</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
        </div>

        {/* ========== PART 2: How Lab Diamonds Are Made ========== */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-2xl md:text-3xl font-serif mb-4">
              How <span className="noor-glow">They're Made</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We recreate the forces of nature—the same conditions found 100 miles beneath the Earth's surface.
            </p>
          </div>
        </div>

        {/* Process Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* SVG Connectors with enhanced styling */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 800 280"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Seed to Heat */}
              <path
                d="M 160 140 Q 280 80 400 100"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 0.6s, opacity 0.5s ease-out 0.6s'
                }}
              />
              {/* Node dot at start */}
              <circle cx="160" cy="140" r="4" fill="hsl(var(--primary))" className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }} />
              
              {/* Seed to Pressure */}
              <path
                d="M 160 140 Q 280 200 400 180"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 0.6s, opacity 0.5s ease-out 0.6s'
                }}
              />
              
              {/* Heat to Diamond */}
              <path
                d="M 480 100 Q 560 80 640 140"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 1s, opacity 0.5s ease-out 1s'
                }}
              />
              
              {/* Pressure to Diamond */}
              <path
                d="M 480 180 Q 560 200 640 140"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 1s, opacity 0.5s ease-out 1s'
                }}
              />
              
              {/* Node dot at end */}
              <circle cx="640" cy="140" r="5" fill="hsl(var(--primary))" className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Nodes Container */}
            <div className="relative flex items-center justify-between gap-4" style={{ minHeight: '280px' }}>
              <ProcessNode
                icon={<Gem className="w-7 h-7 text-primary" />}
                title="Diamond Seed"
                description="A tiny sliver of pure carbon—the blueprint for brilliance."
                accentColor="primary"
                delay={400}
                isVisible={isVisible}
                effect={<SeedEffect />}
              />

              <div className="flex flex-col gap-4">
                <ProcessNode
                  icon={<Flame className="w-7 h-7 text-orange-500" />}
                  title="2,700°F"
                  description="Plasma recreates Earth's mantle conditions."
                  accentColor="orange"
                  delay={600}
                  isVisible={isVisible}
                  effect={<HeatEffect />}
                  size="small"
                />
                <ProcessNode
                  icon={<Zap className="w-7 h-7 text-blue-400" />}
                  title="870,000 PSI"
                  description="Pressure fuses carbon into crystal."
                  accentColor="blue"
                  delay={600}
                  isVisible={isVisible}
                  effect={<PressureEffect />}
                  size="small"
                />
              </div>

              <ProcessNode
                icon={<Sparkles className="w-7 h-7 text-primary" />}
                title="Your Diamond"
                description="Weeks later—optically, chemically, physically identical."
                accentColor="primary"
                delay={800}
                isVisible={isVisible}
                effect={<DiamondEffect active={diamondPayoff} />}
                highlight={diamondPayoff}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-4">
              <ProcessNode
                icon={<Gem className="w-7 h-7 text-primary" />}
                title="Diamond Seed"
                description="A tiny sliver of pure carbon—the blueprint for brilliance."
                accentColor="primary"
                delay={400}
                isVisible={isVisible}
                effect={<SeedEffect />}
                fullWidth
              />

              <MobileConnector delay={500} isVisible={isVisible} />

              <div className="w-full">
                <p className="text-xs text-primary/60 mb-3 uppercase tracking-widest text-center font-medium">Applied Simultaneously</p>
                <div className="grid grid-cols-2 gap-3">
                  <ProcessNode
                    icon={<Flame className="w-6 h-6 text-orange-500" />}
                    title="2,700°F"
                    description="Recreates Earth's mantle heat."
                    accentColor="orange"
                    delay={600}
                    isVisible={isVisible}
                    effect={<HeatEffect />}
                    size="compact"
                  />
                  <ProcessNode
                    icon={<Zap className="w-6 h-6 text-blue-400" />}
                    title="870,000 PSI"
                    description="Fuses carbon atoms together."
                    accentColor="blue"
                    delay={600}
                    isVisible={isVisible}
                    effect={<PressureEffect />}
                    size="compact"
                  />
                </div>
              </div>

              <MobileConnector delay={700} isVisible={isVisible} />

              <ProcessNode
                icon={<Sparkles className="w-7 h-7 text-primary" />}
                title="Your Diamond"
                description="Weeks later—optically, chemically, physically identical."
                accentColor="primary"
                delay={800}
                isVisible={isVisible}
                effect={<DiamondEffect active={diamondPayoff} />}
                highlight={diamondPayoff}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>

      {/* All custom animations */}
      <style>{`
        @keyframes scanLineVertical {
          0%, 100% { top: 10%; opacity: 0; }
          5% { opacity: 0.6; }
          45% { top: 85%; opacity: 0.6; }
          50%, 100% { opacity: 0; }
        }
        @keyframes scanLineHorizontal {
          0%, 50% { left: 10%; opacity: 0; }
          55% { opacity: 0.6; }
          95% { left: 85%; opacity: 0.6; }
          100% { opacity: 0; }
        }
        @keyframes goldShimmer {
          0% { background-position: 200% 0; }
          60% { background-position: -100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes shineFlash {
          0%, 55% { opacity: 0; }
          65% { opacity: 1; }
          85% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.35; }
        }
        @keyframes rippleExpand {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 0.6; }
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
        }
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
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(3px) rotate(45deg); }
        }
      `}</style>
    </section>
  );
};

// ========== Benefit Card Component ==========
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'emerald' | 'amber' | 'green';
  delay: number;
  isVisible: boolean;
  effect: 'scan' | 'shimmer' | 'organic';
}

const BenefitCard = ({ icon, title, description, accentColor, delay, isVisible, effect }: BenefitCardProps) => {
  const borderColors = {
    emerald: 'border-emerald-500/20 hover:border-emerald-500/40',
    amber: 'border-amber-500/20 hover:border-amber-500/40',
    green: 'border-green-500/20 hover:border-green-500/40'
  };

  const bgColors = {
    emerald: 'bg-emerald-500/10',
    amber: 'bg-amber-500/10',
    green: 'bg-green-500/10'
  };

  const iconBorderColors = {
    emerald: 'border-emerald-500/30',
    amber: 'border-amber-500/30',
    green: 'border-green-500/30'
  };

  return (
    <div 
      className={`
        relative bg-secondary/50 backdrop-blur-sm rounded-xl p-6 
        border ${borderColors[accentColor]} overflow-hidden
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Effect Layer */}
      {effect === 'scan' && <ScanEffect />}
      {effect === 'shimmer' && <ShimmerEffect />}
      {effect === 'organic' && <OrganicEffect />}

      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-full ${bgColors[accentColor]} flex items-center justify-center mx-auto mb-4 border ${iconBorderColors[accentColor]}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">{description}</p>
      </div>
    </div>
  );
};

// ========== Card Effects ==========
const ScanEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
      backgroundSize: '20px 20px'
    }} />
    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" style={{ animation: 'scanLineVertical 4s ease-in-out infinite' }} />
    <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60" style={{ animation: 'scanLineHorizontal 4s ease-in-out infinite' }} />
  </div>
);

const ShimmerEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(105deg, transparent 0%, transparent 35%, hsl(45 100% 60% / 0.15) 42%, hsl(45 100% 70% / 0.2) 50%, hsl(45 100% 60% / 0.15) 58%, transparent 65%, transparent 100%)',
      backgroundSize: '300% 100%',
      animation: 'goldShimmer 3.5s ease-in-out infinite',
    }} />
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(45 100% 85% / 0.25) 0%, transparent 70%)',
      animation: 'shineFlash 3.5s ease-in-out infinite',
    }} />
  </div>
);

const OrganicEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20" style={{
      background: 'radial-gradient(circle, hsl(142 70% 45% / 0.6) 0%, transparent 70%)',
      animation: 'pulseGlow 4s ease-in-out infinite',
    }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-green-400/30" style={{ animation: 'rippleExpand 3s ease-out infinite' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-green-400/30" style={{ animation: 'rippleExpand 3s ease-out infinite 1s' }} />
    <div className="absolute top-6 left-8 w-2 h-1 bg-green-400/40 rounded-full" style={{ animation: 'floatUp 4s ease-in-out infinite' }} />
    <div className="absolute bottom-10 right-6 w-1.5 h-0.5 bg-green-300/30 rounded-full" style={{ animation: 'floatUp 4s ease-in-out infinite 1.5s' }} />
  </div>
);

// ========== Process Node Component ==========
interface ProcessNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'primary' | 'orange' | 'blue';
  delay: number;
  isVisible: boolean;
  effect?: React.ReactNode;
  size?: 'normal' | 'small' | 'compact';
  fullWidth?: boolean;
  highlight?: boolean;
}

const ProcessNode = ({ icon, title, description, accentColor, delay, isVisible, effect, size = 'normal', fullWidth = false, highlight = false }: ProcessNodeProps) => {
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
    normal: 'p-6 min-w-[180px] max-w-[200px]',
    small: 'p-5 min-w-[160px] max-w-[180px]',
    compact: 'p-4'
  };

  return (
    <div 
      className={`
        relative bg-secondary/50 backdrop-blur-sm rounded-xl 
        ${sizeClasses[size]}
        ${borderColors[accentColor]}
        border overflow-hidden
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5
        ${fullWidth ? 'w-full max-w-none' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${highlight ? 'ring-2 ring-primary/30 shadow-lg shadow-primary/20' : ''}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {effect}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full ${bgColors[accentColor]} flex items-center justify-center mb-3 border ${iconBorderColors[accentColor]}`}>
          {icon}
        </div>
        <div className={`font-bold text-foreground mb-2 ${size === 'compact' ? 'text-lg' : 'text-xl'}`}>{title}</div>
        <div className={`text-muted-foreground leading-relaxed ${size === 'compact' ? 'text-xs' : 'text-sm'}`}>{description}</div>
      </div>
    </div>
  );
};

// ========== Mobile Connector ==========
const MobileConnector = ({ delay, isVisible }: { delay: number; isVisible: boolean }) => (
  <div 
    className={`flex flex-col items-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-primary/20" />
    <div 
      className="w-2.5 h-2.5 border-r-2 border-b-2 border-primary/50 -mt-1"
      style={{ animation: 'arrowBounce 1.5s ease-in-out infinite' }}
    />
  </div>
);

// ========== Node Effects ==========
const SeedEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
    <div className="absolute top-3 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
  </div>
);

const HeatEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-t from-orange-500/40 via-amber-400/25 to-transparent blur-xl animate-pulse" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-t from-red-500/30 via-orange-400/20 to-transparent blur-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
  </div>
);

const PressureEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 border-4 border-blue-400/30 rounded-xl animate-ping" style={{ animationDuration: '2s' }} />
    <div className="absolute inset-2 border-2 border-cyan-400/25 rounded-lg animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
  </div>
);

const DiamondEffect = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse" />
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'linear-gradient(105deg, transparent 0%, transparent 35%, hsl(45 100% 60% / 0.2) 42%, hsl(45 100% 70% / 0.3) 50%, hsl(45 100% 60% / 0.2) 58%, transparent 65%, transparent 100%)',
        backgroundSize: '300% 100%',
        animation: active ? 'diamondShimmer 3s ease-in-out infinite' : 'none',
      }}
    />
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(45 100% 85% / 0.3) 0%, transparent 70%)',
        animation: active ? 'diamondShine 3s ease-in-out infinite' : 'none',
      }}
    />
    {active && (
      <>
        <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-primary/80 rounded-full" style={{ animation: 'sparkleFloat 2s ease-in-out infinite' }} />
        <div className="absolute top-1/4 left-4 w-1 h-1 bg-amber-300/70 rounded-full" style={{ animation: 'sparkleFloat 2.3s ease-in-out infinite 0.3s' }} />
        <div className="absolute bottom-3 right-1/4 w-1 h-1 bg-primary/60 rounded-full" style={{ animation: 'sparkleFloat 1.8s ease-in-out infinite 0.6s' }} />
      </>
    )}
  </div>
);