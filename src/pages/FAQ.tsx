import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mountain, HeartHandshake, GraduationCap, Sparkles, Gem, Truck, RotateCcw, Shield, CreditCard, HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
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

  const faqSections = [
    {
      id: "care",
      icon: <Gem className="w-5 h-5" />,
      title: "Care Instructions",
      questions: [
        {
          q: "How do I clean my lab-grown diamond jewelry?",
          a: "Clean your jewelry with warm water, mild dish soap, and a soft brush. Gently scrub to remove oils and dirt, then rinse thoroughly and pat dry with a lint-free cloth. For a deeper clean, you can use an ultrasonic cleaner or bring it to us for professional cleaning."
        },
        {
          q: "How should I store my jewelry?",
          a: "Store each piece separately in a soft pouch or lined jewelry box to prevent scratching. Keep away from extreme temperatures and humidity. Remove jewelry before swimming, exercising, or applying lotions and perfumes."
        },
        {
          q: "Can I wear my jewelry every day?",
          a: "Lab-grown diamonds are just as durable as mined diamonds (10 on the Mohs scale), making them perfect for everyday wear. However, we recommend removing jewelry during strenuous activities to prevent damage to the metal setting."
        },
        {
          q: "How often should I have my jewelry professionally inspected?",
          a: "We recommend having your jewelry professionally inspected every 6-12 months to check prong security and overall condition. This service is complimentary for all Noori customers."
        }
      ]
    },
    {
      id: "shipping",
      icon: <Truck className="w-5 h-5" />,
      title: "Shipping & Delivery",
      questions: [
        {
          q: "Where do you ship to?",
          a: "We currently ship to Canada and the United States. All orders are shipped with full insurance and require a signature upon delivery."
        },
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 5-7 business days within Canada and 7-10 business days to the US. Express shipping (2-3 business days) is available at checkout for an additional fee."
        },
        {
          q: "Is shipping free?",
          a: "Yes! We offer free standard shipping on all orders. Express shipping is available for $25 CAD."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard."
        },
        {
          q: "Do you offer gift wrapping?",
          a: "Yes! All Noori pieces come in our signature packaging at no extra cost. For special occasions, we offer premium gift wrapping with a personalized message card."
        }
      ]
    },
    {
      id: "returns",
      icon: <RotateCcw className="w-5 h-5" />,
      title: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for unworn items in original condition with all packaging. Custom or personalized pieces are final sale."
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our customer service team at hello@noori.com with your order number. We'll provide a prepaid return label and guide you through the process."
        },
        {
          q: "Can I exchange my jewelry for a different size or style?",
          a: "Absolutely! Exchanges are free within 30 days. If there's a price difference, we'll refund or charge accordingly."
        },
        {
          q: "How long do refunds take?",
          a: "Once we receive your return, refunds are processed within 5-7 business days. The refund will appear on your original payment method within 3-5 additional business days."
        }
      ]
    },
    {
      id: "warranty",
      icon: <Shield className="w-5 h-5" />,
      title: "Warranty",
      questions: [
        {
          q: "What does your warranty cover?",
          a: "Our lifetime warranty covers manufacturing defects, loose stones (when inspected annually), and structural integrity. Normal wear and tear, accidental damage, and alterations by third parties are not covered."
        },
        {
          q: "How do I make a warranty claim?",
          a: "Contact us at hello@noori.com with photos of the issue and your proof of purchase. We'll assess the damage and provide repair or replacement options."
        },
        {
          q: "Do you offer repairs for non-warranty issues?",
          a: "Yes, we offer repair services for a reasonable fee. This includes ring resizing, re-polishing, and prong re-tipping. Contact us for a quote."
        }
      ]
    },
    {
      id: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer interest-free installments through Affirm."
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. All transactions are encrypted with SSL technology and processed through PCI-compliant payment gateways. We never store your full credit card information."
        },
        {
          q: "Do you offer financing options?",
          a: "Yes! Through our partnership with Affirm, you can split your purchase into 4 interest-free payments or longer financing terms. Check eligibility at checkout."
        },
        {
          q: "What currency are prices listed in?",
          a: "All prices are listed in Canadian Dollars (CAD). Currency conversion is handled automatically by your payment provider for international orders."
        }
      ]
    },
    {
      id: "diamonds",
      icon: <Sparkles className="w-5 h-5" />,
      title: "About Lab-Grown Diamonds",
      questions: [
        {
          q: "Are lab-grown diamonds real diamonds?",
          a: "Yes! Lab-grown diamonds are 100% real diamonds with the same chemical composition (pure carbon), crystal structure, and optical properties as mined diamonds. The only difference is their origin."
        },
        {
          q: "How are lab-grown diamonds made?",
          a: "We use the Chemical Vapor Deposition (CVD) method, where a diamond seed is placed in a chamber filled with carbon-rich gases. These gases are heated until carbon atoms crystallize on the seed, growing a diamond atom by atom."
        },
        {
          q: "Are lab-grown diamonds graded the same way?",
          a: "Yes, lab-grown diamonds are graded using the same 4Cs (Cut, Color, Clarity, Carat) by independent gemological laboratories like IGI and GCal. Each Noori diamond comes with a certification."
        },
        {
          q: "Why choose lab-grown over mined diamonds?",
          a: "Lab-grown diamonds offer the same beauty at 40-60% less cost, with significantly lower environmental impact. They're also 100% conflict-free and ethically produced."
        }
      ]
    },
    {
      id: "sizing",
      icon: <HelpCircle className="w-5 h-5" />,
      title: "General Questions",
      questions: [
        {
          q: "How do I find my ring size?",
          a: "We offer a free ring sizer kit that you can order from our website. Alternatively, visit any local jeweler for a professional sizing, or use our printable ring size guide."
        },
        {
          q: "Do you offer custom designs?",
          a: "Yes! We offer customization services for engagement rings and special pieces. Contact us to discuss your vision and we'll create something unique for you."
        },
        {
          q: "Can I see pieces in person before purchasing?",
          a: "While we're primarily online, we host pop-up events in major Canadian cities. Follow us on social media for announcements, or schedule a virtual consultation."
        },
        {
          q: "Do you offer gift cards?",
          a: "Yes! Digital gift cards are available in various denominations and never expire. They're delivered instantly via email and can be used on any purchase."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            Frequently Asked <span className="noor-glow">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers about our products, shipping, care instructions, and our mission to create positive change.
          </p>
        </section>

        {/* Impact/Mission Section */}
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
            {/* Mission Statement */}
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

            {/* CTA */}
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

          {/* Animations */}
          <style>{`
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
          `}</style>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 px-4" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-5">
                Have More <span className="noor-glow">Questions?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Browse our comprehensive FAQ sections below.
              </p>
            </div>

            <div className="space-y-8">
              {faqSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-serif">{section.title}</h3>
                  </div>
                  
                  <Accordion type="single" collapsible className="border border-border/50 rounded-xl overflow-hidden">
                    {section.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${section.id}-${index}`} className="border-b border-border/50 last:border-b-0">
                        <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div id="contact" className="mt-16 text-center p-8 bg-secondary rounded-2xl scroll-mt-32">
              <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:hello@noori.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Us
              </a>
            </div>
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

// Node Effects
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
    <div 
      className={`absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
    />
    
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
    
    <div 
      className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-primary/30 blur-sm transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ animation: active ? 'hopeShine 2s ease-in-out infinite' : 'none' }}
    />
  </div>
);

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

export default FAQ;
