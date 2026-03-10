import { useEffect, useRef, useState, useCallback } from "react";
import { Gem, Sparkles, Crown } from "lucide-react";

const LABELS = [
  { title: "Main Stone", body: "Top 2% of stones. Colorless D-F, VS1+ clarity.", icon: Gem },
  { title: "Pavé Stones", body: "Hand-placed. Each inspected for symmetry and setting security.", icon: Sparkles },
  { title: "14k Gold Setting", body: "Solid 14k gold. Finished and polished to a high-jewellery standard.", icon: Crown },
];

const MOBILE_CONTENT = {
  header: "Crafted detail.",
  body: "Each Noori earring features a precision-set main stone surrounded by hand-placed pavé diamonds, secured on a solid 14k gold post.",
  chips: ["Main Stone", "Pavé Stones", "Earring Post"],
};

interface Props {
  basePath: string;
  frameCount: number;
  ext?: string;
  pad?: number;
  scrollVh?: number;
}

const ScrollImageSequence = ({
  basePath,
  frameCount,
  ext = "webp",
  pad = 4,
  scrollVh = 300,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const rafId = useRef(0);
  const [showCallouts, setShowCallouts] = useState(false);

  /* ── Preload all frames eagerly ── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${basePath}/frame_${String(i).padStart(pad, "0")}.${ext}`;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [basePath, frameCount, ext, pad]);

  /* ── Draw a frame to canvas ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    const isSmallMobile = window.innerWidth < 768;

    // Fill background — dark on mobile, light on desktop
    if (isSmallMobile) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
    }

    if (isSmallMobile) {
      // Mobile: Crop side background, then contain-fit
      const mobileCropLeft = 0.10;
      const mobileCropWidth = 0.80;
      const sx = img.naturalWidth * mobileCropLeft;
      const sw = img.naturalWidth * mobileCropWidth;
      const sy = 0;
      const sh = img.naturalHeight;
      const croppedRatio = sw / sh;
      if (croppedRatio > canvasRatio) {
        dw = w; dh = w / croppedRatio; dx = 0; dy = (h - dh) / 2;
      } else {
        dh = h; dw = h * croppedRatio; dx = (w - dw) / 2; dy = 0;
      }
      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    } else {
      // Desktop/tablet: fit to width, top-aligned, no whitespace gaps
      ctx.clearRect(0, 0, w, h);
      dw = w;
      dh = w / imgRatio;
      dx = 0;
      dy = 0;
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }, []);

  /* ── Position canvas into card on desktop ── */
  const positionCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas) return;

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop && card) {
      const rect = card.getBoundingClientRect();
      const sticky = canvas.parentElement;
      const stickyRect = sticky?.getBoundingClientRect();
      if (!stickyRect) return;

      canvas.style.position = "absolute";
      canvas.style.left = `${rect.left - stickyRect.left}px`;
      canvas.style.top = `${rect.top - stickyRect.top}px`;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.style.borderRadius = "1rem";
      canvas.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.15)";
    } else {
      canvas.style.position = "absolute";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.borderRadius = "0";
    }
  }, []);

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => {
      rafId.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const scrollRange = wrapper.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) return;

        const animationEnd = 0.6;
        const rawT = Math.min(1, Math.max(0, -rect.top / scrollRange));
        const t = Math.min(1, rawT / animationEnd);
        const idx = Math.round(t * (frameCount - 1));

        if (idx !== currentFrame.current) {
          currentFrame.current = idx;
          drawFrame(idx);
        }
        setShowCallouts(rawT >= animationEnd);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(() => {
      positionCanvas();
      drawFrame(0);
    }, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [frameCount, drawFrame, positionCanvas]);

  /* ── Resize handler ── */
  useEffect(() => {
    const onResize = () => {
      positionCanvas();
      drawFrame(currentFrame.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame, positionCanvas]);

  return (
    <div ref={wrapperRef} style={{ height: `${scrollVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full relative overflow-hidden bg-[#faf9f7]">
        {/* Single canvas — positioned dynamically */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[15] pointer-events-none" />

        {/* ── Desktop: Split grid layout ── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:p-10 lg:items-center absolute inset-0 z-10">
          {/* Left: Card placeholder that canvas aligns to */}
          <div
            ref={cardRef}
            className="rounded-2xl overflow-hidden bg-transparent relative w-full h-[70vh]"
          />

          {/* Right: Explanatory cards */}
          <div className="flex flex-col gap-5 max-w-sm mx-auto pointer-events-auto">
            {LABELS.map((label, idx) => (
              <div
                key={label.title}
                className="backdrop-blur-md bg-white/70 border border-white/40 rounded-xl p-5 text-center shadow-xl"
                style={{
                  opacity: showCallouts ? 1 : 0,
                  transform: `translateX(${showCallouts ? 0 : 30}px) scale(${showCallouts ? 1 : 0.95})`,
                  transition: `all 0.8s cubic-bezier(0.34,1.56,0.64,1) ${idx * 200}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <label.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-card-foreground/90">
                  {label.title}
                </h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed mt-2">
                  {label.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: bottom overlay ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-12 pt-24 bg-gradient-to-t from-black/60 to-transparent transition-all duration-700 lg:hidden"
          style={{
            opacity: showCallouts ? 1 : 0,
            transform: `translateY(${showCallouts ? 0 : 20}px)`,
          }}
        >
          <div className="max-w-2xl">
            <h2 className="section-header text-white mb-4">
              {MOBILE_CONTENT.header}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-lg">
              {MOBILE_CONTENT.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {MOBILE_CONTENT.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 text-xs text-white/90 border border-white/30 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollImageSequence;
