import { useState, useEffect, useRef } from "react";

export default function ProductivityLogicPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Neural network/node graph animation for hero
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const nodes = [];
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * 800 + 100,
        y: Math.random() * 400 + 100,
        radius: Math.random() * 8 + 4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: ["#1a1a1a", "#2e5bf1", "#e94e34", "#f19a2e"][
          Math.floor(Math.random() * 4)
        ],
      });
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawNetwork = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.globalAlpha = ((200 - dist) / 200) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 0.6;
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.x * 0.01) * 2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      time += 0.02;
      animationRef.current = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const projects = [
    {
      title: "The Mind Map",
      role: "Complex UI & Canvas Logic",
      description:
        "A tool for visualizing complex relationships with intricate canvas logic and state management.",
    },
    {
      title: "One Journal",
      role: "Persistent Data & Privacy",
      description:
        "Daily journal app featuring rich text editing, local persistence, and focus on user privacy.",
    },
    {
      title: "Budget & Expense Trackers",
      role: "CRUD Operations",
      description:
        "Efficient data entry and calculation tools demonstrating solid CRUD fundamentals.",
    },
    {
      title: "Music Player 2.0",
      role: "Asset Handling & Audio API",
      description:
        "Advanced media player managing complex asset loading, playlist state, and browser audio APIs.",
    },
    {
      title: "Weather & News Apps",
      role: "API Integration & Data Fetching",
      description:
        "Rapid data fetching applications integrating multiple third-party APIs for real-time updates.",
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
        {/* Network Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-ink">
            04 — Core Mastery
          </span>
          <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Productivity & Logic
          </h1>
          <p className="font-mono text-xl max-w-[800px] leading-relaxed opacity-80">
            These projects prove the foundational mastery: State management,
            CRUD operations, and complex application logic.
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
              <h3 className="font-display text-3xl mb-3 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <div className="font-mono text-sm text-ink mb-4 uppercase tracking-wider group-hover:text-white/80">
                {project.role}
              </div>
              <p className="font-body text-base opacity-70 leading-relaxed group-hover:text-white/80">
                {project.description}
              </p>
              <div className="mt-8 flex items-center opacity-40 group-hover:text-white group-hover:opacity-100 transition-all">
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
      <div className="border-t-2 border-line bg-ink p-[4vw] text-bg">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              NEED RELIABLE TOOLS?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build software that works.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-bg text-ink font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Start Building →
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
