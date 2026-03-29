import { Header } from "@/components/Header";
import ourStoryPurse from "@/assets/our-story-purse.png";

import { Footer } from "@/components/Footer";
import { Mountain, HeartHandshake, GraduationCap, Sparkles, Heart, Gem, Leaf, Users, Microscope, Scale, Palette, FileCheck, Download, Factory, ClipboardCheck, Package, Truck } from "lucide-react";
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const brandValues = [
    { Icon: Gem, title: "Ethical Luxury", description: "Lab-grown diamonds that are chemically, physically, and optically identical to mined diamonds—without the ethical concerns." },
    { Icon: Leaf, title: "Sustainability", description: "Our diamonds require no mining, reducing environmental impact while creating lasting beauty for generations." },
    { Icon: Heart, title: "Purpose-Driven", description: "Every purchase supports UNICEF's mission to help children escape mining and access education in the DRC." },
    { Icon: Users, title: "Community Impact", description: "We believe luxury should lift others up. Our work has already supported over 500 children and 5,000 families." },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* ── Our Story — Page Opener ── */}
        <section className="pt-36 md:pt-44 pb-24 md:pb-32 px-4 bg-background">
          <div className="container-editorial">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-foreground tracking-tight mb-16 md:mb-24"
            >
              Our Story
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="md:col-span-7"
              >
                <p className="font-display text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed mb-8">
                  "Why does beauty have to come at someone else's expense?"
                </p>
                <div className="w-16 h-px bg-accent/40 mb-8" />
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-5">
                  We built Noori around two non-negotiables: ethics and excellence. Lab-grown diamonds, solid 14k gold, and a finish made for everyday wear—without the ethical compromise.
                </p>
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
                  And every purchase supports UNICEF programs helping children access safety and education in mining-affected communities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-5 flex items-start justify-center"
              >
                <img src={ourStoryPurse} alt="Noori luxury jewelry" className="w-full scale-[1.4] origin-center object-contain drop-shadow-xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── What We Stand For — Luxury Manifesto ── */}
        <section className="py-16 md:py-20 bg-background px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Our Values</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              What We <span className="noor-glow">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {brandValues.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="p-6 rounded-xl border border-border/40 text-center"
              >
                <div className="text-accent mb-4 flex justify-center">
                  <value.Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-base text-foreground/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Mission Section — UNTOUCHED ── */}
        <section
          ref={sectionRef}
          id="mission"
          className="relative py-24 px-2 md:px-4 bg-secondary overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }} />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-4xl md:text-5xl font-serif mb-5">Our <span className="noor-glow">Mission</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">Every Noori purchase supports UNICEF programs that help children stay safe and access education in mining-affected communities.</p>
              </div>
              <div className={`transition-all duration-700 delay-300 mt-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h3 className="text-3xl md:text-4xl font-serif mb-5">How Your Purchase <span className="noor-glow">Creates Change</span></h3>
                <p className="text-lg text-muted-foreground">A step-by-step path from unsafe work to school.</p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <JourneyNode icon={<Mountain className="w-8 h-8 text-stone-400" />} title="The Mines" description="Children face dangerous, unsafe work in mining communities." accentColor="stone" delay={400} isVisible={isVisible} effect={<MineEffect />} />
                <JourneyNode icon={<HeartHandshake className="w-8 h-8 text-amber-500" />} title="UNICEF Steps In" description="Cash support, birth registration, and safe spaces help families break the cycle." accentColor="amber" delay={700} isVisible={isVisible} effect={<InterventionEffect />} />
                <JourneyNode icon={<GraduationCap className="w-8 h-8 text-green-500" />} title="Education" description="Children receive school supplies, uniforms, and catch-up classes." accentColor="green" delay={1000} isVisible={isVisible} effect={<SchoolEffect />} />
                <JourneyNode icon={<Sparkles className="w-8 h-8 text-primary" />} title="Thriving" description="A safer childhood—and a future built in school." accentColor="primary" delay={1300} isVisible={isVisible} effect={<FutureEffect active={futurePayoff} />} highlight={futurePayoff} />
              </div>
              <div className={`mt-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
                  <iframe src="https://www.youtube.com/embed/JfxpeHV-fXg" title="UNICEF - Breaking the cycle" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Lab-Grown — Dramatic Stats ── */}
        <section className="py-16 md:py-20 bg-secondary/20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Why Lab-Grown</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-snug mb-6">
                Real diamonds. <span className="italic">Better origin.</span>
              </h2>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-lg">
                Chemically, physically, and optically identical to mined diamonds. Created using advanced CVD technology — same brilliance, fire, and durability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { num: "40–60%", label: "Less expensive than mined diamonds" },
                { num: "100%",   label: "Conflict-free and ethically sourced" },
                { num: "Zero",   label: "Mining required" },
              ].map(({ num, label }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-border/40"
                >
                  <span className="font-display text-6xl md:text-7xl font-light text-accent leading-none tracking-tight block">{num}</span>
                  <span className="text-sm md:text-base text-foreground/50 mt-3 block uppercase tracking-widest">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4Cs — Editorial Rows ── */}
        <FourCsSection />

        {/* ── Sourcing & Craftsmanship ── */}
        <SourcingSection />
      </main>

      <Footer />
    </div>
  );
};

