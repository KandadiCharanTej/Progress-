"use client";

import { useState } from "react";

interface ResizableSplitterProps {
  orientation: "horizontal" | "vertical";
  onDrag: (delta: number) => void;
  onReset?: () => void;
  className?: string;
}

export function ResizableSplitter({
  orientation,
  onDrag,
  onReset,
  className = "",
}: ResizableSplitterProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startPos = orientation === "vertical" ? e.clientX : e.clientY;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const currentPos = orientation === "vertical" ? moveEvent.clientX : moveEvent.clientY;
      const delta = currentPos - startPos;
      onDrag(delta);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={onReset}
      title="Drag to resize • Double click to reset"
      className={`group relative flex items-center justify-center select-none transition-colors z-20 ${
        orientation === "vertical"
          ? "w-2.5 -mx-1 cursor-col-resize hover:bg-[var(--accent-purple)]/20 active:bg-[var(--accent-purple)]/40"
          : "h-2.5 -my-1 cursor-row-resize hover:bg-[var(--accent-purple)]/20 active:bg-[var(--accent-purple)]/40"
      } ${isDragging ? "bg-[var(--accent-purple)]/30" : ""} ${className}`}
    >
      {/* Handle Line Indicator */}
      <div
        className={`rounded-full transition-all bg-[var(--border-color)] group-hover:bg-[var(--accent-purple)] ${
          orientation === "vertical"
            ? "w-0.5 h-8 group-hover:h-12"
            : "h-0.5 w-8 group-hover:w-12"
        } ${isDragging ? "bg-[var(--accent-purple)] h-full w-full opacity-80" : ""}`}
      />
    </div>
  );
}
