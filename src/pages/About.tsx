import { Header } from "@/components/Header";
import ourStoryPurse from "@/assets/our-story-purse.png";

import { Footer } from "@/components/Footer";
import { Mountain, HeartHandshake, GraduationCap, Sparkles, Heart, Gem, Leaf, Users, Microscope, Scale, Palette, FileCheck, Download, Factory, ClipboardCheck, Package, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background overflow-x-hidden">
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
        <section className="py-14 md:py-[72px] px-4 bg-secondary/50">
          <div className="max-w-6xl mx-auto grid grid-cols-12 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-5 order-2 md:order-1"
            >
              <div className="max-w-[560px]">
                <h2 className="text-3xl md:text-4xl font-serif mb-5">
                  Our <span className="noor-glow">Story</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Noori was born from a simple question: why does beauty have to come at someone else's expense? We saw an industry shaped by conflict and environmental harm, and we knew there had to be a better way.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  So we built Noori around two non-negotiables: ethics and excellence. We use lab-grown diamonds and design every piece to feel truly premium—clean proportions, secure settings, and a finish made for everyday wear.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  The result is luxury that's attainable, without compromising on craftsmanship or durability. And we don't stop at what we make—every purchase supports UNICEF programs that help children access safety and education in mining-affected communities.
                </p>
                <p className="text-base text-foreground font-medium leading-relaxed">
                  Every Noori piece represents a choice—a choice for innovation over extraction, for impact over indifference, for beauty you can feel good about wearing.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-7 order-1 md:order-2"
            >
              <img
                src={ourStoryPurse}
                alt="Noori luxury jewelry collection"
                className="w-full rounded-3xl border border-border/30 object-cover object-center aspect-[4/5] md:aspect-auto md:h-full"
                loading="lazy"
              />
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
          className="relative py-24 px-2 md:px-4 bg-secondary overflow-hidden"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Centered Titles */}
            <div className="text-center mb-16">
              <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-4xl md:text-5xl font-serif mb-5">
                  Our <span className="noor-glow">Mission</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Every Noori purchase supports UNICEF programs that help children stay safe and access education in mining-affected communities.
                </p>
              </div>
              <div className={`transition-all duration-700 delay-300 mt-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h3 className="text-3xl md:text-4xl font-serif mb-5">
                  How Your Purchase <span className="noor-glow">Creates Change</span>
                </h3>
                <p className="text-lg text-muted-foreground">
                  A step-by-step path from unsafe work to school.
                </p>
              </div>
            </div>

            {/* Journey Cards - vertical stack */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <JourneyNode
                  icon={<Mountain className="w-8 h-8 text-stone-400" />}
                  title="The Mines"
                  description="Children face dangerous, unsafe work in mining communities."
                  accentColor="stone"
                  delay={400}
                  isVisible={isVisible}
                  effect={<MineEffect />}
                />
                <JourneyNode
                  icon={<HeartHandshake className="w-8 h-8 text-amber-500" />}
                  title="UNICEF Steps In"
                  description="Cash support, birth registration, and safe spaces help families break the cycle."
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
                  description="A safer childhood—and a future built in school."
                  accentColor="primary"
                  delay={1300}
                  isVisible={isVisible}
                  effect={<FutureEffect active={futurePayoff} />}
                  highlight={futurePayoff}
                />
              </div>

              {/* YouTube Video Embed */}
              <div className={`mt-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
                  <iframe
                    src="https://www.youtube.com/embed/JfxpeHV-fXg"
                    title="UNICEF - Breaking the cycle"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                </div>
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

        {/* Lab-Grown Diamonds - 4Cs Section */}
        <LabGrownDiamondsSection />

        {/* Sourcing & Craftsmanship Section */}
        <SourcingCraftsmanshipSection />
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

// Lab-Grown Diamonds Section Component
const LabGrownDiamondsSection = () => {
  const fourCs = [
    {
      name: "Cut",
      icon: <Sparkles className="w-6 h-6" />,
      labGrown: "Excellent Grade — the highest cut rating",
      comparison: "Maximum brilliance and fire",
      scale: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      nooriPosition: 4
    },
    {
      name: "Colour",
      icon: <Palette className="w-6 h-6" />,
      labGrown: "D-F Colorless — the purest diamond color",
      comparison: "Completely colorless, no yellow tint",
      scale: ["M-Z", "K-L", "G-J", "D-F"],
      nooriPosition: 3
    },
    {
      name: "Clarity",
      icon: <Microscope className="w-6 h-6" />,
      labGrown: "VVS1-VS1 — minimal to no imperfections",
      comparison: "Inclusions invisible to the naked eye",
      scale: ["I", "SI", "VS2", "VS1-VVS1"],
      nooriPosition: 3
    },
    {
      name: "Carat",
      icon: <Scale className="w-6 h-6" />,
      labGrown: "Full range of sizes available",
      comparison: "Same weight measurement, same sparkle",
      scale: null,
      nooriPosition: null
    }
  ];

  return (
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
            Lab-Grown <span className="noor-glow">Diamonds</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real diamonds. Created using advanced technology that replicates the natural growing process. 
            Chemically, optically, and physically identical to mined diamonds—without the ethical baggage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {fourCs.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury p-6 text-center"
            >
              <div className="text-accent mb-3 flex justify-center">{c.icon}</div>
              <h4 className="text-xl font-serif mb-3">{c.name}</h4>
              <p className="text-sm text-foreground mb-2">{c.labGrown}</p>
              <p className="text-xs text-muted-foreground mb-4">{c.comparison}</p>
              
              {c.scale && (
                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex gap-1 mb-2">
                    {c.scale.map((grade, i) => (
                      <div
                        key={grade}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          i === c.nooriPosition
                            ? "bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                            : i < (c.nooriPosition ?? 0)
                            ? "bg-muted-foreground/20"
                            : "bg-muted-foreground/10"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{c.scale[0]}</span>
                    <span className="text-accent font-medium flex items-center gap-1">
                      <Gem className="w-3 h-3" />
                      {c.scale[c.nooriPosition!]}
                    </span>
                  </div>
                  <p className="text-[10px] text-accent/80 mt-1">★ Noori Standard</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-luxury p-8 max-w-2xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="w-24 h-32 bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                <FileCheck className="w-10 h-10 text-accent" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-serif mb-2">IGI/GCal Certification</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Every Noori diamond comes with independent certification verifying cut, color, clarity, and carat weight. 
                Each certificate includes a unique ID laser-inscribed on your diamond.
              </p>
              <div className="space-y-1 text-xs text-muted-foreground mb-4">
                <p>• Unique certificate number</p>
                <p>• Diamond measurements and proportions</p>
                <p>• 4Cs grading with visual diagrams</p>
                <p>• Laser inscription ID</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download Sample Certificate
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Sourcing & Craftsmanship Section Component
const SourcingCraftsmanshipSection = () => {
  const supplyChainSteps = [
    { icon: <Factory className="w-6 h-6" />, title: "Lab Creation", description: "CVD/HPHT growth in controlled environment" },
    { icon: <ClipboardCheck className="w-6 h-6" />, title: "Quality Control", description: "IGI/GCal certification and grading" },
    { icon: <Palette className="w-6 h-6" />, title: "Studio Design", description: "Hand-set in 14K solid gold" },
    { icon: <Package className="w-6 h-6" />, title: "Packaging", description: "Sustainable luxury presentation" },
    { icon: <Truck className="w-6 h-6" />, title: "Delivery", description: "Insured shipping to your door" }
  ];

  const qualityChecks = [
    "Diamond grading verification against certificate",
    "Metal purity testing (14K gold stamping)",
    "Prong security and setting inspection",
    "Final polish and cleaning",
    "Packaging quality inspection"
  ];

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Sourcing & <span className="noor-glow">Craftsmanship</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From lab to your jewelry box—every step controlled and transparent.
          </p>
        </motion.div>

        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {supplyChainSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center flex-1"
              >
                <div className="w-16 h-16 rounded-full bg-background border border-accent/30 flex items-center justify-center text-accent mb-3">
                  {step.icon}
                </div>
                <h4 className="text-sm font-medium mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground max-w-[120px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="hidden md:flex justify-between items-center px-16 -mt-12 pointer-events-none">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 h-0.5 bg-gradient-to-r from-accent/20 to-accent/20 mx-2" />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-luxury p-8 max-w-2xl mx-auto"
        >
          <h4 className="text-xl font-serif mb-6 text-center">Quality Control Checklist</h4>
          <div className="space-y-3">
            {qualityChecks.map((check, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-muted-foreground">{check}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
