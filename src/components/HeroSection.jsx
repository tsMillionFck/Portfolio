import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const resize = () => {
      const size = Math.min(window.innerWidth * 0.45, 600);
      canvas.width = size;
      canvas.height = size;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawFluidCircle = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.44;

      ctx.clearRect(0, 0, width, height);

      // Draw fluid blob with waves
      ctx.beginPath();

      const points = 120;

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;

        // Multiple wave layers for slow fluid effect
        const wave1 = Math.sin(angle * 3 + time * 0.8) * 10;
        const wave2 = Math.sin(angle * 5 - time * 0.6) * 7;
        const wave3 = Math.sin(angle * 7 + time * 1.2) * 4;
        const wave4 = Math.cos(angle * 2 + time * 0.4) * 8;

        const radius = baseRadius + wave1 + wave2 + wave3 + wave4;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth bezier curves for fluid look
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWave1 = Math.sin(prevAngle * 3 + time * 0.8) * 10;
          const prevWave2 = Math.sin(prevAngle * 5 - time * 0.6) * 7;
          const prevWave3 = Math.sin(prevAngle * 7 + time * 1.2) * 4;
          const prevWave4 = Math.cos(prevAngle * 2 + time * 0.4) * 8;
          const prevRadius =
            baseRadius + prevWave1 + prevWave2 + prevWave3 + prevWave4;

          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;

          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;

          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      }

      ctx.closePath();

      // Fill with orange
      ctx.fillStyle = "#FF9500";
      ctx.fill();

      time += 0.008;
      animationRef.current = requestAnimationFrame(drawFluidCircle);
    };

    drawFluidCircle();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 w-full border-b-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1">
      <div className="col-span-4 max-lg:col-span-2 max-md:col-span-1 border-r-0 min-h-[80vh] relative flex flex-col justify-between p-[15vh_4vw] max-md:p-[40px_20px]">
        <h1 className="relative z-[2] font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.85] m-0 uppercase tracking-[-0.02em] text-ink transition-colors duration-500 max-md:text-[18vw]">
          Form Follows
          <br />
          <span className="text-bauhaus-blue">Function.</span>
        </h1>

        {/* Fluid Wave Circle */}
        <canvas
          ref={canvasRef}
          className="absolute top-[10%] right-[10%] z-[1] pointer-events-none"
          style={{ mixBlendMode: "var(--blend-mode)" }}
        />

        {/* Manifesto */}
        <div className="mt-[100px] max-w-[600px] relative z-[2]">
          <span className="font-mono text-sm font-bold uppercase tracking-widest mb-6 block">
            MANIFESTO
          </span>
          <p className="font-mono text-[clamp(1.1rem,2.5vw,1.75rem)] leading-[1.5] font-normal m-0">
            I am <span className="border-b-2 border-ink">Yashu</span>. Build not
            for fancy, but for necessity. The elegant solution is the one that
            works.
          </p>
        </div>
      </div>
    </div>
  );
}
