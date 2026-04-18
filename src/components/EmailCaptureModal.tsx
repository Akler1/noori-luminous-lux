import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { subscribeToKlaviyo } from "@/lib/klaviyo";
import { klaviyoIdentify } from "@/lib/klaviyo-tracking";

export const EmailCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Show modal after user has been on site for 30 seconds or scrolled significantly
  useEffect(() => {
    // Check if modal was already shown in this session
    const modalShown = sessionStorage.getItem('noori-email-modal-shown');
    if (modalShown) {
      setHasShown(true);
      return;
    }

    let scrollTriggered = false;
    let timeTriggered = false;

    // Time-based trigger (30 seconds)
    const timeTimer = setTimeout(() => {
      timeTriggered = true;
      if (!hasShown && !scrollTriggered) {
        showModal();
      }
    }, 30000);

    // Scroll-based trigger (50% of page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && !scrollTriggered && !timeTriggered && !hasShown) {
        scrollTriggered = true;
        showModal();
      }
    };

    // Exit intent trigger (mouse leaving viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !scrollTriggered && !timeTriggered) {
        showModal();
      }
    };

    const showModal = () => {
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem('noori-email-modal-shown', 'true');
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await subscribeToKlaviyo({ email, source: "Website Popup" });

      // Cookie-tie this email to their Klaviyo profile so all future
      // behavior (Viewed Product, Added to Cart, etc.) attaches to them
      klaviyoIdentify(email);

      toast.success("Welcome to Noori! Check your inbox for a confirmation.", {
        duration: 5000,
      });

      setEmail("");
      setIsOpen(false);
      localStorage.setItem('noori-newsletter-subscriber', 'true');

      // Fire analytics events — qualified lead in GA4, Meta Pixel, and TikTok
      window.gtag?.("event", "sign_up", { method: "email_popup" });
      window.fbq?.("track", "Lead", { content_name: "Email Capture Popup" });
      window.ttq?.track("SubmitForm", { content_name: "Email Capture Popup" });
    } catch (error) {
      console.error("Klaviyo subscribe error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't show if user is already subscribed
  const isSubscribed = localStorage.getItem('noori-newsletter-subscriber');
  if (isSubscribed) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-background via-background/95 to-accent/5 backdrop-blur-md shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative overflow-hidden"
        >

          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-noor opacity-20 blur-3xl" />
          
          {/* Content */}
          <div className="relative space-y-6 p-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-gradient-noor rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-foreground" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="font-display text-2xl font-normal">
                  First to the <span className="noor-glow">Light</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Join our inner circle for early access to new collections, 
                  exclusive offers, and behind-the-scenes stories.
                </p>
              </motion.div>
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span>Early access to new capsule releases</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span>Exclusive member pricing & offers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span>Behind-the-scenes jewelry creation stories</span>
              </div>
            </motion.div>

            {/* Email Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background/50 border-accent/20 focus:border-accent focus:bg-background"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full btn-hero group h-12"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Joining...</span>
                  </div>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-xs text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
                <br />
                By joining, you agree to our privacy policy.
              </p>
            </motion.div>
          </div>

          {/* Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent/30 rounded-full"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 400,
                  y: Math.random() * 300,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x: Math.random() * 400,
                  y: Math.random() * 300,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};