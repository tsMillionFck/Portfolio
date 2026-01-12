import { useState, useEffect, useRef } from "react";

export default function IntelligencePage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Neural network animation
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

    // Create neural network nodes
    const nodes = [];
    const nodeCount = 40;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        size: Math.random() * 4 + 2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const drawNeuralNetwork = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Update and draw connections
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;

        // Draw connections to nearby nodes
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = (node.x - other.x) * width;
          const dy = (node.y - other.y) * height;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.3;
            const pulseAlpha = Math.sin(time * 2 + i * 0.1) * 0.1 + alpha;
            ctx.strokeStyle = `rgba(241, 154, 46, ${pulseAlpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x * width, node.y * height);
            ctx.lineTo(other.x * width, other.y * height);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulseSize = node.size + Math.sin(time * 3 + node.pulse) * 2;

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 4);
        gradient.addColorStop(0, "rgba(241, 154, 46, 0.5)");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = "#f19a2e";
        ctx.fill();
      });

      time += 0.016;
      animationRef.current = requestAnimationFrame(drawNeuralNetwork);
    };

    drawNeuralNetwork();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const projects = [
    {
      title: "The Mio Project",
      role: "Flagship AI agent platform (The 'General')",
      description:
        "An autonomous agent platform capable of handling complex multi-step tasks.",
    },
    {
      title: "AI - Sales Qualification Engine",
      role: "B2B automation & data scoring",
      description:
        "Automated lead scoring and qualification system using LLMs to analyze intent.",
    },
    {
      title: "Autonomous Content Re-purposer",
      role: "Heavy task queuing & media AI",
      description:
        "System to automatically transform and distribute content across multiple platforms.",
    },
    {
      title: "Blog App with Past Interaction",
      role: "Demonstrates Long-term Memory (RAG)",
      description:
        "Content platform that remembers user interactions to personalize future reading.",
    },
    {
      title: "AI-PowerRecipe & AI-Quiz",
      role: "Consumer-facing AI utility",
      description:
        "Interactive AI tools for generating recipes and personalized quizzes.",
    },
    {
      title: "Book Suggestion Engine",
      role: "Recommendation logic & semantic search",
      description:
        "Vector-based recommendation system finding books based on vibe and plot.",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0f0a05] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-bauhaus-yellow bg-transparent border-2 border-bauhaus-yellow/30 rounded-full hover:bg-bauhaus-yellow hover:text-[#0f0a05] transition-all duration-300 font-display text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        {/* Neural Network Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-yellow">
            01 — AI & Autonomous Systems
          </span>
          <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-white">
            The Intelligence Tier
          </h1>
          <p className="font-mono text-xl max-w-[800px] leading-relaxed text-white/70">
            These projects justify a high-level engineering role by
            demonstrating mastery in managing LLM context, RAG pipelines, and
            autonomous agent behaviors.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="border-t border-bauhaus-yellow/20 p-[4vw]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-md:grid-cols-1">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group interactable p-8 border border-bauhaus-yellow/20 rounded-lg hover:bg-bauhaus-yellow/10 hover:border-bauhaus-yellow transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-3xl mb-3 text-white group-hover:text-bauhaus-yellow transition-colors">
                {project.title}
              </h3>
              <div className="font-mono text-sm text-bauhaus-yellow mb-4 uppercase tracking-wider">
                {project.role}
              </div>
              <p className="font-body text-base text-white/60 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-8 flex items-center text-white/40 group-hover:text-white transition-colors">
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
      <div className="border-t border-bauhaus-yellow/20 bg-bauhaus-yellow p-[4vw] text-[#0f0a05]">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              NEED AI EXPERTISE?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build intelligent systems.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-[#0f0a05] text-bauhaus-yellow font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Discuss Your Project →
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t border-bauhaus-yellow/20 p-[4vw] flex justify-center bg-[#0f0a05]">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b border-bauhaus-yellow text-bauhaus-yellow hover:text-white transition-colors duration-200"
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
