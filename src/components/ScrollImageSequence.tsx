import { useEffect, useRef, useState, useCallback } from "react";

/* ── Editable callout positions (percentage-based) ── */
const CALLOUTS = [
  { label: "Main Stone", anchorX: 50, anchorY: 35, boxX: 72, boxY: 30 },
  { label: "Pavé Stones", anchorX: 45, anchorY: 55, boxX: 20, boxY: 58 },
  { label: "Earring Post", anchorX: 52, anchorY: 78, boxX: 75, boxY: 80 },
];

interface Props {
  basePath: string;
  frameCount: number;
  ext?: string;
  pad?: number;
  scrollVh?: number;
  maxWidth?: number;
}

const ScrollImageSequence = ({
  basePath,
  frameCount,
  ext = "webp",
  pad = 4,
  scrollVh = 180,
  maxWidth = 1800,
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

    // Cover-fit the image
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let sw = w, sh = h, sx = 0, sy = 0;
    if (imgRatio > canvasRatio) {
      sw = h * imgRatio;
      sx = (w - sw) / 2;
    } else {
      sh = w / imgRatio;
      sy = (h - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh);
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
    // Initial draw
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
    <div ref={wrapperRef} style={{ height: `${scrollVh}vh` }} className="relative bg-black">
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full" style={{ maxWidth }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />

          {/* Callout overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {CALLOUTS.map((c, i) => {
              const dx = c.boxX - c.anchorX;
              const dy = c.boxY - c.anchorY;
              const lineLen = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);

              return (
                <div key={c.label}>
                  {/* Dot */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-white/60 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
                    style={{
                      left: `${c.anchorX}%`,
                      top: `${c.anchorY}%`,
                      opacity: showCallouts ? 1 : 0,
                      transitionDelay: showCallouts ? `${i * 120}ms` : "0ms",
                    }}
                  />

                  {/* Leader line */}
                  <div
                    className="absolute h-px bg-white/40 origin-left transition-transform duration-500"
                    style={{
                      left: `${c.anchorX}%`,
                      top: `${c.anchorY}%`,
                      width: `${lineLen}%`,
                      transform: `rotate(${angle}deg) scaleX(${showCallouts ? 1 : 0})`,
                      transitionDelay: showCallouts ? `${i * 120}ms` : "0ms",
                    }}
                  />

                  {/* Label box */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-4 py-1.5 text-sm text-white/90 whitespace-nowrap transition-all duration-500"
                    style={{
                      left: `${c.boxX}%`,
                      top: `${c.boxY}%`,
                      opacity: showCallouts ? 1 : 0,
                      transform: `translate(-50%, -50%) translateY(${showCallouts ? 0 : 8}px)`,
                      transitionDelay: showCallouts ? `${i * 120 + 100}ms` : "0ms",
                    }}
                  >
                    {c.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollImageSequence;
