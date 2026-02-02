import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function JournalSheet() {
  const [mode, setMode] = useState("zen"); // zen, ink, grid, typo
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Clear previous animations if any (handled by context cleanup usually, but explicit logic helps)

        if (mode === "zen") {
          // Zen Mode: Subtle breathing and light movement
          gsap.to(".zen-glow", {
            x: "20%",
            y: "10%",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(".journal-line", {
            opacity: 0.6,
            stagger: { each: 0.5, yoyo: true, repeat: -1 },
            duration: 2,
            ease: "sine.inOut",
          });
        }

        if (mode === "ink") {
          // Ink Mode: Spreading ink on hover (handled in CSS/JS) but here continuous pulse
          gsap.fromTo(
            ".ink-blot",
            { scale: 0.8, opacity: 0.1 },
            {
              scale: 1.2,
              opacity: 0.2,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            }
          );
        }

        if (mode === "grid") {
          // Grid Mode: Scrolling background
          gsap.to(".grid-bg", {
            backgroundPosition: "10px 10px",
            duration: 2,
            repeat: -1,
            ease: "none",
          });
        }

        if (mode === "typo") {
          // Typo/Focus: Text lines appearing/glitching
          gsap.fromTo(
            ".journal-line",
            { width: "0%" },
            { width: "100%", duration: 0.5, stagger: 0.2, ease: "power2.out" }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [mode] }
  );

  return (
    <div
      ref={containerRef}
      className="relative group w-[100px] h-[120px] isolate"
    >
      {/* 
        MAIN CARD CONTAINER 
        We use conditional classes for base styling depending on mode
      */}
      <div
        className={`
          w-full h-full border-2 p-[15px] relative flex flex-col gap-2 
          transition-all duration-500 shadow-[4px_4px_0_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden
          ${
            mode === "void"
              ? "bg-black border-white text-white shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
              : "bg-white border-ink text-ink group-hover:shadow-[8px_8px_0_var(--ink)]"
          }
          group-hover:translate-y-[-5px] group-hover:rotate-[-2deg]
        `}
      >
        {/* BACKGROUND ANIMATION LAYERS */}

        {/* 1. Zen Mode: Soft Glow */}
        {mode === "zen" && (
          <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply">
            <div className="zen-glow absolute -top-10 -left-10 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)]" />
          </div>
        )}

        {/* 2. Ink Mode: Blot */}
        {mode === "ink" && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="ink-blot w-[80px] h-[80px] rounded-full bg-black blur-2xl opacity-10" />
          </div>
        )}

        {/* 3. Grid Mode: Lines */}
        {mode === "grid" && (
          <div className="grid-bg absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:10px_10px]" />
        )}

        {/* CONTENT */}
        {/* Date Header */}
        <div
          className={`
            font-serif text-[1.8rem] font-black leading-none pb-[5px] mb-[5px] border-b-2 z-10 relative
            ${mode === "void" ? "border-white" : "border-ink"}
          `}
        >
          14
        </div>

        {/* Text Lines */}
        <div
          className={`journal-line h-1 w-full transition-colors duration-300 ${
            mode === "void"
              ? "bg-white/30 group-hover:bg-white"
              : "bg-[#ddd] group-hover:bg-bauhaus-red"
          }`}
        />
        <div
          className={`journal-line h-1 w-full transition-colors duration-300 ${
            mode === "void"
              ? "bg-white/30 group-hover:bg-white"
              : "bg-[#ddd] group-hover:bg-bauhaus-red"
          }`}
        />
        <div
          className={`journal-line h-1 w-[60%] transition-colors duration-300 ${
            mode === "void"
              ? "bg-white/30 group-hover:bg-white"
              : "bg-[#ddd] group-hover:bg-bauhaus-red"
          }`}
        />
      </div>

      {/* 
        TEST CONTROLS - Floating below the card
        Only visible on hover of the wrapper to keep UI clean, 
        or always visible if 'Test Form' implies a permanent fixture for now.
        Let's keep it subtle: A row of dots below.
      */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 p-1.5 rounded-full border border-black/10 backdrop-blur-sm shadow-sm scale-0 transition-transform group-hover:scale-100 origin-top z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setMode("zen")}
          className={`w-3 h-3 rounded-full border border-black transition-all ${
            mode === "zen"
              ? "bg-black scale-110"
              : "bg-transparent hover:bg-black/10"
          }`}
          title="Zen Mode (Best)"
        />
        <button
          onClick={() => setMode("ink")}
          className={`w-3 h-3 rounded-full border border-black transition-all ${
            mode === "ink"
              ? "bg-black scale-110"
              : "bg-transparent hover:bg-black/10"
          }`}
          title="Ink Flow"
        />
        <button
          onClick={() => setMode("grid")}
          className={`w-3 h-3 rounded-full border border-black transition-all ${
            mode === "grid"
              ? "bg-black scale-110"
              : "bg-transparent hover:bg-black/10"
          }`}
          title="Grid Structure"
        />
        <button
          onClick={() => setMode("void")}
          className={`w-3 h-3 rounded-full border border-black transition-all ${
            mode === "void"
              ? "bg-black scale-110"
              : "bg-transparent hover:bg-black/10"
          }`}
          title="Dark Focus"
        />
      </div>

      {/* Label for current mode (optional, for clarity) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {mode}
      </div>
    </div>
  );
}
