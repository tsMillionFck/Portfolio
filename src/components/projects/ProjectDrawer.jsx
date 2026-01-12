import { useEffect, useRef, useState } from "react";

const DRAWER_CONFIG = {
  VISCOSITY: 0.15,
  ELASTICITY: 0.06,
  COLLAPSED_HEIGHT: 80,
  EXPANDED_HEIGHT: 280,
};

export default function ProjectDrawer({
  number,
  category,
  title,
  description,
  visual,
  techStack = [],
  buttonText = "OPEN",
  onClick,
  demoUrl,
}) {
  const drawerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const currentHeight = useRef(DRAWER_CONFIG.COLLAPSED_HEIGHT);
  const velocity = useRef(0);
  const targetHeight = useRef(DRAWER_CONFIG.COLLAPSED_HEIGHT);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    let animationId;

    const animate = () => {
      const force = targetHeight.current - currentHeight.current;
      velocity.current += force * DRAWER_CONFIG.ELASTICITY;
      velocity.current *= 1 - DRAWER_CONFIG.VISCOSITY;
      currentHeight.current += velocity.current;

      currentHeight.current = Math.max(
        DRAWER_CONFIG.COLLAPSED_HEIGHT - 5,
        Math.min(DRAWER_CONFIG.EXPANDED_HEIGHT + 15, currentHeight.current)
      );

      drawer.style.height = `${currentHeight.current}px`;

      setIsExpanded(
        currentHeight.current > DRAWER_CONFIG.COLLAPSED_HEIGHT + 40
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseEnter = () => {
    targetHeight.current = DRAWER_CONFIG.EXPANDED_HEIGHT;
  };

  const handleMouseLeave = () => {
    targetHeight.current = DRAWER_CONFIG.COLLAPSED_HEIGHT;
  };

  return (
    <div
      ref={drawerRef}
      className="interactable relative w-full bg-ink border-2 border-ink border-b-0 last:border-b-2 overflow-hidden cursor-pointer"
      style={{ height: DRAWER_CONFIG.COLLAPSED_HEIGHT }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col p-[20px_30px] h-full">
        {/* Top Row */}
        <div className="flex items-center gap-[30px] h-10 shrink-0">
          <div className="flex items-center shrink-0">
            <span className="font-display text-xl font-bold text-bg tracking-widest">
              {number}
            </span>
          </div>
          <div className="flex items-center gap-5 flex-1">
            <span className="font-body text-[0.65rem] font-bold uppercase tracking-wider text-bg opacity-60">
              {category}
            </span>
            <h2 className="font-serif text-[1.8rem] text-bg m-0 leading-none">
              {title}
            </h2>
          </div>
          <span className="text-xs text-bg opacity-50 font-body ml-auto">
            {description}
          </span>
        </div>

        {/* Reveal Content */}
        <div
          className={`flex items-center justify-between gap-10 pt-[30px] transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {/* Visual */}
          <div className="shrink-0 scale-[0.85] origin-left">{visual}</div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 ml-10">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className={`
                  font-mono text-[0.6rem] px-2.5 py-1 uppercase tracking-wider
                  border bg-white/10 text-bg
                  ${
                    tech.type === "frontend"
                      ? "border-bauhaus-blue text-bauhaus-blue"
                      : ""
                  }
                  ${
                    tech.type === "backend"
                      ? "border-bauhaus-yellow text-bauhaus-yellow"
                      : ""
                  }
                  ${
                    tech.type === "tool"
                      ? "border-bauhaus-red text-bauhaus-red"
                      : ""
                  }
                `}
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="ml-auto flex gap-3">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block py-3 px-[30px] border-2 border-bauhaus-blue font-display font-bold transition-all duration-200 bg-bauhaus-blue text-white text-sm hover:bg-transparent hover:text-bauhaus-blue cursor-pointer no-underline"
              >
                DEMO
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="inline-block py-3 px-[30px] border-2 border-ink font-display font-bold transition-all duration-200 bg-bg text-ink text-sm hover:bg-ink hover:text-bg cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
