import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { ShopifyVariant } from "@/types/shopify";
import { motion } from "framer-motion";

// Declare model-viewer type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface ThreeDViewerProps {
  variant: ShopifyVariant | null;
  className?: string;
  autoRotate?: boolean;
}

export const ThreeDViewer = ({ 
  variant, 
  className = "",
  autoRotate = false 
}: ThreeDViewerProps) => {
  const modelViewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load model-viewer script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError('Failed to load 3D viewer');
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);



  // Check for iframe URL first, then fall back to 3D model
  const iframeUrl = variant?.iframeUrl;
  const modelUrl = variant?.model3d || '/models/placeholder-diamond.glb';
  const hasModel = variant?.model3d || variant?.iframeUrl;

  if (error) {
    return (
      <div className={`bg-muted/10 rounded-xl p-8 text-center border-2 border-dashed border-muted/30 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 bg-destructive/20 rounded-full flex items-center justify-center">
          <Eye className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-muted-foreground mb-2">3D Viewer Error</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!isLoaded || !hasModel) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-muted/10 rounded-xl p-8 text-center border-2 border-dashed border-muted/30 ${className}`}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-accent/40 rounded-full animate-pulse" />
        </div>
        <p className="text-muted-foreground mb-2">3D Viewer</p>
        <p className="text-sm text-muted-foreground">
          {!isLoaded ? "Loading 3D viewer..." : "Rotate and zoom to explore every detail"}
        </p>
        {!hasModel && (
          <p className="text-xs text-muted-foreground mt-2 opacity-70">
            3D model coming soon for this variant
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl overflow-hidden shadow-elegant ${className}`}
    >
      {/* 3D Viewer - Iframe or Model Viewer */}
      {iframeUrl ? (
        <iframe
          ref={modelViewerRef}
          src={iframeUrl}
          title={`3D viewer of ${variant?.title}`}
          className="w-full border-0"
          style={{
            width: '100%',
            aspectRatio: '1 / 1.12',
            border: 'none',
            backgroundColor: 'transparent'
          }}
          allow="xr-spatial-tracking; accelerometer; gyroscope"
          allowFullScreen
        />
      ) : (
        <model-viewer
          ref={modelViewerRef}
          src={modelUrl}
          alt={`3D model of ${variant?.title}`}
          auto-rotate={autoRotate}
          camera-controls
          touch-action="pan-y"
          environment-image="/hdris/studio.hdr"
          exposure="1"
          shadow-intensity="1"
          camera-orbit="0deg 75deg 105%"
          min-camera-orbit="auto auto 50%"
          max-camera-orbit="auto auto 200%"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            backgroundColor: 'transparent'
          }}
          className="w-full h-full"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError('Failed to load 3D model')}
        />
      )}



      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
          <div className="text-sm font-medium">{variant?.title}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {iframeUrl
              ? "Click and drag to rotate"
              : "Click and drag to rotate • Scroll to zoom • Double-click to reset"}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <div className="text-sm text-muted-foreground">Loading 3D model...</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};