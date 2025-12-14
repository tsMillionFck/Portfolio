import { useEffect, useRef, useState } from "react";

const CURSOR_LAG = 0.1;
const ELASTICITY = 0.00161;

export default function PhysicsCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check for interactables
      const target = e.target;
      const isInteractable =
        target.closest(".interactable") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON";

      setIsHovered(isInteractable);
    };

    const animate = () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      posRef.current.x = lerp(posRef.current.x, mouseRef.current.x, CURSOR_LAG);
      posRef.current.y = lerp(posRef.current.y, mouseRef.current.y, CURSOR_LAG);

      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const stretch = Math.min(dist * ELASTICITY, 0.5);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      cursor.style.transform = `
        translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)
        translate(-50%, -50%)
        rotate(${angle}deg)
        scale(${1 + stretch}, ${1 - stretch})
      `;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Hide on touch devices
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-[9999]
        rounded-full bg-white mix-blend-exclusion
        transition-[width,height] duration-200
        ${isHovered ? "w-20 h-20" : "w-10 h-10"}
      `}
      style={{ willChange: "transform" }}
    />
  );
}
