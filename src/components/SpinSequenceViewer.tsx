import { useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

interface SpinSequenceViewerProps {
  baseUrl: string;
  frameCount: number;
  title: string;
  className?: string;
}

const DRAG_SENSITIVITY = 6;

export const SpinSequenceViewer = ({
  baseUrl,
  frameCount,
  title,
  className = "",
}: SpinSequenceViewerProps) => {
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartFrame, setDragStartFrame] = useState(0);

  const imageSrc = useMemo(() => `${baseUrl}/${frame}_0.jpg`, [baseUrl, frame]);

  const wrapFrame = (value: number) => ((value % frameCount) + frameCount) % frameCount;

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragStartFrame(frame);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartX;
    const nextFrame = wrapFrame(dragStartFrame - Math.round(deltaX / DRAG_SENSITIVITY));

    if (nextFrame !== frame) {
      setFrame(nextFrame);
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${className}`.trim()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ touchAction: "pan-y" }}
      aria-label={`${title} 360 view`}
      role="img"
    >
      <img
        src={imageSrc}
        alt={title}
        className="h-full w-full pointer-events-none select-none object-contain"
        draggable={false}
        loading="lazy"
      />
    </div>
  );
};