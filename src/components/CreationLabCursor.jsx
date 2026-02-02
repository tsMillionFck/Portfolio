import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CreationLabCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = 0;
    let y = 0;
    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;

      // Calculate velocity
      // We need an animation loop to strictly calculate velocity frame-by-frame for smoothness,
      // or just diff here.
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.style.cursor = "none";

    let rafId;
    const update = () => {
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Base size 40, expand with speed
      const size = 60 + Math.min(speed * 4, 100);

      gsap.to(cursor, {
        x: x,
        y: y,
        width: size,
        height: size,
        duration: 0.1, // Slight lag for fluid feel
        ease: "power2.out",
      });

      lastX = x;
      lastY = y;
      rafId = requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 border border-violet-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] mix-blend-difference shadow-[0_0_30px_rgba(139,92,246,0.3)] bg-violet-500/5 backdrop-blur-sm"
      style={{ width: 60, height: 60 }}
    />
  );
}