/* ── Grade Pill Stack ── */
const GradeStack = ({ grades, nooriIndex }: { grades: string[]; nooriIndex: number }) => (
  <div className="flex flex-col-reverse gap-1.5 w-32">
    {grades.map((grade, i) => {
      const isNoori = i === nooriIndex;
      return (
        <div
          key={grade}
          className={`px-3 py-2 rounded-lg text-center tracking-wide transition-all ${
            isNoori
              ? "bg-accent text-white font-semibold text-sm shadow-[0_0_16px_hsl(45_70%_50%/0.3)]"
              : "bg-foreground/[0.06] text-foreground/40 text-xs"
          }`}
        >
          {grade}
        </div>
      );
    })}
  </div>
);

/* ── 4Cs Section ── */
const FourCsSection = () => {
  const fourCs: { name: string; icon: React.ReactNode; grade: string; description: string; scale: string[] | null; nooriIndex: number | null }[] = [
    { name: "Cut", icon: <Sparkles className="w-6 h-6" />, grade: "Excellent", description: "The highest cut grade — maximum brilliance and fire from every angle.", scale: ["Poor", "Fair", "Good", "V. Good", "Excellent"], nooriIndex: 4 },
    { name: "Colour", icon: <Palette className="w-6 h-6" />, grade: "D–F Colorless", description: "The purest diamond color range — completely colorless, no yellow tint.", scale: ["M–Z", "K–L", "G–J", "D–F"], nooriIndex: 3 },
    { name: "Clarity", icon: <Microscope className="w-6 h-6" />, grade: "VVS1–VS1", description: "Minimal to no imperfections — inclusions invisible to the naked eye.", scale: ["I", "SI", "VS2", "VVS1–VS1"], nooriIndex: 3 },
    { name: "Carat", icon: <Scale className="w-6 h-6" />, grade: "Full Range", description: "Available in a full range of sizes — same weight, same sparkle as mined.", scale: null, nooriIndex: null },
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light">
            The <span className="noor-glow">4Cs</span>
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fourCs.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-border/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-accent">{c.icon}</div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">{c.name}</h3>
              </div>
              <p className="text-base text-foreground/70 leading-relaxed mb-4">{c.description}</p>
              <div className="flex justify-start">
                {c.scale && c.nooriIndex !== null ? (
                  <GradeStack grades={c.scale} nooriIndex={c.nooriIndex} />
                ) : (
                  <span className="bg-accent text-white text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded-full">
                    {c.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border border-border rounded-xl p-8 max-w-2xl mx-auto mt-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="w-20 h-28 border border-accent rounded-xl bg-accent/5 flex flex-col items-center justify-center gap-2">
                <FileCheck className="w-7 h-7 text-accent" />
                <span className="text-[9px] text-accent font-semibold tracking-[0.15em] uppercase">Certified</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-display text-xl mb-2 text-foreground">IGI/GCal Certification</h4>
              <p className="text-sm text-foreground/70 mb-4">
                Every Noori diamond comes with independent certification verifying cut, color, clarity, and carat weight.
                Each certificate includes a unique ID laser-inscribed on your diamond.
              </p>
              <div className="space-y-2 mb-4">
                {["Unique certificate number", "Diamond measurements and proportions", "4Cs grading with visual diagrams", "Laser inscription ID"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-sm text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="gap-2 whitespace-normal h-auto py-2 w-full md:w-auto md:whitespace-nowrap md:h-9 md:py-0">
                <Download className="w-4 h-4 shrink-0" />
                Download Sample Certificate
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Sourcing & Craftsmanship ── */
const SourcingSection = () => {
  const steps = [
    { icon: <Factory className="w-5 h-5" />, title: "Lab Creation", description: "CVD/HPHT growth in a controlled environment" },
    { icon: <ClipboardCheck className="w-5 h-5" />, title: "Quality Control", description: "IGI/GCal certification and grading" },
    { icon: <Palette className="w-5 h-5" />, title: "Studio Design", description: "Hand-set in 14K solid gold" },
    { icon: <Package className="w-5 h-5" />, title: "Packaging", description: "Sustainable luxury presentation" },
    { icon: <Truck className="w-5 h-5" />, title: "Delivery", description: "Insured shipping to your door" },
  ];

  const qualityChecks = [
    "Diamond grading verification against certificate",
    "Metal purity testing (14K gold stamping)",
    "Prong security and setting inspection",
    "Final polish and cleaning",
    "Packaging quality inspection",
  ];

  return (
    <section className="py-28 md:py-36 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">From lab to you</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">
            Sourcing &amp; <span className="noor-glow">Craftsmanship</span>
          </h2>
        </motion.div>

        {/* Horizontal timeline (desktop) / Vertical (mobile) */}
        <div className="relative mb-20">
          {/* Desktop horizontal connector line */}
          <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-accent/30" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex md:flex-col items-center md:text-center gap-5 md:gap-0 md:px-4"
              >
                {/* Circle node with icon */}
                <div className="shrink-0 w-10 h-10 rounded-full border-2 border-accent bg-background flex items-center justify-center relative z-10 md:mb-5">
                  <div className="text-accent">{step.icon}</div>
                </div>
                <div>
                  <h4 className="font-display text-lg md:text-xl text-foreground mb-1 md:mb-2">{step.title}</h4>
                  <p className="text-sm text-foreground/60 md:max-w-[160px] md:mx-auto">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto pt-16 border-t border-border/60"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-8 text-center">Quality Standard</p>
          <div className="space-y-4">
            {qualityChecks.map((check, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-display text-lg text-accent shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-foreground/60 leading-relaxed">{check}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Journey Node (Mission section) ── */
interface JourneyNodeProps { icon: React.ReactNode; title: string; description: string; accentColor: string; delay: number; isVisible: boolean; effect?: React.ReactNode; highlight?: boolean; }

const JourneyNode = ({ icon, title, description, delay, isVisible, effect, highlight }: JourneyNodeProps) => (
  <div className={`flex flex-col items-center transition-all duration-700 flex-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
    <div className={`relative p-5 rounded-full bg-background/60 backdrop-blur-sm border transition-all duration-500 ${highlight ? 'border-primary shadow-lg shadow-primary/30 scale-110' : 'border-primary/20'}`}>
      {icon}{effect}
    </div>
    <h4 className={`text-lg font-serif mt-4 mb-2 transition-colors duration-500 ${highlight ? 'text-primary' : ''}`}>{title}</h4>
    <p className="text-sm text-muted-foreground text-center max-w-[180px]">{description}</p>
  </div>
);

const MineEffect = () => (<div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-600/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} /></div>);
const InterventionEffect = () => (<div className="absolute -top-1 -right-1"><div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" /></div>);
const SchoolEffect = () => (<div className="absolute -bottom-1 left-1/2 -translate-x-1/2"><div className="flex gap-0.5">{[...Array(3)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 bg-green-500/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms`, animationDuration: '1.5s' }} />))}</div></div>);
const FutureEffect = ({ active }: { active: boolean }) => (<div className={`absolute inset-0 rounded-full transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}><div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />{[...Array(6)].map((_, i) => (<div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-ping" style={{ top: `${20 + Math.random() * 60}%`, left: `${20 + Math.random() * 60}%`, animationDelay: `${i * 200}ms`, animationDuration: '1.5s' }} />))}</div>);

export default About;
