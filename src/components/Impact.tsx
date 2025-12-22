import { Coins, FileCheck, School, Mountain, HeartHandshake, GraduationCap, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Impact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [futurePayoff, setFuturePayoff] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setFuturePayoff(true), 2800);
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
      id="impact"
      className="relative py-24 px-4 bg-secondary overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ========== PART 1: Mission Statement ========== */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-serif mb-5">
              Beauty with <span className="noor-glow">Purpose</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every Noori purchase helps children transition from mining to education through UNICEF's "From Mine to School" initiative.
            </p>
          </div>
        </div>

        {/* 3 Intervention Cards */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-24">
          <InterventionCard
            icon={<Coins className="w-11 h-11 text-amber-400" />}
            title="Cash Transfers"
            description="Direct support to families so parents don't need children's income from the mines."
            accentColor="amber"
            delay={100}
            isVisible={isVisible}
            effect="coins"
          />
          <InterventionCard
            icon={<FileCheck className="w-11 h-11 text-blue-400" />}
            title="Documentation"
            description="Birth certificates unlock school enrollment and legal protection for every child."
            accentColor="blue"
            delay={200}
            isVisible={isVisible}
            effect="stamp"
          />
          <InterventionCard
            icon={<School className="w-11 h-11 text-green-400" />}
            title="Safe Spaces"
            description="Child-Friendly Spaces provide catch-up classes, school kits, and psychosocial support."
            accentColor="green"
            delay={300}
            isVisible={isVisible}
            effect="blocks"
          />
        </div>

        {/* ========== Visual Connector ========== */}
        <div className={`flex items-center justify-center mb-20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/50" />
          <div className="px-8 py-3 bg-background/80 backdrop-blur-sm border border-amber-500/20 rounded-full mx-4">
            <span className="text-sm uppercase tracking-widest text-amber-500/80 font-medium">The Journey</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/50" />
        </div>

        {/* ========== PART 2: The Journey Process Flow ========== */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-3xl md:text-4xl font-serif mb-5">
              From <span className="noor-glow">Mine to School</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A holistic transition addressing root causes—poverty, documentation, and education.
            </p>
          </div>
        </div>

        {/* Process Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* SVG Connectors */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 800 180"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="impactPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                </linearGradient>
                <filter id="impactGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Mine to Intervention */}
              <path
                d="M 150 90 Q 250 60 350 90"
                fill="none"
                stroke="url(#impactPathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#impactGlow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 0.6s, opacity 0.5s ease-out 0.6s'
                }}
              />
              <circle cx="150" cy="90" r="4" fill="hsl(45 50% 40%)" className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }} />
              
              {/* Intervention to School */}
              <path
                d="M 420 90 Q 520 120 620 90"
                fill="none"
                stroke="url(#impactPathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#impactGlow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.2s ease-out 1s, opacity 0.5s ease-out 1s'
                }}
              />
              
              {/* School to Future */}
              <path
                d="M 680 90 L 750 90"
                fill="none"
                stroke="url(#impactPathGradient)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                filter="url(#impactGlow)"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDashoffset: isVisible ? 0 : 100,
                  transition: 'stroke-dashoffset 1.2s ease-out 1.4s, opacity 0.5s ease-out 1.4s'
                }}
              />
              
              {/* End node */}
              <circle cx="750" cy="90" r="5" fill="hsl(var(--primary))" className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Nodes Container */}
            <div className="relative flex items-center justify-between gap-6" style={{ minHeight: '225px' }}>
              <JourneyNode
                icon={<Mountain className="w-8 h-8 text-stone-400" />}
                title="The Mines"
                description="Children as young as 5 work in cobalt mines."
                accentColor="stone"
                delay={400}
                isVisible={isVisible}
                effect={<MineEffect />}
              />

              <JourneyNode
                icon={<HeartHandshake className="w-8 h-8 text-amber-500" />}
                title="UNICEF Steps In"
                description="Holistic support addressing root causes."
                accentColor="amber"
                delay={700}
                isVisible={isVisible}
                effect={<InterventionEffect />}
              />

              <JourneyNode
                icon={<GraduationCap className="w-8 h-8 text-green-500" />}
                title="Education"
                description="Catch-up classes, uniforms, and supplies."
                accentColor="green"
                delay={1000}
                isVisible={isVisible}
                effect={<SchoolEffect />}
              />

              <JourneyNode
                icon={<Sparkles className="w-8 h-8 text-primary" />}
                title="Thriving"
                description="A future of possibility, not labor."
                accentColor="primary"
                delay={1300}
                isVisible={isVisible}
                effect={<FutureEffect active={futurePayoff} />}
                highlight={futurePayoff}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-5">
              <JourneyNode
                icon={<Mountain className="w-8 h-8 text-stone-400" />}
                title="The Mines"
                description="Children as young as 5 work in cobalt mines."
                accentColor="stone"
                delay={400}
                isVisible={isVisible}
                effect={<MineEffect />}
                fullWidth
              />

              <MobileConnector delay={500} isVisible={isVisible} />

              <JourneyNode
                icon={<HeartHandshake className="w-8 h-8 text-amber-500" />}
                title="UNICEF Steps In"
                description="Holistic support addressing root causes."
                accentColor="amber"
                delay={700}
                isVisible={isVisible}
                effect={<InterventionEffect />}
                fullWidth
              />

              <MobileConnector delay={800} isVisible={isVisible} />

              <JourneyNode
                icon={<GraduationCap className="w-8 h-8 text-green-500" />}
                title="Education"
                description="Catch-up classes, uniforms, and supplies."
                accentColor="green"
                delay={1000}
                isVisible={isVisible}
                effect={<SchoolEffect />}
                fullWidth
              />

              <MobileConnector delay={1100} isVisible={isVisible} />

              <JourneyNode
                icon={<Sparkles className="w-8 h-8 text-primary" />}
                title="Thriving"
                description="A future of possibility, not labor."
                accentColor="primary"
                delay={1300}
                isVisible={isVisible}
                effect={<FutureEffect active={futurePayoff} />}
                highlight={futurePayoff}
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* ========== Impact Stats ========== */}
        <div className={`mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <StatItem number="500+" label="Children Supported" delay={1500} isVisible={isVisible} />
            <div className="hidden md:block w-px h-12 bg-primary/20" />
            <StatItem number="Kipushi & Lualaba" label="DRC Regions" delay={1600} isVisible={isVisible} isText />
            <div className="hidden md:block w-px h-12 bg-primary/20" />
            <StatItem number="5,000+" label="Families Reached" delay={1700} isVisible={isVisible} />
          </div>
        </div>

        {/* ========== Call to Action ========== */}
        <div className={`mt-20 text-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl text-muted-foreground italic mb-8 max-w-2xl mx-auto">
            "When you choose Noori, you're choosing to be part of something bigger."
          </p>
          <a 
            href="https://www.unicef.org/drcongo/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-primary/30 rounded-full text-lg text-foreground hover:bg-primary hover:text-background transition-all duration-300 group"
          >
            Learn About Our Partnership
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* All custom animations */}
      <style>{`
        /* Coin Purse Animation - Subtle */
        @keyframes coinFall {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.4; }
          70% { transform: translateY(55px) rotate(180deg); opacity: 0.4; }
          85% { transform: translateY(50px) rotate(190deg); }
          100% { transform: translateY(55px) rotate(180deg); opacity: 0.3; }
        }
        @keyframes purseWobble {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(-2deg); }
          75% { transform: translateX(-50%) rotate(2deg); }
        }
        @keyframes coinShine {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        /* ID Card Animation */
        @keyframes lineWrite {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes photoFadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes checkAppear {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.05); }
          50% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.1); }
        }

        /* School Build Animation */
        @keyframes foundationBuild {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes wallsRise {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes roofDrop {
          0% { transform: translateY(-20px) scaleY(0); opacity: 0; }
          60% { transform: translateY(3px) scaleY(1); }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
        @keyframes doorFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes flagWave {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        /* Existing Journey Effects */
        @keyframes dustFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-6px) translateX(3px); opacity: 0.5; }
        }
        @keyframes heartPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.5; }
        }
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); opacity: 0.5; }
          50% { transform: translateY(-5px) rotate(3deg); opacity: 0.8; }
        }
        @keyframes hopeShine {
          0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(3px) rotate(45deg); }
        }
        @keyframes radialGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

