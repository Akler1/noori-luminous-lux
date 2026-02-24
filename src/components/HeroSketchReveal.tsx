import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import heroReal from "@/assets/hero-real.png";
import heroSketch from "@/assets/hero-sketch.png";

interface HeroSketchRevealProps {
  className?: string;
}

// Calculate image offset for object-cover + object-position:right behavior
// Returns the offset so mask can use the same coordinate system
interface ImageOffset {
  x: number;
  y: number;
  width: number;
  height: number;
}

const calculateImageCoverRightOffset = (
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): ImageOffset => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  if (imgRatio > canvasRatio) {
    // Image is wider - crop from LEFT only (align right)
    const drawHeight = canvasHeight;
    const drawWidth = canvasHeight * imgRatio;
    return {
      x: canvasWidth - drawWidth, // Negative offset (crops from left)
      y: 0,
      width: drawWidth,
      height: drawHeight
    };
  } else {
    // Image is taller - crop top/bottom equally
    const drawWidth = canvasWidth;
    const drawHeight = canvasWidth / imgRatio;
    return {
      x: 0,
      y: (canvasHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight
    };
  }
};

// Shape generation utilities
const generateBlobPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) => {
  const points = 6 + Math.floor(Math.random() * 4);
  const angleStep = (Math.PI * 2) / points;
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  
  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const radiusVariance = 0.6 + Math.random() * 0.4;
    const r = (size / 2) * radiusVariance;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      // Use quadratic curves for organic feel
      const cpAngle = angle - angleStep / 2;
      const cpRadius = (size / 2) * (0.8 + Math.random() * 0.4);
      const cpx = Math.cos(cpAngle) * cpRadius;
      const cpy = Math.sin(cpAngle) * cpRadius;
      ctx.quadraticCurveTo(cpx, cpy, px, py);
    }
  }
  
  ctx.closePath();
  ctx.restore();
};

const generateShardPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) => {
  const points = 5 + Math.floor(Math.random() * 4);
  const angleStep = (Math.PI * 2) / points;
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  
  for (let i = 0; i < points; i++) {
    const angle = i * angleStep + (Math.random() - 0.5) * 0.3;
    const r = (size / 2) * (0.5 + Math.random() * 0.5);
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  
  ctx.closePath();
  ctx.restore();
};

export const HeroSketchReveal = ({ className = "" }: HeroSketchRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sketchImgRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastMoveTimeRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(false);
  const dprRef = useRef<number>(1);
  const imageOffsetRef = useRef<ImageOffset>({ x: 0, y: 0, width: 0, height: 0 });
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const isMobile = useIsMobile();
  
  // Initialize canvases and load images
  useEffect(() => {
    const sketchImg = new Image();
    sketchImg.src = heroSketch;
    
    sketchImg.onload = () => {
      sketchImgRef.current = sketchImg;
      setImagesLoaded(true);
    };
    
    // Create offscreen mask canvas with willReadFrequently for performance
    const maskCanvas = document.createElement("canvas");
    maskCanvasRef.current = maskCanvas;
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Handle canvas sizing - NO context scaling here
  const updateCanvasSize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    
    if (!container || !canvas || !maskCanvas) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    
    // Set canvas dimensions (internal resolution)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    // Set display size (CSS)
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Same for mask canvas
    maskCanvas.width = rect.width * dpr;
    maskCanvas.height = rect.height * dpr;
    
    // DO NOT scale context here - handle DPR in drawing functions
  }, []);
  
  useEffect(() => {
    if (!imagesLoaded) return;
    
    updateCanvasSize();
    
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, updateCanvasSize]);
  
  // Stamp shapes onto mask canvas - coordinates in CSS pixels
  const stampShapes = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    const maskCanvas = maskCanvasRef.current;
    
    if (!container || !maskCanvas) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = dprRef.current;
    
    // Convert client coordinates to canvas coordinates (scaled by DPR)
    // No offset adjustment needed - mask and sketch share the same canvas coordinate space
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!maskCtx) return;
    
    // Reset transform before drawing
    maskCtx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Stamp 3-7 random shapes
    const shapeCount = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < shapeCount; i++) {
      // Offsets and sizes scaled by DPR
      const offsetX = (Math.random() - 0.5) * 80 * dpr;
      const offsetY = (Math.random() - 0.5) * 80 * dpr;
      const size = (60 + Math.random() * 100) * dpr;
      const rotation = Math.random() * Math.PI * 2;
      
      // Soft blur effect via shadow (scaled by DPR)
      maskCtx.shadowBlur = 10 * dpr;
      maskCtx.shadowColor = "rgba(255, 255, 255, 0.8)";
      maskCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      
      // Randomly choose blob or shard
      if (Math.random() > 0.5) {
        generateBlobPath(maskCtx, x + offsetX, y + offsetY, size, rotation);
      } else {
        generateShardPath(maskCtx, x + offsetX, y + offsetY, size, rotation);
      }
      
      maskCtx.fill();
    }
    
    // Reset shadow
    maskCtx.shadowBlur = 0;
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const sketchImg = sketchImgRef.current;
    
    if (!canvas || !maskCanvas || !sketchImg) return;
    
    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    
    if (!ctx || !maskCtx) return;
    
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const rect = container.getBoundingClientRect();
      const dpr = dprRef.current;
      const canvasWidth = rect.width * dpr;
      const canvasHeight = rect.height * dpr;
      
      // Fade mask canvas
      const now = Date.now();
      const timeSinceMove = now - lastMoveTimeRef.current;
      const isIdle = timeSinceMove > 300;
      const fadeFactor = isIdle ? 0.96 : 0.99;
      
      // Apply fade by reducing alpha
      const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
      const data = imageData.data;
      
      let hasContent = false;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 1) {
          data[i] = Math.floor(data[i] * fadeFactor);
          hasContent = true;
        }
      }
      
      maskCtx.putImageData(imageData, 0, 0);
      
      // Only render if there's content to show
      if (hasContent || isActiveRef.current) {
        // Clear main canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate and store offset for mask alignment
        const offset = calculateImageCoverRightOffset(sketchImg, canvasWidth, canvasHeight);
        imageOffsetRef.current = offset;
        
        // Draw sketch image with same positioning as base image
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.85;
        ctx.drawImage(sketchImg, offset.x, offset.y, offset.width, offset.height);
        
        // Apply mask (destination-in keeps only where mask has alpha)
        ctx.globalCompositeOperation = "destination-in";
        ctx.globalAlpha = 1;
        ctx.drawImage(maskCanvas, 0, 0);
      } else {
        // Clear when nothing to show
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imagesLoaded]);
  
  // Pointer move handler
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    
    lastMoveTimeRef.current = Date.now();
    isActiveRef.current = true;
    
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowHint(false);
    }
    
    stampShapes(e.clientX, e.clientY);
  }, [isMobile, hasInteracted, stampShapes]);
  
  // Pointer enter handler
  const handlePointerEnter = useCallback(() => {
    if (isMobile) return;
    
    isActiveRef.current = true;
    
    if (!hasInteracted) {
      setShowHint(true);
      // Auto-hide hint after 1.5s
      setTimeout(() => setShowHint(false), 1500);
    }
  }, [isMobile, hasInteracted]);
  
  // Pointer leave handler
  const handlePointerLeave = useCallback(() => {
    isActiveRef.current = false;
  }, []);
  
  // Mobile tap handler
  const handleTap = useCallback(() => {
    if (!isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Reveal at center with multiple stamps
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * rect.width * 0.8;
        const offsetY = (Math.random() - 0.5) * rect.height * 0.8;
        stampShapes(centerX + offsetX, centerY + offsetY);
      }, i * 30);
    }
    
    lastMoveTimeRef.current = Date.now() + 1200; // Keep visible for 1.2s
  }, [isMobile, stampShapes]);
  
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleTap}
    >
      {/* Base layer: Real photo - object-right to crop from left */}
      <img
        src={heroReal}
        alt="Noori Solitaires Collection - Lab-grown diamond jewelry"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      
      {/* Sketch overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: "transform" }}
      />
      
      {/* Hint overlay */}
      {showHint && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-in">
            <span className="text-sm text-foreground/70 tracking-wide">
              Move to reveal the sketch
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
