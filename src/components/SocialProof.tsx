import { Instagram } from "lucide-react";

const socialPosts = [
  {
    id: 1,
    username: "@sarah.style",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 2,
    username: "@emilywears",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 3,
    username: "@jenniferk",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 4,
    username: "@luxe.anna",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop&crop=center",
  },
  {
    id: 5,
    username: "@diamonds.daily",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop&crop=center",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 reveal-up">
          <div className="flex items-center justify-center gap-2 text-accent mb-2">
            <Instagram className="h-5 w-5" />
            <span className="text-sm font-medium tracking-widest uppercase">
              #NooriJewelry
            </span>
          </div>
          <p className="text-foreground/60 text-sm">
            Join our community of diamond lovers
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {socialPosts.map((post, index) => (
            <div
              key={post.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer reveal-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Customer wearing Noori jewelry - ${post.username}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Instagram className="h-6 w-6 text-foreground mb-2" />
                <span className="text-foreground text-sm font-medium">
                  {post.username}
                </span>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-accent/50 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 reveal-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="https://instagram.com/noorijewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors text-sm"
          >
            <span>Follow us @noorijewelry</span>
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
