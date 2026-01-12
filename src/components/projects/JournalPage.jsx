import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function JournalPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);

  // Graph Node Animation (Subtle Background)
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let nodes = [];
    const maxNodes = 50;

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
        this.size = Math.random() * 2 + 1; // Smaller, more subtle
        this.vx = (Math.random() - 0.5) * 0.2; // Slower
        this.vy = (Math.random() - 0.5) * 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#000000"; // Pure Black
        ctx.globalAlpha = 0.1; // Very subtle
        ctx.fill();

        // Connect to nearby nodes
        nodes.forEach((other) => {
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "#000000";
            ctx.globalAlpha = (1 - dist / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      }
    }

    for (let i = 0; i < maxNodes; i++) nodes.push(new Node());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isOpen]);

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
      <div className="grid grid-cols-4 w-full border-t-2 border-black max-lg:grid-cols-2 max-md:grid-cols-1">
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
      <div className="border-t-2 border-black p-[4vw]">
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
      <div className="border-t-2 border-black bg-black p-[4vw] text-white">
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
      <div className="border-t border-black/20 p-[4vw] flex justify-center bg-white">
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
