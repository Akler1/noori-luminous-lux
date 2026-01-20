import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
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
    <section className="py-20 bg-gradient-hero light-particles">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal-up">
            <h2 className="display-text mb-6">
              First to the <span className="noor-glow">Light</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our inner circle for early access to new collections, 
              behind-the-scenes stories, and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="reveal-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-accent"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-hero group"
              >
                {isSubmitting ? (
                  "Joining..."
                ) : (
                  <>
                    Join
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};