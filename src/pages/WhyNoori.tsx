import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, breadcrumbs } from "@/components/JsonLd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WhyNoori = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Contact Noori | Lab-Grown Diamond Jewelry Support"
        description="Questions about Noori's lab-grown diamond jewelry? Reach out to our team — we're here to help with sizing, orders, and custom requests."
        path="/why-noori"
      />
      <JsonLd data={breadcrumbs([{ name: "Home", url: "/" }, { name: "Contact", url: "/why-noori" }])} />
      <Header />

      <main className="pt-28 md:pt-36">
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-serif mb-4">
                Contact <span className="noor-glow">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  rows={5}
                  maxLength={1000}
                />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={sending}>
                <Send className="w-4 h-4" />
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 pt-12 border-t border-border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Mail className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">hello@noori.com</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Clock className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyNoori;
