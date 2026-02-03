import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Welcome to the light.", {
      description: "You'll be the first to know about new collections.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Decorative sparkles */}
      <div className="absolute top-16 left-1/4 opacity-20">
        <Sparkles className="w-6 h-6 text-accent" />
      </div>
      <div className="absolute bottom-16 right-1/4 opacity-20">
        <Sparkles className="w-8 h-8 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            First to the <span className="italic text-accent">Light</span>
          </h2>

          {/* Subheadline */}
          <p className="text-foreground/60 text-lg mb-10 max-w-md mx-auto">
            Join our inner circle for exclusive previews, new arrivals, and members-only offers.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary border-border focus:border-accent text-foreground placeholder:text-muted-foreground h-12 px-5"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-medium tracking-wide"
            >
              {isSubmitting ? "Joining..." : "Join"}
            </Button>
          </form>

          {/* Privacy note */}
          <p className="text-muted-foreground text-xs mt-6">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
