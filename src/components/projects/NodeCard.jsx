export default function NodeCard() {
  return (
    <div className="w-[140px] h-[160px] bg-ink border-2 border-ink shadow-[6px_6px_0_var(--ink)] relative overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-[10px_10px_0_var(--ink)]">
      {/* Main Node */}
      <div className="w-[50px] h-[30px] bg-bg border-2 border-bauhaus-blue rounded z-[2] relative shadow-[0_0_10px_rgba(46,91,241,0.5)]" />

      {/* Child Nodes */}
      <div className="w-[30px] h-5 bg-[#333] border border-[#666] rounded absolute top-10 left-5 transition-transform duration-400 z-[1] group-hover:translate-x-[-20px] group-hover:translate-y-[-10px] group-hover:bg-bg" />
      <div className="w-[30px] h-5 bg-[#333] border border-[#666] rounded absolute bottom-[30px] right-5 transition-transform duration-400 z-[1] group-hover:translate-x-[15px] group-hover:translate-y-[20px] group-hover:bg-bg" />
      <div className="w-[30px] h-5 bg-[#333] border border-[#666] rounded absolute top-[30px] right-[30px] transition-transform duration-400 z-[1] group-hover:translate-x-[10px] group-hover:translate-y-[-20px] group-hover:bg-bg" />

      {/* Connecting Lines */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0.5 bg-[#555] origin-left transition-all duration-400 group-hover:w-10 group-hover:rotate-[140deg] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-0 h-0.5 bg-[#555] origin-left transition-all duration-400 group-hover:w-10 group-hover:rotate-[45deg] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-0 h-0.5 bg-[#555] origin-left transition-all duration-400 group-hover:w-10 group-hover:rotate-[-30deg] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2" />
    </div>
  );
}
