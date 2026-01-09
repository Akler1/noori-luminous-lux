import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mountain, HeartHandshake, GraduationCap, Sparkles, Heart, Gem, Leaf, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
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

  const brandValues = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Ethical Luxury",
      description: "Lab-grown diamonds that are chemically, physically, and optically identical to mined diamonds—without the ethical concerns."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Our diamonds require no mining, reducing environmental impact while creating lasting beauty for generations."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Purpose-Driven",
      description: "Every purchase supports UNICEF's mission to help children escape mining and access education in the DRC."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "We believe luxury should lift others up. Our work has already supported over 500 children and 5,000 families."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              About <span className="noor-glow">Noori</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Redefining luxury through ethical innovation and meaningful impact.
            </p>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Our <span className="noor-glow">Story</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="prose prose-invert max-w-none text-center"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Noori was born from a simple question: why does beauty have to come at someone else's expense? 
                We saw an industry built on conflict and environmental destruction, and we knew there had to be a better way.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our name, "Noori," means "light" in several languages—and that's exactly what we aim to bring. 
                Light to the jewelry industry through ethical lab-grown diamonds. Light to the lives of children 
                trapped in mining through our UNICEF partnership. Light to your everyday moments with pieces 
                designed to be worn and cherished.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every Noori piece represents a choice—a choice for innovation over extraction, 
                for impact over indifference, for beauty that makes the world a little brighter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                What We <span className="noor-glow">Stand For</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our values guide every decision, from the diamonds we grow to the communities we support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-luxury p-8 text-center"
                >
                  <div className="text-accent mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section with UNICEF Journey */}
        <section 
          ref={sectionRef} 
          id="mission"
          className="relative py-24 px-4 bg-secondary overflow-hidden"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Mission Statement */}
            <div className="text-center mb-20">
              <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-4xl md:text-5xl font-serif mb-5">
                  Our <span className="noor-glow">Mission</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Every Noori purchase directly supports UNICEF's mission to help children escape dangerous mining conditions and access education in the Democratic Republic of Congo.
                </p>
              </div>
            </div>

            {/* Journey Process */}
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

            {/* Process Diagram - Desktop */}
            <div className="hidden md:block">
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

            {/* Process Diagram - Mobile */}
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

            {/* UNICEF Video */}
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

            {/* Impact Stats */}
            <div className={`mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <StatItem number="500+" label="Children Supported" delay={1500} isVisible={isVisible} />
                <div className="hidden md:block w-px h-12 bg-primary/20" />
                <StatItem number="Kipushi & Lualaba" label="DRC Regions" delay={1600} isVisible={isVisible} isText />
                <div className="hidden md:block w-px h-12 bg-primary/20" />
                <StatItem number="5,000+" label="Families Reached" delay={1700} isVisible={isVisible} />
              </div>
            </div>
          </div>
        </section>

        {/* Why Lab-Grown Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Why <span className="noor-glow">Lab-Grown</span>?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Lab-grown diamonds are real diamonds—chemically, physically, and optically identical to mined diamonds. 
                Created using advanced technology that replicates the natural diamond-growing process, they offer the same 
                brilliance, fire, and durability you'd expect from any diamond.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-luxury p-6">
                  <div className="text-3xl font-serif text-accent mb-2">40-60%</div>
                  <p className="text-sm text-muted-foreground">Less expensive than mined diamonds</p>
                </div>
                <div className="card-luxury p-6">
                  <div className="text-3xl font-serif text-accent mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Conflict-free and ethical</p>
                </div>
                <div className="card-luxury p-6">
                  <div className="text-3xl font-serif text-accent mb-2">0</div>
                  <p className="text-sm text-muted-foreground">Mining required</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Journey Node Component
interface JourneyNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  delay: number;
  isVisible: boolean;
  effect?: React.ReactNode;
  highlight?: boolean;
  fullWidth?: boolean;
}

const JourneyNode = ({ icon, title, description, delay, isVisible, effect, highlight, fullWidth }: JourneyNodeProps) => {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-700 ${fullWidth ? 'w-full' : 'flex-1'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`relative p-5 rounded-full bg-background/60 backdrop-blur-sm border transition-all duration-500 ${
        highlight 
          ? 'border-primary shadow-lg shadow-primary/30 scale-110' 
          : 'border-primary/20'
      }`}>
        {icon}
        {effect}
      </div>
      <h4 className={`text-lg font-serif mt-4 mb-2 transition-colors duration-500 ${highlight ? 'text-primary' : ''}`}>
        {title}
      </h4>
      <p className="text-sm text-muted-foreground text-center max-w-[180px]">
        {description}
      </p>
    </div>
  );
};

// Mobile Connector
const MobileConnector = ({ delay, isVisible }: { delay: number; isVisible: boolean }) => (
  <div
    className={`w-0.5 h-6 bg-gradient-to-b from-primary/40 to-primary/20 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{ transitionDelay: `${delay}ms` }}
  />
);

// Stat Item Component
const StatItem = ({ number, label, delay, isVisible, isText = false }: { 
  number: string; 
  label: string; 
  delay: number; 
  isVisible: boolean;
  isText?: boolean;
}) => (
  <div 
    className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={`font-serif mb-1 ${isText ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} text-primary`}>
      {number}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Effect Components
const MineEffect = () => (
  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-600/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
  </div>
);

const InterventionEffect = () => (
  <div className="absolute -top-1 -right-1">
    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
  </div>
);

const SchoolEffect = () => (
  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
    <div className="flex gap-0.5">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="w-1.5 h-1.5 bg-green-500/60 rounded-full animate-bounce" 
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '1.5s' }} 
        />
      ))}
    </div>
  </div>
);

const FutureEffect = ({ active }: { active: boolean }) => (
  <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
        style={{
          top: `${20 + Math.random() * 60}%`,
          left: `${20 + Math.random() * 60}%`,
          animationDelay: `${i * 200}ms`,
          animationDuration: '1.5s'
        }}
      />
    ))}
  </div>
);

export default About;
