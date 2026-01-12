import { useState, useEffect, useRef } from "react";

export default function TerminalPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Terminal/matrix effect animation for hero
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;
    const chars = "01$€¥£₹+-*/%=<>[]{}()";
    const drops = [];
    const fontSize = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops.length = 0;
      for (let i = 0; i < columns; i++) {
        drops.push(Math.random() * -100);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawMatrix = () => {
      const { width, height } = canvas;

      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 245, 230, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Alternate colors
        const colors = ["#f19a2e", "#1a1a1a", "#e94e34"];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = 0.6;
        ctx.fillText(char, x, y);

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      ctx.globalAlpha = 1;
      time += 0.02;
      animationRef.current = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

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
        {/* Matrix Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-yellow">
            08 — SECURITY
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Terminal
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed opacity-80 mb-8">
            A brutalist expense tracker with JWT authentication, real-time
            syncing, and terminal-inspired aesthetics. Track finances like a
            command-line pro.
          </p>
          {/* Launch Demo Button */}
          <a
            href="http://localhost:5176"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-bauhaus-yellow text-ink font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 border-2 border-ink no-underline"
          >
            ▶ Launch Demo
          </a>
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
            The Real Tracker reimagines personal finance with a
            terminal-inspired interface. Bold typography, minimal color, maximum
            data visibility.
          </p>
          <p className="font-body text-base leading-relaxed opacity-70">
            Features include secure JWT authentication, budget tracking, hourly
            wage calculations, transaction logging with visual charts, and
            real-time cloud sync. Your financial data, your control.
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
                "React 19",
                "Vite",
                "Node.js",
                "Express",
                "MongoDB",
                "JWT",
                "bcrypt",
                "Context API",
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
              <span className="font-display text-lg">6 Weeks</span>
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
              <span className="font-display text-lg text-bauhaus-yellow">
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
              title: "JWT Authentication",
              desc: "Secure login and registration with encrypted passwords and token-based auth.",
            },
            {
              title: "Budget Tracking",
              desc: "Set monthly budgets and track spending against your financial goals.",
            },
            {
              title: "Wage Calculator",
              desc: "Track hourly wages and see real-time earnings based on time worked.",
            },
            {
              title: "Transaction Logs",
              desc: "Detailed transaction history with categories and timestamps.",
            },
            {
              title: "Flux Charts",
              desc: "Visual representation of income vs expenses over time.",
            },
            {
              title: "Cloud Sync",
              desc: "Real-time synchronization across devices with MongoDB backend.",
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
      <div className="border-t-2 border-line bg-bauhaus-yellow p-[4vw] text-ink">
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
            className="interactable px-8 py-4 bg-ink text-bauhaus-yellow font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
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
