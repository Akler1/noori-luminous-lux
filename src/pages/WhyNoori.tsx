import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Gem, 
  DollarSign, 
  Heart, 
  Microscope, 
  Sparkles, 
  Shield,
  ArrowRight,
  CheckCircle2,
  Factory,
  ClipboardCheck,
  Palette,
  Package,
  Truck,
  Leaf,
  Scale,
  FileCheck,
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WhyNoori = () => {
  const pillars = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Modern Heirlooms",
      description: "Timeless designs meant to be worn daily and passed down. Certified quality that holds meaning, not just value.",
      points: ["IGI/GCal certified diamonds", "14K solid gold settings", "Lifetime craftsmanship guarantee"]
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Bold Accessibility",
      description: "Lab-grown diamonds at 40-60% less than mined. Luxury that doesn't require a second mortgage.",
      points: ["Transparent pricing", "No inflated markups", "Real value, no sales games"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Quiet Ethics",
      description: "No mining, no conflict, no moralizing. Just responsible choices, transparently made.",
      points: ["100% conflict-free", "UNICEF partnership", "Traceable supply chain"]
    }
  ];

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

  const costBreakdown = [
    { label: "Materials (Diamond + Gold)", percentage: 45 },
    { label: "Craftsmanship", percentage: 20 },
    { label: "Certification", percentage: 10 },
    { label: "Packaging & Presentation", percentage: 10 },
    { label: "Noori Margin", percentage: 15 }
  ];

  const sustainabilityFacts = [
    { icon: <Factory className="w-5 h-5" />, fact: "Zero mining required" },
    { icon: <Shield className="w-5 h-5" />, fact: "100% conflict-free supply chain" },
    { icon: <FileCheck className="w-5 h-5" />, fact: "Traceable from lab to jewelry box" },
    { icon: <Leaf className="w-5 h-5" />, fact: "Lower carbon footprint than mined" }
  ];

  const faqItems = [
    {
      question: "Are lab diamonds 'fake'?",
      answer: "No. Lab-grown diamonds are chemically, optically, and physically identical to mined diamonds. They're made of pure carbon with the same crystal structure. The only difference is origin—one comes from the earth, one from a lab. Both are real diamonds."
    },
    {
      question: "Will lab diamonds hold value?",
      answer: "Diamonds—mined or lab-grown—are meant to be worn and cherished, not invested. That said, lab diamonds hold their beauty forever. Unlike mined diamonds that have artificially controlled supply, lab diamonds are priced fairly based on actual production costs."
    },
    {
      question: "How can I verify my diamond is real?",
      answer: "Every Noori diamond comes with IGI or GCal certification—independent gemological laboratories that verify cut, color, clarity, and carat. You can verify your certificate number on their websites. The diamond itself is laser-inscribed with its unique ID."
    },
    {
      question: "Why are lab diamonds cheaper?",
      answer: "No mining infrastructure, shorter supply chain, no middlemen, and no artificial scarcity. The cost savings go directly to you—not into excavation equipment or conflict-zone operations."
    },
    {
      question: "Can jewelers tell the difference?",
      answer: "Not without specialized equipment. Lab diamonds have the same refractive index, hardness (10 on Mohs scale), and thermal conductivity as mined diamonds. Even experienced jewelers cannot distinguish them by eye."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 md:pt-36">
        {/* Hero Header */}
        <section className="py-16 md:py-24 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Light, luxury, <span className="noor-glow">legacy.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The Noori way of making jewelry.
            </p>
          </motion.div>
        </section>

        {/* Three Pillar Grid */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-luxury p-8"
                >
                  <div className="text-accent mb-4">{pillar.icon}</div>
                  <h3 className="text-2xl font-serif mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground mb-6">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab-Grown Diamonds Section */}
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

            {/* 4Cs Comparison */}
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
                  
                  {/* Visual Grade Scale */}
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

            {/* Certification Sample */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card-luxury p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-32 bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                    <FileCheck className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
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

        {/* Sourcing & Craftsmanship */}
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

            {/* Supply Chain Diagram */}
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
                    {index < supplyChainSteps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-accent/50 mt-4 hidden md:block rotate-0 md:rotate-0 absolute right-0 top-1/2 -translate-y-1/2" />
                    )}
                  </motion.div>
                ))}
              </div>
              {/* Connecting lines for desktop */}
              <div className="hidden md:flex justify-between items-center px-16 -mt-12 pointer-events-none">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-1 h-0.5 bg-gradient-to-r from-accent/20 to-accent/20 mx-2" />
                ))}
              </div>
            </div>

            {/* Quality Control Checklist */}
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

        {/* Pricing Transparency */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Pricing <span className="noor-glow">Transparency</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Where your money actually goes. No hidden markups.
              </p>
            </motion.div>

            {/* Cost Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-luxury p-8 mb-8"
            >
              <div className="space-y-4">
                {costBreakdown.map((item, index) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground font-medium">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Margin Philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground italic"
            >
              "We believe in fair pricing. No inflated markups, no sales that imply original prices were padded. Just honest value."
            </motion.p>
          </div>
        </section>

        {/* Sustainability & Ethics */}
        <section className="py-20 px-4 bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Sustainability & <span className="noor-glow">Ethics</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {sustainabilityFacts.map((item, index) => (
                <motion.div
                  key={item.fact}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-luxury p-4 text-center"
                >
                  <div className="text-accent mb-2 flex justify-center">{item.icon}</div>
                  <p className="text-sm text-muted-foreground">{item.fact}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to="/policies#mission">
                <Button variant="outline" className="gap-2">
                  Learn about our UNICEF partnership
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Common Questions About <span className="noor-glow">Lab Diamonds</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="card-luxury border-none px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <span className="text-base font-medium">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyNoori;