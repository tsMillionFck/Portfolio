export default function MewoMiniPlayer() {
  return (
    <div className="w-[120px] h-[160px] bg-white border-4 border-black shadow-[8px_8px_0_#000] flex flex-col transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110">
      {/* Header */}
      <div className="h-6 bg-black w-full" />

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        {/* Play Button */}
        <div
          className="w-0 h-0 mb-4"
          style={{
            borderLeft: "16px solid #ff5722",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
          }}
        />

        {/* Progress Bar */}
        <div className="w-[60%] h-1 border border-black bg-[#eee] relative">
          <div className="w-[40%] h-full bg-[#ff5722]" />
        </div>
      </div>
    </div>
  );
}
