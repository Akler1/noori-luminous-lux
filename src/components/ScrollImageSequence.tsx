import { useEffect, useRef, useState, useCallback } from "react";
import { Gem, Sparkles, Crown, ChevronDown } from "lucide-react";

const SPECS = [
  {
    num: "01",
    icon: Gem,
    title: "Main Stone",
    body: "Top 2% globally. Colorless D–F, VS1+ clarity, ideal cut.",
    threshold: 0.25,
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Pavé Diamonds",
    body: "Hand-placed. Each inspected for symmetry and setting security.",
    threshold: 0.50,
  },
  {
    num: "03",
    icon: Crown,
    title: "14k Gold Setting",
    body: "Solid 14k gold. Cast, finished, and polished to high-jewellery standard.",
    threshold: 0.75,
  },
];

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
  // Desktop canvas (inside the split-left column)
  const desktopCanvasRef = useRef<HTMLCanvasElement>(null);
  // Mobile canvas (full-screen, hidden on lg+)
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const rafId = useRef(0);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSpec1, setShowSpec1] = useState(false);
  const [showSpec2, setShowSpec2] = useState(false);
  const [showSpec3, setShowSpec3] = useState(false);

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

  /* ── Draw a frame to the correct canvas ── */
  const drawFrame = useCallback((index: number) => {
    // Pick the active canvas — desktop if it has layout width, else mobile
    const canvas = (desktopCanvasRef.current?.clientWidth ?? 0) > 0
      ? desktopCanvasRef.current
      : mobileCanvasRef.current;
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
    ctx.fillStyle = "#f5f0e8";
    ctx.fillRect(0, 0, w, h);

    const isMobile = window.innerWidth < 1024;

    // Crop 10% from left and right for centered framing
    const sx = img.naturalWidth * 0.10;
    const sw = img.naturalWidth * 0.80;
    const croppedRatio = sw / img.naturalHeight;
    const canvasRatio = w / h;

    let dw: number, dh: number, dx: number, dy: number;

    if (isMobile) {
      // Mobile: cover — fill width
      if (croppedRatio > canvasRatio) {
        dh = h; dw = h * croppedRatio; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = w / croppedRatio; dx = 0; dy = (h - dh) / 2;
      }
    } else {
      // Desktop: cover — fill the canvas column, crop overflow
      if (croppedRatio > canvasRatio) {
        dh = h; dw = h * croppedRatio; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = w / croppedRatio; dx = 0; dy = (h - dh) / 2;
      }
    }
    ctx.drawImage(img, sx, 0, sw, img.naturalHeight, dx, dy, dw, dh);
  }, []);

  /* ── Draw first frame as soon as it decodes ── */
  useEffect(() => {
    const first = imagesRef.current[0];
    if (!first) return;
    first.decode?.().then(() => drawFrame(0)).catch(() => {});
  }, [drawFrame]);

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => {
      rafId.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const scrollRange = wrapper.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) return;

        // Animation completes at 85% of scroll, leaving 15% for user to linger on final frame
        const animationEnd = 0.85;
        const rawT = Math.min(1, Math.max(0, -rect.top / scrollRange));
        const t = Math.min(1, rawT / animationEnd);
        const idx = Math.round(t * (frameCount - 1));

        if (rawT > 0.02) setHasScrolled(true);

        if (idx !== currentFrame.current) {
          currentFrame.current = idx;
          drawFrame(idx);
        }

        setShowSpec1(rawT >= SPECS[0].threshold);
        setShowSpec2(rawT >= SPECS[1].threshold);
        setShowSpec3(rawT >= SPECS[2].threshold);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [frameCount, drawFrame]);

  /* ── Resize handler ── */
  useEffect(() => {
    const onResize = () => drawFrame(currentFrame.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  const specVisible = [showSpec1, showSpec2, showSpec3];

  return (
    <div ref={wrapperRef} style={{ height: `${scrollVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* ─────────────────────────────────────────────────
            Desktop: split layout — canvas left, specs right
        ───────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center h-full">

          {/* Left: earring canvas — takes all space left of the specs panel */}
          <div className="relative flex-1 h-[calc(100%-4rem)] min-w-0">
            <canvas ref={desktopCanvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Right: sequential spec items */}
          <div className="w-[320px] xl:w-[380px] shrink-0 flex flex-col justify-center gap-10 pl-8 pr-10 xl:pl-10 xl:pr-14 h-full bg-background">

            {/* Section eyebrow */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/55 -mb-4">
              What goes into every Noori
            </p>

            {SPECS.map((spec, i) => {
              const visible = specVisible[i];
              return (
                <div
                  key={spec.title}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: `translateX(${visible ? 0 : 18}px)`,
                    transition:
                      "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                >
                  {/* Number + icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-accent/55 font-sans tracking-[0.2em] uppercase">
                      {spec.num}
                    </span>
                    <spec.icon className="w-4 h-4 text-accent/75" />
                  </div>
                  {/* Title */}
                  <h3 className="font-display text-xl text-foreground leading-snug mb-1.5">
                    {spec.title}
                  </h3>
                  {/* Body */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {spec.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────
            Mobile: full-screen canvas, no overlay text
        ───────────────────────────────────────────────── */}
        <canvas
          ref={mobileCanvasRef}
          className="lg:hidden absolute inset-0 w-full h-full"
        />

        {/* ─────────────────────────────────────────────────
            Scroll hint — fades when user starts scrolling
        ───────────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-700"
          style={{
            opacity: hasScrolled ? 0 : 1,
            transform: `translateX(-50%) translateY(${hasScrolled ? 10 : 0}px)`,
            pointerEvents: hasScrolled ? "none" : "auto",
          }}
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/50">
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4 text-foreground/40 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ScrollImageSequence;
