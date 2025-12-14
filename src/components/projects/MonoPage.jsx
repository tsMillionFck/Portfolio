import { useState, useEffect, useRef } from "react";

export default function MonoPage({ isOpen, onClose }) {
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

      // Draw animated data blocks
      const blocks = [
        { x: 3, y: 2, w: 4, h: 3, color: "rgba(255, 255, 255, 0.1)" },
        { x: 8, y: 5, w: 3, h: 2, color: "rgba(255, 255, 255, 0.08)" },
        { x: 2, y: 7, w: 5, h: 2, color: "rgba(255, 255, 255, 0.06)" },
        { x: 12, y: 3, w: 2, h: 4, color: "rgba(255, 255, 255, 0.1)" },
        { x: 15, y: 8, w: 4, h: 2, color: "rgba(255, 255, 255, 0.07)" },
      ];

      blocks.forEach((block, idx) => {
        const pulse = Math.sin(time * 2 + idx) * 0.3 + 0.7;
        ctx.fillStyle = block.color
          .replace(")", `, ${pulse})`)
          .replace("rgba", "rgba");
        ctx.fillRect(
          block.x * gridSize,
          block.y * gridSize,
          block.w * gridSize,
          block.h * gridSize
        );
      });

      // Draw scanning line
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * height;
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 20, width, 40);

      // Draw corner brackets
      const bracketSize = 60;
      const bracketThickness = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = bracketThickness;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(0, bracketSize);
      ctx.lineTo(0, 0);
      ctx.lineTo(bracketSize, 0);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - bracketSize, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, bracketSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(0, height - bracketSize);
      ctx.lineTo(0, height);
      ctx.lineTo(bracketSize, height);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - bracketSize, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, height - bracketSize);
      ctx.stroke();

      // Draw center rounded rectangle
      const rectWidth = 200;
      const rectHeight = 200;
      const rectX = (width - rectWidth) / 2;
      const rectY = (height - rectHeight) / 2;
      const radius = 20;
      const pulseScale = 1 + Math.sin(time) * 0.02;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(pulseScale, pulseScale);
      ctx.translate(-width / 2, -height / 2);

      ctx.beginPath();
      ctx.roundRect(rectX, rectY, rectWidth, rectHeight, radius);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

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
            04 — SYSTEM / INFRASTRUCTURE
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-white">
            Mono
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed text-white/60">
            A unified system architecture for building scalable applications.
            One codebase, one deployment pipeline, infinite possibilities.
          </p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t border-white/10 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-white/10 p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-white/40">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6 text-white">
            Mono is a monorepo architecture that unifies frontend, backend, and
            shared libraries into a single, cohesive development experience.
            Built for teams that value consistency and speed.
          </p>
          <p className="font-body text-base leading-relaxed text-white/50">
            With automated tooling, shared configurations, and intelligent
            caching, Mono reduces build times by 80% while ensuring every
            package stays in sync. Deploy with confidence.
          </p>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-white/40">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                "Turborepo",
                "TypeScript",
                "pnpm",
                "Docker",
                "GitHub Actions",
                "Kubernetes",
                "Terraform",
                "Redis",
              ].map((tech) => (
                <span
                  key={tech}
                  className="interactable px-4 py-2 border border-white/20 rounded-lg font-mono text-sm text-white hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/30">
                TIMELINE
              </span>
              <span className="font-display text-lg text-white">Ongoing</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/30">
                ROLE
              </span>
              <span className="font-display text-lg text-white">
                System Architect
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/30">
                YEAR
              </span>
              <span className="font-display text-lg text-white">2024</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/30">
                STATUS
              </span>
              <span className="font-display text-lg text-white">
                ● Production
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Components */}
      <div className="border-t border-white/10 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-white/40">
          ARCHITECTURE COMPONENTS
        </span>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            {
              title: "Unified Tooling",
              desc: "Single ESLint, TypeScript, and Prettier configuration shared across all packages.",
            },
            {
              title: "Smart Caching",
              desc: "Remote caching with Turborepo means you never build the same code twice.",
            },
            {
              title: "Shared Packages",
              desc: "Common utilities, UI components, and types shared seamlessly between apps.",
            },
            {
              title: "CI/CD Pipeline",
              desc: "Automated testing, building, and deployment with intelligent change detection.",
            },
            {
              title: "Container First",
              desc: "Docker-based development and production environments for consistency.",
            },
            {
              title: "Infrastructure as Code",
              desc: "Terraform modules for provisioning and managing cloud resources.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-6 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-white/50">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="border-t border-white/10 p-[4vw] bg-white/5">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-white/40">
          PERFORMANCE METRICS
        </span>
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            { value: "80%", label: "Faster Builds" },
            { value: "15+", label: "Packages Managed" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "< 2s", label: "Cold Start Time" },
          ].map((metric, idx) => (
            <div key={idx} className="text-center">
              <span className="font-display text-[clamp(3rem,6vw,5rem)] text-white block leading-none">
                {metric.value}
              </span>
              <span className="font-mono text-sm text-white/40 uppercase tracking-widest mt-2 block">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Structure */}
      <div className="border-t border-white/10 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-white/40">
          MONOREPO STRUCTURE
        </span>
        <div className="bg-[#111] rounded-lg p-6 font-mono text-sm text-white/70 overflow-x-auto">
          <pre className="whitespace-pre">
            {`mono/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── api/          # Express backend
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Shared components
│   ├── utils/        # Common utilities
│   ├── config/       # Shared configs
│   └── types/        # TypeScript types
├── infrastructure/
│   ├── docker/       # Dockerfiles
│   └── terraform/    # IaC modules
└── turbo.json        # Turborepo config`}
          </pre>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-white/10 bg-white p-[4vw] text-[#0a0a0a]">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-50">
              NEED A SCALABLE SYSTEM?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's architect your foundation.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-[#0a0a0a] text-white font-display text-lg rounded-lg hover:scale-105 transition-transform duration-200 no-underline"
          >
            Start Building →
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
