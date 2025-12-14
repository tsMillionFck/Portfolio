import { useState, useEffect, useRef } from "react";

export default function OrbitPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Orbital animation for hero
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

    const drawOrbitalSystem = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw orbital rings
      const rings = [
        { radius: 80, color: "rgba(46, 91, 241, 0.3)", width: 2 },
        { radius: 150, color: "rgba(46, 91, 241, 0.2)", width: 1 },
        { radius: 220, color: "rgba(46, 91, 241, 0.15)", width: 1 },
        { radius: 300, color: "rgba(46, 91, 241, 0.1)", width: 1 },
      ];

      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        ctx.stroke();
      });

      // Draw orbiting particles
      const particles = [
        { orbit: 80, speed: 0.02, size: 8, color: "#2e5bf1" },
        { orbit: 80, speed: 0.02, size: 5, color: "#2e5bf1", offset: Math.PI },
        { orbit: 150, speed: 0.015, size: 6, color: "#e94e34" },
        {
          orbit: 150,
          speed: 0.015,
          size: 4,
          color: "#e94e34",
          offset: Math.PI * 0.7,
        },
        { orbit: 220, speed: 0.01, size: 5, color: "#f19a2e" },
        {
          orbit: 220,
          speed: 0.01,
          size: 3,
          color: "#f19a2e",
          offset: Math.PI * 1.3,
        },
        { orbit: 300, speed: 0.005, size: 4, color: "#2e5bf1" },
      ];

      particles.forEach((p) => {
        const offset = p.offset || 0;
        const x = centerX + Math.cos(time * p.speed * 60 + offset) * p.orbit;
        const y = centerY + Math.sin(time * p.speed * 60 + offset) * p.orbit;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Central orb with pulse
      const pulseSize = 20 + Math.sin(time * 2) * 5;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        pulseSize * 2
      );
      gradient.addColorStop(0, "#2e5bf1");
      gradient.addColorStop(0.5, "rgba(46, 91, 241, 0.5)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = "#2e5bf1";
      ctx.fill();

      time += 0.016;
      animationRef.current = requestAnimationFrame(drawOrbitalSystem);
    };

    drawOrbitalSystem();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#050510] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-white bg-transparent border-2 border-white/30 rounded-full hover:bg-white hover:text-[#050510] transition-all duration-300 font-display text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        {/* Orbital Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-blue">
            02 — WEBGL / 3D
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em] text-white">
            Orbit
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed text-white/70">
            An immersive 3D web experience built with WebGL and Three.js.
            Exploring the boundaries of what's possible in the browser through
            real-time graphics and physics simulations.
          </p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t border-white/20 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-white/20 p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-white/50">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6 text-white">
            Orbit pushes the boundaries of web-based 3D graphics, creating an
            experience that rivals native applications. Built from the ground up
            with performance in mind.
          </p>
          <p className="font-body text-base leading-relaxed text-white/60">
            Using custom shaders, physics engines, and optimized rendering
            pipelines, Orbit demonstrates that the browser is no longer a
            limitation—it's a canvas for unlimited creativity.
          </p>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-white/50">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                "Three.js",
                "WebGL",
                "GLSL Shaders",
                "React Three Fiber",
                "Cannon.js",
                "GSAP",
                "Vite",
                "TypeScript",
              ].map((tech) => (
                <span
                  key={tech}
                  className="interactable px-4 py-2 border border-white/30 rounded-full font-mono text-sm text-white hover:bg-bauhaus-blue hover:border-bauhaus-blue transition-colors duration-200 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/40">
                TIMELINE
              </span>
              <span className="font-display text-lg text-white">12 Weeks</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/40">
                ROLE
              </span>
              <span className="font-display text-lg text-white">
                Creative Developer
              </span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/40">
                YEAR
              </span>
              <span className="font-display text-lg text-white">2024</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block text-white/40">
                STATUS
              </span>
              <span className="font-display text-lg text-bauhaus-blue">
                ● In Development
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Features Section */}
      <div className="border-t border-white/20 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-white/50">
          TECHNICAL FEATURES
        </span>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            {
              title: "Custom Shaders",
              desc: "Hand-written GLSL shaders for unique visual effects including volumetric lighting and particle systems.",
            },
            {
              title: "60 FPS Target",
              desc: "Optimized render loop with LOD systems and frustum culling for smooth performance on all devices.",
            },
            {
              title: "Physics Engine",
              desc: "Integrated Cannon.js for realistic physics simulations including gravity, collisions, and constraints.",
            },
            {
              title: "Procedural Generation",
              desc: "Algorithmic content creation for infinite, unique environments using noise functions.",
            },
            {
              title: "Post-Processing",
              desc: "Bloom, depth of field, chromatic aberration, and custom effects for cinematic visuals.",
            },
            {
              title: "Responsive 3D",
              desc: "Adaptive quality settings and touch controls for seamless mobile experience.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-6 border border-white/20 rounded-lg hover:bg-bauhaus-blue/20 hover:border-bauhaus-blue transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Demo Section */}
      <div className="border-t border-white/20 p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block text-white/50">
          VISUAL DEMO
        </span>
        <div className="aspect-video bg-[#0a0a15] rounded-lg border border-white/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bauhaus-blue/20 flex items-center justify-center">
              <span className="text-3xl">▶</span>
            </div>
            <span className="font-mono text-sm text-white/50">
              Interactive demo coming soon
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-white/20 bg-bauhaus-blue p-[4vw] text-white">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              WANT SOMETHING SIMILAR?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's create an immersive experience.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-white text-bauhaus-blue font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Start a Project →
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t border-white/20 p-[4vw] flex justify-center bg-[#050510]">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b border-white text-white hover:text-bauhaus-blue transition-colors duration-200"
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
