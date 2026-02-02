import { useState, useEffect, useRef } from "react";

export default function UILibraryPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Dynamic Style Animation
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

    const drawStyles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Floating Shapes representing different styles

      // 1. Neo-Brutalism (Hard Shadows, Bold)
      const brutalX = cx - 300 + Math.sin(time) * 20;
      const brutalY = cy - 100 + Math.cos(time * 0.8) * 20;
      ctx.fillStyle = "#000";
      ctx.fillRect(brutalX + 10, brutalY + 10, 100, 100); // Shadow
      ctx.fillStyle = "#FFDD00";
      ctx.fillRect(brutalX, brutalY, 100, 100);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.strokeRect(brutalX, brutalY, 100, 100);

      // 2. Glassmorphism (Blurry, White with opacity)
      const glassX = cx + Math.sin(time * 1.2) * 50;
      const glassY = cy + Math.cos(time * 0.5) * 50;
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(glassX, glassY, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 3. Swiss Style (Grid, Typography)
      const swissX = cx + 250 + Math.cos(time) * 30;
      const swissY = cy - 50 + Math.sin(time * 0.7) * 30;
      ctx.fillStyle = "#F5F5F5";
      ctx.fillRect(swissX, swissY, 120, 160);
      ctx.fillStyle = "#FF4500"; // Orange Accent
      ctx.beginPath();
      ctx.arc(swissX + 60, swissY + 60, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 20px Arial";
      ctx.fillText("HELV", swissX + 10, swissY + 140);

      time += 0.01;
      animationRef.current = requestAnimationFrame(drawStyles);
    };
    drawStyles();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const features = [
    {
      title: "Interactive Catalog",
      desc: "A sidebar-driven engine to switch between 'Design Schools' like Structuralists, Morphisms, and Extremists in real-time.",
    },
    {
      title: "Live Rendering",
      desc: "Instantly renders complex React components. See a Claymorphism profile or a Neomorphism thermostat work live.",
    },
    {
      title: "Context-Aware",
      desc: "The background adapts to the style. Purple for Maximalism, Grey for Swiss. A truly immersive educational showcase.",
    },
    {
      title: "Dual Architecture",
      desc: "Available as a modern React/Vite app AND a zero-build portable HTML file for maximum flexibility.",
    },
  ];

  const designSchools = [
    {
      name: "The Structuralists",
      styles: ["Minimalism", "Swiss Style", "Bento Grid"],
      color: "border-blue-500 text-blue-500",
    },
    {
      name: "The Morphisms",
      styles: ["Glassmorphism", "Neomorphism", "Claymorphism", "Aurora"],
      color: "border-purple-500 text-purple-500",
    },
    {
      name: "The Extremists",
      styles: ["Neo-Brutalism", "Maximalism", "Skeuomorphism"],
      color: "border-yellow-500 text-yellow-600",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-50 overflow-y-auto font-sans text-zinc-900 selection:bg-blue-500 selection:text-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-zinc-900 bg-white border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300 font-display text-xl shadow-lg cursor-pointer"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-blue-600">
            05 — VISUAL ENCYCLOPEDIA
          </span>
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-8 font-bold tracking-tight text-zinc-900">
            UI/UX Library
          </h1>
          <p className="font-sans text-xl max-w-[700px] leading-relaxed opacity-80 mb-8 text-zinc-700">
            A curated{" "}
            <span className="font-bold text-blue-600">Design Encyclopedia</span>
            . Explore, visualize, and implement distinct web design aesthetics
            from Swiss Style to Neo-Brutalism.
          </p>

          <a
            href="https://ui-library-x.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-xl shadow-blue-200/50 no-underline"
          >
            Explore Library ↗
          </a>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-4 w-full bg-white border-y border-zinc-200 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* About */}
        <div className="col-span-2 max-lg:col-span-1 border-r border-zinc-200 p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-zinc-400">
            CONCEPT
          </span>
          <p className="font-sans text-lg leading-relaxed mb-6 text-zinc-800">
            This library functions as a living documentation for UI trends. It
            deconstructs complex aesthetics like the soft blurs of Aurora or the
            bold borders of Brutalism into reusable, interactive components.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block text-zinc-400">
            TECHNOLOGY
          </span>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "React 18",
              "Vite",
              "Tailwind v4",
              "PostCSS",
              "Framer Motion",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-zinc-100 rounded-md text-sm font-medium text-zinc-600"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-12">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Type
              </span>
              <span className="text-lg font-medium">Design Catalog</span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Status
              </span>
              <span className="text-lg font-medium text-blue-600">
                ● Live Beta
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Design Schools Section */}
      <div className="p-[4vw] bg-zinc-50 border-b border-zinc-200">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-10 block text-zinc-400">
          THE DESIGN SCHOOLS
        </span>
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {designSchools.map((school) => (
            <div
              key={school.name}
              className={`p-6 bg-white rounded-xl border-l-4 shadow-sm ${school.color}`}
            >
              <h3 className="font-display text-2xl font-bold mb-4 text-zinc-900">
                {school.name}
              </h3>
              <ul className="space-y-2">
                {school.styles.map((style) => (
                  <li
                    key={style}
                    className="flex items-center gap-2 text-zinc-600"
                  >
                    <span className="w-1.5 h-1.5 bg-current rounded-full opacity-50"></span>
                    {style}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-[4vw] bg-white">
        <h3 className="font-display text-3xl font-bold mb-12 text-zinc-900">
          Key Capabilities
        </h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 max-md:grid-cols-1">
          {features.map((feature, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-xl mb-3 text-zinc-900">
                {feature.title}
              </h4>
              <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-[4vw] bg-zinc-900 text-white flex flex-col items-center text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] mb-6">
          Explore the Aesthetics
        </h2>
        <a
          href="https://ui-library-x.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-5 bg-white text-zinc-900 font-bold rounded-full hover:scale-105 transition-transform duration-200 no-underline"
        >
          Launch Encyclopedia
        </a>
      </div>

      {/* Back Button */}
      <div className="border-t border-zinc-800 p-[4vw] flex justify-center bg-zinc-900">
        <button
          onClick={onClose}
          className="relative z-50 cursor-pointer interactable font-sans text-sm uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity text-white"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}
