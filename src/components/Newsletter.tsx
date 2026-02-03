import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Welcome to Noori! You'll receive early access to our next capsule.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-16 left-1/4 opacity-15">
        <Sparkles className="w-10 h-10 text-accent" />
      </div>
      <div className="absolute bottom-16 right-1/4 opacity-15">
        <Sparkles className="w-8 h-8 text-accent" />
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="reveal-up">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Stay Connected
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6">
              First to the{" "}
              <span className="italic text-accent">Light</span>
            </h2>
            <p className="text-lg text-foreground/60 mb-10 leading-relaxed max-w-lg mx-auto">
              Join our inner circle for early access to new collections, 
              behind-the-scenes stories, and exclusive offers.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="reveal-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 bg-muted/30 border-border/50 focus:border-accent text-base px-5"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-medium group"
              >
                {isSubmitting ? (
                  "Joining..."
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-foreground/40 mt-6">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};