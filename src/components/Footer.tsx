import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const footerLinks = {
    Shop: [
      { label: "All Products", href: "/collections/solitaires" },
      { label: "Solitaires", href: "/collections/solitaires" },
      { label: "Gift Cards", href: "#" },
    ],
    Support: [
      { label: "FAQ", href: "/faq" },
      { label: "Care Instructions", href: "/faq#care" },
      { label: "Shipping & Returns", href: "/faq#shipping" },
      { label: "Warranty", href: "/faq#warranty" },
      { label: "Contact Us", href: "/faq#contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/policies" },
      { label: "Terms of Service", href: "/policies" },
      { label: "Cookie Policy", href: "/policies" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl font-normal mb-4 noor-glow">
              Noori
            </h3>
            <p className="text-foreground/80 mb-6 max-w-md leading-relaxed">
              Light, made forever. Certified lab-grown diamonds that capture the brilliance of 
              nature without compromise. Modern heirlooms for conscious luxury.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-foreground hover:bg-foreground/10"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium mb-4 text-accent">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-foreground/60 text-sm">
              © 2024 Noori. All rights reserved. 
              <span className="ml-2">Made with light in Canada.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-foreground/60">Currency:</span>
              <Button variant="ghost" className="text-foreground hover:bg-foreground/10 px-3 py-1 h-auto">
                CAD $
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};