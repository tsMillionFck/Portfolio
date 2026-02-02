import { projectAnimations } from "./projectAnimations";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ProjectPageTemplate({ isOpen, onClose, project }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Scroll to top when opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [isOpen, project]);

  useEffect(() => {
    if (!isOpen || !project) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Get specific animation or fallback
    const startAnimation = projectAnimations[project.title];
    let cleanupAnimation;

    if (startAnimation) {
      cleanupAnimation = startAnimation(canvas, ctx);
    } else {
      // Fallback: Subtle Nodes
      const animateFallback = () => {
        // ... (Optional: Keep original fallback logic here or allow empty)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
      animateFallback();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const { title, category, description, techStack, demoUrl, longDescription } =
    project;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-white text-black overflow-y-auto selection:bg-black selection:text-white"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-black bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 font-serif text-xl cursor-pointer"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="font-sans text-sm font-bold uppercase tracking-widest mb-6 block text-black/50">
            PROJECT NO. {project.number || "00"} — {category}
          </span>
          <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] leading-[0.9] mb-8 italic">
            {title}
          </h1>
          <p className="font-serif text-2xl max-w-[700px] leading-relaxed mb-12 text-black/80">
            {description}
          </p>

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactable inline-block px-10 py-4 bg-black text-white font-sans text-sm uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all duration-300 no-underline"
            >
              Launch Project ↗
            </a>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-4 w-full border-t border-black/10 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-black/10 p-[4vw] max-md:border-r-0">
          <span className="font-sans text-xs font-bold uppercase tracking-widest mb-6 block text-black/40">
            OVERVIEW
          </span>
          <p className="font-serif text-lg leading-relaxed mb-6 text-black/90">
            {longDescription ||
              "This project explores the intersection of design and functionality. It leverages modern web technologies to deliver a seamless user experience, adhering to strict aesthetic principles while ensuring robust performance."}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <span className="font-sans text-xs font-bold uppercase tracking-widest mb-6 block text-black/40">
            TECH STACK
          </span>
          <div className="flex flex-wrap gap-3 mb-8">
            {techStack &&
              techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 border border-black/20 rounded-full font-mono text-xs uppercase tracking-wide opacity-70"
                >
                  {tech.name}
                </span>
              ))}
          </div>

          <div className="mt-12">
            <span className="block text-xs font-sans font-bold uppercase tracking-widest text-black/40 mb-2">
              Status
            </span>
            <span className="font-serif text-xl italic">Active Selection</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t border-black/20 p-[4vw] flex justify-center bg-white">
        <button
          onClick={onClose}
          className="relative z-50 cursor-pointer interactable font-sans text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity text-black"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>,
    document.body,
  );
}
