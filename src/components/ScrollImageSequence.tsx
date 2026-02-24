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

        {/* ── Desktop: Right-side overlay cards ── */}
        <div
          className="absolute right-[4%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
          style={{ maxWidth: "200px" }}
        >
          {LABELS.map((label, idx) => (
            <div
              key={label.title}
              className="card-luxury p-3 text-center"
              style={{
                opacity: showCallouts ? 1 : 0,
                transform: `translateY(${showCallouts ? 0 : 12}px)`,
                transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${idx * 150}ms`,
                boxShadow: "var(--shadow-elegant)",
              }}
            >
              <label.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <h4 className="text-xs font-serif font-semibold uppercase tracking-wider text-card-foreground/90">
                {label.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {label.body}
              </p>
            </div>
          ))}
        </div>

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
