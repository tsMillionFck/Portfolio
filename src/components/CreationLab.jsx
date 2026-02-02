import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  Atom,
  Server,
  Database,
  Brain,
  Zap,
  Layout,
  Globe,
  Box,
  Code,
  Workflow,
  Layers,
} from "lucide-react";
import CreationLabCursor from "./CreationLabCursor";

// Shell Configuration
// K Shell (Radius 140px): 2 Electrons
// L Shell (Radius 240px): 8 Electrons
// M Shell (Radius 340px): 4 Electrons

const technologies = [
  // K SHELL (Core)
  {
    id: "react",
    label: "React 19",
    desc: "UI Library",
    icon: Atom,
    shell: "K",
    angle: 0,
    color: "var(--color-bauhaus-blue)",
  },
  {
    id: "python",
    label: "Python",
    desc: "Logic Core",
    icon: Code,
    shell: "K",
    angle: 180,
    color: "var(--color-bauhaus-yellow)",
  },

  // L SHELL (Services & AI)
  {
    id: "node",
    label: "Node.js",
    desc: "Runtime",
    icon: Server,
    shell: "L",
    angle: 0,
    color: "var(--color-bauhaus-red)",
  },
  {
    id: "gemini",
    label: "Gemini AI",
    desc: "LLM Model",
    icon: Brain,
    shell: "L",
    angle: 45,
    color: "#8e75b2",
  },
  {
    id: "express",
    label: "Express",
    desc: "API Framework",
    icon: Globe,
    shell: "L",
    angle: 90,
    color: "var(--color-ink)",
  },
  {
    id: "pinecone",
    label: "Pinecone",
    desc: "Vector DB",
    icon: Database,
    shell: "L",
    angle: 135,
    color: "var(--color-ink)",
  },
  {
    id: "gsap",
    label: "GSAP",
    desc: "Animation",
    icon: Zap,
    shell: "L",
    angle: 180,
    color: "var(--color-bauhaus-yellow)",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    desc: "Backend",
    icon: Workflow,
    shell: "L",
    angle: 225,
    color: "var(--color-bauhaus-red)",
  },
  {
    id: "framer",
    label: "Framer",
    desc: "Motion",
    icon: Layout,
    shell: "L",
    angle: 270,
    color: "var(--color-bauhaus-blue)",
  },
  {
    id: "postgres",
    label: "Postgres",
    desc: "Relational DB",
    icon: Database,
    shell: "L",
    angle: 315,
    color: "var(--color-bauhaus-blue)",
  },

  // M SHELL (State & Build)
  {
    id: "mongo",
    label: "MongoDB",
    desc: "NoSQL",
    icon: Database,
    shell: "M",
    angle: 0,
    color: "var(--color-bauhaus-red)",
  },
  {
    id: "zustand",
    label: "Zustand",
    desc: "State Mgmt",
    icon: Box,
    shell: "M",
    angle: 90,
    color: "var(--color-bauhaus-yellow)",
  },
  {
    id: "vite",
    label: "Vite",
    desc: "Build Tool",
    icon: Zap,
    shell: "M",
    angle: 180,
    color: "var(--color-bauhaus-blue)",
  },
  {
    id: "rive",
    label: "Rive",
    desc: "Interactive Graph",
    icon: Layers,
    shell: "M",
    angle: 270,
    color: "#d9437a",
  },
];

