import { cn } from "@/lib/utils";

interface FacetPlaceholderProps {
  className?: string;
  variant?: "diamond" | "facet" | "minimal";
}

export const FacetPlaceholder = ({ 
  className, 
  variant = "diamond" 
}: FacetPlaceholderProps) => {
  return (
    <div
      className={cn(
        "relative w-full min-h-[400px] rounded-3xl overflow-hidden",
        "bg-gradient-to-br from-card to-card/80",
        "border border-[hsl(45,70%,50%,0.15)]",
        "shadow-elegant",
        "group",
        className
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(45 70% 50% / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Diamond facet SVG */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full p-12 md:p-16"
        preserveAspectRatio="xMidYMid meet"
      >
        {variant === "diamond" && (
          <>
            {/* Outer diamond shape */}
            <path
              d="M100 20 L170 70 L145 170 L55 170 L30 70 Z"
              className="facet-line"
              style={{ animationDelay: "0s" }}
            />
            {/* Top internal lines */}
            <path
              d="M100 20 L100 90"
              className="facet-line"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M30 70 L170 70"
              className="facet-line"
              style={{ animationDelay: "0.6s" }}
            />
            {/* Side facets */}
            <path
              d="M100 20 L55 170"
              className="facet-line"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              d="M100 20 L145 170"
              className="facet-line"
              style={{ animationDelay: "1.2s" }}
            />
            {/* Internal cross lines */}
            <path
              d="M30 70 L100 90 L170 70"
              className="facet-line"
              style={{ animationDelay: "1.5s" }}
            />
            <path
              d="M100 90 L100 170"
              className="facet-line"
              style={{ animationDelay: "1.8s" }}
            />
            {/* Lower facets */}
            <path
              d="M55 170 L100 90 L145 170"
              className="facet-line"
              style={{ animationDelay: "2.1s" }}
            />
          </>
        )}

        {variant === "facet" && (
          <>
            {/* Geometric facet pattern */}
            <path d="M100 30 L160 80 L140 160 L60 160 L40 80 Z" className="facet-line" style={{ animationDelay: "0s" }} />
            <path d="M100 30 L100 160" className="facet-line" style={{ animationDelay: "0.4s" }} />
            <path d="M40 80 L160 80" className="facet-line" style={{ animationDelay: "0.8s" }} />
            <path d="M60 160 L100 80 L140 160" className="facet-line" style={{ animationDelay: "1.2s" }} />
          </>
        )}

        {variant === "minimal" && (
          <>
            {/* Simple diamond outline */}
            <path d="M100 40 L150 100 L100 160 L50 100 Z" className="facet-line" style={{ animationDelay: "0s" }} />
            <path d="M50 100 L150 100" className="facet-line" style={{ animationDelay: "0.5s" }} />
            <path d="M100 40 L100 160" className="facet-line" style={{ animationDelay: "1s" }} />
          </>
        )}
      </svg>

      {/* Hover shimmer overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, hsl(45 70% 50% / 0.05) 50%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};
