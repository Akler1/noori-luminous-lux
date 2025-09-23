import { Sparkles, Shield, Heart } from "lucide-react";

export const BrandStory = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Lab-Grown Excellence",
      description: "Identical to mined diamonds in every way that matters. Certified by leading gemological institutes.",
    },
    {
      icon: Shield,
      title: "Ethical & Responsible",
      description: "Zero environmental impact from mining. Traceable origin. Complete transparency in our process.",
    },
    {
      icon: Heart,
      title: "Beauty with Purpose",
      description: "Every purchase helps illuminate futures — supporting children affected by injustice worldwide.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Story Header */}
          <div className="text-center mb-16 reveal-up">
            <h2 className="display-text mb-6">
              Born from <span className="noor-glow">Light</span>
            </h2>
            <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
              <p className="text-xl leading-relaxed">
                Noori means light in Persian — the same light that creates diamonds deep within the earth, 
                now harnessed in our labs to craft modern heirlooms.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                We believe luxury shouldn't come at the expense of ethics or accessibility. 
                Our lab-grown diamonds offer the same brilliance, durability, and beauty as mined stones, 
                but at a fraction of the cost and environmental impact.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center reveal-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-noor rounded-full flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-foreground opacity-80" />
                </div>
                <h3 className="font-display text-xl font-normal mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};