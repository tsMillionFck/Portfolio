import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function FluidMusicButton() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(
    new Audio(
      "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
    )
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const size = 56;
    canvas.width = size;
    canvas.height = size;

    let internalTime = 0;

    const drawFluidBlob = () => {
      const centerX = size / 2;
      const centerY = size / 2;

      // If playing, the blob is more "active" (larger waves)
      const baseRadius = isPlaying ? 26 : 24;
      const waveSpeed = isPlaying ? 0.04 : 0.015;

      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();

      const points = 60;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;

        // Multi-layered waves for fluid effect
        const wave1 =
          Math.sin(angle * 3 + internalTime * (isPlaying ? 2.5 : 1.2)) *
          (isPlaying ? 2.5 : 0.8);
        const wave2 =
          Math.sin(angle * 5 - internalTime * (isPlaying ? 1.8 : 0.8)) *
          (isPlaying ? 1.5 : 0.5);
        const wave3 =
          Math.cos(angle * 4 + internalTime * (isPlaying ? 3.0 : 1.5)) *
          (isPlaying ? 1.2 : 0.4);

        const radius = baseRadius + wave1 + wave2 + wave3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // quadratic curve for smoother edges
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWave1 =
            Math.sin(prevAngle * 3 + internalTime * (isPlaying ? 2.5 : 1.2)) *
            (isPlaying ? 2.5 : 0.8);
          const prevWave2 =
            Math.sin(prevAngle * 5 - internalTime * (isPlaying ? 1.8 : 0.8)) *
            (isPlaying ? 1.5 : 0.5);
          const prevWave3 =
            Math.cos(prevAngle * 4 + internalTime * (isPlaying ? 3.0 : 1.5)) *
            (isPlaying ? 1.2 : 0.4);
          const prevRadius = baseRadius + prevWave1 + prevWave2 + prevWave3;

          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;

          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;

          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      }

      ctx.closePath();

      // Blob color: Bauhaus blue when playing, Bauhaus red when paused
      if (isPlaying) {
        ctx.fillStyle = theme === "dark" ? "#2e5bf1" : "#2e5bf1"; // Always blue for music?
      } else {
        ctx.fillStyle = theme === "dark" ? "#e94e34" : "#e94e34";
      }

      ctx.fill();

      internalTime += waveSpeed;
      animationRef.current = requestAnimationFrame(drawFluidBlob);
    };

    drawFluidBlob();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Loop back when ended
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <button
      onClick={togglePlay}
      className="interactable relative w-14 h-14 border-none cursor-pointer bg-transparent p-0 transition-transform duration-200 hover:scale-110"
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <span className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none">
        {isPlaying ? (
          // Pause Icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="2"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          // Play Icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </span>
    </button>
  );
}
