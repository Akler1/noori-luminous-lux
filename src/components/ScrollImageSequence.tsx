import { useEffect, useRef, useState, useCallback } from "react";

/* ── Editable callout positions (percentage-based) ── */
/* Anchors are % within the canvas (left half). Boxes are % within the full container. */
const CALLOUTS = [
  { label: "Main Stone", anchorPctX: 50, anchorPctY: 35, boxPctX: 65, boxPctY: 25 },
  { label: "Pavé Stones", anchorPctX: 45, anchorPctY: 55, boxPctX: 65, boxPctY: 55 },
  { label: "Earring Post", anchorPctX: 52, anchorPctY: 78, boxPctX: 65, boxPctY: 78 },
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
    <div ref={wrapperRef} style={{ height: `${scrollVh}vh` }} className="relative bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-6xl mx-auto flex items-center h-full px-8">
          {/* Canvas on the left */}
          <div className="relative w-1/2 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[550px]">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>

          {/* Labels on the right */}
          <div className="w-1/2 relative flex flex-col justify-center gap-12 pl-12">
            {CALLOUTS.map((c, i) => (
              <div
                key={c.label}
                className="bg-white border border-black/20 shadow-lg rounded-full px-6 py-2 text-sm text-black whitespace-nowrap w-fit transition-all duration-500"
                style={{
                  opacity: showCallouts ? 1 : 0,
                  transform: `translateX(${showCallouts ? 0 : 20}px)`,
                  transitionDelay: showCallouts ? `${i * 150}ms` : "0ms",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollImageSequence;
