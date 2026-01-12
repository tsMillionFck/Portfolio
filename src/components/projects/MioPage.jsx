import { useState, useEffect, useRef } from "react";

export default function MioPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Pulse/Data Stream animation for "Rage Click" detection
  // Styled to match Portfolio (Ink/Red/Yellow)
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let nodes = [];
    const maxNodes = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Node {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.isRage = Math.random() > 0.9; // 10% chance to be "rage"
        this.life = 0;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height ||
          this.life > 600
        ) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.isRage ? this.size * 2.5 : this.size,
          0,
          Math.PI * 2
        );
        // Portfolio Palette: Ink (Black), Rage (Red), Accent (Blue)
        ctx.fillStyle = this.isRage ? "#FF0000" : "#000000";
        ctx.globalAlpha = this.isRage ? 0.8 : 0.2;
        ctx.fill();

        // Connections
        if (this.isRage) {
          ctx.beginPath();
          ctx.strokeStyle = "#FF0000";
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.3;
          // Draw erratic connection
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(
            this.x + (Math.random() - 0.5) * 80,
            this.y + (Math.random() - 0.5) * 80
          );
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < maxNodes; i++) nodes.push(new Node());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const techStack = [
    { name: "Google Gemini", type: "backend" },
    { name: "LangChain", type: "backend" },
    { name: "Pinecone", type: "backend" },
    { name: "React 18", type: "frontend" },
    { name: "TypeScript", type: "frontend" },
    { name: "Puppeteer", type: "backend" },
  ];

  const features = [
    {
      title: "Rage Click Detection",
      desc: "OmniSenses module listens for raw DOM events like erratic clicks to instantly flag frustration.",
    },
    {
      title: "Visual Memory Bots",
      desc: "Agents that 'see' the page context via RAG, providing answers grounded in the user's current view.",
    },
    {
      title: "Smart Interventions",
      desc: "Automated 'concierge' triggers that offer help exactly when a user struggles.",
    },
    {
      title: "Analytics Dashboard",
      desc: "Visualize trigger hotspots and train bot responses in an isolated playground.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-bg overflow-y-auto font-sans selection:bg-black selection:text-white">
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
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-yellow">
            14 — AGENTIC AI
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-ink">
            The Mio Project
          </h1>
          <p className="font-mono text-xl max-w-[700px] leading-relaxed opacity-80 mb-8 text-ink">
            An intelligent "concierge" for the web. Mio detects frustration
            signals like{" "}
            <span className="text-bauhaus-red font-bold">rage clicks</span> and
            triggers proactive AI interventions.
          </p>

          <a
            href="https://www.mewo-mio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-bauhaus-yellow text-ink font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 border-2 border-ink no-underline"
          >
            ▶ Launch Platform
          </a>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t-2 border-line max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-line p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-ink">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6 text-ink">
            Traditional support is reactive. Mio makes it proactive. By
            analyzing cursor behavior and click patterns in real-time, it
            identifies users who are stuck before they even reach for the "Help"
            button.
          </p>
          <div className="p-6 border-2 border-line rounded-lg bg-white/50">
            <h4 className="font-bold text-ink mb-2 uppercase text-xs tracking-wider">
              The Sovereign Layout
            </h4>
            <p className="font-body text-sm text-ink opacity-80">
              Designed with a minimalist aesthetic to manage complex agent data.
              Prioritizing clarity and focus over decorative elements.
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
                  className={`interactable px-4 py-2 border-2 border-line rounded-full font-mono text-sm hover:bg-ink hover:text-bg transition-colors duration-200 cursor-pointer ${
                    tech.type === "backend" ? "bg-line/10" : ""
                  }`}
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
                Lead Architect
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60 text-ink">
                TYPE
              </span>
              <span className="font-display text-lg text-ink">
                AI Agent System
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60 text-ink">
                STATUS
              </span>
              <span className="font-display text-lg text-bauhaus-green">
                ● Active
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
              <h3 className="font-display text-2xl mb-3 group-hover:text-bauhaus-yellow transition-colors">
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
      <div className="border-t-2 border-line bg-ink p-[4vw] text-bg">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-bauhaus-yellow opacity-80">
              INTERESTED?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build intelligent systems.
            </h2>
          </div>
          <a
            href="https://www.mewo-mio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable px-8 py-4 bg-bauhaus-yellow text-ink font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline border-2 border-bg"
          >
            Visit Project ↗
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t-2 border-line p-[4vw] flex justify-center bg-bg">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b-2 border-ink hover:text-bauhaus-blue transition-colors duration-200 text-ink"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}
