import { Instagram } from "lucide-react";

const socialPosts = [
  {
    id: 1,
    username: "@sarah.style",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=750&fit=crop&crop=center",
  },
  {
    id: 2,
    username: "@emilywears",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop&crop=center",
  },
  {
    id: 3,
    username: "@jenniferk",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=750&fit=crop&crop=center",
  },
  {
    id: 4,
    username: "@luxe.anna",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop&crop=center",
  },
  {
    id: 5,
    username: "@diamonds.daily",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop&crop=center",
  },
  {
    id: 6,
    username: "@jewelry.muse",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=750&fit=crop&crop=center",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 reveal-up">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            #NooriJewelry
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-4">
            Worn by You
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto">
            Real moments. Real brilliance. Join our community of diamond lovers.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {socialPosts.map((post, index) => (
            <div
              key={post.id}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer reveal-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Customer wearing Noori jewelry - ${post.username}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Instagram className="h-8 w-8 text-accent mb-3" />
                <span className="text-foreground font-medium">
                  {post.username}
                </span>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 reveal-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="https://instagram.com/noorijewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors group"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">Follow @noorijewelry</span>
          </a>
        </div>
      </div>
    </section>
  );
};
