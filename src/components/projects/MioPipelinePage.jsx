import { useState, useEffect, useRef } from "react";

export default function MioPipelinePage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Cyber-Swiss Node Graph Animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Nodes for the animation
    const nodes = [];
    const nodeCount = 8;

    // Create nodes grid-ish
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        width: 120,
        height: 60,
        state: Math.random() > 0.5 ? "idle" : "executing", // idle, executing, error
        pulse: 0,
        connections: [], // indices of connected nodes
      });
    }

    // Creating some random connections
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        if (Math.random() > 0.3) {
          node.connections.push(i + 1);
        }
      }
    });

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(187, 154, 247, 0.1)"; // faint purple
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = "#1a1b26"; // Deep blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      // Draw connections first
      nodes.forEach((node, i) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          if (target) {
            ctx.beginPath();
            // "Surgical Edge" - Orthogonal or direct with techno feel
            ctx.moveTo(node.x + node.width, node.y + node.height / 2);

            // Simple curve
            const cp1x = node.x + node.width + 50;
            const cp1y = node.y + node.height / 2;
            const cp2x = target.x - 50;
            const cp2y = target.y + target.height / 2;

            ctx.bezierCurveTo(
              cp1x,
              cp1y,
              cp2x,
              cp2y,
              target.x,
              target.y + target.height / 2,
            );

            ctx.strokeStyle = "#414868";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Execution pulse on wire
            if (node.state === "executing") {
              const time = Date.now() / 1000;
              const offset = time % 1; // 0 to 1
              // interpolate point ? simplified for now, just glowing line
              ctx.shadowColor = "#bb9af7";
              ctx.shadowBlur = 10;
              ctx.strokeStyle = "#bb9af7";
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      // Draw Nodes
      nodes.forEach((node) => {
        // Pulse logic
        if (node.state === "executing") {
          node.pulse = (Math.sin(Date.now() / 200) + 1) / 2; // 0 to 1
        }

        // Node Body
        ctx.fillStyle = "#24283b";
        ctx.fillRect(node.x, node.y, node.width, node.height);

        // Border
        ctx.strokeStyle = node.state === "executing" ? "#bb9af7" : "#565f89";
        ctx.lineWidth = node.state === "executing" ? 2 : 1;

        if (node.state === "executing") {
          ctx.shadowColor = "#bb9af7";
          ctx.shadowBlur = 10 * node.pulse;
        }

        ctx.strokeRect(node.x, node.y, node.width, node.height);
        ctx.shadowBlur = 0;

        // "Plate" Design details
        ctx.fillStyle = "#414868";
        ctx.fillRect(node.x + 10, node.y + 10, node.width - 20, 20); // Title bar

        // Status footer
        if (node.state === "executing") {
          ctx.fillStyle = "#bb9af7";
          ctx.fillRect(
            node.x + 10,
            node.y + 40,
            (node.width - 20) * node.pulse,
            4,
          );
        }
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
    { name: "React Flow", type: "frontend" },
    { name: "TypeScript", type: "frontend" },
    { name: "FastAPI", type: "backend" },
    { name: "Gemini", type: "backend" },
    { name: "Pinecone", type: "backend" },
    { name: "Zustand", type: "frontend" },
    { name: "GSAP", type: "frontend" },
  ];

  const features = [
    {
      title: "Visual Execution Engine",
      desc: "Construct complex data pipelines by dragging nodes onto an infinite canvas. Uses Kahn’s Algorithm for dependency resolution.",
    },
    {
      title: "Cyber-Swiss Aesthetics",
      desc: "A premium industrial design language with deep blues (#1a1b26), surgical animations, and rack-mounted UI modules.",
    },
    {
      title: "Mio AI Assistant",
      desc: "Integrated bot assistant that triggers executions, explains logic, and reacts to pipeline states in real-time.",
    },
    {
      title: "Topological Compilation",
      desc: "Frontend graph converts to a JSON payload, topologically sorted by the backend for precise execution order.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#1a1b26] overflow-y-auto font-sans selection:bg-[#bb9af7] selection:text-[#1a1b26] text-[#a9b1d6]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-[#c0caf5] bg-[#1a1b26] border border-[#565f89] rounded-full hover:bg-[#bb9af7] hover:text-[#1a1b26] hover:border-[#bb9af7] transition-all duration-300 font-mono text-xl shadow-[0_0_15px_rgba(187,154,247,0.3)]"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden bg-[#1a1b26]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-[#bb9af7]">
            PROJECT: MIO-PIPELINE
          </span>
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-8 font-bold tracking-tight text-[#c0caf5]">
            Mio-Pipeline
          </h1>
          <p className="font-mono text-xl max-w-[700px] leading-relaxed opacity-90 mb-8 text-[#a9b1d6]">
            High-performance{" "}
            <span className="text-[#bb9af7]">
              Visual Programming Environment
            </span>
            . Construct and execute complex data pipelines with industrial
            precision and futuristic visualization.
          </p>

          <a
            href="https://yashu-frontend-technical-assessment.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-[#bb9af7] text-[#1a1b26] font-bold rounded-sm hover:translate-x-1 hover:shadow-[5px_5px_0px_#565f89] transition-all duration-200 border border-[#bb9af7] uppercase tracking-wider font-mono no-underline"
          >
            Launch Console_
          </a>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-4 w-full border-y border-[#565f89] bg-[#16161e] max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* About */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-[#565f89] p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-[#7aa2f7]">
            SYSTEM CORE
          </span>
          <p className="font-sans text-lg leading-relaxed mb-6 text-[#c0caf5]">
            Mio-Pipeline functions as a Graph Execution Engine. Users connect
            Inputs, LLMs, and Logic Gates to define flow. The system handles
            topological sorting, node execution, and dynamic data passing with
            visual feedback like "Surgical Pulse" and haptic shakes.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-[#7aa2f7]">
            STACK TRACE
          </span>
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 bg-[#24283b] border border-[#565f89] rounded-sm text-sm font-mono text-[#9aa5ce]"
              >
                {tech.name}
              </span>
            ))}
          </div>
          <div className="flex gap-12">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#565f89] mb-1">
                Type
              </span>
              <span className="text-lg font-medium text-[#c0caf5]">
                Visual IDE
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#565f89] mb-1">
                Status
              </span>
              <span className="text-lg font-medium text-[#9ece6a]">
                ● Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="p-[4vw] bg-[#1a1b26]">
        <h3 className="font-display text-3xl font-bold mb-12 text-[#c0caf5] border-l-4 border-[#bb9af7] pl-4">
          Module Capabilities
        </h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 max-md:grid-cols-1">
          {features.map((feature, idx) => (
            <div key={idx} className="group">
              <h4 className="font-bold text-xl mb-3 text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors font-mono">
                {feature.title}
              </h4>
              <p className="text-[#a9b1d6] leading-relaxed border-l border-[#565f89] pl-4 group-hover:border-[#bb9af7] transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-[4vw] bg-[#0f0f14] text-[#c0caf5] flex flex-col items-center text-center border-t border-[#565f89]">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] mb-6 tracking-tight">
          Initialize <span className="text-[#bb9af7]">Protocol</span>
        </h2>
        <a
          href="https://yashu-frontend-technical-assessment.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="interactable inline-block px-10 py-5 bg-[#bb9af7] text-[#1a1b26] font-bold rounded-sm hover:translate-x-1 hover:shadow-[5px_5px_0px_#565f89] transition-all duration-200 border border-[#bb9af7] uppercase tracking-wider font-mono no-underline text-lg"
        >
          Initialize Protocol_
        </a>
      </div>

      {/* Back Button */}
      <div className="border-t border-[#565f89] p-[4vw] flex justify-center bg-[#1a1b26]">
        <button
          onClick={onClose}
          className="relative z-50 cursor-pointer interactable font-mono text-sm uppercase tracking-widest border-b border-[#bb9af7] pb-1 hover:opacity-100 hover:text-[#bb9af7] opacity-60 transition-all text-[#c0caf5]"
        >
          ← Return to Dashboard
        </button>
      </div>
    </div>
  );
}
