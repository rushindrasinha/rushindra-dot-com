"use client";

import { useEffect, useRef } from "react";

// Magnetic custom cursor — desktop with a precise pointer only.
// Leaves default cursor + touch behavior untouched on trackpads/touch/mobile.
export default function CursorFX({ accent }: { accent: string }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    document.documentElement.classList.add("cursor-fx-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const card = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("mousemove", onMove);

    const interactiveSelector = "a, button, .card, [role='button']";
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        ring.classList.add("cursor-ring-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        ring.classList.remove("cursor-ring-hover");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf = 0;
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-fx-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ background: accent }} />
      <div ref={ringRef} className="cursor-ring" style={{ borderColor: accent }} />
    </>
  );
}
