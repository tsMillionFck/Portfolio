export default function JournalSheet() {
  return (
    <div className="w-[100px] h-[120px] bg-white border-2 border-ink p-[15px] relative flex flex-col gap-2 transition-all duration-300 shadow-[4px_4px_0_rgba(0,0,0,0.05)] group-hover:translate-y-[-5px] group-hover:rotate-[-2deg] group-hover:shadow-[8px_8px_0_var(--ink)] group-hover:border-bg group-hover:bg-bg">
      {/* Date Header */}
      <div className="font-serif text-[1.8rem] font-black leading-none text-ink border-b-2 border-ink pb-[5px] mb-[5px] group-hover:text-ink group-hover:border-ink">
        14
      </div>

      {/* Text Lines */}
      <div className="h-1 bg-[#ddd] w-full transition-colors duration-300 group-hover:bg-bauhaus-red" />
      <div className="h-1 bg-[#ddd] w-full transition-colors duration-300 group-hover:bg-bauhaus-red" />
      <div className="h-1 bg-[#ddd] w-[60%] transition-colors duration-300 group-hover:bg-bauhaus-red" />
    </div>
  );
}
