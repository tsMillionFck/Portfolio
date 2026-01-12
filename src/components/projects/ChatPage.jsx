import { useState, useEffect, useRef } from "react";

export default function ChatPage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Message Stream Animation (Matrix/Data Flow style)
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let streams = [];
    const fontSize = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Stream {
      constructor() {
        this.reset();
      }
      reset() {
        this.x =
          Math.floor(Math.random() * (canvas.width / fontSize)) * fontSize;
        this.y = Math.random() * -1000;
        this.speed = Math.random() * 3 + 2;
        this.length = Math.random() * 20 + 10;
        this.chars = [];
        this.generateChars();
      }
      generateChars() {
        // Chat-like symbols and binary
        const chars = "@#MSG_<>{}[]01";
        for (let i = 0; i < this.length; i++) {
          this.chars.push(chars[Math.floor(Math.random() * chars.length)]);
        }
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) this.reset();
      }
      draw() {
        this.chars.forEach((char, i) => {
          const y = this.y - i * fontSize;
          if (y > 0 && y < canvas.height) {
            // Neo-Brutalist Green
            ctx.fillStyle = i === 0 ? "#ffffff" : "#00FF94";
            ctx.globalAlpha = 1 - i / this.length;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, this.x, y);
          }
        });
      }
    }

    const columns = Math.ceil(canvas.width / fontSize);
    for (let i = 0; i < columns / 3; i++) streams.push(new Stream());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear fully for crisp look
      streams.forEach((s) => {
        s.update();
        s.draw();
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
    { name: "Node.js", type: "backend" },
    { name: "Express", type: "backend" },
    { name: "Socket.io", type: "backend" },
    { name: "Gemini AI", type: "backend" },
    { name: "HTML5/CSS3", type: "frontend" },
    { name: "Vanilla JS", type: "frontend" },
  ];

  const features = [
    {
      title: "Interactive AI Personas",
      desc: "Tag bots like @PWTeacher or @Comedian for persona-specific, AI-generated replies powered by Gemini.",
    },
    {
      title: "Real-Time Core",
      desc: "Instant messaging with WebSocket architecture (Socket.io) for low-latency communication.",
    },
    {
      title: "Neo-Brutalist UI",
      desc: "A distinct, bold aesthetic with high contrast, raw layout elements, and vivid green accents.",
    },
    {
      title: "Full-Featured Chat",
      desc: "Supports multiple rooms, live typing indicators, message reactions, and threaded replies.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-ink overflow-y-auto font-mono selection:bg-[#00FF94] selection:text-ink">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] w-12 h-12 flex items-center justify-center text-[#00FF94] bg-ink border-2 border-[#00FF94] rounded-none hover:bg-[#00FF94] hover:text-ink transition-all duration-0 font-bold text-xl shadow-[4px_4px_0px_#00FF94]"
      >
        ✕
      </button>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center p-[8vw] overflow-hidden bg-ink">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        />

        <div className="relative z-10 max-w-5xl">
          <span className="inline-block px-4 py-1 bg-[#00FF94] text-ink text-sm font-bold uppercase tracking-widest mb-6 transform -skew-x-12">
            05 — COMMUNICATION
          </span>
          <h1 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.9] mb-8 uppercase tracking-tighter text-[#fffef8] drop-shadow-[4px_4px_0px_#00FF94]">
            Mio Message
          </h1>
          <p className="text-xl max-w-[700px] leading-relaxed mb-8 text-[#fffef8] border-l-4 border-[#00FF94] pl-6">
            A real-time chat application with{" "}
            <span className="text-[#00FF94] font-bold">Neo-Brutalist</span>{" "}
            design and interactive AI personalities. Talk to bots, talk to
            friends—instantly.
          </p>

          <a
            href="https://chat-application-coral-one-82.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-[#00FF94] text-ink font-bold text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-0 border-2 border-[#00FF94] shadow-[4px_4px_0px_#fffef8] no-underline"
          >
            ▶ ENTER CHATROOM
          </a>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-4 w-full border-t-2 border-[#333] max-lg:grid-cols-2 max-md:grid-cols-1 bg-ink text-[#fffef8]">
        {/* Overview */}
        <div className="col-span-2 max-lg:col-span-1 border-r-2 border-[#333] p-[4vw] max-md:border-r-0">
          <span className="text-xs font-bold uppercase tracking-widest mb-6 block text-[#00FF94]">
            SYSTEM OVERVIEW
          </span>
          <p className="text-lg leading-relaxed mb-6 font-bold">
            Mio Message bridges the gap between human chat and AI interaction.
            It's built on a robust Node.js/Socket.io backend, ensuring messages
            fly instantly.
          </p>
          <div className="p-6 border-2 border-[#fffef8] bg-ink shadow-[4px_4px_0px_#00FF94]">
            <h4 className="font-bold text-[#00FF94] mb-2 uppercase text-xs tracking-wider">
              AI Integration
            </h4>
            <p className="text-sm opacity-90">
              Mention @PWTeacher for a lecture or @Comedian for a joke. The
              backend dynamically routes these tags to specific Gemini prompts.
            </p>
          </div>
        </div>

        {/* Tech Stack & Info */}
        <div className="col-span-2 max-lg:col-span-1 p-[4vw]">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-6 block text-[#00FF94]">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`interactable px-4 py-2 border-2 border-[#333] hover:border-[#00FF94] text-sm hover:text-[#00FF94] transition-colors duration-0 cursor-pointer font-bold`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block opacity-50">
                ROLE
              </span>
              <span className="text-lg">Backend Arch.</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block opacity-50">
                TYPE
              </span>
              <span className="text-lg">Real-time App</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block opacity-50">
                STATUS
              </span>
              <span className="text-lg text-[#00FF94]">● Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t-2 border-[#333] p-[4vw] bg-ink text-[#fffef8]">
        <span className="text-xs font-bold uppercase tracking-widest mb-8 block text-[#00FF94]">
          KEY FEATURES
        </span>
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="interactable p-8 border-2 border-[#333] hover:border-[#00FF94] transition-colors duration-0 cursor-pointer group hover:bg-[#111]"
            >
              <h3 className="font-display text-2xl mb-3 text-[#fffef8] group-hover:text-[#00FF94]">
                {feature.title}
              </h3>
              <p className="text-base opacity-70 leading-relaxed font-mono">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t-2 border-[#333] bg-[#00FF94] p-[4vw] text-ink">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-ink opacity-80">
              JOIN THE CONVERSATION
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase font-bold">
              Start Messaging.
            </h2>
          </div>
          <a
            href="https://chat-application-coral-one-82.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable px-8 py-4 bg-ink text-[#00FF94] font-bold text-lg hover:shadow-[4px_4px_0px_#fffef8] hover:-translate-y-1 transition-all duration-0 no-underline border-2 border-ink"
          >
            Launch App ↗
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t-2 border-[#333] p-[4vw] flex justify-center bg-ink">
        <button
          onClick={onClose}
          className="interactable font-bold text-xl border-b-2 border-[#00FF94] text-[#fffef8] hover:text-[#00FF94] transition-colors duration-0"
        >
          ← EXIT TERMINAL
        </button>
      </div>
    </div>
  );
}
