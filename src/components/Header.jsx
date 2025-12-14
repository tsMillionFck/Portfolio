import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const size = 56;
    canvas.width = size;
    canvas.height = size;

    const drawFluidBlob = () => {
      const centerX = size / 2;
      const centerY = size / 2;
      const baseRadius = 24;

      ctx.clearRect(0, 0, size, size);

      // Draw fluid blob with waves
      ctx.beginPath();

      const points = 60;

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;

        // Subtle wave layers for gentle fluid effect
        const wave1 = Math.sin(angle * 3 + time * 1.2) * 0.8;
        const wave2 = Math.sin(angle * 5 - time * 0.8) * 0.5;
        const wave3 = Math.cos(angle * 4 + time * 1.5) * 0.4;

        const radius = baseRadius + wave1 + wave2 + wave3;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWave1 = Math.sin(prevAngle * 3 + time * 1.2) * 0.8;
          const prevWave2 = Math.sin(prevAngle * 5 - time * 0.8) * 0.5;
          const prevWave3 = Math.cos(prevAngle * 4 + time * 1.5) * 0.4;
          const prevRadius = baseRadius + prevWave1 + prevWave2 + prevWave3;

          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;

          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;

          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      }

      ctx.closePath();

      // Fill based on theme
      ctx.fillStyle = theme === "dark" ? "#FFEB3B" : "#1a1a2e";
      ctx.fill();

      time += 0.015;
      animationRef.current = requestAnimationFrame(drawFluidBlob);
    };

    drawFluidBlob();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      <div className="grid grid-cols-4 w-full border-b-2 border-line bg-bg transition-colors duration-500">
        {/* Logo */}
        <div className="border-r-2 border-line min-h-[80px] p-5 flex items-center">
          <span className="font-body text-xs font-bold uppercase tracking-wider">
            FAST-YSH
          </span>
        </div>

        {/* Navigation */}
        <div className="col-span-2 border-r-2 border-line min-h-[80px] p-5 flex flex-row items-center gap-5 max-md:flex-col max-md:items-start max-md:gap-2">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("work");
              if (el)
                window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="interactable font-display text-xl no-underline text-ink border-b-2 border-transparent hover:border-bauhaus-red transition-all duration-200"
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("about");
              if (el)
                window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="interactable font-display text-xl no-underline text-ink border-b-2 border-transparent hover:border-bauhaus-red transition-all duration-200"
          >
            Profile
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (el)
                window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="interactable font-display text-xl no-underline text-ink border-b-2 border-transparent hover:border-bauhaus-red transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Theme Toggle */}
        <div className="min-h-[80px] p-5 flex justify-center items-center">
          <button
            onClick={toggleTheme}
            className="interactable relative w-14 h-14 border-none cursor-pointer bg-transparent p-0 transition-transform duration-200 hover:scale-110"
            aria-label="Toggle Theme"
          >
            {/* Fluid Wave Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            {/* Icon overlay */}
            <span className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none">
              {theme === "dark" ? (
                // Sun icon for dark mode (click to go light)
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon icon for light mode (click to go dark)
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFEB3B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
