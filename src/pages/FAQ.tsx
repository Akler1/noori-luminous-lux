import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gem, Truck, RotateCcw, Shield, CreditCard, HelpCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqSections = [
    {
      id: "care",
      icon: <Gem className="w-5 h-5" />,
      title: "Care Instructions",
      questions: [
        {
          q: "How do I clean my lab-grown diamond jewelry?",
          a: "Clean your jewelry with warm water, mild dish soap, and a soft brush. Gently scrub to remove oils and dirt, then rinse thoroughly and pat dry with a lint-free cloth. For a deeper clean, you can use an ultrasonic cleaner at home."
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
          a: "We recommend having your jewelry professionally inspected by a local jeweler every 6-12 months to check prong security and overall condition. This helps ensure your pieces remain secure and beautiful for years to come."
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
          a: "We offer a 30-day return policy for unworn items in original condition with all packaging."
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
          a: "Yes, we offer repair services for a reasonable fee. This includes re-polishing and prong re-tipping. Contact us for a quote."
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
      icon: <Gem className="w-5 h-5" />,
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
      id: "general",
      icon: <HelpCircle className="w-5 h-5" />,
      title: "General Questions",
      questions: [
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Frequently Asked <span className="noor-glow">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers about our products, shipping, care instructions, and more.
            </p>
          </motion.div>
        </section>

        {/* Quick Reference Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 pb-16"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-luxury p-6 text-center">
              <Truck className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On all orders</p>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <RotateCcw className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">Full refund or exchange</p>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Shield className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Lifetime Warranty</h3>
              <p className="text-sm text-muted-foreground">Against manufacturing defects</p>
            </div>
            
            <div className="card-luxury p-6 text-center">
              <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Ethical Sourcing</h3>
              <p className="text-sm text-muted-foreground">Lab-grown & responsible</p>
            </div>
          </div>
        </motion.section>

        {/* FAQ Accordion Section */}
        <section className="py-16 px-4 bg-secondary/30" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqSections.map((section, sectionIndex) => (
                <motion.div 
                  key={section.id} 
                  id={section.id} 
                  className="scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-serif">{section.title}</h3>
                  </div>
                  
                  <Accordion type="single" collapsible className="border border-border/50 rounded-xl overflow-hidden bg-background/50">
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
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div 
              id="contact" 
              className="mt-16 text-center p-8 bg-secondary rounded-2xl scroll-mt-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
