import { useState, useEffect, useRef } from "react";

export default function MewoPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Sound wave animation for hero
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

    const drawSoundWaves = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const colors = ["#f19a2e", "#e94e34", "#2e5bf1"];
      const barCount = 40;
      const barWidth = width / barCount - 4;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 4) + 2;
        const wave1 = Math.sin(i * 0.3 + time * 2) * 40;
        const wave2 = Math.sin(i * 0.5 + time * 1.5) * 30;
        const wave3 = Math.cos(i * 0.2 + time * 2.5) * 20;

        const barHeight = Math.abs(wave1 + wave2 + wave3) + 20;
        const colorIndex = i % colors.length;

        ctx.fillStyle = colors[colorIndex];
        ctx.globalAlpha = 0.7;
        ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
      }

      ctx.globalAlpha = 1;
      time += 0.02;
      animationRef.current = requestAnimationFrame(drawSoundWaves);
    };

    drawSoundWaves();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-bg overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-ink bg-bg border-2 border-line rounded-full hover:bg-ink hover:text-bg transition-all duration-300 font-display text-xl"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden">
        {/* Sound Wave Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-yellow">
            06 — MUSIC
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Mewo
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed opacity-80 mb-8">
            A typographic music player with Swiss design principles. Bold
            typography meets fluid animations for a minimal yet expressive
            listening experience.
          </p>
          {/* Launch Demo Button - Opens in new tab */}
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-bauhaus-yellow text-ink font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 border-2 border-ink no-underline"
          >
            ▶ Launch Demo
          </a>
          <p className="font-mono text-xs opacity-50 mt-4">
            Requires running: cd musicPlayer3.0 && npm run dev
          </p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t-2 border-line max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-line p-[4vw] max-md:border-r-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block">
            OVERVIEW
          </span>
          <p className="font-display text-lg leading-relaxed mb-6">
            Mewo strips away the visual noise of modern music players, letting
            typography and motion tell the story. Giant song titles become the
            interface.
          </p>
          <p className="font-body text-base leading-relaxed opacity-70">
            Built with a focus on typography-first design, Mewo uses massive
            type scales and subtle animations to create an immersive audio
            experience. The background dims when playing, focusing attention
            entirely on the music.
          </p>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 block">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Vite",
                "TailwindCSS",
                "Node.js",
                "Express",
                "React Feather",
                "Custom Hooks",
              ].map((tech) => (
                <span
                  key={tech}
                  className="interactable px-4 py-2 border-2 border-line rounded-full font-mono text-sm hover:bg-ink hover:text-bg transition-colors duration-200 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                TIMELINE
              </span>
              <span className="font-display text-lg">4 Weeks</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                ROLE
              </span>
              <span className="font-display text-lg">Full Stack Dev</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                YEAR
              </span>
              <span className="font-display text-lg">2024</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                STATUS
              </span>
              <span className="font-display text-lg text-bauhaus-yellow">
                ● Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-line p-[4vw]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest mb-8 block">
          KEY FEATURES
        </span>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {[
            {
              title: "Typographic Display",
              desc: "Giant song titles fill the screen, making typography the primary visual element.",
            },
            {
              title: "Dark Mode Toggle",
              desc: "Seamless theme switching with smooth transitions between light and dark modes.",
            },
            {
              title: "Focus Mode",
              desc: "Background dims when playing, creating an immersive listening environment.",
            },
            {
              title: "Drag & Drop Upload",
              desc: "Simple song management with drag-and-drop file uploading.",
            },
            {
              title: "Shuffle & Repeat",
              desc: "Full playback controls including shuffle and repeat modes.",
            },
            {
              title: "Visual Feedback",
              desc: "Spark effects and animations respond to user interactions.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-6 border-2 border-line rounded-lg hover:bg-ink hover:text-bg transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-display text-xl mb-3">{feature.title}</h3>
              <p className="font-body text-sm opacity-70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t-2 border-line bg-bauhaus-yellow p-[4vw] text-ink">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-70">
              INTERESTED?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">
              Let's build something similar.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="interactable px-8 py-4 bg-ink text-bauhaus-yellow font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
          >
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t-2 border-line p-[4vw] flex justify-center">
        <button
          onClick={onClose}
          className="interactable font-display text-xl border-b-2 border-ink hover:text-bauhaus-blue transition-colors duration-200"
        >
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}
