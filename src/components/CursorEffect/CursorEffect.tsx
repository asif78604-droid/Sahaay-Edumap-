import { useEffect, useRef, useState } from "react";
import styles from "./CursorEffect.module.css";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate refs (avoiding re-renders)
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input[type='submit']") ||
        target.closest("input[type='button']") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.classList.contains("hoverable");

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input[type='submit']") ||
        target.closest("input[type='button']") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.classList.contains("hoverable");

      if (isInteractive) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let animationFrameId: number;

    const animateCursor = () => {
      // Immediate translation of the solid dot
      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Linear interpolation (lerp) for the trailing ring outline (lag factor: 0.15)
      const lerpFactor = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="custom-cursor" className={styles.cursorContainer}>
      <div ref={dotRef} className={styles.dot} />
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHovered ? styles.hoveredRing : ""}`}
      />
    </div>
  );
}
