import { Microscope, Gem, Leaf } from "lucide-react";

export const WhyLabDiamonds = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="reveal-up mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Why <span className="noor-glow">Lab Diamonds</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The choice is clear—lab-grown diamonds deliver the same brilliance with superior ethics and exceptional quality.
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="reveal-up grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Scientifically Identical - Microscope Scanning Effect */}
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 overflow-hidden group">
            {/* Scanning line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              {/* Horizontal scanning line */}
              <div 
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60"
                style={{
                  animation: 'scanLine 3s ease-in-out infinite',
                }}
              />
              {/* Crosshair center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-emerald-400 -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-400 -translate-y-1/2" />
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <Microscope className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scientifically Identical</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Same crystal structure, same 10 Mohs hardness, certified by GIA & IGI. Even experts can't tell the difference.
              </p>
            </div>
          </div>

          {/* Superior Clarity - Glimmer + Shine Effect */}
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20 overflow-hidden group">
            {/* Diagonal shimmer effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Continuous diagonal shimmer */}
              <div 
                className="absolute -inset-full w-[200%] h-[200%] opacity-30"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, hsl(45 100% 70% / 0.4) 45%, hsl(45 100% 90% / 0.6) 50%, hsl(45 100% 70% / 0.4) 55%, transparent 60%)',
                  animation: 'shimmerDiagonal 3s ease-in-out infinite',
                }}
              />
              {/* Sparkle points */}
              <div className="absolute top-4 right-6 w-1 h-1 bg-amber-200 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-8 right-10 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 left-8 w-0.5 h-0.5 bg-amber-200 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-1/2 right-4 w-1 h-1 bg-amber-100 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                <Gem className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Superior Clarity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lab-controlled environments mean fewer inclusions and defects. Exceptional brilliance and fire in every stone.
              </p>
            </div>
          </div>

          {/* Ethically Pure - Nature/Growth Effect */}
          <div className="relative bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 overflow-hidden group">
            {/* Organic glow and ripple effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Central green glow */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, hsl(142 70% 45% / 0.6) 0%, transparent 70%)',
                  animation: 'pulseGlow 4s ease-in-out infinite',
                }}
              />
              {/* Expanding ripples */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-green-400/30"
                style={{ animation: 'rippleExpand 3s ease-out infinite' }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-green-400/30"
                style={{ animation: 'rippleExpand 3s ease-out infinite 1s' }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-green-400/30"
                style={{ animation: 'rippleExpand 3s ease-out infinite 2s' }}
              />
              {/* Floating leaf-like particles */}
              <div 
                className="absolute top-6 left-8 w-2 h-1 bg-green-400/40 rounded-full"
                style={{ animation: 'floatUp 4s ease-in-out infinite', transform: 'rotate(45deg)' }}
              />
              <div 
                className="absolute bottom-10 right-6 w-1.5 h-0.5 bg-green-300/30 rounded-full"
                style={{ animation: 'floatUp 4s ease-in-out infinite 1.5s', transform: 'rotate(-30deg)' }}
              />
              <div 
                className="absolute top-1/3 right-10 w-1 h-0.5 bg-green-400/40 rounded-full"
                style={{ animation: 'floatUp 4s ease-in-out infinite 2.5s', transform: 'rotate(20deg)' }}
              />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <Leaf className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ethically Pure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Zero mining, no conflict financing, no displaced communities. Complete traceability from lab to jewelry box.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; opacity: 0; }
          10% { opacity: 0.6; }
          50% { top: 85%; opacity: 0.6; }
          60% { opacity: 0; }
        }
        
        @keyframes shimmerDiagonal {
          0% { transform: translateX(-50%) translateY(-50%); }
          100% { transform: translateX(0%) translateY(0%); }
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
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 45deg)); opacity: 0.4; }
          50% { transform: translateY(-10px) rotate(var(--rotation, 45deg)); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};
