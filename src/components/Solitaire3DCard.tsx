import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Star, Hand } from "lucide-react";

interface Solitaire3DCardProps {
  id: string;
  name: string;
  price: string;
  pdpUrl: string;
  iframeUrl?: string;
  glb?: string;
  rating: number;
  reviewCount: number;
}

export const Solitaire3DCard = ({
  name,
  price,
  pdpUrl,
  iframeUrl,
  glb,
  rating,
  reviewCount,
}: Solitaire3DCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const dismissHint = useCallback(() => setShowHint(false), []);

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  useEffect(() => {
    // Load model-viewer script if using GLB
    if (glb && !iframeUrl) {
      const existingScript = document.querySelector('script[src*="model-viewer"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";
        document.head.appendChild(script);
      }
    }
  }, [glb, iframeUrl]);

  return (
    <Link to={pdpUrl} className="group block">
        <div className="overflow-hidden">
        {/* 3D Viewer Container */}
        <div className="aspect-square relative bg-[#e8e8e8]" onPointerDown={dismissHint}>
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              onLoad={() => setIsLoaded(true)}
              title={name}
            />
          ) : glb ? (
            <model-viewer
              src={glb}
              alt={name}
              auto-rotate
              camera-controls
              disable-zoom
              style={{ width: "100%", height: "100%" }}
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No 3D model available
            </div>
          )}
          
          {/* Loading overlay */}
          {!isLoaded && (iframeUrl || glb) && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Drag hint overlay */}
          {showHint && isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700" style={{ opacity: showHint ? 1 : 0 }}>
              <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs">
                <Hand className="h-3.5 w-3.5" />
                Click & drag to rotate
              </div>
            </div>
          )}
          
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
          </div>
          
          {/* Name & Price */}
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-lg font-semibold text-foreground">{price}</p>
        </div>
      </div>
    </Link>
  );
};