export default function CreationLab() {
  const containerRef = useRef(null);
  const toastRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);

  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // K Shell (Clockwise, Fast)
      gsap.to(".shell-k", {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".icon-k", {
        rotation: -360,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // L Shell (Counter-Clockwise, Medium)
      gsap.to(".shell-l", {
        rotation: -360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".icon-l", {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // M Shell (Clockwise, Slow)
      gsap.to(".shell-m", {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".icon-m", {
        rotation: -360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Toast Animation
      gsap.fromTo(
        toastRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1, delay: 1, ease: "power2.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-screen bg-bg text-ink overflow-hidden flex items-center justify-center transition-colors duration-500">
      {/* Foundational Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <CreationLabCursor />

      <Link
        to="/"
        className="fixed top-8 left-8 font-mono text-xs z-50 hover:text-bauhaus-blue transition-colors uppercase tracking-widest text-ink"
      >
        ← Return to Base
      </Link>

      {/* The Atom Container */}
      <div
        ref={containerRef}
        className="relative w-[800px] h-[800px] flex items-center justify-center"
      >
        {/* Nucleus / Central Infosphere */}
        <div
          className={`absolute rounded-full z-20 flex items-center justify-center transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${activeTech ? "w-64 h-64 bg-bg border border-line shadow-2xl scale-100" : "w-8 h-8 bg-ink shadow-[0_0_30px_var(--color-ink)] animate-pulse"}`}
        >
          {!activeTech ? (
            <div className="w-2 h-2 bg-bg rounded-full/50 blur-[0.5px]" />
          ) : (
            <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-300 p-6 relative overflow-hidden rounded-full h-full w-full justify-center">
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${activeTech.color}, transparent 70%)`,
                }}
              />

              <activeTech.icon
                size={48}
                style={{ color: activeTech.color }}
                className="mb-4 relative z-10"
              />
              <h2 className="font-serif text-3xl text-ink leading-none mb-2 relative z-10">
                {activeTech.label}
              </h2>
              <p className="font-mono text-xs text-ink/60 uppercase tracking-widest relative z-10">
                {activeTech.desc}
              </p>
              <div className="mt-4 px-3 py-1 border border-line/20 rounded-full text-[10px] font-mono text-ink/40 relative z-10">
                {activeTech.shell}-ORBITAL
              </div>
            </div>
          )}
        </div>

        {[
          {
            name: "k",
            radius: 140,
            size: 280,
            data: technologies.filter((t) => t.shell === "K"),
          },
          {
            name: "l",
            radius: 240,
            size: 480,
            data: technologies.filter((t) => t.shell === "L"),
          },
          {
            name: "m",
            radius: 340,
            size: 680,
            data: technologies.filter((t) => t.shell === "M"),
          },
        ].map((shell) => (
          <div
            key={shell.name}
            className={`shell-${shell.name} absolute border border-line/30 rounded-full flex items-center justify-center pointer-events-none`}
            style={{ width: shell.size, height: shell.size }}
          >
            {shell.data.map((tech) => (
              <div
                key={tech.id}
                className="absolute w-10 h-10"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${tech.angle}deg) translate(0, -${shell.radius}px) rotate(-${tech.angle}deg)`,
                }}
              >
                <div
                  className={`icon-${shell.name} w-10 h-10 rounded-full bg-bg border border-line/30 flex items-center justify-center text-ink shadow-sm transition-all duration-300 cursor-pointer group hover:z-50 relative pointer-events-auto`}
                  onMouseEnter={() => setActiveTech(tech)}
                  onMouseLeave={() => setActiveTech(null)}
                  style={{
                    borderColor:
                      activeTech?.id === tech.id ? tech.color : undefined,
                    boxShadow:
                      activeTech?.id === tech.id
                        ? `0 0 30px ${tech.color}60`
                        : "",
                    transform:
                      activeTech?.id === tech.id ? "scale(2)" : "scale(1)",
                  }}
                >
                  <tech.icon
                    size={18}
                    style={{
                      color:
                        activeTech?.id === tech.id ? tech.color : "var(--ink)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Idle Hint */}

      {/* Helper Toast */}
      <div
        ref={toastRef}
        className="toast-guide fixed top-8 right-8 z-50 opacity-0 translate-x-10 pointer-events-none"
      >
        <div className="bg-bg border border-line p-4 shadow-[4px_4px_0px_var(--line)] flex items-center gap-3 max-w-[200px]">
          <div
            className="w-2 h-2 bg-bauhaus-red rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: "var(--color-bauhaus-red)" }}
          />
          <p className="font-mono text-[10px] text-ink leading-tight uppercase">
            Hover over electrons to activate system kernel
          </p>
        </div>
      </div>
    </div>
  );
}
