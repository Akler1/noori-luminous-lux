import { Mountain, HeartHandshake, GraduationCap, Sparkles } from "lucide-react";
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
              Every Noori purchase directly supports UNICEF's mission to help children escape dangerous mining conditions and access education in the Democratic Republic of Congo.
            </p>
          </div>
        </div>

        {/* ========== PART 2: The Journey Process Flow ========== */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-3xl md:text-4xl font-serif mb-5">
              How Your Purchase <span className="noor-glow">Creates Change</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A step-by-step journey from mining to thriving.
            </p>
          </div>
        </div>

        {/* Process Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Nodes Container */}
            <div className="relative flex items-center justify-between gap-6" style={{ minHeight: '225px' }}>
              <JourneyNode
                icon={<Mountain className="w-8 h-8 text-stone-400" />}
                title="The Mines"
                description="Over 360,000 children work in dangerous cobalt mines in the DRC."
                accentColor="stone"
                delay={400}
                isVisible={isVisible}
                effect={<MineEffect />}
              />

              <JourneyNode
                icon={<HeartHandshake className="w-8 h-8 text-amber-500" />}
                title="UNICEF Steps In"
                description="Cash support, birth certificates, and safe spaces help families break the cycle."
                accentColor="amber"
                delay={700}
                isVisible={isVisible}
                effect={<InterventionEffect />}
              />

              <JourneyNode
                icon={<GraduationCap className="w-8 h-8 text-green-500" />}
                title="Education"
                description="Children receive school supplies, uniforms, and catch-up classes."
                accentColor="green"
                delay={1000}
                isVisible={isVisible}
                effect={<SchoolEffect />}
              />

              <JourneyNode
                icon={<Sparkles className="w-8 h-8 text-primary" />}
                title="Thriving"
                description="A brighter future with endless possibilities ahead."
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
                description="Over 360,000 children work in dangerous cobalt mines in the DRC."
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
                description="Cash support, birth certificates, and safe spaces help families break the cycle."
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
                description="Children receive school supplies, uniforms, and catch-up classes."
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
                description="A brighter future with endless possibilities ahead."
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

        {/* ========== UNICEF Video Embed ========== */}
        <div className={`mt-16 mb-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl font-serif text-center mb-6">See the Impact in Action</h4>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
              <iframe
                src="https://www.youtube.com/embed/vSDqUcH5ne0"
                title="UNICEF: Breaking the cycle of child labor in DRC mines"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              UNICEF's work helping children transition from mines to schools
            </p>
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
        /* Journey Effects */
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
