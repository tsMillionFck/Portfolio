import { useState, useRef, useEffect } from "react";

const MAX_ROTATION = 15;

export default function AeroCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isFlippedRef = useRef(false);

  const updateCardTransform = (rotX, rotY, flipped = isFlippedRef.current) => {
    const card = cardRef.current;
    if (!card) return;

    rotationRef.current = { x: rotX, y: rotY };

    let transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (flipped) {
      transform = `rotateX(${rotX}deg) rotateY(${rotY + 180}deg)`;
    }

    card.style.transform = transform;

    // Dynamic shadow
    const shadowX = -rotY * 2;
    const shadowY = rotX * 2;
    card.style.boxShadow = `${shadowX}px ${
      shadowY + 20
    }px 30px rgba(0,0,0,0.2)`;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      const rotateY = mouseX * MAX_ROTATION;
      const rotateX = -mouseY * MAX_ROTATION;

      updateCardTransform(rotateX, rotateY);
    };

    const handleMouseEnter = () => setShowToast(true);

    const handleMouseLeave = () => {
      setShowToast(false);
      const card = cardRef.current;
      if (!card) return;

      if (!isFlippedRef.current) {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
      } else {
        card.style.transform = "rotateX(0deg) rotateY(180deg)";
      }
      card.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    const newFlipped = !isFlipped;
    isFlippedRef.current = newFlipped;
    setIsFlipped(newFlipped);
    updateCardTransform(
      rotationRef.current.x,
      rotationRef.current.y,
      newFlipped
    );
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full min-h-[500px] flex justify-center items-center bg-bg"
      style={{ perspective: "1200px" }}
    >
      <div
        className="w-[280px] h-[400px] relative cursor-grab"
        style={{ transformStyle: "preserve-3d" }}
        onClick={handleClick}
      >
        <div
          ref={cardRef}
          className="relative w-full h-full text-center rounded-xl"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: "transform 0.2s ease-out",
          }}
        >
          {/* Front Face */}
          <div
            className="absolute w-full h-full rounded-xl border-2 border-ink overflow-hidden bg-white text-ink grid grid-cols-[45px_1fr] grid-rows-[auto_1fr]"
            style={{
              backfaceVisibility: "hidden",
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
            }}
          >
            {/* Geometry Layer */}
            <div
              className="absolute -top-10 -right-10 w-[180px] h-[180px] bg-bauhaus-red rounded-full opacity-90"
              style={{ mixBlendMode: "multiply" }}
            />
            <div
              className="absolute bottom-10 left-10 w-[70px] h-[120px] bg-bauhaus-blue opacity-80"
              style={{ mixBlendMode: "multiply" }}
            />
            <div
              className="absolute top-[35%] left-[55%] w-[90px] h-[90px] bg-bauhaus-yellow rounded-full"
              style={{ mixBlendMode: "multiply" }}
            />

            {/* Spine */}
            <div
              className="col-start-1 row-span-2 font-display font-extrabold text-[1.8rem] tracking-[4px] text-right border-l-4 border-ink pl-3 h-full z-10 bg-white flex items-center justify-end"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              POLYMATH
            </div>

            {/* Rank */}
            <div className="col-start-2 p-6 text-right text-[3.5rem] font-black z-[5] leading-none font-serif">
              J
            </div>

            {/* Quote */}
            <div className="col-start-2 flex items-center justify-center px-[30px] pb-10 z-[5]">
              <div className="font-serif text-base italic font-medium leading-[1.4] text-[#444]">
                The whole is greater than the sum of its parts.
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute w-full h-full rounded-xl border-2 border-ink overflow-hidden bg-ink text-white flex flex-col justify-center items-start p-10"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
            }}
          >
            <div className="text-[0.7rem] uppercase tracking-widest text-[#888] mb-6 font-bold font-body">
              Competency Matrix
            </div>
            <ul className="list-none p-0 m-0">
              <li className="text-2xl font-extrabold mb-4 flex items-center gap-4 font-display">
                <span className="w-3.5 h-3.5 bg-bauhaus-red rounded-sm" />
                Architect
              </li>
              <li className="text-2xl font-extrabold mb-4 flex items-center gap-4 font-display">
                <span className="w-3.5 h-3.5 bg-bauhaus-blue rounded-full" />
                Design
              </li>
              <li className="text-2xl font-extrabold mb-4 flex items-center gap-4 font-display">
                <span
                  className="w-3.5 h-3.5 bg-bauhaus-yellow"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                />
                Code
              </li>
              <li className="text-2xl font-extrabold mb-4 flex items-center gap-4 font-display">
                <span
                  className="w-3.5 h-3.5 bg-pink-500 rounded-full"
                  style={{ borderTopLeftRadius: 0 }}
                />
                Creativity
              </li>
            </ul>
          </div>
        </div>

        {/* Toast */}
        <div
          className={`absolute -bottom-[50px] left-1/2 -translate-x-1/2 bg-ink text-bg py-2.5 px-5 rounded font-mono text-xs uppercase tracking-wider z-[100] whitespace-nowrap transition-all duration-300 ${
            showToast
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2.5"
          }`}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-ink" />
          ↻ Click to flip
        </div>
      </div>
    </div>
  );
}
