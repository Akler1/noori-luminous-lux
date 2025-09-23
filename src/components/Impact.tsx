import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";

export const Impact = () => {
  const impactStats = [
    {
      icon: Heart,
      number: "500+",
      label: "Children Supported",
      description: "Direct assistance to children affected by injustice",
    },
    {
      icon: Globe,
      number: "12",
      label: "Countries Reached",
      description: "Global partnerships supporting vulnerable communities",
    },
    {
      icon: Users,
      number: "5,000+",
      label: "Families Helped",
      description: "Families receiving educational and healthcare support",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal-up">
            <h2 className="display-text mb-6">
              Beauty with <span className="noor-glow">Purpose</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Every Noori purchase helps illuminate futures. We dedicate a portion of our proceeds 
              to supporting children affected by injustice worldwide, partnering with organizations 
              that provide education, healthcare, and hope.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center reveal-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="font-display text-4xl font-normal mb-2 text-accent">
                  {stat.number}
                </div>
                <h3 className="text-lg font-medium mb-2">{stat.label}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center reveal-up">
            <p className="text-lg text-primary-foreground/80 mb-6">
              "When you choose Noori, you're not just choosing beautiful jewelry — 
              you're choosing to be part of something bigger."
            </p>
            <Button 
              variant="outline" 
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary group"
            >
              Learn About Our Partners
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};