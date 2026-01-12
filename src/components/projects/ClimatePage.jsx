import { useState, useEffect, useRef } from "react";

export default function ClimatePage({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Weather/clouds animation for hero
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const clouds = [];
    for (let i = 0; i < 8; i++) {
      clouds.push({
        x: Math.random() * 1000,
        y: Math.random() * 300 + 100,
        width: Math.random() * 150 + 100,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    const raindrops = [];
    for (let i = 0; i < 100; i++) {
      raindrops.push({
        x: Math.random() * 1000,
        y: Math.random() * 600,
        speed: Math.random() * 5 + 3,
        length: Math.random() * 15 + 5,
      });
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWeather = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw clouds
      ctx.fillStyle = "#2e5bf1";
      ctx.globalAlpha = 0.15;

      clouds.forEach((cloud) => {
        const x = ((cloud.x + time * cloud.speed * 50) % (width + 200)) - 100;

        // Draw cloud shape
        ctx.beginPath();
        ctx.arc(x, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
        ctx.arc(
          x + cloud.width * 0.25,
          cloud.y - 15,
          cloud.width * 0.25,
          0,
          Math.PI * 2
        );
        ctx.arc(
          x + cloud.width * 0.5,
          cloud.y,
          cloud.width * 0.35,
          0,
          Math.PI * 2
        );
        ctx.arc(
          x + cloud.width * 0.75,
          cloud.y - 10,
          cloud.width * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Draw rain
      ctx.strokeStyle = "#2e5bf1";
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;

      raindrops.forEach((drop) => {
        const y = (drop.y + time * drop.speed * 10) % height;
        ctx.beginPath();
        ctx.moveTo(drop.x % width, y);
        ctx.lineTo((drop.x % width) - 2, y + drop.length);
        ctx.stroke();
      });

      // Draw sun rays
      const sunX = width * 0.8;
      const sunY = height * 0.2;

      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#f19a2e";
      ctx.lineWidth = 2;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.2;
        const innerRadius = 30;
        const outerRadius = 60 + Math.sin(time * 2 + i) * 10;

        ctx.beginPath();
        ctx.moveTo(
          sunX + Math.cos(angle) * innerRadius,
          sunY + Math.sin(angle) * innerRadius
        );
        ctx.lineTo(
          sunX + Math.cos(angle) * outerRadius,
          sunY + Math.sin(angle) * outerRadius
        );
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      time += 0.01;
      animationRef.current = requestAnimationFrame(drawWeather);
    };

    drawWeather();

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
        {/* Weather Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 block text-bauhaus-blue">
            09 — API
          </span>
          <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.9] mb-8 uppercase tracking-[-0.02em]">
            Climate
          </h1>
          <p className="font-mono text-xl max-w-[600px] leading-relaxed opacity-80 mb-8">
            A brutalist weather dashboard with real-time data, hazard alerts,
            and animated backgrounds. Weather data meets Swiss design.
          </p>
          {/* Launch Demo Button */}
          <a
            href="http://localhost:5177"
            target="_blank"
            rel="noopener noreferrer"
            className="interactable inline-block px-8 py-4 bg-bauhaus-blue text-white font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 border-2 border-ink no-underline"
          >
            ▶ Launch Demo
          </a>
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
            Climate transforms weather data into a visual experience. The
            interface adapts its animations to match current conditions—rain,
            sun, clouds, or storms.
          </p>
          <p className="font-body text-base leading-relaxed opacity-70">
            Powered by the Open-Meteo API, Climate provides current conditions,
            7-day forecasts, and hazard warnings. The brutalist design ensures
            data clarity while the animated backgrounds add atmospheric context.
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
                "Vanilla CSS",
                "Open-Meteo API",
                "Geocoding API",
                "ESLint",
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
              <span className="font-display text-lg">2 Weeks</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mb-2 block opacity-60">
                ROLE
              </span>
              <span className="font-display text-lg">Frontend Dev</span>
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
              <span className="font-display text-lg text-bauhaus-blue">
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
              title: "City Search",
              desc: "Search any city worldwide with geocoding-powered location lookup.",
            },
            {
              title: "Animated Backgrounds",
              desc: "Dynamic backgrounds that change based on current weather conditions.",
            },
            {
              title: "Hazard Ticker",
              desc: "Scrolling alerts for extreme weather conditions and warnings.",
            },
            {
              title: "7-Day Forecast",
              desc: "Extended forecast with daily highs, lows, and condition icons.",
            },
            {
              title: "Weather Details",
              desc: "Expandable panel showing humidity, wind speed, and more.",
            },
            {
              title: "Responsive Design",
              desc: "Optimized layout for all screen sizes from mobile to desktop.",
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
      <div className="border-t-2 border-line bg-bauhaus-blue p-[4vw] text-white">
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
            className="interactable px-8 py-4 bg-white text-bauhaus-blue font-display text-lg rounded-full hover:scale-105 transition-transform duration-200 no-underline"
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
