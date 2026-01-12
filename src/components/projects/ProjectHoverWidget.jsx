import { useEffect, useRef } from "react";

export default function ProjectHoverWidget({ type }) {
  const canvasRef = useRef(null);

  // Widget Implementations
  const renderWidget = () => {
    switch (type) {
      case "budget": // 1. Neo-Brutalism
        return (
          <div className="w-full h-full bg-[#ffffff] p-4 flex flex-col font-mono relative overflow-hidden text-black">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-50"></div>

            <div className="relative z-10border-2 border-black bg-[#ffde59] p-2 mb-2 shadow-[4px_4px_0px_0px_#000]">
              <h3 className="text-xs font-bold uppercase tracking-tighter">
                TOTAL_SPEND
              </h3>
              <p className="text-xl font-bold font-mono">$1,240.50</p>
            </div>

            <div className="flex gap-2 relative z-10 mt-auto">
              <div className="flex-1 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_#000]">
                <div className="w-full bg-gray-200 h-2 mb-1 border border-black">
                  <div className="w-[70%] h-full bg-[#ff5757]"></div>
                </div>
                <span className="text-[10px] font-bold">BUDGET</span>
              </div>
              <div className="w-10 bg-[#00e5ff] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                <span className="text-xl font-bold">+</span>
              </div>
            </div>
          </div>
        );

      case "music": // 2. Swiss Style
        return (
          <div className="w-full h-full bg-white p-6 flex flex-col justify-between font-sans text-black">
            <div>
              <div className="w-12 h-12 bg-[#ff5722] rounded-full mb-4 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
              </div>
              <h3 className="text-4xl font-bold leading-none tracking-tight mb-1">
                Play.
              </h3>
              <p className="font-mono text-xs text-gray-400">03:45 / 04:20</p>
            </div>
            <div className="w-full bg-gray-100 h-[2px]">
              <div className="w-[65%] h-full bg-black"></div>
            </div>
          </div>
        );

      case "weather": // 3. Neo-Retro
        return (
          <div className="w-full h-full bg-[#87ceeb] p-4 flex flex-col font-sans border-4 border-black relative overflow-hidden text-black">
            {/* Sun */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ffde59] rounded-full border-4 border-black"></div>

            <div className="mt-auto relative z-10 bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_#000] rounded-lg">
              <h3 className="text-3xl font-black">24°C</h3>
              <p className="font-bold text-sm">Sunny & Clear</p>
            </div>
          </div>
        );

      case "book": // 4. VibeRead AI (Dark Minimalist)
        return (
          <div className="w-full h-full bg-zinc-950 p-6 flex flex-col justify-center text-zinc-100 font-serif text-center relative">
            <div className="absolute inset-2 border border-white/10 pointer-events-none"></div>
            <p className="text-xs font-sans uppercase tracking-widest text-zinc-500 mb-4">
              RECOMMENDATION
            </p>
            <h3 className="text-xl italic leading-snug mb-2">
              "The Design of Everyday Things"
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-2">— Don Norman</p>
          </div>
        );

      case "quiz": // 5. Wized Style (Gamified)
        return (
          <div className="w-full h-full bg-[#f8fafc] p-4 flex flex-col items-center justify-center font-sans text-slate-800 relative rounded-[32px] overflow-hidden">
            {/* Floating Shapes */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-purple-200 opacity-50"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-yellow-200 opacity-50"></div>

            <div className="bg-white px-6 py-4 rounded-2xl shadow-lg text-center border border-slate-100 relative z-10 w-full max-w-[80%]">
              <span className="text-2xl mb-1 block">🧠</span>
              <h3 className="font-bold text-sm">Pop Quiz!</h3>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#8b5cf6]"></div>
              </div>
            </div>
          </div>
        );

      case "map": // 6. Interactive Map
        return (
          <div className="w-full h-full bg-[#e5e7eb] flex font-sans text-slate-800">
            <div className="w-1/3 bg-white h-full border-r border-slate-300 p-3 flex flex-col gap-2">
              <div className="h-2 w-12 bg-slate-200 rounded"></div>
              <div className="h-8 w-full bg-blue-50 border border-blue-100 rounded flex items-center justify-center text-blue-500 text-xs font-medium">
                Locate
              </div>
              <div className="h-full w-full bg-slate-50 rounded"></div>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center">
              <div className="text-[#3b82f6]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        );

      case "infograph": // 7. Scientific Dashboard
        return (
          <div className="w-full h-full bg-[#f8f9fa] p-2 font-mono text-xs flex flex-col text-[#2563eb]">
            <div className="flex justify-between border-b border-[#2563eb]/20 pb-1 mb-2">
              <span>SYS.STATUS</span>
              <span className="text-[#dc2626]">ALERT</span>
            </div>
            <div className="flex-1 bg-white border border-[#2563eb]/20 relative p-2 grid grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-[#2563eb]/10 ${
                    i === 5 || i === 11 ? "bg-[#dc2626]/20" : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        );

      case "design_giver": // 8. Glass/Blank Canvas
        return (
          <div className="w-full h-full bg-[#f9fafb] p-6 flex items-center justify-center">
            <div className="w-full aspect-[4/3] bg-white shadow-sm border border-slate-200 rounded-lg flex items-center justify-center text-slate-300 italic text-sm">
              Waiting for Input...
            </div>
          </div>
        );

      case "chat": // 9. Default Neo-Brutalist Green (Chat App)
        return (
          <div className="w-full h-full bg-[#00FF94] p-4 flex flex-col justify-between font-mono border-2 border-black text-black">
            <div className="bg-black text-[#00FF94] px-2 py-1 self-start text-xs font-bold">
              ONLINE
            </div>
            <div className="space-y-2">
              <div className="bg-white border border-black p-2 text-[10px] w-[80%]">
                Hey, nice portfolio!
              </div>
              <div className="bg-black text-white border border-black p-2 text-[10px] w-[80%] ml-auto">
                Thanks! @Mio
              </div>
            </div>
          </div>
        );

      default:
        return <div className="w-full h-full bg-gray-100" />;
    }
  };

  return renderWidget();
}
