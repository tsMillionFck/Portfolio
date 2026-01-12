import { useState, useEffect, useRef } from "react";

export default function MindMapPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Infinite Grid Animation
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

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 40;
      const offsetX = Math.sin(time * 0.5) * 20;
      const offsetY = Math.cos(time * 0.3) * 20;

      ctx.beginPath();
      // Draw Grid Lines
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(canvas.width, y + offsetY);
      }

      ctx.strokeStyle = "#FF4D4D"; // Bauhaus Red
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.15;
      ctx.stroke();

      // Floating Nodes (Ideas)
      const nodes = [
        { x: 200, y: 300, r: 8 },
        { x: 500, y: 150, r: 12 },
        { x: 800, y: 400, r: 10 },
        { x: 300, y: 600, r: 6 },
      ];

      nodes.forEach((node, i) => {
        const floatX = Math.sin(time + i) * 10;
        const floatY = Math.cos(time + i * 1.5) * 10;

        ctx.beginPath();
        ctx.arc(node.x + floatX, node.y + floatY, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FF4D4D";
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Connections
        if (i < nodes.length - 1) {
          ctx.beginPath();
          ctx.moveTo(node.x + floatX, node.y + floatY);
          const next = nodes[i + 1];
          ctx.lineTo(
            next.x + Math.sin(time + i + 1) * 10,
            next.y + Math.cos(time + (i + 1) * 1.5) * 10
          );
          ctx.strokeStyle = "#FF4D4D";
          ctx.globalAlpha = 0.2;
          ctx.stroke();
        }
      });

      time += 0.01;
      animationRef.current = requestAnimationFrame(drawGrid);
    };
    drawGrid();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const techStack = [
    { name: "React 19", type: "frontend" },
    { name: "Zustand", type: "frontend" },
    { name: "Dexie.js", type: "backend" },
    { name: "IndexedDB", type: "backend" },
    { name: "Tailwind v4", type: "frontend" },
    { name: "Markdown", type: "frontend" },
  ];

  const features = [
    {
      title: "Infinite Canvas",
      desc: "A massive 100,000px pannable grid. No pages, no boundaries—just a freeform space for ideas.",
    },
    {
      title: "Local-First",
      desc: "Zero latency. Data persists directly in the browser via IndexedDB (Dexie), ensuring total privacy and offline access.",
    },
    {
      title: "Focus Mode",
      desc: "A singular hotkey fades away the UI grid and tools, leaving a blank slate for deep work.",
    },
    {
      title: "Spatial Organization",
      desc: "Place notes spatially rather than linearly. Create clusters of thought just like a mind map.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-bg overflow-y-auto font-sans selection:bg-[#FF4D4D] selection:text-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-ink bg-bg border-2 border-line rounded-full hover:bg-ink hover:text-bg transition-all duration-300 font-display text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-[#FF4D4D]">
            04 — PRODUCTIVITY
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-ink">
            The Mind Map
          </h1>
          <p className="font-mono text-xl max-w-[700px] leading-relaxed opacity-80 mb-8 text-ink">
            (Nexus Canvas) An infinite spatial notebook. Break free from linear
            documents and organize your thoughts on a vast{" "}
            <span className="text-[#FF4D4D] font-bold">2D Grid</span>.
          </p>

          <a
            href="https://the-mao.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-[#FF4D4D] text-white font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 border-2 border-ink no-underline"
          >
            ▶ Launch Graph
          </a>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t-2 border-line max-lg:grid-cols-2 max-md:grid-cols-1 bg-white/50 backdrop-blur-sm">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-line p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-ink">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6 text-ink">
            Traditional notes are restrictive. TheMao offers a spatial interface
            where context is defined by closeness. It leverages local-first
            architecture for instant load times.
          </p>
          <div className="p-6 border-2 border-line rounded-lg bg-bg">
            <h4 className="font-bold text-[#FF4D4D] mb-2 uppercase text-xs tracking-wider">
              Dexie.js Powered
            </h4>
            <p className="font-body text-sm text-ink opacity-80">
              State management is handled via Dexie/IndexedDB, meaning your
              "Mind Map" can grow to gigabytes without slowing down.
            </p>
          </div>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-ink">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`interactable px-4 py-2 border-2 border-line rounded-full font-mono text-sm hover:bg-ink hover:text-bg transition-colors duration-200 cursor-pointer`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60 text-ink">
                ROLE
              </span>
              <span className="font-display text-lg text-ink">
                Frontend Lead
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60 text-ink">
                TYPE
              </span>
              <span className="font-display text-lg text-ink">Canvas Tool</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60 text-ink">
                STATUS
              </span>
              <span className="font-display text-lg text-[#FF4D4D]">
                ● Prototype
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-line p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-ink">
          KEY FEATURES
        </span>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-8 border-2 border-line rounded-lg hover:bg-ink hover:text-bg transition-all duration-300 cursor-pointer group"
            >
              <h3 className="font-display text-2xl mb-3 group-hover:text-[#FF4D4D] transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-base opacity-70 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t-2 border-line bg-[#FF4D4D] p-[4vw] text-white">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white opacity-80">
              EXPAND YOUR MIND
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Start Mapping.
            </h2>
          </div>
          <a
            href="https://the-mao.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable px-8 py-4 bg-white text-[#FF4D4D] font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline border-2 border-white"
          >
            Open Canvas ↗
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t-2 border-line p-[4vw] flex justify-center bg-bg">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b-2 border-ink hover:text-[#FF4D4D] transition-colors duration-200 text-ink"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}
