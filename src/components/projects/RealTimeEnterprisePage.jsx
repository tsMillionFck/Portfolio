import { useState, useEffect, useRef } from "react";

export default function RealTimeEnterprisePage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Fluid animation for hero
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

    const drawFluidBackground = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw multiple fluid circles
      const circles = [
        { x: width * 0.3, y: height * 0.4, baseRadius: 120, color: "#e94e34" },
        { x: width * 0.7, y: height * 0.3, baseRadius: 80, color: "#2e5bf1" },
        { x: width * 0.5, y: height * 0.7, baseRadius: 100, color: "#f19a2e" },
      ];

      circles.forEach((circle, idx) => {
        ctx.beginPath();
        const points = 80;

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const wave1 = Math.sin(angle * 3 + time * 0.5 + idx) * 8;
          const wave2 = Math.sin(angle * 5 - time * 0.3 + idx * 2) * 5;
          const wave3 = Math.cos(angle * 4 + time * 0.8 + idx) * 4;

          const radius = circle.baseRadius + wave1 + wave2 + wave3;
          const x = circle.x + Math.cos(angle) * radius;
          const y = circle.y + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      time += 0.01;
      animationRef.current = requestAnimationFrame(drawFluidBackground);
    };

    drawFluidBackground();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const projects = [
    {
      title: "Real-Time Stripe Dashboard",
      role: "Financial data visualization & Webhooks",
      description:
        "Live financial monitoring dashboard integrating Stripe webhooks for instant transaction updates.",
    },
    {
      title: "Collaboration Design Canvas",
      role: "Socket.io & real-time state syncing",
      description:
        "Multi-user whiteboard canvas allowing simultaneous editing and cursor tracking.",
    },
    {
      title: "Chat Application",
      role: "High-speed messaging architecture",
      description:
        "Scalable messaging system optimized for low latency and high concurrency (Internship work).",
    },
    {
      title: "Interactive Map & InfoGraphs",
      role: "Large-scale data visualization (D3.js)",
      description:
        "Complex data visualization handling thousands of data points with smooth D3 transitions.",
    },
    {
      title: "E-commerce Suite",
      role: "Payment gateways, cart logic & inventory",
      description:
        "Comprehensive e-commerce solution managing inventory state and secure payment flows (Versions 01-03).",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-bg overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-ink bg-bg border-2 border-line rounded-full hover:bg-ink hover:text-bg transition-all duration-300 font-display text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        {/* Fluid Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "multiply" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-red">
            02 — High Stakes
          </span>
          <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Real-Time & Enterprise
          </h1>
          <p className="font-mono text-xl max-w-[800px] leading-relaxed opacity-80">
            These projects demonstrate the capacity to handle high-stakes
            environments: money, live data flow, and real-time collaboration.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="border-t-2 border-line p-[4vw]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-md:grid-cols-1">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group interactable p-8 border-2 border-line rounded-lg hover:bg-ink hover:text-bg transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-3xl mb-3 group-hover:text-bauhaus-red transition-colors">
                {project.title}
              </h3>
              <div className="font-mono text-sm text-bauhaus-red mb-4 uppercase tracking-wider group-hover:text-white">
                {project.role}
              </div>
              <p className="font-body text-base opacity-70 leading-relaxed group-hover:opacity-90">
                {project.description}
              </p>
              <div className="mt-8 flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
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
      <div className="border-t-2 border-line bg-bauhaus-red p-[4vw] text-white">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              READY FOR SCALE?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build robust systems.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-white text-bauhaus-red font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t-2 border-line p-[4vw] flex justify-center">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b-2 border-ink hover:text-bauhaus-blue transition-colors duration-200"
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
