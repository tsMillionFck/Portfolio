import { useState, useEffect, useRef } from "react";

export default function CortexPage({ isOpen, onClose }) {
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

      // Draw triangle accent
      const centerX = width * 0.5;
      const centerY = height * 0.4;
      const triSize = 80 + Math.sin(time) * 10;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY - triSize);
      ctx.lineTo(centerX - triSize * 0.866, centerY + triSize * 0.5);
      ctx.lineTo(centerX + triSize * 0.866, centerY + triSize * 0.5);
      ctx.closePath();
      ctx.strokeStyle = "rgba(241, 154, 46, 0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();

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
            03 — AI / LLM
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-white">
            Cortex
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed text-white/70">
            An intelligent system powered by large language models. Building
            contextual understanding, natural conversations, and cognitive
            assistance that feels like working with a brilliant colleague.
          </p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t border-bauhaus-yellow/20 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-bauhaus-yellow/20 p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-bauhaus-yellow/50">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6 text-white">
            Cortex is an AI-powered platform that transforms how teams interact
            with information. Using state-of-the-art language models, it
            provides intelligent search, content generation, and contextual
            assistance.
          </p>
          <p className="font-body text-base leading-relaxed text-white/60">
            Built with a focus on privacy and control, Cortex can be deployed
            on-premise or in a private cloud, ensuring your data never leaves
            your infrastructure while still delivering cutting-edge AI
            capabilities.
          </p>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-bauhaus-yellow/50">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                "OpenAI API",
                "LangChain",
                "Python",
                "FastAPI",
                "Pinecone",
                "React",
                "TypeScript",
                "Docker",
              ].map((tech) => (
                <span
                  key={tech}
                  className="interactable px-4 py-2 border border-bauhaus-yellow/30 rounded-full font-mono text-sm text-white hover:bg-bauhaus-yellow hover:text-[#0f0a05] transition-colors duration-200 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-bauhaus-yellow/40">
                TIMELINE
              </span>
              <span className="font-display text-lg text-white">16 Weeks</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-bauhaus-yellow/40">
                ROLE
              </span>
              <span className="font-display text-lg text-white">
                AI Engineer
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-bauhaus-yellow/40">
                YEAR
              </span>
              <span className="font-display text-lg text-white">2024</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-bauhaus-yellow/40">
                STATUS
              </span>
              <span className="font-display text-lg text-bauhaus-yellow">
                ● Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Capabilities Section */}
      <div className="border-t border-bauhaus-yellow/20 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-bauhaus-yellow/50">
          AI CAPABILITIES
        </span>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            {
              title: "Semantic Search",
              desc: "Vector-based search that understands meaning, not just keywords. Find exactly what you need instantly.",
            },
            {
              title: "Content Generation",
              desc: "Generate high-quality text, summaries, and documentation with context-aware AI assistance.",
            },
            {
              title: "Conversation Memory",
              desc: "Maintains context across sessions, remembering previous interactions for continuity.",
            },
            {
              title: "RAG Pipeline",
              desc: "Retrieval-Augmented Generation ensures responses are grounded in your actual data.",
            },
            {
              title: "Fine-Tuning",
              desc: "Custom model training on your domain-specific data for specialized understanding.",
            },
            {
              title: "Multi-Modal",
              desc: "Process and understand text, images, code, and structured data seamlessly.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-6 border border-bauhaus-yellow/20 rounded-lg hover:bg-bauhaus-yellow/10 hover:border-bauhaus-yellow transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="border-t border-bauhaus-yellow/20 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-bauhaus-yellow/50">
          USE CASES
        </span>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {[
            {
              title: "Knowledge Base Assistant",
              desc: "Transform your documentation into an intelligent assistant that answers questions naturally.",
            },
            {
              title: "Code Copilot",
              desc: "AI pair programming that understands your codebase and helps write, review, and debug.",
            },
            {
              title: "Customer Support",
              desc: "Automated first-line support that handles common queries and escalates complex issues.",
            },
            {
              title: "Research Analysis",
              desc: "Synthesize insights from large document sets, papers, and reports automatically.",
            },
          ].map((useCase, idx) => (
            <div
              key={idx}
              className="interactable p-8 bg-bauhaus-yellow/5 border border-bauhaus-yellow/20 rounded-lg hover:border-bauhaus-yellow transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-2xl mb-4 text-bauhaus-yellow">
                {useCase.title}
              </h3>
              <p className="font-body text-base text-white/70">
                {useCase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-bauhaus-yellow/20 bg-bauhaus-yellow p-[4vw] text-[#0f0a05]">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              NEED AI INTEGRATION?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build intelligence together.
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
