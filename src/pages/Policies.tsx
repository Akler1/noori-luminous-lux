import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Truck, RotateCcw, Shield, Heart, Package, Clock, MapPin, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Policies = () => {
  const shippingInfo = [
    { region: "Canada", time: "2-3 business days", cost: "Free over CAD $150", icon: MapPin },
    { region: "United States", time: "5-7 business days", cost: "CAD $25", icon: MapPin },
    { region: "International", time: "7-14 business days", cost: "Calculated at checkout", icon: MapPin },
  ];

  const careInstructions = [
    "Clean with warm soapy water and a soft brush",
    "Dry thoroughly with a lint-free cloth",
    "Store in individual pouches to prevent scratching",
    "Avoid exposure to harsh chemicals and perfumes",
    "Professional cleaning recommended annually"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-normal mb-6">
              Policies & Support
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about shipping, returns, care, and our commitments to you.
            </p>
          </motion.div>

          {/* Quick Reference Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="card-luxury p-6 text-center">
              <Truck className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-medium mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over CAD $150</p>
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
          </motion.div>

          {/* Detailed Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              
              {/* Shipping Policy */}
              <AccordionItem value="shipping" className="card-luxury p-6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-accent" />
                    <span className="font-medium">Shipping & Delivery</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div>
                    <h4 className="font-medium mb-3">Shipping Regions & Times</h4>
                    <div className="space-y-3">
                      {shippingInfo.map((info) => (
                        <div key={info.region} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <info.icon className="h-4 w-4 text-accent" />
                            <span className="font-medium">{info.region}</span>
                          </div>
                          <div className="text-right text-sm">
                            <div>{info.time}</div>
                            <div className="text-muted-foreground">{info.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Processing Time</h4>
                    <p className="text-muted-foreground">
                      All orders are processed within 1-2 business days. You'll receive a tracking 
                      number via email once your order ships. Custom engraving adds an additional 
                      2-3 business days to processing time.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Packaging</h4>
                    <p className="text-muted-foreground">
                      Every piece arrives in our signature packaging, perfect for gifting. 
                      Orders over CAD $200 include a complimentary jewelry pouch.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Returns & Exchanges */}
              <AccordionItem value="returns" className="card-luxury p-6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-accent" />
                    <span className="font-medium">Returns & Exchanges</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium mb-3">30-Day Return Policy</h4>
                    <p className="text-muted-foreground mb-4">
                      We want you to love your Noori jewelry. If you're not completely satisfied, 
                      return your purchase within 30 days for a full refund or exchange.
                    </p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Return Conditions:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Items must be in original condition</li>
                        <li>• Include all original packaging and documentation</li>
                        <li>• Custom/engraved items are final sale</li>
                        <li>• Return shipping is free within Canada</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">How to Return</h4>
                    <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Email us at returns@noori.com with your order number</li>
                      <li>We'll send you a prepaid return label</li>
                      <li>Package your items securely</li>
                      <li>Drop off at any Canada Post location</li>
                      <li>Refund processed within 5-7 business days</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Care & Warranty */}
              <AccordionItem value="care" className="card-luxury p-6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent" />
                    <span className="font-medium">Care & Warranty</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div>
                    <h4 className="font-medium mb-3">Lifetime Warranty</h4>
                    <p className="text-muted-foreground mb-4">
                      Every Noori piece comes with a lifetime warranty against manufacturing defects. 
                      This covers issues with craftsmanship, not normal wear and tear.
                    </p>
                    
                    <Badge variant="secondary" className="mb-4">
                      Warranty Registration: Automatic with purchase
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Care Instructions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-3">Daily Care</h5>
                        <ul className="space-y-2">
                          {careInstructions.map((instruction, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Professional Services</h5>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-accent" />
                            <span>Annual cleaning recommended</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Package className="h-4 w-4 text-accent" />
                            <span>Free cleaning for first year</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Shield className="h-4 w-4 text-accent" />
                            <span>Repair services available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Payment & Security */}
              <AccordionItem value="payment" className="card-luxury p-6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-accent" />
                    <span className="font-medium">Payment & Security</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium mb-3">Accepted Payment Methods</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {['Visa', 'Mastercard', 'American Express', 'PayPal'].map((method) => (
                        <div key={method} className="bg-muted/30 p-3 rounded-lg text-center text-sm">
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Security & Privacy</h4>
                    <p className="text-muted-foreground">
                      All transactions are secured with 256-bit SSL encryption. We never store 
                      your payment information. Your personal data is protected according to 
                      Canadian privacy laws.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Currency</h4>
                    <p className="text-muted-foreground">
                      All prices are displayed in Canadian Dollars (CAD). International customers 
                      will see converted prices at checkout based on current exchange rates.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Contact & Support */}
              <AccordionItem value="contact" className="card-luxury p-6">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-accent" />
                    <span className="font-medium">Contact & Support</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Get in Touch</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong>Email:</strong> hello@noori.com
                        </div>
                        <div>
                          <strong>Phone:</strong> 1-800-NOORI-CA
                        </div>
                        <div>
                          <strong>Hours:</strong> Mon-Fri 9AM-6PM EST
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Response Times</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>Email: Within 24 hours</div>
                        <div>Phone: Immediate during business hours</div>
                        <div>Returns: 2-3 business days</div>
                        <div>Warranty claims: 5-7 business days</div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;