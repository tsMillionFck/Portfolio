import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function JournalPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("zen"); // zen, ink, grid, noise
  const [showControls, setShowControls] = useState(false);

  // Background Animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];
    let time = 0;

    const resize = () => {
      // Handle high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      init();
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.life = Math.random();
        this.maxLife = 1 + Math.random();
      }
      update() {
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;

        if (mode === "zen") {
          // Breathing movement
          this.x += Math.sin(time * 0.001 + this.y * 0.01) * 0.2;
          this.y += Math.cos(time * 0.001 + this.x * 0.01) * 0.2;
        } else if (mode === "ink") {
          // Flow movement
          this.x += this.vx * 3 + Math.sin(time * 0.005) * 0.5;
          this.y += this.vy * 3 + Math.cos(time * 0.002) * 0.5;
        } else if (mode === "grid") {
          // Static aligned
        } else if (mode === "noise") {
          this.reset(); // Constant flickering
        }

        this.life -= 0.01;
        if (
          this.life <= 0 ||
          this.x < 0 ||
          this.x > w ||
          this.y < 0 ||
          this.y > h
        ) {
          this.reset();
        }
      }
    }

    const init = () => {
      particles = [];
      const count =
        mode === "zen" ? 100 : mode === "ink" ? 200 : mode === "grid" ? 0 : 300;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawZen = (w, h) => {
      // Soft glowing focus light
      const cx = w / 2 + Math.sin(time * 0.0005) * (w * 0.1);
      const cy = h / 2 + Math.cos(time * 0.0007) * (h * 0.1);

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.6);
      gradient.addColorStop(0, "rgba(0,0,0,0.0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.06)"); // Vignette
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Subtle floating specs
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      particles.forEach((p) => {
        p.update();
        ctx.globalAlpha = Math.sin(p.life * Math.PI) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawInk = (w, h) => {
      // Organic ink trails
      ctx.fillStyle = "rgba(255,255,255,0.02)"; // Trails
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#000";
      particles.forEach((p) => {
        p.update();
        ctx.globalAlpha = Math.sin(p.life * Math.PI) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawGrid = (w, h) => {
      // Moving grid
      const gridSize = 40;
      const offsetX = (time * 0.5) % gridSize;
      const offsetY = (time * 0.2) % gridSize;

      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = offsetX; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = offsetY; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const drawNoise = (w, h) => {
      // Digital Noise
      particles.forEach((p) => {
        p.update();
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
    };

    const animate = () => {
      time += 16;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      if (mode !== "ink") {
        ctx.clearRect(0, 0, w, h);
      }

      if (mode === "zen") drawZen(w, h);
      else if (mode === "ink") drawInk(w, h);
      else if (mode === "grid") drawGrid(w, h);
      else if (mode === "noise") drawNoise(w, h);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const designSystem = [
    {
      title: "Headings",
      value: "Playfair Display (Serif)",
      font: "font-serif",
    },
    { title: "Body", value: "Lora (Serif)", font: "font-journal-serif" },
    { title: "UI Elements", value: "Inter (Sans-serif)", font: "font-sans" },
    {
      title: "Theme",
      value: "Stark Black & White (#000/#FFF)",
      font: "font-mono",
    },
  ];

  const interactions = [
    {
      title: "View Transitions",
      desc: "Orchestrated exits and entries. Calendar fades out while the editor staggers upward (y: 30 → y: 0).",
    },
    {
      title: "Zen Mode",
      desc: "Toggling this mode fades out all UI chrome (sidebar, headers), leaving only the text editor for immersion.",
    },
    {
      title: "Micro-interactions",
      desc: "Hover tooltips with precise fadeInUp animations and 'Entry Dots' on calendar days.",
    },
    {
      title: "Monastic Focus",
      desc: "Eliminates visual noise to keep the user in a 'flow' state. A digital sanctuary.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-white text-black overflow-y-auto selection:bg-black selection:text-white">
      {/* Test Controls (Developer Mode) */}
      <div
        className={`fixed left-6 bottom-6 z-[220] flex flex-col gap-2 transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white border-2 border-black p-2 rounded shadow-xl flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-center border-b border-black/10 pb-1">
            Animation Mode
          </span>
          {["zen", "ink", "grid", "noise"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 font-sans text-xs uppercase tracking-wider text-left hover:bg-black hover:text-white transition-colors flex justify-between items-center ${
                mode === m ? "bg-black text-white" : "text-black"
              }`}
            >
              {m} {mode === m && "●"}
            </button>
          ))}
        </div>
      </div>
      {/* Trigger for controls */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed left-6 bottom-6 z-[221] w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-black/5 text-black/20 hover:text-black transition-colors"
        title="Dev Controls"
      >
        ⚙
      </button>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-black bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 font-serif text-xl"
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
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-black opacity-60">
            03 — PRODUCTIVITY
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-black">
            One-Journal
          </h1>
          <p className="font-journal-serif text-2xl max-w-[800px] leading-relaxed mb-8 text-black italic">
            "Monastic Minimalism" — A design that prioritizes typography and
            whitespace to create a calm, paper-like reading and writing
            experience.
          </p>

          <a
            href="https://one-journal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-10 py-5 bg-black text-white font-serif text-xl rounded-full hover:scale-105 transition-transform duration-200 border-2 border-black no-underline shadow-xl"
          >
            Explore Design System
          </a>
        </div>
      </div>

      {/* Details Grid */}
      <div className="relative z-10 bg-white grid grid-cols-4 w-full border-t-2 border-black max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Core Aesthetic */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-black p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-black">
            CORE AESTHETIC
          </span>
          <p className="font-journal-serif text-xl leading-relaxed mb-8 text-black">
            It eliminates visual noise to keep the user in a "flow" state. The
            interface recedes, allowing the thought to take center stage.
          </p>
          <div className="p-8 border-[1px] border-black/20 rounded-lg bg-white box-decoration-clone">
            <h4 className="font-serif italic text-2xl mb-4">Typography</h4>
            <ul className="space-y-4">
              {designSystem.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wider opacity-50 mb-1">
                    {item.title}
                  </span>
                  <span className={`text-lg ${item.font}`}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Palette & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-black">
              COLOR PALETTE
            </span>
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 bg-black rounded-full border border-black shadow-lg"></div>
              <div className="w-16 h-16 bg-white rounded-full border border-gray-200 shadow-sm"></div>
              <div className="w-16 h-16 bg-[#e5e7eb] rounded-full border border-[#d1d5db]"></div>
            </div>
            <p className="font-sans text-sm text-gray-600">
              Stark Black (#000) & White. Soft gray (#6b7280) for metadata.
              Subtle borders (#e5e7eb) that darken in Zen Mode.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-40 text-black">
                ROLE
              </span>
              <span className="font-display text-lg text-black">
                Design System Arch.
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-40 text-black">
                YEAR
              </span>
              <span className="font-display text-lg text-black">2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactions Section */}
      <div className="relative z-10 bg-white border-t-2 border-black p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-12 block text-black">
          INTERACTIONS & MOTION
        </span>
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {interactions.map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-10 border border-black rounded-sm hover:bg-black hover:text-white transition-all duration-500 cursor-default group"
            >
              <h3 className="font-serif text-3xl mb-4 italic">
                {feature.title}
              </h3>
              <p className="font-journal-serif text-lg opacity-80 leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 border-t-2 border-black bg-black p-[4vw] text-white">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-8 max-md:items-start">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-4 block text-white/60">
              EXPERIENCE THE FLOW
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-tight">
              Start your daily log.
            </h2>
          </div>
          <a
            href="https://one-journal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable px-12 py-6 bg-white text-black font-serif text-xl rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Launch Prototype ↗
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 border-t border-black/20 p-[4vw] flex justify-center bg-white">
        <button
          onClick={onClose}
          className="interactable font-sans text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity text-black"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}
