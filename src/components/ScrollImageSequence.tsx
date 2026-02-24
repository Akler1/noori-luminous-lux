import { useEffect, useRef, useState, useCallback } from "react";
import { Gem, Sparkles, Crown } from "lucide-react";

const LABELS = [
  {
    title: "Main Stone",
    body: "Top 2% of stones. Colorless D-F, VS1+ clarity.",
    icon: Gem,
    dot: { top: 20, left: 32 },
    card: { top: 8, left: 8 },
  },
  {
    title: "Pavé Stones",
    body: "Hand-placed. Each inspected for symmetry and setting security.",
    icon: Sparkles,
    dot: { top: 38, left: 58 },
    card: { top: 35, left: 72 },
  },
  {
    title: "14k Gold Setting",
    body: "Solid 14k gold. Finished and polished to a high-jewellery standard.",
    icon: Crown,
    dot: { top: 72, left: 68 },
    card: { top: 68, left: 78 },
  },
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
  scrollVh = 180,
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
    if (imgRatio > canvasRatio) {
      dh = h; dw = h * imgRatio; dx = (w - dw) / 2; dy = 0;
    } else {
      dw = w; dh = w / imgRatio; dx = 0; dy = (h - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
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

        const t = Math.min(1, Math.max(0, -rect.top / scrollRange));
        const idx = Math.round(t * (frameCount - 1));

        if (idx !== currentFrame.current) {
          currentFrame.current = idx;
          drawFrame(idx);
          setShowCallouts(idx === frameCount - 1);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(() => { drawFrame(0); }, 100);

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

  return (
    <div ref={wrapperRef} style={{ height: `${scrollVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ── Desktop: SVG connector lines ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          style={{ zIndex: 10 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="white"
                opacity={showCallouts ? 0.9 : 0}
                style={{ transition: "opacity 0.7s ease" }}
              />
            </marker>
          </defs>
          {LABELS.map((label, index) => (
            <line
              key={label.title}
              x1={label.dot.left}
              y1={label.dot.top}
              x2={label.card.left + 6}
              y2={label.card.top + 3}
              stroke="white"
              strokeWidth="0.15"
              strokeOpacity={showCallouts ? 0.7 : 0}
              markerEnd="url(#arrowhead)"
              style={{
                transition: `stroke-opacity 0.7s ease ${index * 200 + 300}ms`,
              }}
            />
          ))}
        </svg>

        {/* ── Desktop: Dot markers on earring ── */}
        {LABELS.map((label, index) => (
          <div
            key={`dot-${label.title}`}
            className="absolute hidden lg:block pointer-events-none"
            style={{
              top: `${label.dot.top}%`,
              left: `${label.dot.left}%`,
              zIndex: 20,
              opacity: showCallouts ? 1 : 0,
              transition: `opacity 0.5s ease ${index * 200}ms`,
            }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              {/* Pulse ring */}
              <div
                className="absolute inset-0 w-3 h-3 rounded-full bg-white/30"
                style={{
                  animation: showCallouts ? "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" : "none",
                  animationDelay: `${index * 200}ms`,
                }}
              />
              {/* Solid dot */}
              <div className="w-3 h-3 rounded-full bg-white border-2 border-white/80 shadow-lg" />
            </div>
          </div>
        ))}

        {/* ── Desktop: Info cards ── */}
        {LABELS.map((label, index) => (
          <div
            key={`card-${label.title}`}
            className="absolute hidden lg:block pointer-events-none"
            style={{
              top: `${label.card.top}%`,
              left: `${label.card.left}%`,
              zIndex: 20,
              opacity: showCallouts ? 1 : 0,
              transform: `translateY(${showCallouts ? 0 : 12}px)`,
              transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 200 + 200}ms`,
            }}
          >
            <div className="card-luxury p-4 text-center" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <label.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <h4 className="text-xs font-serif font-semibold uppercase tracking-wider text-card-foreground/90">
                {label.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px] mt-1">
                {label.body}
              </p>
            </div>
          </div>
        ))}

        {/* ── Mobile: bottom overlay fallback ── */}
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
