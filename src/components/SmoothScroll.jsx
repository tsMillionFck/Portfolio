import { useEffect, useRef } from "react";

const SCROLL_VISCOSITY = 0.08;

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const scrollHeightRef = useRef(null);
  const currentY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const scrollHeight = scrollHeightRef.current;
    if (!container || !scrollHeight) return;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const setHeight = () => {
      const h = container.getBoundingClientRect().height;
      document.body.style.height = `${h}px`;
      scrollHeight.style.height = `${h}px`;
    };

    const render = () => {
      const targetY = window.scrollY;
      currentY.current = lerp(currentY.current, targetY, SCROLL_VISCOSITY);
      container.style.transform = `translate3d(0, -${currentY.current}px, 0)`;
      requestAnimationFrame(render);
    };

    setHeight();
    window.addEventListener("load", setHeight);
    window.addEventListener("resize", setHeight);
    const heightInterval = setInterval(setHeight, 1000);

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("load", setHeight);
      window.removeEventListener("resize", setHeight);
      clearInterval(heightInterval);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
      <div ref={scrollHeightRef} className="w-px" />
    </>
  );
}
