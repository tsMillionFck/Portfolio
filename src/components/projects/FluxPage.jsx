import { useState, useEffect, useRef } from "react";

export default function FluxPage({ isOpen, onClose }) {
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
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-red">
            01 — FINTECH / APP
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Flux
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed opacity-80">
            A next-generation fintech application designed for seamless money
            transfers, intelligent budgeting, and real-time financial insights.
          </p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t-2 border-line max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-line p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6">
            Flux reimagines personal finance through a brutalist lens—stripping
            away unnecessary ornamentation to focus on what matters: your money,
            your control, your clarity.
          </p>
          <p className="font-body text-base leading-relaxed opacity-70">
            Built with a focus on speed and reliability, Flux processes
            transactions in milliseconds while maintaining bank-grade security.
            The interface adapts to your financial patterns, surfacing insights
            exactly when you need them.
          </p>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                "React Native",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Stripe API",
                "Plaid",
                "Redis",
                "AWS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="interactable px-4 py-2 border-2 border-line rounded-full font-mono text-sm hover:bg-ink hover:text-bg transition-colors duration-200 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                TIMELINE
              </span>
              <span className="font-display text-lg">8 Weeks</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                ROLE
              </span>
              <span className="font-display text-lg">Full Stack Dev</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                YEAR
              </span>
              <span className="font-display text-lg">2024</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                STATUS
              </span>
              <span className="font-display text-lg text-bauhaus-red">
                ● Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-line p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block">
          KEY FEATURES
        </span>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            {
              title: "Instant Transfers",
              desc: "Move money between accounts in under 3 seconds with real-time confirmation.",
            },
            {
              title: "Smart Budgets",
              desc: "AI-powered budgeting that learns your spending patterns and adapts automatically.",
            },
            {
              title: "Security First",
              desc: "Bank-grade encryption, biometric authentication, and fraud detection.",
            },
            {
              title: "Multi-Currency",
              desc: "Hold and exchange 30+ currencies with competitive FX rates.",
            },
            {
              title: "Analytics Dashboard",
              desc: "Beautiful visualizations of your financial health and spending trends.",
            },
            {
              title: "Open Banking",
              desc: "Connect all your accounts for a unified view of your finances.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-6 border-2 border-line rounded-lg hover:bg-ink hover:text-bg transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-xl mb-3">{feature.title}</h3>
              <p className="font-body text-sm opacity-70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t-2 border-line bg-bauhaus-red p-[4vw] text-white">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              INTERESTED?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build something similar.
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