// ========== Intervention Card Component ==========
interface InterventionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'amber' | 'blue' | 'green';
  delay: number;
  isVisible: boolean;
  effect: 'coins' | 'stamp' | 'blocks';
}

const InterventionCard = ({ icon, title, description, accentColor, delay, isVisible, effect }: InterventionCardProps) => {
  const borderColors = {
    amber: 'border-amber-500/20 hover:border-amber-500/40',
    blue: 'border-blue-500/20 hover:border-blue-500/40',
    green: 'border-green-500/20 hover:border-green-500/40'
  };

  const bgColors = {
    amber: 'bg-amber-500/10',
    blue: 'bg-blue-500/10',
    green: 'bg-green-500/10'
  };

  const iconBorderColors = {
    amber: 'border-amber-500/30',
    blue: 'border-blue-500/30',
    green: 'border-green-500/30'
  };

  return (
    <div 
      className={`
        relative bg-background/50 backdrop-blur-sm rounded-xl p-10 
        border ${borderColors[accentColor]} overflow-hidden
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Effect Layer */}
      {effect === 'coins' && <CoinEffect />}
      {effect === 'stamp' && <StampEffect />}
      {effect === 'blocks' && <BlockEffect />}

      <div className="relative z-10">
        <div className={`w-[5.5rem] h-[5.5rem] rounded-full ${bgColors[accentColor]} flex items-center justify-center mx-auto mb-6 border ${iconBorderColors[accentColor]}`}>
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed text-center">{description}</p>
      </div>
    </div>
  );
};

// ========== Card Effects ==========

// Coins Falling into Coin Purse - Subtle Background Version
const CoinEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
    {/* Coin Purse - positioned at bottom center */}
    <svg 
      className="absolute bottom-4 left-1/2 w-12 h-10"
      viewBox="0 0 56 48"
      style={{ animation: 'purseWobble 3s ease-in-out infinite', animationDelay: '1s' }}
    >
      {/* Purse body */}
      <ellipse cx="28" cy="34" rx="20" ry="10" fill="rgba(180, 83, 9, 0.5)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="1"/>
      {/* Purse opening */}
      <path d="M14 30 Q28 24 42 30" fill="none" stroke="rgba(217, 119, 6, 0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    
    {/* Falling Coins - start from top, fall into purse */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-amber-400/60 to-amber-600/60"
        style={{
          left: `${46 + (i - 1) * 6}%`,
          top: '20%',
          animation: 'coinFall 3s ease-in infinite',
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
  </div>
);

// ID Card Being Filled Out - Subtle Background Version
const StampEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    {/* ID Card - positioned in bottom corner */}
    <div 
      className="absolute bottom-4 right-4 w-16 h-11 bg-blue-100/50 rounded border border-blue-300/30 overflow-hidden"
      style={{ animation: 'cardGlow 4s ease-in-out infinite' }}
    >
      {/* Header stripe */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-blue-400/40" />
      
      {/* Photo placeholder */}
      <div 
        className="absolute top-3 left-1 w-4 h-5 bg-blue-200/50 rounded-sm"
        style={{ animation: 'photoFadeIn 1.5s ease-out forwards', animationDelay: '0.5s', opacity: 0 }}
      />
      
      {/* Text lines that write in */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute right-1 overflow-hidden" style={{ top: `${14 + i * 8}px`, width: '45%' }}>
          <div 
            className="h-1 bg-blue-300/50 rounded-full origin-left"
            style={{ 
              animation: 'lineWrite 1s ease-out forwards',
              animationDelay: `${1.5 + i * 0.5}s`,
              width: '0%'
            }}
          />
        </div>
      ))}
      
      {/* Checkmark */}
      <svg 
        className="absolute bottom-0.5 right-0.5 w-3 h-3 text-green-500/60"
        viewBox="0 0 24 24"
        style={{ animation: 'checkAppear 0.6s ease-out forwards', animationDelay: '3.5s', opacity: 0 }}
      >
        <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

// School Being Built - Subtle Background Version
const BlockEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-16">
      {/* Foundation */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-green-600/50 rounded-sm origin-center"
        style={{ animation: 'foundationBuild 0.8s ease-out forwards', animationDelay: '0s' }}
      />
      
      {/* Left Wall */}
      <div 
        className="absolute bottom-1.5 left-1 w-6 h-8 bg-green-400/40 rounded-t-sm origin-bottom"
        style={{ animation: 'wallsRise 0.8s ease-out forwards', animationDelay: '0.6s', opacity: 0 }}
      >
        {/* Window */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-blue-200/30 rounded-sm" />
      </div>
      
      {/* Right Wall */}
      <div 
        className="absolute bottom-1.5 right-1 w-6 h-8 bg-green-400/40 rounded-t-sm origin-bottom"
        style={{ animation: 'wallsRise 0.8s ease-out forwards', animationDelay: '0.8s', opacity: 0 }}
      >
        {/* Window */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-blue-200/30 rounded-sm" />
      </div>
      
      {/* Roof */}
      <svg 
        className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-24 h-6 origin-bottom"
        viewBox="0 0 112 32"
        style={{ animation: 'roofDrop 0.7s ease-out forwards', animationDelay: '1.5s', opacity: 0 }}
      >
        <path d="M8 28 L56 6 L104 28 Z" fill="rgba(220, 38, 38, 0.35)" />
      </svg>
      
      {/* Door */}
      <div 
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-5 bg-amber-700/40 rounded-t-sm"
        style={{ animation: 'doorFadeIn 0.5s ease-out forwards', animationDelay: '2s', opacity: 0 }}
      />
      
      {/* Flag */}
      <div 
        className="absolute -top-3 left-1/2 ml-3"
        style={{ animation: 'flagWave 2s ease-in-out infinite', animationDelay: '2.5s', transformOrigin: 'bottom center' }}
      >
        <div className="w-0.5 h-4 bg-gray-500/40" />
        <div 
          className="absolute top-0 left-0.5 w-3 h-2 bg-green-500/40"
          style={{ animation: 'doorFadeIn 0.5s ease-out forwards', animationDelay: '2.6s', opacity: 0 }}
        />
      </div>
    </div>
  </div>
);

// ========== Journey Node Component ==========
interface JourneyNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'stone' | 'amber' | 'green' | 'primary';
  delay: number;
  isVisible: boolean;
  effect: React.ReactNode;
  highlight?: boolean;
  fullWidth?: boolean;
}

const JourneyNode = ({ icon, title, description, accentColor, delay, isVisible, effect, highlight, fullWidth }: JourneyNodeProps) => {
  const bgColors = {
    stone: 'bg-stone-500/10',
    amber: 'bg-amber-500/10',
    green: 'bg-green-500/10',
    primary: 'bg-primary/10'
  };

  const borderColors = {
    stone: 'border-stone-500/30',
    amber: 'border-amber-500/30',
    green: 'border-green-500/30',
    primary: 'border-primary/30'
  };

  return (
    <div 
      className={`
        relative ${bgColors[accentColor]} backdrop-blur-sm rounded-xl p-6
        border ${borderColors[accentColor]} overflow-hidden
        transition-all duration-500 ease-out
        ${fullWidth ? 'w-full' : 'flex-1 max-w-[225px]'}
        ${highlight ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {effect}

      <div className="relative z-10 text-center">
        <div className={`w-16 h-16 rounded-full ${bgColors[accentColor]} flex items-center justify-center mx-auto mb-4 border ${borderColors[accentColor]}`}>
          {icon}
        </div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ========== Node Effects ==========
const MineEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(4)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-stone-400/40"
        style={{
          left: `${20 + i * 20}%`,
          top: `${60 + (i % 2) * 15}%`,
          animation: 'dustFloat 3s ease-in-out infinite',
          animationDelay: `${i * 0.5}s`
        }}
      />
    ))}
    <div className="absolute inset-0 bg-gradient-to-t from-stone-800/20 to-transparent" />
  </div>
);

const InterventionEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div 
      className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-amber-400/10"
      style={{ animation: 'heartPulse 2s ease-in-out infinite' }}
    />
    <div 
      className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-amber-400/15"
      style={{ animation: 'heartPulse 2s ease-in-out infinite', animationDelay: '0.3s' }}
    />
  </div>
);

const SchoolEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-3 h-4 rounded-sm bg-green-400/20 border border-green-400/30"
        style={{
          left: `${25 + i * 25}%`,
          top: `${50 + (i % 2) * 10}%`,
          animation: 'bookFloat 2.5s ease-in-out infinite',
          animationDelay: `${i * 0.4}s`
        }}
      />
    ))}
  </div>
);

const FutureEffect = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Radial glow */}
    <div 
      className={`absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
    />
    
    {/* Sparkles */}
    {active && [...Array(6)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-1.5 h-1.5 bg-primary rounded-full"
        style={{
          left: `${15 + (i * 14)}%`,
          top: `${20 + ((i * 17) % 60)}%`,
          animation: 'sparkleFloat 1.5s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
    
    {/* Central shine */}
    <div 
      className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-primary/30 blur-sm transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ animation: active ? 'hopeShine 2s ease-in-out infinite' : 'none' }}
    />
  </div>
);

// ========== Mobile Connector ==========
const MobileConnector = ({ delay, isVisible }: { delay: number; isVisible: boolean }) => (
  <div 
    className={`flex flex-col items-center gap-1 py-2 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-primary/20" />
    <div 
      className="w-2 h-2 border-r-2 border-b-2 border-primary/50"
      style={{ animation: 'arrowBounce 1s ease-in-out infinite' }}
    />
    <div className="w-px h-4 bg-gradient-to-b from-primary/20 to-primary/50" />
  </div>
);

// ========== Stat Item ==========
const StatItem = ({ number, label, delay, isVisible, isText }: { number: string; label: string; delay: number; isVisible: boolean; isText?: boolean }) => (
  <div 
    className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={`font-serif ${isText ? 'text-xl' : 'text-3xl md:text-4xl'} text-primary mb-2`}>
      {number}
    </div>
    <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
  </div>
);
