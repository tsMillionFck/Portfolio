import { useState, useEffect, useRef } from "react";

export default function SwissDesignPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Grid/matrix animation
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawSystemGrid = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const gridSize = 40;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, height);
        ctx.stroke();
      }

      for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(width, i * gridSize);
        ctx.stroke();
      }

      time += 0.016;
      animationRef.current = requestAnimationFrame(drawSystemGrid);
    };

    drawSystemGrid();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const projects = [
    {
      title: "The Swiss Component Library",
      role: "Framer Motion & Reusable Physics",
      description:
        "A proprietary component library focusing on physics-based interactions and strict Swiss grid systems.",
    },
    {
      title: "UI Design Giver",
      role: "Aesthetics Generation App",
      description:
        "An application that algorithmically generates aesthetic layouts (Bento grids, Glassmorphism, Brutalism).",
    },
    {
      title: "The Portfolio",
      role: "Personal 'Swiss Minimalist' Showcase",
      description:
        "This very website—a testament to clean lines, intentional typography, and performance.",
    },
    {
      title: "Landing Page Series",
      role: "5+ Styles (Minimalism to Brutalism)",
      description:
        "A collection of high-conversion landing pages demonstrating versatility across multiple design languages.",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-white bg-transparent border-2 border-white/30 rounded-lg hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 font-mono text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        {/* Grid Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-white/50">
            03 — UI/UX Motion Mastery
          </span>
          <h1 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-white">
            Swiss Design
          </h1>
          <p className="font-mono text-xl max-w-[800px] leading-relaxed text-white/60">
            Your unique market edge: Physics-based, elite-looking interfaces
            that marry form with function.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="border-t border-white/10 p-[4vw]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-md:grid-cols-1">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group interactable p-8 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-3xl mb-3 text-white group-hover:text-white/90 transition-colors">
                {project.title}
              </h3>
              <div className="font-mono text-sm text-white/50 mb-4 uppercase tracking-wider group-hover:text-white">
                {project.role}
              </div>
              <p className="font-body text-base text-white/50 leading-relaxed group-hover:text-white/80">
                {project.description}
              </p>
              <div className="mt-8 flex items-center text-white/30 group-hover:text-white transition-colors">
                <span className="font-mono text-xs uppercase tracking-widest mr-2">
                  View Project
                </span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-white/10 bg-white p-[4vw] text-[#0a0a0a]">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-50">
              NEED PREMIUM DESIGN?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's create something iconic.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-[#0a0a0a] text-white font-display text-lg rounded-lg hover:scale-105 transition-transform duration-200 no-underline"
          >
            Start Design →
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t border-white/10 p-[4vw] flex justify-center bg-[#0a0a0a]">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b border-white text-white hover:text-white/60 transition-colors duration-200"
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
