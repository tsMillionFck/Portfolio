import { useEffect, useRef } from "react";

export default function EyeSection() {
  const pupilRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const socket = socketRef.current;
      const pupil = pupilRef.current;
      if (!socket || !pupil) return;

      const rect = socket.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(
        15,
        Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 5
      );

      pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${
        Math.sin(angle) * distance
      }px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="grid grid-cols-4 w-full border-t-2 border-b-2 border-line bg-bg transition-colors duration-500 max-lg:grid-cols-2 max-md:grid-cols-1">
      {/* Eye Cell */}
      <div className="interactable border-r-2 border-line min-h-[250px] p-[4vw] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 hover:bg-ink hover:text-bg max-md:border-r-0 max-md:p-[40px_20px]">
        <div
          ref={socketRef}
          className="w-20 h-20 bg-bg border-2 border-ink rounded-full relative flex justify-center items-center transition-colors duration-500"
        >
          <div
            ref={pupilRef}
            className="w-[30px] h-[30px] bg-bauhaus-blue rounded-full"
          />
        </div>
        <span className="font-body text-xs font-bold uppercase tracking-wider mt-5">
          I SEE YOU
        </span>
      </div>

      {/* Quote Cell */}
      <div className="col-span-3 max-lg:col-span-1 border-r-0 min-h-[200px] p-[4vw] flex flex-col justify-center relative overflow-hidden transition-colors duration-300 hover:bg-ink hover:text-bg max-md:p-[40px_20px]">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] m-0 relative z-10 transition-colors duration-500 font-normal">
          "The ultimate aim of all artistic activity is building!" <br />
          <span className="text-base opacity-60 font-body">
            — Walter Gropius, 1919
          </span>
        </h2>
      </div>
    </div>
  );
}
