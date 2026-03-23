import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const FinalCTAForm = () => {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
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
    setInterest("");
    setIsSubmitting(false);
  };

  return (
    <section className="bg-background section-spacing border-t border-border/50">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Headline - echoes hero */}
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
            Brilliance, refined —
            <br />
            <span className="italic">in your inbox.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-muted-foreground text-lg mb-10">
            Join for exclusive previews, new arrivals, and members-only offers.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-medium"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {/* Optional dropdown */}
            <Select value={interest} onValueChange={setInterest}>
              <SelectTrigger className="w-full sm:w-auto sm:min-w-[240px] mx-auto bg-secondary border-border h-12">
                <SelectValue placeholder="What are you shopping for?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earrings">Earrings</SelectItem>
                <SelectItem value="necklaces">Necklaces</SelectItem>
                <SelectItem value="bracelets">Bracelets</SelectItem>
                <SelectItem value="rings">Rings</SelectItem>
                <SelectItem value="gifts">Gifts</SelectItem>
                <SelectItem value="just-browsing">Just browsing</SelectItem>
              </SelectContent>
            </Select>
          </form>

          {/* Privacy note */}
          <p className="text-muted-foreground text-xs mt-8">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
